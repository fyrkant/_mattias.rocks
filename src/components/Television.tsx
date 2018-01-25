import * as React from 'react'

const isCanvas = (element?: Element): element is HTMLCanvasElement =>
  typeof element !== 'undefined' && element.nodeName.toLowerCase() === 'canvas'

export class Television extends React.Component<any, any> {
  private canvas: Element | undefined
  private canCtx: CanvasRenderingContext2D | null
  private time: number = 0
  private interval: NodeJS.Timer

  public componentDidMount() {
    if (isCanvas(this.canvas)) {
      this.canCtx = this.canvas.getContext('2d')
      this.interval = setInterval(() => this.makeNoise(), 50)
    }
  }

  public makeNoise() { // thank u https://stackoverflow.com/a/23572465
    if (this.context && isCanvas(this.canvas)) {
      this.canvas.setAttribute('width', (document.body.offsetWidth / 4).toString())
      this.canvas.setAttribute('height', (document.body.offsetHeight / 4).toString())
      if (this.canCtx) {
        const imgd = this.canCtx.createImageData(this.canvas.width, this.canvas.height)
        const pix = imgd.data

        for (let i = 0, n = pix.length; i < n; i += 4) {
          const c = 5 + Math.sin(i / 50000 + this.time / 7) // A sine wave of the form sin(ax + bt)
          pix[i] = pix[i + 1] = pix[i + 2] = 3 * Math.random() * c // Set a random gray
          pix[i + 3] = 255 // 100% opaque
        }

        this.canCtx.putImageData(imgd, 0, 0)
        this.time = (this.time + 1) % this.canvas.height
      }
    }
  }
  public render() {
    return (
      <canvas ref={canvas => this.canvas = canvas}></canvas>
    )
  }

  public componentWillUnmount() {
    clearInterval(this.interval)
  }
}
