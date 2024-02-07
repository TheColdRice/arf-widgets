// COLUMN1
const column1 = [
  {
    icon: '',
    name: 'Workspaces: navigation',
    binds: [
      { keys: ['⌘', '+', '#'], action: 'Go to workspace #' },
      { keys: ['⌘', 'Shift', '+', '#'], action: 'Move window to workspace #' },
      { keys: ['⌘', 'Ctrl', 'Shift', '+', '←'], action: 'Move window to workspace on the left' },
      { keys: ['⌘', 'Ctrl', 'Shift', '+', '→'], action: 'Move window to workspace on the right' },
    ],
    appeartick: 1
  },
  {
    icon: '',
    name: 'Windows',
    binds: [
      { keys: ['⌘', '+', '←↑→↓ or hjkl'], action: 'Focus window in direction' },
      { keys: ['⌘', 'Shift', '+', '←↑→↓ or hjkl'], action: 'Swap window in direction' },
      { keys: ['⌘', '+', 'F'], action: 'Maximize' },
      { keys: ['⌘', 'Shift', '+', 'F'], action: 'Fullscreen' },
      { keys: ['⌘', 'Alt', '+', 'F'], action: 'Fake fullscreen' }
    ],
    appeartick: 1
  }
]

// COLUMN2
const column2 = [
  {
    icon: '󰜬',
    name: 'Widgets (AGS)',
    binds: [
      { keys: ['⌘', '+', 'Tab'], action: 'Toggle overview/launcher' },
      { keys: ['Ctrl', '⌘', '+', 'R'], action: 'Restart AGS' },
      { keys: ['⌘', '+', '/'], action: 'Toggle this cheatsheet' },
      { keys: ['⌘', '+', 'N'], action: 'Toggle sidebar' },
      { keys: ['⌘', '+', 'K'], action: 'Toggle virtual keyboard' },
      { keys: ['Ctrl', 'Alt', '+', 'Del'], action: 'Power/Session menu' },
      { keys: ['⌘', '+', 'Q'], action: 'Exit a window' },
      { keys: ['Ctrl', '⌘', '+', 'T'], action: 'Change wallpaper+colorscheme' },
    ],
    appeartick: 2
  },
  {
    icon: '',
    name: 'Utilities',
    binds: [
      { keys: ['PrtSc'], action: 'Screenshot  >>  clipboard' },
      { keys: ['⌘', 'Shift', '+', 'S'], action: 'Screen snip  >>  clipboard' },
      { keys: ['⌘', 'Shift', '+', 'T'], action: 'Image to text  >>  clipboard' },
      { keys: ['⌘', 'Shift', '+', 'C'], action: 'Color picker' },
      { keys: ['⌘', 'Alt', '+', 'R'], action: 'Record region' },
      { keys: ['Ctrl', 'Alt', '+', 'R'], action: 'Record region with sound' },
      { keys: ['⌘', 'Shift', 'Alt', '+', 'R'], action: 'Record screen with sound' }
    ],
    appeartick: 2
  },
]

// COLUMN3
const column3 = [
  {
    icon: '󱓞',
    name: 'Apps',
    binds: [
      { keys: ['⌘', '+', 'Return'], action: 'Launch terminal: Foot' },
      { keys: ['⌘', '+', 'B'], action: 'Launch browser: Firefox' },
      { keys: ['⌘', '+', 'E'], action: 'Launch file manager: yazi' },
      { keys: ['⌘', '+', 'X'], action: 'Launch editor: GNOME Text Editor' },
      { keys: ['⌘', '+', 'I'], action: 'Launch settings: GNOME Control center' }
    ],
    appeartick: 3
  },
  {
    icon: '󰥻',
    name: 'Typing',
    binds: [
      { keys: ['⌘', '+', 'V'], action: 'Clipboard history  >>  clipboard' },
      { keys: ['⌘', '+', '.'], action: 'Emoji picker  >>  clipboard' },
    ],
    appeartick: 3
  },
  {
    icon: '',
    name: 'Launcher actions',
    binds: [
      { keys: ['>raw'], action: 'Toggle mouse acceleration' },
      { keys: ['>img'], action: 'Select wallpaper and generate colorscheme' },
      { keys: ['>light'], action: 'Switch to light theme' },
      { keys: ['>dark'], action: 'Switch to dark theme' },
      { keys: ['>badapple'], action: 'Apply black & white colorscheme' },
      { keys: ['>color'], action: 'Pick acccent color' },
      { keys: ['>todo'], action: 'Type something after that to add a To-do item' },
    ],
    appeartick: 3
  }
]

export default [column1, column2, column3]