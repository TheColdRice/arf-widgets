import screenTools from 'service/screen'
import brightness from 'service/brightness'

import { CircularProgressIcon } from 'widgets'
import ContentRevealer, { type StackChildType } from './ContentRevealer'

import icons from 'data/icons'
import options from 'options'
import { capitalize } from 'lib/utils'

const { indicator } = options.statusbar
let revealCount = 0

type indicatorType =
| 'zoom'
| 'pomodoro'
| 'recorder'
| 'playing'
| 'volume'
| 'brightness'

const isRevealed = Variable<boolean>(false)
const currentStackChildName = Variable<indicatorType>('volume') // Initial value doesn't really matter bc it's hidden
const contentRevealer = ContentRevealer(isRevealed, currentStackChildName)

const audio = await Service.import('audio')
const mpris = await Service.import('mpris')
const getPlayer = (player: string) => mpris.getPlayer(player) || null
function showStyle(show: boolean) {
  if (options.statusbar.style.value === 'separated')
    contentRevealer.toggleClassName('show-style', show)
}

function update() {
  showStyle(true)
  const player = getPlayer(indicator.preferredPlayer.value)

  revealCount++
  Utils.timeout(indicator.timeoutDuration.value, () => {
    // to not hide immediately
    revealCount--
    if (revealCount !== 0) return

    // Prioritization order: Zoom, Pomodoro, Recorder, Player
    isRevealed.value = true
    if (screenTools.isZoomed) currentStackChildName.value = 'zoom'
    else if (screenTools.isRecording) currentStackChildName.value = 'recorder'
    else if (player) currentStackChildName.value = 'playing'
    else {
      isRevealed.value = false
      Utils.timeout(indicator.timeoutDuration.value - 100, () => showStyle(false))
    }
  })
}

function indicatorUpdate(type: StackChildType, value: number) {
  const stackChild = contentRevealer.child.child.children[type]
  const volumeLimit = type === 'volume' && value > 1
  const icon =
    type === 'volume'
      ? icons.audio.type.speaker
      : type === 'brightness'
        ? icons.brightness.indicator
        : icons.audio.mic.high

  stackChild.children = [
    CircularProgressIcon({
      child: icon,
      value: value < 1 ? value : 1,
      className: `progress ${volumeLimit && 'error'}`,
    }, icon),
    Widget.Label(`${capitalize(type)}: ${Math.round(value * 100)}%`),
  ]

  currentStackChildName.value = type
  isRevealed.value = true
  update()
}

export default contentRevealer
  .hook(mpris, update)
  .hook(screenTools, update)
  .hook(audio.microphone, () => {}) // TODO:
  //.hook(brightness, () => indicatorUpdate('brightness', brightness.kbd), 'notify::kbd')
  .hook(
    brightness,
    () => indicatorUpdate('brightness', brightness.screen),
    'notify::screen',
  )
  .hook(
    audio.speaker,
    () => indicatorUpdate('volume', audio.speaker.volume),
    'notify::volume',
  )