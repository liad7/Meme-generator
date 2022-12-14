'use strict'


const MEME_KEY = 'memeDB'

var gImgs = [{ id: 1, url: '../meme-imgs/1.jpg', keywords: [] },{ id: 1, url: '../meme-imgs/1.jpg', keywords: [] }]
var gMeme

function initService(){
    createMeme()
}

function createMeme() {
    var meme = _loadMemeToStorage()
    console.log(meme);
    if (!meme) {
        meme = {
            selectedImgId: 1,
            selectedLineIdx: 0,
            lines: []
        }
    }
    gMeme = meme
    _saveMemeToStorage()
}

function getMemeImgUrl() {
    const meme = getMemeById(gMeme.selectedImgId)
    return meme.url
}

function getMeme() {
    return gMeme
}

function getMemeById(memeId) {
    const meme = gImgs.find(img => memeId === img.id)
    return meme
}

function setLineTxt(txt) {
    const line = createLine(txt)
    _saveMemeToStorage()
    return line
}

function createLine(txt, size = 15, align = 'left', color = '#ffffff') {
    const { lines, selectedLineIdx } = gMeme
    const line = { txt, size, align, color }
    lines[selectedLineIdx] = line
    console.log(gMeme)
    // gMeme.lines.push(line)
    return line
}

// function createMeme(){
//     gMeme = _loadMemeToStorage()
//     if(!gMeme) 
// }

function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

function _loadMemeToStorage() {
    return loadFromStorage(MEME_KEY)
}