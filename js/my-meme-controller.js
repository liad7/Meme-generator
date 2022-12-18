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

function onShareMeme() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => onSuccess(url))
}

function downloadImg(elLink) {
    renderMeme(false)
    console.log(elLink.href);
    const imgContent = gElCanvas.toDataURL('image/png') // image/jpeg the default format
    elLink.href = imgContent
}

