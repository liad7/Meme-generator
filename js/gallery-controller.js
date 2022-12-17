'use strict'

function renderGallery() {
    const imgs = getImgs()
    var strHTMLs = imgs.map(img => {
        const { url, id } = img
        return `<div class="img-container" onclick="onImgSelect('${id}')">
                    <img src="${url}">
                </div>`
    })
    const elImgs = document.querySelector('.imgs-container')
    elImgs.innerHTML = strHTMLs.join('')
    renderDataList()
}

function onImgSelect(imgId,idx) {
    openEditor()
    setImg(imgId,idx)
    resizeCanvas()
    clearEditor()
}

function openEditor() {
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.my-meme-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'grid'
}

function onOpenGallery() {
    document.querySelector('.my-meme-container').style.display = 'none'
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'block'
    closeMenu()

}

function clearEditor() {
    document.querySelector('input[name="text"]').value = ''
    const elColors = Array.from(document.querySelectorAll('input[type="color"]'))
    elColors.forEach(elColor => elColor.value = '#000000')
}

function renderDataList(){
    const keywords = getKeywords()
    var strHTMLs = keywords.map(keyword =>`<option value="${keyword}">`)
    const elDatalist = document.querySelector('datalist')
    elDatalist.innerHTML = strHTMLs.join('')
}

function onSearch(ev,searchWord){
    ev.preventDefault()
    setFilter(searchWord)
    renderGallery()
}



