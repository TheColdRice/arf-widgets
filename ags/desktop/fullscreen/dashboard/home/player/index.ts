import { type ButtonProps } from 'types/widgets/button'

import { ButtonIcon, ButtonLabel } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { getPlayer } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const audio = await Service.import('audio')
const mpris = await Service.import('mpris')

const { coverSize } = options.dashboard.player

const Volume = Widget.Revealer({
  vpack: 'center',
  className: 'volume',
  transition: 'slide_right',
  transitionDuration: options.transition,
  child: audio.bind('apps').as(apps => {
    const spotify = apps.find(app => app.description.toLowerCase() === 'spotify')

    if (!spotify) return Widget.Box()

    return Widget.Box({ vertical: true },
      Widget.Slider({
        vertical: true,
        inverted: true,
        drawValue: false,
        value: spotify.bind('volume'),
        onChange({ value }) { spotify.volume = value },
      }),
      Widget.Label().bind('label', spotify, 'volume', (vol: number) => Math.floor(vol * 100)+'%')
    )
  })
})

const Cover = Widget.Overlay({
  className: 'cover',
  overlay: Widget.Button({
    hpack: 'end', vpack: 'start',
    onClicked() { Volume.revealChild = !Volume.revealChild }
  }, Widget.Icon(icons.audio.type.speaker)),
}, Widget.Box({
  attribute: { update(self) {
    const player = getPlayer()
    if (!player) return
    const url = player['cover-path'] || player['track-cover-url']
    self.setCss(`
      background-image: url('${url}');
      min-width: ${coverSize.value}px;
      min-height: ${coverSize.value}px;
    `)
  }}
})
  .hook(mpris, self => self.attribute.update(self))
  .hook(coverSize, self => self.attribute.update(self)))

const Controls = Widget.Box(
  {className: 'controls', hpack: 'center'},
  ButtonLabel('').hook(mpris, (self: ButtonProps) => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.shuffle
    self.toggleClassName('active', player['shuffle-status'])
  }),
  ButtonIcon(icons.mpris.prev).hook(mpris, (self: ButtonProps) => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.previous
  }),
  Widget.Button({cursor: 'pointer'}, Widget.Icon()).hook(mpris, (self: ButtonProps) => {
    const player = getPlayer()
    if (!player) return
    const status = player['play-back-status'].toLowerCase()
    self.child.icon = icons.mpris[status]
    self.onClicked = player.playPause
  }),
  ButtonIcon(icons.mpris.next).hook(mpris, (self: ButtonProps) => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.next
  }),
  Widget.Button({cursor: 'pointer'}).hook(mpris, (self: ButtonProps) => {
    const player = getPlayer()
    if (!player) return
    const status = player['loop-status']
    const isTrack = status === 'Track'
    const isPlaylist = status === 'Playlist'

    self.onClicked = player.loop
    self.label = isTrack ? '󰑘' : isPlaylist ? '󰕇' : '󰑗'
    self.toggleClassName('active', isTrack || isPlaylist)
  }),
)

export default Widget.EventBox({
  cursor: 'pointer',
  className: 'player',
  onPrimaryClick() { toggleWidget('player') },
}, Widget.Box([
  Widget.Box({vertical: true}, Cover, Controls), Volume
])).hook(mpris, self => self.visible = getPlayer())
