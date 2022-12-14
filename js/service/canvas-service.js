'use strict'

var gSettings = { size: 20, align: 'left', color: '#ffffff' }


function createLine(txt) {
    const { lines, selectedLineIdx } = getMeme()
    const {size,align,color} = gSettings
    const line = { txt, size, align, color }
    lines[selectedLineIdx] = line
    return line
}

function setColor(color){
    gSettings.color = color
}

function setAlign(align){
    gSettings.align = align
}

function setSize(diff){
    if(gSettings.size + diff > 100 || gSettings.size + diff < 10) return``
    gSettings.size += diff
}