'use strict'

var gSettings = { size: 50, align: 'center', color: '#ffffff', font:'impact',stroke: 'black' }


function createLine() {
    const { lines, selectedLineIdx } = getMeme()
    const { size, align, color,font,stroke } = gSettings
    const line = {size, align, color, font, stroke, id:makeId()}
    lines[selectedLineIdx] = line
    return line
}


