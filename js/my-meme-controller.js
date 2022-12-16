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
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)
    console.log('formData:', formData)
    // Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(url => {
            console.log('url:', url)
            onSuccess(url)
        })
}

