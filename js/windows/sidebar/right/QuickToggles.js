import { Widget, Utils, Bluetooth, Network, Hyprland } from '../../../imports.js'
import { BluetoothIndicator, NetworkIndicator } from '../../../misc/StatusIcons.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const expandTilde = path =>
  path.startsWith('~') ? imports.gi.GLib.get_home_dir() + path.slice(1) : path

export const ToggleIconWifi = (props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Wifi | Right-click to configure',
  onClicked: Network.toggleWifi,
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi', '&'])
    App.closeWindow('sideright')
  },
  child: NetworkIndicator(),
  connections: [
    [Network, button => {
      button.toggleClassName('sidebar-button-active', [Network.wifi?.internet, Network.wired?.internet].includes('connected'))
    }],
    [Network, button => {
      button.tooltipText = (`${Network.wifi?.ssid} | Right-click to configure` || 'Unknown');
    }],
  ],
  setup: setupCursorHover,
  ...props,
})

export const ToggleIconBluetooth = (props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Bluetooth | Right-click to configure',
  onClicked: () => {
    Utils.exec(`rfkill ${Bluetooth?.enabled ? 'block' : 'unblock'} bluetooth`)
  },
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'blueberry &'])
    App.closeWindow('sideright')
  },
  child: BluetoothIndicator(),
  connections: [[Bluetooth, button =>
    button.toggleClassName('sidebar-button-active', Bluetooth?.enabled)
  ]],
  setup: setupCursorHover,
  ...props,
});

export const HyprToggleIcon = (icon, name, hyprlandConfigValue, props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: `${name}`,
  onClicked: button => {
    Utils.execAsync(`hyprctl -j getoption ${hyprlandConfigValue}`).then(result => {
      const currentOption = JSON.parse(result).int
      Utils.execAsync(['bash', '-c', `hyprctl keyword ${hyprlandConfigValue} ${1 - currentOption} &`]).catch(print)
      button.toggleClassName('sidebar-button-active', currentOption == 0)
    }).catch(print)
  },
  child: Widget.Label({ label: icon, className: 'txt-norm', hpack: 'center' }),
  setup: button => {
    button.toggleClassName('sidebar-button-active', JSON.parse(Utils.exec(`hyprctl -j getoption ${hyprlandConfigValue}`)).int == 1)
    setupCursorHover(button)
  },
  ...props,
})

export const ModuleNightLight = (props = {}) => Widget.Button({
  properties: [['enabled', false], ['yellowlight', undefined]],
  tooltipText: 'Night Light',
  className: 'txt-small sidebar-iconbutton',
  onClicked: self => {
    self._enabled = !self._enabled;
    self.toggleClassName('sidebar-button-active', self._enabled);
    Utils.execAsync(self._enabled ? 'wlsunset' : 'pkill wlsunset')
  },
  child: Widget.Label({ label: '󱩌', className: 'txt-norm' }),
  setup: self => {
    setupCursorHover(self)
    self._enabled = !!Utils.exec('pidof wlsunset')
    self.toggleClassName('sidebar-button-active', self._enabled)
  },
  ...props,
});

export const ModuleInvertColors = (props = {}) => Widget.Button({
  tooltipText: 'Color inversion',
  className: 'txt-small sidebar-iconbutton',
  onClicked: button => {
    Hyprland.sendMessage('j/getoption decoration:screen_shader').then(output => {
      const shaderPath = JSON.parse(output)['str'].trim()
      if (shaderPath != "[[EMPTY]]" && shaderPath != "") {
        Utils.execAsync(['bash', '-c', `hyprctl keyword decoration:screen_shader '[[EMPTY]]'`]).catch(print);
        button.toggleClassName('sidebar-button-active', false);
      }
      else {
        Hyprland.sendMessage(
          `j/keyword decoration:screen_shader ${expandTilde('~/.config/hypr/shaders/invert.frag')}`
        ).catch(print);
        button.toggleClassName('sidebar-button-active', true)
      }
    })
  },
  child: Widget.Label({ label: '󰌁', className: 'txt-norm' }),
  setup: setupCursorHover,
  ...props,
})

export const ModuleIdleInhibitor = (props = {}) => Widget.Button({ // TODO: Make this work
  properties: [['enabled', false], ['inhibitor', undefined]],
  tooltipText: 'Keep system awake',
  className: 'txt-small sidebar-iconbutton',
  onClicked: self => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    if (self._enabled) {
      self._inhibitor = Utils.subprocess(
        ['wayland-idle-inhibitor.py'],
        output => print(output),
        err => logError(err),
        self,
      )
    }
    else self._inhibitor.force_exit()
  },
  child: Widget.Label({ label: '', className: 'txt-norm' }),
  setup: setupCursorHover,
  ...props,
});

export const ModuleEditIcon = (props = {}) => Widget.Button({
  ...props,
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
  child: Widget.Label({ label: 'edit', className: 'txt-norm' }),
  setup: button => setupCursorHover(button)
})

export const ModuleReloadIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Reload Hyprland',
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'hyprctl reload &'])
    App.toggleWindow('sideright')
  },
  child: Widget.Label({ label: '󰑐', className: 'norm' }),
  setup: btn => setupCursorHover(btn)
})

export const ModuleSettingsIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Open Settings',
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
  child: Widget.Label({ label: '', className: 'txt-norm' }),
  setup: btn => setupCursorHover(btn)
})

export const ModulePowerIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Session',
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    App.toggleWindow('session')
    App.closeWindow('sideright')
  },
  setup: btn => setupCursorHover(btn),
  child: Widget.Label({ label: '', className: 'txt-norm' }),
})
