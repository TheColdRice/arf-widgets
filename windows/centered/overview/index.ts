import CenteredWindow from '../CenteredWindow'
import Workspace from './Workspace'
import options from 'options'
import { range } from 'lib/utils'

const hyprland = await Service.import('hyprland')

const Overview = (ws: number) => Widget.Box({
  className: 'overview horizontal',
  children: ws > 0
    ? range(ws).map(Workspace)
    : hyprland.workspaces
      .map(({ id }) => Workspace(id))
      .sort((a, b) => a.attribute.id - b.attribute.id),

  setup: w => {
    if (ws > 0) return

    w.hook(hyprland, (w, id?: number) => {
      if (id === undefined) return

      w.children = w.children.filter(ch => ch.attribute.id !== Number(id))
    }, 'workspace-removed')
    w.hook(hyprland, (w, id?: number) => {
      if (id === undefined) return

      w.children = [...w.children, Workspace(Number(id))]
        .sort((a, b) => a.attribute.id - b.attribute.id)
    }, 'workspace-added')
  },
})

export default CenteredWindow({
  name: 'overview',
  child: options.overview.workspaces.bind().as(Overview),
})