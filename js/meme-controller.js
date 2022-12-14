'use strict'

var gElCanvas
var gCtx

var gX = 10
var gY = 10


function onInit() {
    initService()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    renderMeme()
}
function renderMeme() {
    const img = new Image()
    const meme = getMeme()
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
        renderText(line)
    })
}

function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    const line = setLineTxt(txt)
    renderMeme()
    // renderText(line)
}

function renderText(line) {
    const { txt, size, align, color } = line
    // gCtx.beginPath()
    gCtx.font = `${size}px serif`
    gCtx.fillText(txt, gX+30, gY+30)
    // gCtx.fillText(txt, 10, 50)
    gCtx.fillStyle = color
}

function onSetColor(color){
    setColor(color)
}

function onSetSize(diff){
    setSize(diff)
}