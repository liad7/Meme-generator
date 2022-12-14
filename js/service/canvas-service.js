'use strict'

var gSettings = { size: 20, align: 'left', color: '#ffffff' }


function createLine(txt) {
    const { lines, selectedLineIdx } = getMeme()
    // console.log(selectedLineIdx)
    const { size, align, color } = gSettings
    const line = { txt, size, align, color, id:makeId()}
    lines[selectedLineIdx] = line
    return line
}

// function 

