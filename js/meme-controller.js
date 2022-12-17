'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gMarkclr = '#7877778d'

var gStartPos
var gElCanvas
var gCtx


function onInit() {
    initService()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    // })
}
function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}
function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    const line = getLineClicked(pos)
    if (!line) return

    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getDragLine()

    if (!line) return

    const pos = getEvPos(ev)
    // Calc the delta , the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme(true)
}

function onUp() {
    const line = getDragLine()
    if (!line) return

    setLineDrag(false)
    clearDragLine()
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        console.log('ev:', ev)
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
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

// The next 2 functions handle IMAGE UPLOADING to img tag from file system:
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        const imgId = addUserImg(img.src)
        onImgSelect(imgId)
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
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
    const { size, y, id, align } = lines[selectedLineIdx]
    const posY = y ? y : getPos(id, align).y
    console.log(posY - (size / 2),posY + (size / 2));

    drawRect(0, posY - (size / 2), gElCanvas.width, size*1.2 , color)

}

function drawRect(x, y, endX, endY, color) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.fillRect(x, y, endX, endY)
}

function drawText(line) {
    const { txt, size, align, color, id, font, stroke, isDrag,fixed } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    var { x, y } = getPos(id, align)
    if (fixed) var {x,y} = line
    if(isDrag) var { x, y } = gStartPos
    Object.assign(line, { y, x })

    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

}


function onSwitchLine() {
    document.querySelector('input[name="text"]').value = switchLine()
    renderMeme(true)
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

``