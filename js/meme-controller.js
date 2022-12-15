'use strict'

var gElCanvas
var gCtx

function onInit() {
    initService()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}
function renderMeme() {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgUrl()
    img.onload = () => {
        renderImg(img)
        renderTexts(meme.lines)  ///why doesnt work with one
    }
    renderTexts(meme.lines) //why doesnt work with one
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTexts(lines) {
    lines.forEach(line => {
        drawText(line)
    })
}

function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    const line = setLineTxt(txt)
    renderMeme()

}

// function renderText(line) {
//     const { txt, size, align, color, id } = line
//     gCtx.font = `${size}px serif`
//     const { x, y } = getPos(id)
//     gCtx.fillText(txt, x, y)
//     // gCtx.fillText(txt, 10, 50)
//     gCtx.fillStyle = color
// }

function drawText(line) {
    const { txt, size, align, color, id } = line
    console.log(color)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'white'
    gCtx.fillStyle = color
    gCtx.font = `${size}px serif`
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'

    const { x, y } = getPos(id)
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    // gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    // gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetSize(diff) {
    setSize(diff)
    renderMeme()
}

function onSwitchLine() {
    document.querySelector('input[name="text"]').value = switchLine()
}

function getPos(lineId) {
    var pos = { x: 10, y: 10 }
    // console.log(getLineIdxById(lineId))
    if (getLineIdxById(lineId) === 1) pos.y = gElCanvas.height - 10
    return pos
}

function onNewLine() {
    document.querySelector('input[name="text"]').value = ''
    newLine()
}

function onDeleteLine(){
    deleteLine()
    renderMeme()
}

function onSetFont(fontStyle){
    console.log(fontStyle);
}