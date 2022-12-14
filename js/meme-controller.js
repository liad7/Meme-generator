'use strict'

var gElCanvas
var gCtx


function onInit() {
    initService()
    renderMeme()
}
function renderMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    const img = new Image()
    const meme = getMeme()
    img.src = getMemeImgUrl()
    img.onload = () => {
        renderImg(img)
        renderTexts(meme.lines)  ///why doesnt work with one
        console.log(meme.lines)
    }
    renderTexts(meme.lines) //why doesnt work with one
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTexts(lines) {
    lines.forEach(line => {
        // const{txt,size,align,color} = line
        console.log(line)
        renderText(line)
    })
}

function onSetLineTxt(ev, txt) {
    ev.preventDefault()
    // const meme = getMeme()
    // meme.lines.push()
    const line = setLineTxt(txt)
    // renderMeme()
    renderText(line)
}

function renderText(line) {
    const { txt, size, align, color } = line
    // gCtx.beginPath()
    gCtx.font = `${size}px serif`
    gCtx.fillText(txt, 10, 50)
    gCtx.fillStyle = color
}