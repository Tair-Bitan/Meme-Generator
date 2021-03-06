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

    var elWords = document.querySelector('.keywords');
    elWords.style.display = 'none';

    var elMain = document.querySelector('.main-container');
    elMain.classList.add('flex');

    var elSearch = document.querySelector('input[name="search"]');
    elSearch.style.display = 'none';
    // Updates the services but doesn't call gMeme directly
    gMeme.selectedImgId = imgId;
    drawImg();
}

function onShowGallery() {
    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'block';

    var elMain = document.querySelector('.main-container');
    elMain.classList.remove('flex');

    var elSearch = document.querySelector('input[name="search"]');
    elSearch.style.display = 'inline-block';

    var elSaved = document.querySelector('.saved-imgs-container');
    elSaved.style.display = 'none';

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
    document.querySelector('input[name="canvas-text"]').value = '';
    updateLineIndx();
    drawImg();
}

function onAddLine() {
    createLines();
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    drawImg();
}

function onRemoveLine() {
    removeLines();
    drawImg();
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

function onKeyword(word) {
    updateKeyFont(word);
    document.querySelector('input[name="search"]').value = word;
    var filtered = filterBySearch(word);
    renderImgs(filtered);
}

function onCanvasClick(ev) {
    var { offsetX, offsetY } = ev;
    checkLine(offsetX, offsetY);
    // updateLocation(offsetX, offsetY);
}

function onSave() {
    gSavedMemes.push(gCanvas.toDataURL('image/jpeg'));
    saveToStorage(SAVED, gSavedMemes);
}

function onLoadSaved() {
    var elSaved = document.querySelector('.saved-imgs-container');
    elSaved.style.display = 'block';

    var elGallery = document.querySelector('.gallery');
    elGallery.style.display = 'none';

    var elSearch = document.querySelector('input[name="search"]');
    elSearch.style.display = 'none';

    var elMain = document.querySelector('.main-container');
    elMain.classList.remove('flex');
    var data = loadFromStorage(SAVED);
    openSaved(data);
}

function onShowModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.top = '50%';
}

function onCloseModal() {
    var elModal = document.querySelector('.modal');
    elModal.style.top = '-100%';
}

function onToggleMenu() {
    document.body.classList.toggle('open-menu');
}