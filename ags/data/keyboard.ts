export default {
  qwerty_full: {
    name_short: 'US',
    name: 'QWERTY - Full',
    comment: 'Like physical keyboard',
    keys: [
      [
        { type: 'normal', label: 'Esc', shape: 'fn', code: 1 },
        { type: 'normal', label: 'F1', shape: 'fn', code: 59 },
        { type: 'normal', label: 'F2', shape: 'fn', code: 60 },
        { type: 'normal', label: 'F3', shape: 'fn', code: 61 },
        { type: 'normal', label: 'F4', shape: 'fn', code: 62 },
        { type: 'normal', label: 'F5', shape: 'fn', code: 63 },
        { type: 'normal', label: 'F6', shape: 'fn', code: 64 },
        { type: 'normal', label: 'F7', shape: 'fn', code: 65 },
        { type: 'normal', label: 'F8', shape: 'fn', code: 66 },
        { type: 'normal', label: 'F9', shape: 'fn', code: 67 },
        { type: 'normal', label: 'F10', shape: 'fn', code: 68 },
        { type: 'normal', label: 'F11', shape: 'fn', code: 87 },
        { type: 'normal', label: 'F12', shape: 'fn', code: 88 },
        { type: 'normal', label: 'PrtSc', shape: 'fn', code: 99 },
        { type: 'normal', label: 'Del', shape: 'fn', code: 111 }
      ],
      [
        { type: 'normal', label: '`', labelShift: '~', shape: 'normal', code: 41 },
        { type: 'normal', label: '1', labelShift: '!', shape: 'normal', code: 2 },
        { type: 'normal', label: '2', labelShift: '@', shape: 'normal', code: 3 },
        { type: 'normal', label: '3', labelShift: '#', shape: 'normal', code: 4 },
        { type: 'normal', label: '4', labelShift: '$', shape: 'normal', code: 5 },
        { type: 'normal', label: '5', labelShift: '%', shape: 'normal', code: 6 },
        { type: 'normal', label: '6', labelShift: '^', shape: 'normal', code: 7 },
        { type: 'normal', label: '7', labelShift: '&', shape: 'normal', code: 8 },
        { type: 'normal', label: '8', labelShift: '*', shape: 'normal', code: 9 },
        { type: 'normal', label: '9', labelShift: '(', shape: 'normal', code: 10 },
        { type: 'normal', label: '0', labelShift: ')', shape: 'normal', code: 11 },
        { type: 'normal', label: '-', labelShift: '_', shape: 'normal', code: 12 },
        { type: 'normal', label: '=', labelShift: '+', shape: 'normal', code: 13 },
        { type: 'normal', label: 'Backspace', shape: 'expand', code: 14 }
      ],
      [
        { type: 'normal', label: 'Tab', shape: 'tab', code: 15 },
        { type: 'normal', label: 'q', labelShift: 'Q', shape: 'normal', code: 16 },
        { type: 'normal', label: 'w', labelShift: 'W', shape: 'normal', code: 17 },
        { type: 'normal', label: 'e', labelShift: 'E', shape: 'normal', code: 18 },
        { type: 'normal', label: 'r', labelShift: 'R', shape: 'normal', code: 19 },
        { type: 'normal', label: 't', labelShift: 'T', shape: 'normal', code: 20 },
        { type: 'normal', label: 'y', labelShift: 'Y', shape: 'normal', code: 21 },
        { type: 'normal', label: 'u', labelShift: 'U', shape: 'normal', code: 22 },
        { type: 'normal', label: 'i', labelShift: 'I', shape: 'normal', code: 23 },
        { type: 'normal', label: 'o', labelShift: 'O', shape: 'normal', code: 24 },
        { type: 'normal', label: 'p', labelShift: 'P', shape: 'normal', code: 25 },
        { type: 'normal', label: '[', labelShift: '{', shape: 'normal', code: 26 },
        { type: 'normal', label: ']', labelShift: '}', shape: 'normal', code: 27 },
        { type: 'normal', label: '\\', labelShift: '|', shape: 'expand', code: 43 }
      ],
      [
        { type: 'spacer', label: '', shape: 'empty' },
        { type: 'spacer', label: '', shape: 'empty' },
        { type: 'normal', label: 'a', labelShift: 'A', shape: 'normal', code: 30 },
        { type: 'normal', label: 's', labelShift: 'S', shape: 'normal', code: 31 },
        { type: 'normal', label: 'd', labelShift: 'D', shape: 'normal', code: 32 },
        { type: 'normal', label: 'f', labelShift: 'F', shape: 'normal', code: 33 },
        { type: 'normal', label: 'g', labelShift: 'G', shape: 'normal', code: 34 },
        { type: 'normal', label: 'h', labelShift: 'H', shape: 'normal', code: 35 },
        { type: 'normal', label: 'j', labelShift: 'J', shape: 'normal', code: 36 },
        { type: 'normal', label: 'k', labelShift: 'K', shape: 'normal', code: 37 },
        { type: 'normal', label: 'l', labelShift: 'L', shape: 'normal', code: 38 },
        { type: 'normal', label: ';', labelShift: ':', shape: 'normal', code: 39 },
        { type: 'normal', label: "'", labelShift: '"', shape: 'normal', code: 40 },
        { type: 'normal', label: 'Enter', shape: 'expand', code: 28 }
      ],
      [
        { type: 'modkey', label: 'Shift', labelShift: 'Shift ⇧', labelCaps: 'Locked ⇩', shape: 'shift', code: 42 },
        { type: 'normal', label: 'z', labelShift: 'Z', shape: 'normal', code: 44 },
        { type: 'normal', label: 'x', labelShift: 'X', shape: 'normal', code: 45 },
        { type: 'normal', label: 'c', labelShift: 'C', shape: 'normal', code: 46 },
        { type: 'normal', label: 'v', labelShift: 'V', shape: 'normal', code: 47 },
        { type: 'normal', label: 'b', labelShift: 'B', shape: 'normal', code: 48 },
        { type: 'normal', label: 'n', labelShift: 'N', shape: 'normal', code: 49 },
        { type: 'normal', label: 'm', labelShift: 'M', shape: 'normal', code: 50 },
        { type: 'normal', label: ',', labelShift: '<', shape: 'normal', code: 51 },
        { type: 'normal', label: '.', labelShift: '>', shape: 'normal', code: 52 },
        { type: 'normal', label: '/', labelShift: '?', shape: 'normal', code: 53 },
        { type: 'modkey', label: 'Shift', labelShift: 'Shift ⇧', labelCaps: 'Locked ⇩', shape: 'expand', code: 54 } // optional
      ],
      [
        { type: 'modkey', label: 'Ctrl', shape: 'control', code: 29 },
        { type: 'modkey', label: 'Alt', shape: 'normal', code: 56 },
        { type: 'normal', label: 'Space', shape: 'space', code: 57 },
        { type: 'modkey', label: 'Alt', shape: 'normal', code: 100 },
        { type: 'normal', label: 'Menu', shape: 'normal', code: 139 },
        { type: 'modkey', label: 'Ctrl', shape: 'control', code: 97 }
      ]
    ]
  },
  qwertz_full: {
    name: 'QWERTZ - Full',
    name_short: 'DE',
    comment: 'Keyboard layout commonly used in German-speaking countries',
    keys: [
      [
        { type: 'normal', label: 'Esc', shape: 'fn', code: 1 },
        { type: 'normal', label: 'F1', shape: 'fn', code: 59 },
        { type: 'normal', label: 'F2', shape: 'fn', code: 60 },
        { type: 'normal', label: 'F3', shape: 'fn', code: 61 },
        { type: 'normal', label: 'F4', shape: 'fn', code: 62 },
        { type: 'normal', label: 'F5', shape: 'fn', code: 63 },
        { type: 'normal', label: 'F6', shape: 'fn', code: 64 },
        { type: 'normal', label: 'F7', shape: 'fn', code: 65 },
        { type: 'normal', label: 'F8', shape: 'fn', code: 66 },
        { type: 'normal', label: 'F9', shape: 'fn', code: 67 },
        { type: 'normal', label: 'F10', shape: 'fn', code: 68 },
        { type: 'normal', label: 'F11', shape: 'fn', code: 87 },
        { type: 'normal', label: 'F12', shape: 'fn', code: 88 },
        { type: 'normal', label: 'Druck', shape: 'fn', code: 99 },
        { type: 'normal', label: 'Entf', shape: 'fn', code: 111 }
      ],
      [
        { type: 'normal', label: '^', labelShift: '°', labelAlt: '′', shape: 'normal', code: 41 },
        { type: 'normal', label: '1', labelShift: '!', labelAlt: '¹', shape: 'normal', code: 2 },
        { type: 'normal', label: '2', labelShift: '"', labelAlt: '²', shape: 'normal', code: 3 },
        { type: 'normal', label: '3', labelShift: '§', labelAlt: '³', shape: 'normal', code: 4 },
        { type: 'normal', label: '4', labelShift: '$', labelAlt: '¼', shape: 'normal', code: 5 },
        { type: 'normal', label: '5', labelShift: '%', labelAlt: '½', shape: 'normal', code: 6 },
        { type: 'normal', label: '6', labelShift: '&', labelAlt: '¬', shape: 'normal', code: 7 },
        { type: 'normal', label: '7', labelShift: '/', labelAlt: '{', shape: 'normal', code: 8 },
        { type: 'normal', label: '8', labelShift: '(', labelAlt: '[', shape: 'normal', code: 9 },
        { type: 'normal', label: '9', labelShift: ')', labelAlt: ']', shape: 'normal', code: 10 },
        { type: 'normal', label: '0', labelShift: '=', labelAlt: '}', shape: 'normal', code: 11 },
        { type: 'normal', label: 'ß', labelShift: '?', labelAlt: '\\', shape: 'normal', code: 12 },
        { type: 'normal', label: '´', labelShift: '`', labelAlt: '¸', shape: 'normal', code: 13 },
        { type: 'normal', label: '⟵', shape: 'expand', code: 14 }
      ],
      [
        { type: 'normal', label: 'Tab ⇆', shape: 'tab', code: 15 },
        { type: 'normal', label: 'q', labelShift: 'Q', labelAlt: '@', shape: 'normal', code: 16 },
        { type: 'normal', label: 'w', labelShift: 'W', labelAlt: 'ſ', shape: 'normal', code: 17 },
        { type: 'normal', label: 'e', labelShift: 'E', labelAlt: '€', shape: 'normal', code: 18 },
        { type: 'normal', label: 'r', labelShift: 'R', labelAlt: '¶', shape: 'normal', code: 19 },
        { type: 'normal', label: 't', labelShift: 'T', labelAlt: 'ŧ', shape: 'normal', code: 20 },
        { type: 'normal', label: 'z', labelShift: 'Z', labelAlt: '←', shape: 'normal', code: 21 },
        { type: 'normal', label: 'u', labelShift: 'U', labelAlt: '↓', shape: 'normal', code: 22 },
        { type: 'normal', label: 'i', labelShift: 'I', labelAlt: '→', shape: 'normal', code: 23 },
        { type: 'normal', label: 'o', labelShift: 'O', labelAlt: 'ø', shape: 'normal', code: 24 },
        { type: 'normal', label: 'p', labelShift: 'P', labelAlt: 'þ', shape: 'normal', code: 25 },
        { type: 'normal', label: 'ü', labelShift: 'Ü', labelAlt: '¨', shape: 'normal', code: 26 },
        { type: 'normal', label: '+', labelShift: '*', labelAlt: '~', shape: 'normal', code: 27 },
        { type: 'normal', label: '↵', shape: 'expand', code: 28 }
      ],
      [
        { type: 'spacer', label: '', shape: 'empty' },
        { type: 'spacer', label: '', shape: 'empty' },
        { type: 'normal', label: 'a', labelShift: 'A', labelAlt: 'æ', shape: 'normal', code: 30 },
        { type: 'normal', label: 's', labelShift: 'S', labelAlt: 'ſ', shape: 'normal', code: 31 },
        { type: 'normal', label: 'd', labelShift: 'D', labelAlt: 'ð', shape: 'normal', code: 32 },
        { type: 'normal', label: 'f', labelShift: 'F', labelAlt: 'đ', shape: 'normal', code: 33 },
        { type: 'normal', label: 'g', labelShift: 'G', labelAlt: 'ŋ', shape: 'normal', code: 34 },
        { type: 'normal', label: 'h', labelShift: 'H', labelAlt: 'ħ', shape: 'normal', code: 35 },
        { type: 'normal', label: 'j', labelShift: 'J', labelAlt: '', shape: 'normal', code: 36 },
        { type: 'normal', label: 'k', labelShift: 'K', labelAlt: 'ĸ', shape: 'normal', code: 37 },
        { type: 'normal', label: 'l', labelShift: 'L', labelAlt: 'ł', shape: 'normal', code: 38 },
        { type: 'normal', label: 'ö', labelShift: 'Ö', labelAlt: '˝', shape: 'normal', code: 39 },
        { type: 'normal', label: 'ä', labelShift: 'Ä', labelAlt: '^', shape: 'normal', code: 40 },
        { type: 'normal', label: '#', labelShift: "'", labelAlt: '’', shape: 'normal', code: 43 },
        { type: 'spacer', label: '', shape: 'empty' },
      ],
      [
        { type: 'modkey', label: 'Shift', labelShift: 'Shift ⇧', labelCaps: 'Locked ⇩', shape: 'shift', code: 42 },
        { type: 'normal', label: '<', labelShift: '>', labelAlt: '|', shape: 'normal', code: 86 },
        { type: 'normal', label: 'y', labelShift: 'Y', labelAlt: '»', shape: 'normal', code: 44 },
        { type: 'normal', label: 'x', labelShift: 'X', labelAlt: '«', shape: 'normal', code: 45 },
        { type: 'normal', label: 'c', labelShift: 'C', labelAlt: '¢', shape: 'normal', code: 46 },
        { type: 'normal', label: 'v', labelShift: 'V', labelAlt: '„', shape: 'normal', code: 47 },
        { type: 'normal', label: 'b', labelShift: 'B', labelAlt: '“', shape: 'normal', code: 48 },
        { type: 'normal', label: 'n', labelShift: 'N', labelAlt: '”', shape: 'normal', code: 49 },
        { type: 'normal', label: 'm', labelShift: 'M', labelAlt: 'µ', shape: 'normal', code: 50 },
        { type: 'normal', label: ',', labelShift: ';', labelAlt: '·', shape: 'normal', code: 51 },
        { type: 'normal', label: '.', labelShift: ':', labelAlt: '…', shape: 'normal', code: 52 },
        { type: 'normal', label: '-', labelShift: '_', labelAlt: '–', shape: 'normal', code: 53 },
        { type: 'modkey', label: 'Shift', labelShift: 'Shift ⇧', labelCaps: 'Locked ⇩', shape: 'expand', code: 54 }, // optional
      ],
      [
        { type: 'modkey', label: 'Strg', shape: 'control', code: 29 },
        { type: 'modkey', label: 'Alt', shape: 'normal', code: 56 },
        { type: 'normal', label: 'Leertaste', shape: 'space', code: 57 },
        { type: 'modkey', label: 'Alt Gr', shape: 'normal', code: 100 },
        { type: 'modkey', label: 'Strg', shape: 'control', code: 97 },
        { type: 'normal', label: '⇦', shape: 'normal', code: 105 },
        { type: 'normal', label: '⇨', shape: 'normal', code: 106 },
      ]
    ]
  }
}