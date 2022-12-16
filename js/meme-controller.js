'use strict'

var gElCanvas
var gCtx

function onInit() {
    initService()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function onToggleMenu(){
    document.body.classList.toggle('menu-open')
}
function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgUrl()
    img.onload = () => {
        renderImg(img)
        renderTexts(meme.lines)  ///why doesnt work with one
    }
    // renderTexts(meme.lines) //why doesnt work with one
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTexts(lines) {
    lines.forEach(line => {
        drawText(line)
    })
}

function resizeCanvas() {  //not sure about this func
    const elContainer = document.querySelector('.editor')
    gElCanvas.height = gElCanvas.width = elContainer.offsetWidth / 2 - 50
    // gElCanvas.height = gElCanvas.width = elContainer.offsetWidth / 2 - 20
    renderMeme()
}

function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    const line = setLineTxt(txt)
    renderMeme()

}

function drawText(line) {
    const { txt, size, align, color, id, font, stroke } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    const { x, y } = getPos(id, align)
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

}


function onSwitchLine() {
    document.querySelector('input[name="text"]').value = switchLine()
}

function getPos(lineId, align) {
    var diff = 40
    var pos = { x: diff, y: diff }
    switch (align) {
        case 'right':
            pos.x = gElCanvas.width - diff
            break
        case 'center':
            pos.x = gElCanvas.width / 2
            break
    }
    switch (getLineIdxById(lineId)) {
        case 1:
            pos.y = gElCanvas.height - diff
            break
        case 2:
            pos.y = gElCanvas.height / 2
            break
    }

    return pos
}

function onNewLine() {
    document.querySelector('input[name="text"]').value = ''
    newLine()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetSize(diff) {
    setSize(diff)
    renderMeme()
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onSetFont(fontStyle) {
    console.log(fontStyle)
    setFont(fontStyle)
    renderMeme()
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

