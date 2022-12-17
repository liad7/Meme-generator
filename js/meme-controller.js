'use strict'


const gMarkclr = '#7877778d'

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


function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function closeMenu() {
    document.body.classList.remove('menu-open')
}

function renderMeme(isMark) {
    const meme = getMeme()
    const img = new Image()
    img.src = getImgUrl()
    img.onload = () => {
        renderImg(img)
        if (isMark) markSelctedLine(meme, gMarkclr)
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
    const size = elContainer.offsetWidth > elContainer.offsetHeight ? elContainer.offsetWidth : elContainer.offsetHeight
    gElCanvas.height = gElCanvas.width = size / 2 - 50
    // gElCanvas.height = gElCanvas.width = elContainer.offsetWidth / 2 - 50
    // gElCanvas.height = gElCanvas.width = elContainer.offsetWidth / 2 - 20
    renderMeme(true)
}

function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    const line = setLineTxt(txt)
    renderMeme(true)

}

function markSelctedLine(meme, color) {
    const { lines, selectedLineIdx } = meme
    console.log(lines[selectedLineIdx])
    console.log(lines)
    const { size, y, id, align } = lines[selectedLineIdx]
    const posY = y ? y : getPos(id, align).y
    drawRect(0, posY - (size / 2), gElCanvas.width, posY + (size / 2), color)

}

function drawRect(x, y, endX, endY, color) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.fillRect(x, y, endX, endY)
}

function drawText(line) {
    const { txt, size, align, color, id, font, stroke } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`

    const { x, y } = getPos(id, align)
    Object.assign(line, { y, x })
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
    renderMeme(true)
}

function onSetColor(color) {
    setColor(color)
    renderMeme(true)
}

function onSetSize(diff) {
    setSize(diff)
    renderMeme(true)
}

function onSetAlign(align) {
    setAlign(align)
    renderMeme(true)
}

function onSetFont(fontStyle) {
    console.log(fontStyle)
    setFont(fontStyle)
    renderMeme(true)
}

function onSetStrokeColor(color) {
    setStrokeColor(color)
    renderMeme(true)
}

function onDeleteLine() {
    deleteLine()
    renderMeme(true)
}

function onRandomMeme() {
    randomMeme()
    openEditor()
    renderMeme(true)
}

function onSaveMeme() {
    renderMeme(false)
    saveMeme()
}

