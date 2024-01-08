import { Utils, Widget } from '../imports.js'
import { setupCursorHover } from './CursorHover.js'

export const ConfigToggle = ({ icon, name, desc = '', initValue, onChange, ...rest }) => {
  let value = initValue
  const toggleIcon = Widget.Label({
    className: `icon-material txt-bold ${value ? '' : 'txt-poof'}`,
    label: `${value ? 'check' : ''}`,
  })
  const toggleButtonIndicator = Widget.Box({
    className: `switch-fg ${value ? 'switch-fg-true' : ''}`,
    vpack: 'center',
    hpack: 'start',
    homogeneous: true,
    children: [toggleIcon,],
  })
  const toggleButton = Widget.Box({
    hpack: 'end',
    className: `switch-bg ${value ? 'switch-bg-true' : ''}`,
    homogeneous: true,
    children: [toggleButtonIndicator,],
  })
  const widgetContent = Widget.Box({
    tooltipText: desc,
    className: 'txt spacing-h-5 configtoggle-box',
    children: [
      Widget.label({ label: icon, className: 'txt-norm' }),
      Widget.Label({ className: 'txt txt-small', label: name }),
      Widget.Box({ hexpand: true }),
      toggleButton,
    ]
  })
  const interactionWrapper = Widget.Button({
    properties: [
      ['toggle', () => {
        value = !value
        toggleIcon.toggleClassName('switch-fg-toggling-false', false)
        if (!value) {
          toggleIcon.label = ''
          toggleIcon.toggleClassName('txt-poof', true)
        }
        toggleButtonIndicator.toggleClassName('switch-fg-true', value)
        toggleButton.toggleClassName('switch-bg-true', value)
        if (value) Utils.timeout(1, () => {
          toggleIcon.label = 'check'
          toggleIcon.toggleClassName('txt-poof', false)
        })
        onChange(interactionWrapper, value)
      }]
    ],
    child: widgetContent,
    onClicked: (self) => self._toggle(self),
    setup: (button) => {
      setupCursorHover(button),
      button.connect('pressed', () => { // mouse down
        toggleIcon.toggleClassName('txt-poof', true)
        toggleIcon.toggleClassName('switch-fg-true', false)
        if (!value) toggleIcon.toggleClassName('switch-fg-toggling-false', true)
      })
    },
    ...rest,
  })
  return interactionWrapper
}

export const ConfigSegmentedSelection = ({
  desc = '',
  options = [{ name: 'Option 1', value: 0 }, { name: 'Option 2', value: 1 }],
  initIndex = 0,
  onChange,
  ...rest
}) => {
  let lastSelected = initIndex
  let value = options[initIndex].value
  const widget = Widget.Box({
    tooltipText: desc,
    className: 'segment-container',
    children: options.map((option, id) => {
      const selectedIcon = Widget.Revealer({
        transitionDuration: 150,
        transition: 'slide_right',
        revealChild: id == initIndex,
        child: Widget.Label({ label: 'check', className: 'txt-norm' })
      })
      return Widget.Button({
        setup: setupCursorHover,
        className: `segment-btn ${id == initIndex ? 'segment-btn-enabled' : ''}`,
        child: Widget.Box({
          hpack: 'center',
          className: 'spacing-h-5',
          children: [
            selectedIcon,
            Widget.Label({ label: option.name })
          ]
        }),
        onClicked: self => {
          value = option.value
          const kids = widget.get_children()
          kids[lastSelected].toggleClassName('segment-btn-enabled', false)
          kids[lastSelected].get_children()[0].get_children()[0].revealChild = false
          lastSelected = id
          self.toggleClassName('segment-btn-enabled', true)
          selectedIcon.revealChild = true
          onChange(option.value, option.name)
        }
      })
    }),
    ...rest,
  })
  return widget

}

export const ConfigGap = ({ vertical = true, size = 5, ...rest }) => Widget.Box({
  ...rest,
  className: `gap-${vertical ? 'v' : 'h'}-${size}`,
})
