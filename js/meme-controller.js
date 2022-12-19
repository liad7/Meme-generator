'use strict'

const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']
const gMarkclr = '#7877778d'

var gStartPos
var gElCanvas
var gCtx
var gIsMark
var gDragLine
var gCurrImg

function openEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gIsMark = true
    addListeners()
}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
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

function setCurrImg() {
    const img = new Image()
    img.src = getImgUrl()
    img.onload = () => {
        gCurrImg = img
        resizeCanvas()
    }
}

function renderMeme() {
    const meme = getMeme()
    renderImg(gCurrImg)
    if (gIsMark) markSelctedLine(meme, gMarkclr)
    renderLines(meme.lines)
}

function drawText(line) {
    const { txt, size, align, color, id, font, stroke, isDrag, fixed } = line
    gCtx.lineWidth = 2
    gCtx.strokeStyle = stroke
    gCtx.fillStyle = color
    gCtx.font = `${size}px ${font}`
    var { x, y } = getPos(id, align)

    if (fixed) var { x, y } = line

    if (isDrag) var { x, y } = gStartPos

    line.x = x
    line.y = y
    gCtx.textAlign = align
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function moveLine(dx, dy) {
    gDragLine.x += dx
    gDragLine.y += dy
    gDragLine.align = 'center'
    gDragLine.fixed = true

}

function onDown(ev) {
    const pos = getEvPos(ev)
    const line = getLineClicked(pos)
    if (!line) return
    gDragLine = line
    gDragLine.isDrag = true
    changeLineIdx(line.id)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (!gDragLine) return
    console.log('on move')
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    if (!gDragLine) return

    gDragLine.isDrag = false
    gDragLine = null
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function clearEditor() {
    document.querySelector('input[name="text"]').value = ''
    const elColors = Array.from(document.querySelectorAll('input[type="color"]'))
    elColors.forEach(elColor => elColor.value = '#000000')
}

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

function downloadImg(elLink) {
    gIsMark = false
    renderMeme()
    const imgContent = gElCanvas.toDataURL('image/png')
    elLink.href = imgContent
    gIsMark = true
}

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => onSuccess(url))
}

function renderLines(lines) {
    lines.forEach(line => drawText(line))
}

function resizeCanvas() {
    const elContainer = document.querySelector('.editor')
    var size = elContainer.offsetWidth > elContainer.offsetHeight ? elContainer.offsetWidth : elContainer.offsetHeight
    size = size / 2 > elContainer.offsetWidth ? elContainer.offsetWidth : size / 2
    gElCanvas.height = gElCanvas.width = size - 20
    renderMeme()
}


function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    const line = setLineTxt(txt)
    renderMeme()
}

function markSelctedLine(meme, color) {
    const { lines, selectedLineIdx } = meme
    const { size, y, id, align } = lines[selectedLineIdx]
    const posY = y ? y : getPos(id, align).y

    drawRect(0, posY - (size / 2), gElCanvas.width, size * 1.2, color)
}

function drawRect(x, y, endX, endY, color) {
    gCtx.beginPath()
    gCtx.fillStyle = color
    gCtx.fillRect(x, y, endX, endY)
}

function onSwitchLine() {
    document.querySelector('input[name="text"]').value = switchLine()
    renderMeme()
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

function onSetAlign(align) {
    setAlign(align)
    renderMeme()
}

function onNewLine() {
    document.querySelector('input[name="text"]').value = ''
    newLine()
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetSize(diff) {
    setSize(diff)
    renderMeme()
}

function onSetFont(fontStyle) {
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

function onRandomMeme() {
    randomMeme()
    onOpenSection('edit')
    renderMeme()
}

function onSaveMeme() {
    gIsMark = false
    renderMeme()
    saveMeme()
    gIsMark = true
}

