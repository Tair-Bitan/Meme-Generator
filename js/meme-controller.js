'use strict'

var gCanvas;
var gCtx;

function onInit() {
    renderImgs(gImgs);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    drawImg();
}

function onType() {
    var elText = document.querySelector('input[type="text"]').value;
    updateText(elText);
    drawImg();
}

function onChooseImg(imgId) {
    gMeme.selectedImgId = imgId;
    drawImg();
}

function onChangeSize(diff) {
    updateSize(diff);
    drawImg();
}

function onChangePos(diff) {
    updatePosY(diff);
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