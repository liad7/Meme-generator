'use strict'


function onInit() {
    renderGallery()
}

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

function onImgSelect(imgId, idx) {
    onOpenSection('edit')
    clearEditor()
    setImg(imgId, idx)
    setCurrImg()
}

function onOpenSection(nav) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.editor')
    const elSavedMemes = document.querySelector('.my-meme-container')
    closeMenu()
    switch (nav) {
        case 'gallery':
            elGallery.style.display = 'block'
            elEditor.style.display = 'none'
            elSavedMemes.style.display = 'none'
            renderGallery()
            break
        case 'save':
            elGallery.style.display = 'none'
            elEditor.style.display = 'none'
            elSavedMemes.style.display = 'block'
            renderSavedMemes()
            break
        case 'edit':
            elGallery.style.display = 'none'
            elEditor.style.display = 'grid'
            elSavedMemes.style.display = 'none'
            openEditor()
            break
    }
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function closeMenu() {
    document.body.classList.remove('menu-open')
}

function renderDataList() {
    const keywords = getKeywords()
    var strHTMLs = keywords.map(keyword => `<option value="${keyword}">`)
    const elDatalist = document.querySelector('datalist')
    elDatalist.innerHTML = strHTMLs.join('')
}

function onSearch(ev, searchWord) {
    ev.preventDefault()
    setSearchFilter(searchWord)
    renderGallery()
}



