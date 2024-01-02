import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'

import Footer from './footer/main.js'
import Header from './header/main.js'
import StackContent from './stack/main.js'

const Sidebar = Widget.Box({
  vexpand: true,
  hexpand: true,
  children: [
    Widget.Box({
      vexpand: true,
      vertical: true,
      className: 'sidebar-right',
      children: [
        Widget.Box({
          vertical: true,
          children: [ 
            Header, 
            StackContent() 
          ]
        }),
        Footer,
      ]
    }),
  ]
})

export default PopupWindow({
  child: Sidebar,
  focusable: true,
  name: 'sideright',
  anchor: ['right', 'top', 'bottom'],
})