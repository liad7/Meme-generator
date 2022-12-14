'use strict'

function renderGallery() {
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => {
        const { url, id } = img
        return `<div class="img-container" onclick="onImgSelect('${id}')">
                    <img src="${url}">
                </div>`
    })
    console.log(strHTMLs)
    const elImgs = document.querySelector('.gallery-container')
    elImgs.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}