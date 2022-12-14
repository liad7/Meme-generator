'use strict'


const MEME_KEY = 'memeDB'

var gImgs = [{ id: '1', url: '../meme-imgs/1.jpg', keywords: [] }, { id: '2', url: '../meme-imgs/2.jpg', keywords: [] }]
var gMeme

function initService() {
    createMeme()
}

function createMeme() {
    var meme = _loadMemeFromStorage()
    if (!meme) {
        meme = {
            selectedImgId: '1',
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
    return setMeme(imgId, 0)
}

function setMeme(selectedImgId = '1', selectedLineIdx = 0, lines = []) {
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

function switchLine() {
    const {lines} = gMeme
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > lines.length-1) gMeme.selectedLineIdx = 0
    console.log('curr line',gMeme.selectedLineIdx)
    return lines[gMeme.selectedLineIdx].txt
}

function newLine() {
    console.log(gMeme.selectedLineIdx)
    if (!gMeme.lines[gMeme.selectedLineIdx]) return
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx)
}

function getLineIdxById(lineId) {
    return gMeme.lines.findIndex(line => lineId === line.id)
}

function setColor(color) {
    const {lines,selectedLineIdx} = gMeme
    lines[selectedLineIdx].color = color
    _saveMemeToStorage()
}

function setAlign(align) {
    const {lines,selectedLineIdx} = gMeme
    lines[selectedLineIdx].align = align
    _saveMemeToStorage()
}

function setSize(diff) {
    const {lines,selectedLineIdx} = gMeme
    const line = lines[selectedLineIdx]
    if (line.size + diff > 100 || line.size + diff < 10) return 
    line.size += diff
    _saveMemeToStorage()
}

function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

function _loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY)
}