import { initMessages } from 'data/gemini'
import { bash, fileExists } from 'lib/utils'

import options from 'options'

const { Gio, GLib, Soup } = imports.gi

const { key, model } = options.chatbot.gemini
const HISTORY_DIR = `${GLib.get_user_cache_dir()}/ags/user/ai/chats/`
const HISTORY_FILENAME = 'gemini.txt'
const HISTORY_PATH = HISTORY_DIR + HISTORY_FILENAME

if (!fileExists(`${TMP}/gemini_history.json`)) {
  bash`touch ${TMP}/gemini_history.json`
  Utils.writeFile('[ ]', `${TMP}/gemini_history.json`).catch(print)
}

Utils.exec(`mkdir -p ${GLib.get_user_cache_dir()}/ags/user/ai`)
const APIDOM_FILE_LOCATION = `${GLib.get_user_cache_dir()}/ags/user/ai/google_api_dom.txt`

function replaceapidom(URL) {
  if (fileExists(APIDOM_FILE_LOCATION)) {
    const contents = Utils.readFile(APIDOM_FILE_LOCATION).trim()
    URL = URL.toString().replace('generativelanguage.googleapis.com', contents)
  }
  return URL
}

class GeminiMessage extends Service {
  static {
    Service.register(
      this,
      { delta: ['string'] },
      {
        content: ['string'],
        thinking: ['boolean'],
        done: ['boolean'],
      },
    )
  }

  _role = ''
  _parts = [{ text: '' }]
  _thinking = false
  _done = false
  _rawData = ''

  constructor(role: string, content, thinking = true, done = false) {
    super()
    this._role = role
    this._parts = [{ text: content }]
    this._thinking = thinking
    this._done = done
  }

  get rawData() {
    return this._rawData
  }
  set rawData(value) {
    this._rawData = value
  }

  get done() {
    return this._done
  }
  set done(isDone) {
    this._done = isDone
    this.notify('done')
  }

  get role() {
    return this._role
  }
  set role(role) {
    this._role = role
    this.emit('changed')
  }

  get content() {
    return this._parts.map((part) => part.text).join()
  }

  set content(content) {
    this._parts = [{ text: content }]
    this.notify('content')
    this.emit('changed')
  }

  get parts() {
    return this._parts
  }

  get thinking() {
    return this._thinking
  }
  set thinking(value) {
    this._thinking = value
    this.notify('thinking')
    this.emit('changed')
  }

  addDelta(delta: string) {
    if (this.thinking) {
      this.thinking = false
      this.content = delta
    } else this.content += delta
    this.emit('delta', delta)
  }

  parseSection() {
    if (this._thinking) {
      this.thinking = false
      this._parts[0].text = ''
    }
    const parsedData = JSON.parse(this._rawData)
    if (!parsedData.candidates)
      this._parts[0].text += `Blocked: ${parsedData.promptFeedback.blockReason}`
    else {
      const delta = parsedData.candidates[0].content.parts[0].text
      this._parts[0].text += delta
    }
    this.notify('content')
    this._rawData = ''
  }
}

class GeminiService extends Service {
  static {
    Service.register(this, {
      initialized: [],
      clear: [],
      newMsg: ['int'],
    })
  }

  _assistantPrompt = options.chatbot.enhancements.value
  _usingHistory = options.chatbot.useHistory.value
  _requestCount = 0
  _safe = true
  _temperature = options.chatbot.temperature.value
  _messages = []
  _decoder = new TextDecoder()

  constructor() {
    super()

    if (this._usingHistory) this.loadHistory()
    else this._messages = this._assistantPrompt ? [...initMessages] : []

    this.emit('initialized')
  }

  get useHistory() {
    return this._usingHistory
  }
  set useHistory(value) {
    if (value && !this._usingHistory) this.loadHistory()
    this._usingHistory = value
  }

  get safe() {
    return this._safe
  }
  set safe(value) {
    this._safe = value
  }

  get temperature() {
    return this._temperature
  }
  set temperature(value) {
    this._temperature = value
  }

  get messages() {
    return this._messages
  }
  get lastMessage() {
    return this._messages[this._messages.length - 1]
  }

  saveHistory() {
    bash`mkdir -p ${HISTORY_DIR} && touch ${HISTORY_PATH}`
    Utils.writeFile(
      JSON.stringify(
        this._messages.map((msg) => {
          const m = { role: msg.role, parts: msg.parts }
          return m
        }),
      ),
      HISTORY_PATH,
    )
  }

  loadHistory() {
    this._messages = []
    this.appendHistory()
    this._usingHistory = true
  }

  appendHistory() {
    if (fileExists(HISTORY_PATH)) {
      const readfile = Utils.readFile(HISTORY_PATH)
      JSON.parse(readfile).forEach((element) =>
        this.addMessage(element.role, element.parts[0].text),
      )
    } else this._messages = this._assistantPrompt ? [...initMessages] : []
  }

  clear() {
    this._messages = this._assistantPrompt ? [...initMessages] : []
    if (this._usingHistory) this.saveHistory()
    this.emit('clear')
  }

  get assistantPrompt() {
    return this._assistantPrompt
  }

  set assistantPrompt(value) {
    this._assistantPrompt = value
    if (value) this._messages = [...initMessages]
    else this._messages = []
  }

  readResponse(stream, aiResponse) {
    stream.read_line_async(0, null, (stream, res) => {
      try {
        const [bytes] = stream.read_line_finish(res)
        const line = this._decoder.decode(bytes)

        if (line == '[{') {
          aiResponse._rawData += '{'
          this.thinking = false
        } else if (line == ',\u000d' || line == ']') aiResponse.parseSection()
        else aiResponse._rawData += line

        this.readResponse(stream, aiResponse)
      } catch {
        aiResponse.done = true
        if (this._usingHistory) this.saveHistory()
        return
      }
    })
  }

  addMessage(role, message) {
    this._messages.push(new GeminiMessage(role, message, false))
    this.emit('newMsg', this._messages.length - 1)
  }

  send(msg) {
    this._messages.push(new GeminiMessage('user', msg, false))
    this.emit('newMsg', this._messages.length - 1)
    const aiResponse = new GeminiMessage('model', 'thinking...', true, false)

    const body = {
      contents: this._messages.map((msg) => ({
        role: msg.role,
        parts: msg.parts,
      })),
      safetySettings: this._safe ? [] : [
        // { category: 'HARM_CATEGORY_DEROGATORY', threshold: 'BLOCK_NONE', },
        // { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE', },
        // { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE', },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_NONE',
        },
        // { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_NONE', },
      ],
      generationConfig: { temperature: this._temperature },
    }
    const session = new Soup.Session()
    const message = new Soup.Message({
      method: 'POST',
      uri: GLib.Uri.parse(
        replaceapidom(
          `https://generativelanguage.googleapis.com/v1/models/${model}:streamGenerateContent?key=${key}`,
        ),
        GLib.UriFlags.NONE,
      ),
    })
    message.request_headers.append('Content-Type', 'application/json')
    message.set_request_body_from_bytes(
      'application/json',
      new GLib.Bytes(JSON.stringify(body)),
    )

    session.send_async(message, GLib.DEFAULT_PRIORITY, null, (_, result) => {
      const stream = session.send_finish(result)
      this.readResponse(
        new Gio.DataInputStream({
          close_base_stream: true,
          base_stream: stream,
        }),
        aiResponse,
      )
    })

    this._messages.push(aiResponse)
    this.emit('newMsg', this._messages.length - 1)
  }
}

export default new GeminiService()
