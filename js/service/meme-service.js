'use strict'


const MEME_KEY = 'memeDB'
const MY_MEME_KEY = 'myMemesDB'
const IMG_KEY = 'imgDB'

var gImgs
var gMeme
var gMyMemes
var gFilter
var gRandLines = ['love it', 'maybe', 'that what I like', 'that what she said', 'cheers']

function initService() {
    createImages()
    createMeme()
    createMyMemes()
    getKeywords()
}

function setFilter(word) {
    gFilter = word
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
    var imgs = gImgs
    if (gFilter) {
        imgs = imgs.filter(img => img.keywords.find(keyword => keyword.includes(gFilter)))
    }
    return imgs
}

function setImg(imgId, idx) {
    if (idx !== undefined) {
        const lines = gMyMemes[idx].lines
        return setMeme(imgId, lines)
    }
    return setMeme(imgId)
}

function setMeme(selectedImgId, lines = [createLine()], selectedLineIdx = 0) {
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
    const { lines, selectedLineIdx } = gMeme

    if (isFirst(lines, selectedLineIdx)) lines[selectedLineIdx] = createLine()
    lines[selectedLineIdx].txt = txt
    _saveMemeToStorage()
    return lines[selectedLineIdx]
}

function isFirst(lines, idx) {  //check if it's the user first time edit this img
    if (!lines[idx] && idx === 0) return true
    return false
}

function switchLine() {
    const { lines } = gMeme

    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > lines.length - 1) gMeme.selectedLineIdx = 0
    return lines[gMeme.selectedLineIdx].txt
}

function newLine() {
    const { lines } = gMeme
    const length = lines.length
    const txt = lines[length - 1].txt
    if (!txt || txt === 'Put your text here') return
    gMeme.selectedLineIdx = length
    lines[length] = createLine()
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
    return setMeme(img.id, randLines, 1)
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

function clearMyMeme() {
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

function getKeywords() {
    const allKeywords = gImgs.reduce((acc, img) => {
        img.keywords.reduce((acc, keyword) => {
            if (!acc.includes(keyword)) acc.push(keyword)
            return acc
        }, acc)
        return acc
    }, [])
    return allKeywords
}


function createImages() {
    var imgs = _loadImgsFromStorage()
    if (!imgs) {
        imgs = [
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/1.jpg', ['trump', 'celeb']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/2.jpg', ['dog', 'cute', 'animal']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/3.jpg', ['dog', 'cute', 'animal', 'tierd', 'baby']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/4.jpg', ['cute', 'animal', 'tierd', 'cat']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/5.jpg', ['sucsses', 'baby', 'cute']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/6.jpg', ['aliens', 'history', 'guy']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/7.jpg', ['funny', 'cute', 'baby', 'supriesed']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/8.jpg', ['willi', 'tell']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/9.jpg', ['evil', 'cute', 'baby', 'laugh']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/10.jpg', ['obama', 'laugh', 'smile', 'celeb']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/11.jpg', ['kiss', 'guy', 'basketball']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/12.jpg', ['finger', 'point']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/13.jpg', ['decaprio', 'cheers', 'smile']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/14.jpg', ['matrix', 'sunglasses']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/15.jpg', ['mordor', 'guy', 'rings', 'lord']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/16.jpg', ['guy', 'star', 'smile']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/17.jpg', ['putin', 'suit', 'two']),
            _createImage('https://github.com/liad7/Meme-generator/blob/main/assets/18.jpg', ['toy', 'buzz', 'woddy']),
        ]
    }
    gImgs = imgs
    _saveImgsToStorage()
}

function _createImage(url, keywords = []) {
    return { id: makeId(), url, keywords }
}

function addUserImg(url){
    const img = _createImage(url)
    gImgs.push(img)
    return img.id
}



