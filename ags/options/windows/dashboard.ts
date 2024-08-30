import { opt } from 'lib/option'

export default {
  tasksDirectory: opt(''),
  githubUser: opt('TheRiceCold'),
  photo: opt(`/home/${Utils.USER}/photo-sample.jpg`),
  bio: opt('~ What we do in life, echoes in eternity ~'),
  player: {
    length: opt(32),
    coverSize: opt(200),
  },

  apps: opt([
    [
      'firefox', 'spotify',
      { label: 'discord', icon: 'discord', name: 'vesktop' },
      { label: 'chrome', name: 'google-chrome-stable' },
      'obs',
    ],

    [
      'zed', 'neovide', 'insomnia',
      { label: 'godot', name: 'godot4' },
      { label: 'Android Studio', name: 'android-studio' },
    ],

    [
      'krita', 'gimp', 'blender', 'inkscape',
      { label: 'Libre Sprite', name: 'libresprite' }
    ],

    [
      { label: 'shell', name: 'foot' },
      { label: 'files', name: 'nautilus' },
      { label: 'calc', name: 'gnome-calculator' },
      { label: 'Virtual Machine Manager', name: 'virt-manager' },
    ]
  ]),
}
