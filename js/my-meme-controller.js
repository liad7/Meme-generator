'use strict'

function renderMyMeme() { //change the func the img call
    const myMemes = getMyMemes()
    var strHTMLs = myMemes.map((meme, idx) => {
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

function onOpenMyMeme() {
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.my-meme-container').style.display = 'block'
    closeMenu()
    renderMyMeme()
}

function onClearMyMeme(){
    clearMyMeme()
    renderMyMeme()
}
