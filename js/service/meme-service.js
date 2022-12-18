'use strict'


const MEME_KEY = 'memeDB'
const MY_MEME_KEY = 'myMemesDB'
const IMG_KEY = 'imgDB'

var gImgs
var gMeme
var gSavedMemes
var gSearchFilter
var gRandLines = ['love it', 'maybe', 'that what I like', 'that what she said', 'cheers']
var gSettings = { size: 30, align: 'center', color: '#ffffff', font: 'impact', stroke: '#000000' }
var gFonts = ['impact', 'david', 'ariel', 'sans-sarif']

createImages()
createMeme()
createMyMemes()
getKeywords()


function getLineClicked(clickedPos) {
    const { y } = clickedPos
    console.log(gMeme);
    console.log(gMeme.lines);
    const lines = gMeme.lines
    const clickedLine = lines.find(line => y >= line.y - (line.size / 2) && y <= line.y + (line.size / 2))
    _saveMemeToStorage()
    return clickedLine
}

function createLine() {
    const { lines, selectedLineIdx } = gMeme
    const { size, align, color, font, stroke } = gSettings
    const line = { size, align, color, font, stroke, id: makeId(),fixed: false }
    line.txt = 'Put your text here'
    lines[selectedLineIdx] = line
    return line
}

function createRandomLine() {
    const { align } = gSettings
    
    var idx = getRandomInt(0, gFonts.length)
    const font = gFonts[idx]
    const color = getRandomColor()
    const stroke = getRandomColor()
    const size = getRandomInt(20, 60)
    return { size, align, color, font, stroke, id: makeId() }
}

function setSearchFilter(word) {
    gSearchFilter = word
}

function createMyMemes() {
    var myMemes = _loadMyMemesFromStorage()
    if (!myMemes) myMemes = []
    gSavedMemes = myMemes
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

function getImgs() {
    let imgs = gImgs
    if (gSearchFilter) {
        imgs = imgs.filter(img => img.keywords.find(keyword => keyword.includes(gSearchFilter)))
    }
    return imgs
}

function setImg(imgId, idx) {
    if (idx !== undefined) {
        const lines = gSavedMemes[idx].lines
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

function getMeme() {
    console.log(gMeme);
    return gMeme
}

function getSavedMemes() {
    return gSavedMemes
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function setLineTxt(txt) {
    if (isFirst()) gMeme.lines[0] = createLine()
    const line = getCurrLine()

    line.txt = txt
    _saveMemeToStorage()
    return line
}

function isFirst() {  //check if it's the user first time edit this img
    const { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx] && !selectedLineIdx
}

function switchLine() {
    const { lines } = gMeme

    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > lines.length - 1) gMeme.selectedLineIdx = 0
    return lines[gMeme.selectedLineIdx].txt
}

function changeLineIdx(lineId) {
    gMeme.selectedLineIdx = getLineIdxById(lineId)
    _saveMemeToStorage()
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
    gMeme.selectedLineIdx = 0
    
    if (!lines.length) lines[0] = createLine()
    _saveMemeToStorage()
}

function getLineIdxById(lineId) {
    return gMeme.lines.findIndex(line => lineId === line.id)
}

function getCurrLine() {
    const { lines, selectedLineIdx } = gMeme
    return lines[selectedLineIdx]
}

function setColor(color) {
    getCurrLine().color = color
    _saveMemeToStorage()
}

function setAlign(align) {
    getCurrLine().align = align
    _saveMemeToStorage()
}

function setFont(font) {
    getCurrLine().font = font
    _saveMemeToStorage()
}

function setStrokeColor(stroke) {
    getCurrLine().stroke = stroke
    _saveMemeToStorage()
}

function setSize(diff) {
    const line = getCurrLine()
    if (line.size + diff > 100 || line.size + diff < 10) return
    line.size += diff
    _saveMemeToStorage()
}

function randomMeme() {
    var idx = getRandomInt(0, gImgs.length)
    const img = gImgs[idx]
    const count = getRandomInt(0, 2)
    const randLines = []
    for (var i = 0; i < count; i++) {
        const line = createRandomLine()
        idx = getRandomInt(0, gRandLines.length)
        line.txt = gRandLines[idx]
        randLines.push(line)
    }
    return setMeme(img.id, randLines, 1)
}

function saveMeme() {
    gSavedMemes.push(gMeme)
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
    saveToStorage(MY_MEME_KEY, gSavedMemes)
}

function _loadMyMemesFromStorage() {
    return loadFromStorage(MY_MEME_KEY)
}

function clearMyMeme() {
    gSavedMemes = []
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
            _createImage('assets/1.jpg', ['trump', 'celeb']),
            _createImage('assets/2.jpg', ['dog', 'cute', 'animal']),
            _createImage('assets/3.jpg', ['dog', 'cute', 'animal', 'tierd', 'baby']),
            _createImage('assets/4.jpg', ['cute', 'animal', 'tierd', 'cat']),
            _createImage('assets/5.jpg', ['sucsses', 'baby', 'cute']),
            _createImage('assets/6.jpg', ['aliens', 'history', 'guy']),
            _createImage('assets/7.jpg', ['funny', 'cute', 'baby', 'supriesed']),
            _createImage('assets/8.jpg', ['willi', 'tell']),
            _createImage('assets/9.jpg', ['evil', 'cute', 'baby', 'laugh']),
            _createImage('assets/10.jpg', ['obama', 'laugh', 'smile', 'celeb']),
            _createImage('assets/11.jpg', ['kiss', 'guy', 'basketball']),
            _createImage('assets/12.jpg', ['finger', 'point']),
            _createImage('assets/13.jpg', ['decaprio', 'cheers', 'smile']),
            _createImage('assets/14.jpg', ['matrix', 'sunglasses']),
            _createImage('assets/15.jpg', ['mordor', 'guy', 'rings', 'lord']),
            _createImage('assets/16.jpg', ['guy', 'star', 'smile']),
            _createImage('assets/17.jpg', ['putin', 'suit', 'two']),
            _createImage('assets/18.jpg', ['toy', 'buzz', 'woddy']),
        ]
    }
    gImgs = imgs
    _saveImgsToStorage()
}

function _createImage(url, keywords = []) {
    return { id: makeId(), url, keywords }
}

function addUserImg(url) {
    const img = _createImage(url)
    gImgs.push(img)
    return img.id
}



