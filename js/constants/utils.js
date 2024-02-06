import cairo from 'cairo'
import icons from './data/icons.js'

export const range = (length, start = 1) => 
  Array.from({ length }, (_, i) => i + start)

export const substitute = (collection, item) => 
  collection.find(([from]) => from === item)?.[1] || item

/** @type {function((id: number) => typeof Gtk.Widget): typeof Gtk.Widget[]}*/
export function forMonitors(widget) {
  const n = imports.gi.Gdk.Display.get_default().get_n_monitors()
  return range(n, 0).map(widget)
}

export const createSurfaceFromWidget = widget => {
  const alloc = widget.get_allocation()
  const surface = new cairo.ImageSurface(
    cairo.Format.ARGB32,
    alloc.width,
    alloc.height,
  )
  const cr = new cairo.Context(surface)
  cr.setSourceRGBA(255, 255, 255, 0)
  cr.rectangle(0, 0, alloc.width, alloc.height)
  cr.fill()
  widget.draw(cr)

  return surface
}


export function getAudioTypeIcon(icon) {
  const icons = icons.audio.type
  const substitues = [
    ['audio-headset-bluetooth', icons.headset],
    ['audio-card-analog-usb', icons.speaker],
    ['audio-card-analog-pci', icons.card],
  ]

  return substitute(substitues, icon)
}

export function dependencies(bins) {
  const deps = bins.map(bin => {
    const has = Utils.exec(`which ${bin}`)
    if (!has) print(`missing dependency: ${bin}`)

    return !!has
  })

  return deps.every(has => has)
}

export function blurImg(img) {
  const { GLib } = imports.gi
  const cache = Utils.CACHE_DIR + '/media'
  return new Promise(resolve => {
    if (!img) resolve('')

    const dir = cache + '/blurred'
    const blurred = dir + img.substring(cache.length)

    if (GLib.file_test(blurred, GLib.FileTest.EXISTS))
      return resolve(blurred)

    Utils.ensureDirectory(dir)
    Utils.execAsync(
      [ 'convert', img, '-blur', '0x22', blurred ]
    ).then(() => resolve(blurred)).catch(() => resolve(''))
  })
}

export const execBash = cmd => Utils.execAsync(['bash', '-c', cmd])

export function Screen() {
  this.cmd = arg => Number(Utils.exec(`bash -c "xrandr --current | grep '*' | uniq | awk '{print $1}' | cut -d 'x' -f${arg.toString()} | head -1" | awk '{print $1}'`))
  this.width = () => this.cmd(1)
  this.height = () => this.cmd(2)
}
