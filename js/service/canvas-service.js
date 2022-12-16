'use strict'

var gSettings = { size: 50, align: 'center', color: '#ffffff', font:'impact',stroke: 'black' }
var gFonts = ['impact','david','ariel','sans-sarif']

function createLine() {
    const { lines, selectedLineIdx } = getMeme()
    const { size, align, color,font,stroke } = gSettings
    const line = {size, align, color, font, stroke, id:makeId()}
    lines[selectedLineIdx] = line
    return line
}

function createRandomLine(){
    const {align} = gSettings

    var idx = getRandomInt(0,gFonts.length)
    const font = gFonts[idx]
    const color = getRandomColor()
    const stroke = getRandomColor()
    const size = getRandomInt(20,60)
    return {size, align, color, font, stroke, id:makeId()}

}

``


