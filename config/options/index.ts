import { create, opt } from 'lib/option'

import theme from './theme'
import chatbot from './chatbot'
import hyprland from './hyprland'
import statusbar from './statusbar'
import dashboard from './dashboard'
import workspaces from './workspaces'

export default create(OPTIONS, {
  ...theme,

  chatbot: { ...chatbot },
  hyprland: { ...hyprland },
  statusbar: { ...statusbar },
  dashboard: { ...dashboard },
  workspaces: { ...workspaces },
  tools: {
    recorder: {
      directory: opt(`${Utils.HOME}/Videos/Screen`)
    },
    screenshots: {
      directory: opt(`${Utils.HOME}/Fotos/Captura`)
    }
  },

  notifications: {
    blacklist: opt(['Spotify']),
  },

  run: {
    iconSize: opt(48),
    width: opt(0),
    margin: opt(40),
    maxItem: opt(5),
    apps: {
      max: opt(6),
      iconSize: opt(62),
    },
    execCmd: opt<null | string>(null),
  },

  lockscreen: {
    player: opt(true),
    quotes: opt(true),
    weather: opt(true),
    crypto: opt(true),
    system: opt(true),
  },

  powermenu: {
    sleep: opt('systemctl suspend'),
    reboot: opt('systemctl reboot'),
    logout: opt('pkill Hyprland'),
    shutdown: opt('shutdown now'),
  },
})
