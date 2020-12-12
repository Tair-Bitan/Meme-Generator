'use strict'

var gCanvas;
var gCtx;

function onInit() {
    renderImgs(gImgs);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
}

function onChooseImg(imgId) {
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';

    var elMain = document.querySelector('.main-container');
    elMain.classList.add('flex');

    var elSearch = document.querySelector('input[name="search"]');
    elSearch.style.display = 'none';

    gMeme.selectedImgId = imgId;
    drawImg();
}

function onShowGallery() {
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'grid';

    var elMain = document.querySelector('.main-container');
    elMain.classList.remove('flex');

    var elSearch = document.querySelector('input[name="search"]');
    elSearch.style.display = 'inline-block';
}

function onType() {
    var elText = document.querySelector('input[name="canvas-text"]').value;
    updateText(elText);
    drawImg();
}

function onSetFocus() {
    setFocus(gMeme.selectedLineIdx);
    drawImg();
}

function handleKey(ev) {
    if (ev.keyCode === 13) {
        onChangeLine();
    }
}

function onChangePos(diff) {
    updatePosY(diff);
    drawImg();
}

function onChangeLine() {
    updateLineIndx();
    drawImg();
}

function onAddLine() {

}

function onRemoveLine() {

}

function onChangeSize(diff) {
    updateSize(diff);
    drawImg();
}


function onTextAlign(dir) {
    updatePosX(dir);
    drawImg();
}

function onFontChange(font) {
    updateFont(font);
    drawImg();
}

function onStrokeChange(color) {
    updateStroke(color);
    drawImg();
}

function onFillChange(color) {
    updateFill(color);
    drawImg();
}

function onDownload(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function onSearch() {
    var elInput = document.querySelector('input[name="search"]').value;
    var filtered = filterBySearch(elInput);
    renderImgs(filtered);
}