import icons from 'data/icons'
import { dependencies, sh, bash } from 'lib/utils'

const { GLib } = imports.gi
const dateFormat = '%Y-%m-%d_%H-%M-%S'
const now = GLib.DateTime.new_now_local().format(dateFormat)

class ScreenTools extends Service {
  static {
    Service.register(this, {}, {
      timer: [ 'int' ],
      isZoomed: [ 'boolean' ],
      isRecording: [ 'boolean' ],
    })
  }

  #recordings = Utils.HOME + '/Videos/Records'
  #screenshots = Utils.HOME + '/Fotos/Captura'
  #file = ''
  #interval = 0

  timer = 0
  _isZoomed = false
  _isRecording = false

  get isRecording() { return this._isRecording }

  async recorder(option: 'region' | 'fullscreen' | 'stop' = 'region') {
    if (!dependencies('slurp', 'wl-screenrec')) return

    if (this._isRecording && option === 'stop')
      this.recorderStop()
    else if (!this._isRecording) {
      Utils.ensureDirectory(this.#recordings)
      this.#file = `${this.#recordings}/${now}.mp4`
      if (option === 'fullscreen')
        sh(`wl-screenrec -f ${this.#file}`)
      if (option === 'region')
        sh(`wl-screenrec -g "${await sh('slurp')}" -f ${this.#file}`)

      this._isRecording = true
      this.changed('_isRecording')

      this.timer = 0
      this.#interval = Utils.interval(1000, () => { this.changed('timer'); this.timer++ })
    }
  }

  async recorderStop() {
    sh('pkill wl-screenrec')
    this._isRecording = false
    this.changed('_isRecording')
    GLib.source_remove(this.#interval)

    Utils.notify({
      summary: 'Screenrecord',
      body: this.#file,
      iconName: icons.fallback.video,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this.#recordings}`),
        View: () => sh(`xdg-open ${this.#file}`),
      },
    })
  }

  async screenshot(full: boolean = false) {
    if (!dependencies('slurp', 'grim')) return

    const file = `${this.#screenshots}/${now}.png`
    Utils.ensureDirectory(this.#screenshots)

    if (full) await sh(`grim ${file}`)
    else {
      const size = await sh('slurp')
      if (!size) return
      await sh(`grim -g "${size}" ${file}`)
    }

    bash`wl-copy < ${file}`

    Utils.notify({
      image: file,
      summary: 'Screenshot',
      body: file,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this.#screenshots}`),
        View() { sh(`xdg-open ${file}`) },
        Edit() { if (dependencies('swappy')) sh(`swappy -f ${file}`) },
      },
    })
  }

  async zoom(amount: string | number = '') {
    if (!dependencies('pypr')) return
    sh(`pypr zoom ${amount}`)
    this._isZoomed = !this._isZoomed
    this.changed('_isZoomed')
  }
}

export default new ScreenTools
