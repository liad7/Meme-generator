'use strict'

var gSettings = { size: 50, align: 'center', color: '#ffffff', font: 'impact', stroke: '#000000' }
var gFonts = ['impact', 'david', 'ariel', 'sans-sarif']
var gDragLine
function createLine() {
    const { lines, selectedLineIdx } = getMeme()
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

function getLineClicked(clickedPos) {
    const { y } = clickedPos
    const lines = getMeme().lines
    const clickedLine = lines.find(line => {
        return (
            y >= line.y - (line.size/2) && y <= line.y + (line.size/2)
        )
    })
    gDragLine = clickedLine
    return clickedLine

}

function moveLine(dx, dy) {
    gDragLine.x += dx
    gDragLine.y += dy
    gDragLine.align = 'center'
    gDragLine.fixed = true

}


function getDragLine(){
    return gDragLine
}

function setLineDrag(isDrag){
    gDragLine.isDrag = isDrag
}

function clearDragLine(){
    gDragLine = null
}





