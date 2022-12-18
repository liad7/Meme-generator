'use strict'

function renderSavedMemes() { //change the func the img call
    const savedMemess = getSavedMemes()
    var strHTMLs = savedMemess.map((meme, idx) => {
        const { selectedImgId, lines } = meme
        const img = getImgById(selectedImgId)
        const { url } = img
        return `<div class="img-container" onclick="onImgSelect('${selectedImgId}',${idx})">
                    <img src="${url}">
                    <span>${lines[0].txt}</span>
                </div>`
    })
    const elImgs = document.querySelector('.img-meme-container')
    elImgs.innerHTML = strHTMLs.join('')
}

function onClearSavedMemes(){
    clearSavedMemes()
    renderSavedMemes()
}





