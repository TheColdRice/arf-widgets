import { opt } from 'variables/option'

export type BindType = {
  key: string,
  exec: string
}

export default {
  customBinds: opt<BindType[]>([
    { key: 'SUPER, Return', exec: 'foot' },
    { key: 'SUPER, B', exec: 'qutebrowser' },
  ]),

  widget: {
    run: opt('SUPER, R'),
    overview: opt('SUPER, Tab'),
    dashboard: opt('Super, Space'),
    cheatsheet: opt('SUPER, Slash'),
  },

  popup: {
    ask: opt('SUPER, A'),
    player: opt('SUPER, P'),
    calendar: opt('SUPER, C'),
    capture: opt('SUPER_CTRL, C'),
    keyboard: opt('SUPER, k'),
  }
}
