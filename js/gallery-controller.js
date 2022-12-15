'use strict'

function renderGallery() {
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => {
        const { url, id } = img
        return `<div class="img-container" onclick="onImgSelect('${id}')">
                    <img src="${url}">
                </div>`
    })
    // console.log(strHTMLs)
    const elImgs = document.querySelector('.imgs-container')
    elImgs.innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'grid'
    setImg(imgId)
    renderMeme()
}

function onOpanGallery(){
    document.querySelector('.editor').style.display = 'none' 
    document.querySelector('.gallery-container').style.display = 'block'
}