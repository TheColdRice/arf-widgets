import GtkSource from 'gi://GtkSource?version=3.0'
import md2pango from './md2pango'

const { Gio, GLib, Gtk } = imports.gi

const CUSTOM_SOURCEVIEW_SCHEME_PATH = `${App.configDir}/assets/sourceview.xml`
const CUSTOM_SCHEME_ID = 'custom'
const USERNAME = GLib.get_user_name()
const CHATGPT_CURSOR = '  ...'

/////////////////////// Custom source view colorscheme /////////////////////////

function loadCustomColorScheme(filePath) {
  // Read the XML file content
  const file = Gio.File.new_for_path(filePath)
  const [success, contents] = file.load_contents(null)

  if (!success) {
    logError('Failed to load the XML file.')
    return
  }

  // Parse the XML content and set the Style Scheme
  const schemeManager = GtkSource.StyleSchemeManager.get_default()
  schemeManager.append_search_path(file.get_parent().get_path())
}
loadCustomColorScheme(CUSTOM_SOURCEVIEW_SCHEME_PATH)

function substituteLang(str) {
  const subs = [
    { from: 'javascript', to: 'js' },
    { from: 'bash', to: 'sh' },
  ]

  for (const { from, to } of subs) {
    if (from === str)
      return to
  }

  return str
}

const HighlightedCode = (content, lang) => {
  const buffer = new GtkSource.Buffer()
  const sourceView = new GtkSource.View({
    buffer: buffer,
    wrapMode: Gtk.WrapMode.NONE
  })

  const langManager = GtkSource.LanguageManager.get_default()
  let displayLang = langManager.get_language(substituteLang(lang)) // Set your preferred language

  if (displayLang)
    buffer.set_language(displayLang)

  const schemeManager = GtkSource.StyleSchemeManager.get_default()
  buffer.set_style_scheme(schemeManager.get_scheme(CUSTOM_SCHEME_ID))
  buffer.set_text(content, -1)
  return sourceView
}

const TextBlock = (content = '') => Widget.Label({
  xalign: 0,
  wrap: true,
  hpack: 'fill',
  label: content,
  useMarkup: true,
  selectable: true,
  className: 'txt sidebar-chat-txtblock sidebar-chat-txt',
})

const CodeBlock = (content = '', lang = 'txt') => {
  const topBar = Widget.Box({
    className: 'sidebar-chat-codeblock-topbar',
    children: [
      Widget.Label({
        label: lang,
        className: 'sidebar-chat-codeblock-topbar-txt',
      }),
      Widget.Box({ hexpand: true }),
      Widget.Button({
        className: 'sidebar-chat-codeblock-topbar-btn',
        child: Widget.Box({
          className: 'spacing-h-5',
          children: [
            Widget.Label({ label: 'content_copy', }),
            Widget.Label({ label: 'Copy' })
          ]
        }),
        onClicked: () => {
          const buffer = sourceView.get_buffer()
          const copyContent = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), false) // TODO: fix this
          Utils.execAsync([`wl-copy`, `${copyContent}`]).catch(print)
        },
      }),
    ]
  })

  const sourceView = HighlightedCode(content, lang)

  const codeBlock = Widget.Box({
    attribute: {
      updateText: (text: string) => { sourceView.get_buffer().set_text(text, -1) }
    },
    className: 'sidebar-chat-codeblock',
    vertical: true,
    children: [
      topBar,
      Widget.Box({
        className: 'sidebar-chat-codeblock-code',
        homogeneous: true,
        children: [
          Widget.Scrollable({
            vscroll: 'never',
            hscroll: 'automatic',
            child: sourceView,
          })
        ],
      })
    ]
  })

  return codeBlock
}

const Divider = () => Widget.Box({ className: 'sidebar-chat-divider' })

const MessageContent = (content) => {
  const contentBox = Widget.Box({
    vertical: true,
    attribute: {
      fullUpdate: (self, content, useCursor = false) => {
        // Clear and add first text widget
        const children = contentBox.get_children()
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          child.destroy()
        }
        contentBox.add(TextBlock())
        // Loop lines. Put normal text in markdown parser 
        // and put code into code highlighter (TODO)
        let lines = content.split('\n')
        let lastProcessed = 0
        let inCode = false
        for (const [index, line] of lines.entries()) {
          // Code blocks
          const codeBlockRegex = /^\s*```([a-zA-Z0-9]+)?\n?/
          if (codeBlockRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')
            if (!inCode) {
              lastLabel.label = md2pango(blockContent)
              contentBox.add(CodeBlock('', codeBlockRegex.exec(line)[1]))
            }
            else {
              lastLabel.attribute.updateText(blockContent)
              contentBox.add(TextBlock())
            }

            lastProcessed = index + 1
            inCode = !inCode
          }
          // Breaks
          const dividerRegex = /^\s*---/
          if (!inCode && dividerRegex.test(line)) {
            const kids = self.get_children()
            const lastLabel = kids[kids.length - 1]
            const blockContent = lines.slice(lastProcessed, index).join('\n')
            lastLabel.label = md2pango(blockContent)
            contentBox.add(Divider())
            contentBox.add(TextBlock())
            lastProcessed = index + 1
          }
        }
        if (lastProcessed < lines.length) {
          const kids = self.get_children()
          const lastLabel = kids[kids.length - 1]
          let blockContent = lines.slice(lastProcessed, lines.length).join('\n')
          if (!inCode)
            lastLabel.label = `${md2pango(blockContent)}${useCursor ? CHATGPT_CURSOR : ''}`
          else
            lastLabel.attribute.updateText(blockContent)
        }
        contentBox.show_all()
      }
    }
  });
  contentBox.attribute.fullUpdate(contentBox, content, false)
  return contentBox
}

export const ChatMessage = (message, modelName = 'Model') => {
  const messageContentBox = MessageContent(message.content)
  const thisMessage = Widget.Box({
    className: 'sidebar-chat-message',
    children: [
      Widget.Box({
        className: `sidebar-chat-indicator ${message.role == 'user' ? 'sidebar-chat-indicator-user' : 'sidebar-chat-indicator-bot'}`,
      }),
      Widget.Box({
        vertical: true,
        hpack: 'fill',
        hexpand: true,
        children: [
          Widget.Label({
            hpack: 'fill',
            xalign: 0,
            className: 'txt txt-bold sidebar-chat-name',
            wrap: true,
            useMarkup: true,
            label: (message.role == 'user' ? USERNAME : modelName),
          }),
          messageContentBox,
        ],
        setup: (self) => self.hook(message, () => {
            messageContentBox.toggleClassName('thinking', message.thinking)
          }, 'notify::thinking').hook(message, () => { // Message update
            messageContentBox.attribute.fullUpdate(messageContentBox, message.content, message.role != 'user')
          }, 'notify::content').hook(message, () => { // Remove the cursor
            messageContentBox.attribute.fullUpdate(messageContentBox, message.content, false)
          }, 'notify::done'),
      })
    ]
  })
  return thisMessage
}

export const SystemMessage = (content, commandName) => {
  const messageContentBox = MessageContent(content)
  const thisMessage = Widget.Box({
    className: 'sidebar-chat-message',
    children: [
      Widget.Box({
        className: `sidebar-chat-indicator sidebar-chat-indicator-System`,
      }),
      Widget.Box({
        vertical: true,
        hpack: 'fill',
        hexpand: true,
        children: [
          Widget.Label({
            xalign: 0,
            className: 'txt txt-bold sidebar-chat-name',
            wrap: true,
            label: `System  •  ${commandName}`,
          }),
          messageContentBox,
        ],
      })
    ],
  })
  return thisMessage
}