const canvas = document.querySelector('canvas')
isDrawing = false
brushWidth = 5

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
})

let ctx = canvas.getContext('2d')


const startDrawing = e => {
  isDrawing = true
  ctx.beginPath()
  ctx.lineWidth = brushWidth
}

const drawing = e => {
  if (!isDrawing) return
  ctx.lineTo(e.offsetX, e.offsetY)

  ctx.stroke()
}

const stopDrawing = e => {
  isDrawing = false
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDrawing)