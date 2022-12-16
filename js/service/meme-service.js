'use strict'


const MEME_KEY = 'memeDB'
const MY_MEME_KEY = 'myMemesDB'
const IMG_KEY = 'imgDB'

var gImgs 
var gMeme
var gMyMemes
var gRandLines = ['love it', 'maybe', 'that what I like', 'that what she said', 'cheers']

function initService() {
    createImages()
    createMeme()
    createMyMemes()
}

function createMyMemes() {
    var myMemes = _loadMyMemesFromStorage()
    if (!myMemes) myMemes = []
    gMyMemes = myMemes
    _saveMyMemesToStorage()
}

function createMeme() {
    var meme = _loadMemeFromStorage()
    if (!meme) {
        meme = {
            selectedImgId: null,
            selectedLineIdx: null,
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

function getMyMemes() {
    return gMyMemes
}

function getImgs() {
    return gImgs
}

function setImg(imgId, idx) {
    if (idx !== undefined) {
        const lines = gMyMemes[idx].lines
        return setMeme(imgId, lines)
    }
    return setMeme(imgId)
}

function setMeme(selectedImgId, lines = [], selectedLineIdx = 0) {
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
    // if(!imgId) return null
    const img = gImgs.find(img => imgId === img.id)
    return img
}

// function setLineTxt(txt) {
//     const line = createLine(txt)
//     _saveMemeToStorage()
//     return line
// }

function setLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    if (!lines[selectedLineIdx]) lines[selectedLineIdx] = createLine()
    lines[selectedLineIdx].txt = txt
    _saveMemeToStorage()
    return lines[selectedLineIdx]
}

function switchLine() {
    const { lines } = gMeme
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > lines.length - 1) gMeme.selectedLineIdx = 0
    console.log('curr line', gMeme.selectedLineIdx)
    return lines[gMeme.selectedLineIdx].txt
}

function newLine() {
    console.log(gMeme.selectedLineIdx)
    if (!gMeme.lines[gMeme.selectedLineIdx]) return
    gMeme.selectedLineIdx++
    console.log(gMeme.selectedLineIdx)
    _saveMemeToStorage()
}

function deleteLine() {
    const { lines, selectedLineIdx } = gMeme
    lines.splice(selectedLineIdx, 1)
    _saveMemeToStorage()
}

function getLineIdxById(lineId) {
    return gMeme.lines.findIndex(line => lineId === line.id)
}

function setColor(color) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].color = color
    _saveMemeToStorage()
}

function setAlign(align) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].align = align
    _saveMemeToStorage()
}

function setFont(font) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].font = font
    _saveMemeToStorage()
}

function setStrokeColor(stroke) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].stroke = stroke
    _saveMemeToStorage()
}

function setSize(diff) {
    const { lines, selectedLineIdx } = gMeme
    const line = lines[selectedLineIdx]
    if (line.size + diff > 100 || line.size + diff < 10) return
    line.size += diff
    _saveMemeToStorage()
}

function randomMeme() {
    var idx = getRandomInt(0, gImgs.length)
    const img = gImgs[idx]
    const count = getRandomInt(0, 2)
    const randLines = []
    for (var i = 0; i < 2; i++) {
        const line = createRandomLine()
        idx = getRandomInt(0, gRandLines.length)
        line.txt = gRandLines[idx]
        randLines.push(line)
    }
    return setMeme(img.id, 1, randLines)
}

function saveMeme() {
    gMyMemes.push(gMeme)
    _saveMyMemesToStorage()
}


// meme 
function _saveMemeToStorage() {
    saveToStorage(MEME_KEY, gMeme)
}

function _loadMemeFromStorage() {
    return loadFromStorage(MEME_KEY)
}


// my memes 
function _saveMyMemesToStorage() {
    saveToStorage(MY_MEME_KEY, gMyMemes)
}

function _loadMyMemesFromStorage() {
    return loadFromStorage(MY_MEME_KEY)
}

function clearMyMeme(){
    gMyMemes = []
    _saveMyMemesToStorage()
}

// imgs 
function _saveImgsToStorage() {
    saveToStorage(IMG_KEY, gImgs)
}

function _loadImgsFromStorage() {
    return loadFromStorage(IMG_KEY)
}


function createImages() {
    var imgs = _loadImgsFromStorage()
    if (!imgs) {
        imgs = [
            _createImage('/meme-imgs/1.jpg', ['trump', 'celeb']),
            _createImage('/meme-imgs/2.jpg', ['dog', 'cute', 'animal']),
            _createImage('/meme-imgs/3.jpg', ['dog', 'cute', 'animal', 'tierd', 'baby']),
            _createImage('/meme-imgs/4.jpg', ['cute', 'animal', 'tierd', 'cat']),
            _createImage('/meme-imgs/5.jpg', ['sucsses', 'baby', 'cute']),
            _createImage('/meme-imgs/6.jpg', ['aliens', 'history', 'guy']),
            _createImage('/meme-imgs/7.jpg', ['funny', 'cute', 'baby', 'supriesed']),
            _createImage('/meme-imgs/8.jpg', ['willi', 'tell']),
            _createImage('/meme-imgs/9.jpg', ['evil', 'cute', 'baby', 'laugh']),
            _createImage('/meme-imgs/10.jpg', ['obama', 'laugh', 'smile', 'celeb']),
            _createImage('/meme-imgs/11.jpg', ['kiss', 'guy', 'basketball']),
            _createImage('/meme-imgs/12.jpg', ['finger', 'point']),
            _createImage('/meme-imgs/13.jpg', ['decaprio', 'cheers', 'smile']),
            _createImage('/meme-imgs/14.jpg', ['matrix', 'sunglasses']),
            _createImage('/meme-imgs/15.jpg', ['mordor', 'guy', 'rings', 'lord']),
            _createImage('/meme-imgs/16.jpg', ['guy', 'star', 'smile']),
            _createImage('/meme-imgs/17.jpg', ['putin', 'suit', 'two']),
            _createImage('/meme-imgs/18.jpg', ['toy', 'buzz', 'woddy']),
        ]
    }
    gImgs = imgs
    _saveImgsToStorage()
}

function _createImage(url, keywords) {
    return { id: makeId(), url, keywords }
}