'use strict'


const MEME_KEY = 'memeDB'

var gImgs = [{ id: '1', url: '../meme-imgs/1.jpg', keywords: [] }, { id: '2', url: '../meme-imgs/2.jpg', keywords: [] }]
var gMeme

function initService() {
    createMeme()
}

function createMeme() {
    var meme = _loadMemeFromStorage()
    console.log(meme)
    if (!meme) {
        meme = {
            selectedImgId: 1,
            selectedLineIdx: 0,
            lines: []
        }
        console.log(gMeme)
    }
    gMeme = meme
    _saveMemeToStorage()
}

function getImgUrl() {
    const img = getImgById(gMeme.selectedImgId)
    return img.url
}

function getMeme() {
    return gMeme
}

function getImgs() {
    return gImgs
}

function setImg(imgId) {
    return setMeme(imgId,0)
}

function setMeme(selectedImgId,selectedLineIdx,lines = []) {
    const meme = {
        selectedImgId,
        selectedLineIdx,
        lines
    }
    gMeme = meme
    _saveMemeToStorage()
    return meme
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function setLineTxt(txt) {
    const line = createLine(txt)
    _saveMemeToStorage()
    return line
}

function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

function _loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY)
}