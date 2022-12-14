const canvas = document.querySelector('canvas'),
  toolBtns = document.querySelectorAll('.tool'),
  fillColor = document.querySelector('#fill-color')

let ctx = canvas.getContext('2d'),
  isDrawing = false,
  brushWidth = 5,
  selectedTool = 'brush',
  prevMouseX,
  prevMouseY,
  snapshot

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth
  canvas.height = canvas.offsetHeight
})


const startDrawing = e => {
  isDrawing = true
  prevMouseX = e.offsetX
  prevMouseY = e.offsetY
  ctx.beginPath()
  ctx.lineWidth = brushWidth
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
  console.log(snapshot);
}

const drawRectangle = e => {
  if (!fillColor.checked) {
    return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
  }

  ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawing = e => {
  if (!isDrawing) return
  ctx.putImageData(snapshot, 0, 0)
  switch (selectedTool) {
    case 'brush':
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
      break
    case 'rectangle':
      drawRectangle(e)
      break
    default:
      break;
  }

}

toolBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.options .active').classList.remove('active')
    btn.classList.add('active')
    selectedTool = btn.id
    console.log(`Selectedd tool ${selectedTool}`);
  })
})

const stopDrawing = e => {
  isDrawing = false
}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDrawing)