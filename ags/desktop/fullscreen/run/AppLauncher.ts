import { type Application } from 'types/service/applications'
import { launchApp, icon } from 'lib/utils'

import options from 'options'
import icons from 'data/icons'

const apps = await Service.import('applications')
const { query } = apps
const { iconSize, max: appsMax } = options.run.apps

function AppItem(app: Application) {
  const title = Widget.Label({
    xalign: 0,
    hexpand: true,
    vpack: 'center',
    truncate: 'end',
    label: app.name,
    className: 'title',
  })

  const description = Widget.Label({
    xalign: 0,
    wrap: true,
    hexpand: true,
    vpack: 'center',
    maxWidthChars: 30,
    justification: 'left',
    className: 'description',
    label: app.description || '',
  })

  const appicon = Widget.Icon(icon(app.icon_name, icons.fallback.executable)).bind('size', iconSize)

  const textBox = Widget.Box({
    vertical: true,
    vpack: 'center',
    children: app.description ? [title, description] : [title],
  })

  return Widget.Button({
    cursor: 'pointer',
    attribute: { app },
    className: 'app-item',
    onClicked() { App.closeWindow('run'); launchApp(app) },
  }, Widget.Box([appicon, textBox]))
}

export function Launcher() {
  const applist = Variable(query(''))
  let first = applist.value[0]

  const SeparatedAppItem = (app: Application) => Widget.Revealer(
    { attribute: { app } },
    Widget.Box({vertical: true}, Widget.Separator(), AppItem(app)),
  )

  const list = Widget.Box({
    vertical: true,
    children: applist.bind().as((list: Application[]) => list.map(SeparatedAppItem))
  }).hook(apps, () => applist.value = query(''), 'notify::frequents')

  return Object.assign(list, {
    filter(text: string | null) {
      first = query(text || '')[0]
      list.children.reduce((i: number, item: typeof Widget.Revealer) => {
        if (!text || i >= appsMax.value) {
          item.revealChild = false
          return i
        }
        if (item.attribute.app.match(text)) {
          item.revealChild = true
          return ++i
        }
        item.revealChild = false
        return i
      }, 0)
    },
    launchFirst() { launchApp(first) },
  })
}
