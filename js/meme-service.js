'use strict'
// ---------------------------------------- DATA -------------------------------------------

const SAVED = 'saved';
var gSavedMemes = [];

var gKeyWords = ['man', 'angry', 'people', 'cute', 'animals', 'dogs', 'cats', 'child', 'funny', 'baby', 'curious', 'happy', 'sport', 'kiss'];

var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', ratio: 'square', keywords: ['man', 'angry', 'people', 'all'] },
    { id: 2, url: 'imgs/meme-imgs (square)/2.jpg', ratio: 'square', keywords: ['cute', 'animals', 'dogs', 'all'] },
    { id: 3, url: 'imgs/meme-imgs (square)/3.jpg', ratio: 'square', keywords: ['cute', 'animals', 'people', 'dogs', 'all'] },
    { id: 4, url: 'imgs/meme-imgs (square)/4.jpg', ratio: 'square', keywords: ['animals', 'cute', 'cats', 'all'] },
    { id: 5, url: 'imgs/meme-imgs (square)/5.jpg', ratio: 'square', keywords: ['cute', 'people', 'child', 'funny', 'baby', 'angry', 'all'] },
    { id: 6, url: 'imgs/meme-imgs (square)/6.jpg', ratio: 'square', keywords: ['people', 'man', 'all'] },
    { id: 7, url: 'imgs/meme-imgs (square)/7.jpg', ratio: 'square', keywords: ['cute', 'people', 'child', 'funny', 'baby', 'curious', 'all'] },
    { id: 8, url: 'imgs/meme-imgs (square)/8.jpg', ratio: 'square', keywords: ['happy', 'people', 'all'] },
    { id: 9, url: 'imgs/meme-imgs (square)/9.jpg', ratio: 'square', keywords: ['happy', 'people', 'child', 'baby', 'funny', 'all'] },
    { id: 10, url: 'imgs/meme-imgs (square)/10.jpg', ratio: 'square', keywords: ['happy', 'people', 'man', 'funny', 'all'] },
    { id: 11, url: 'imgs/meme-imgs (square)/11.jpg', ratio: 'square', keywords: ['people', 'man', 'funny', 'sport', 'kiss', 'all'] },
    { id: 12, url: 'imgs/meme-imgs (square)/12.jpg', ratio: 'square', keywords: ['people', 'man', 'all'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            text: 'waiting for text..',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 50 },
            isFocused: false
        },
        {
            text: '',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 200 },
            isFocused: false
        },
        {
            text: '',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 350 },
            isFocused: false
        }
    ]
};

// ----------------------------------- MEME MANIPULATIONS --------------------------------------
//UPDATE
function updateText(newText) {
    if (gMeme.lines.length === 0) createLines();
    gMeme.lines[gMeme.selectedLineIdx].text = newText;
}

function updateSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function updatePosY(diff) {
    // currPosY = gMeme.lines[gMeme.selectedLineIdx].pos.y
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y >= gCanvas.height) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10;
    }
    if (gMeme.lines[gMeme.selectedLineIdx].pos.y <= 30) {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += 10;
    } else {
        gMeme.lines[gMeme.selectedLineIdx].pos.y += diff;
        console.log('y is:', gMeme.lines[gMeme.selectedLineIdx].pos.y);
    }
}

function updatePosX(dir) {
    switch (dir) {
        case 'left':
            gMeme.lines[gMeme.selectedLineIdx].align = 'left';
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 5;
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx].align = 'center';
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 200;
            break;
        case 'right':
            gMeme.lines[gMeme.selectedLineIdx].align = 'right';
            gMeme.lines[gMeme.selectedLineIdx].pos.x = 395;
            break;
    }
}

function checkLine(x, y) {
    var clickedLine = gMeme.lines.findIndex(line => {
        return x >= line.pos.x - 100 && x <= line.pos.x + 100
            && y >= line.pos.y - 50 && y <= line.pos.y + 50
    });
    gMeme.selectedLineIdx = clickedLine;
    setFocus(clickedLine); //TO FIX DOESNT WORK WELL IN MOBILE
    drawImg();
}

function updateFont(newFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = newFont;
}

function updateStroke(color) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function updateFill(color) {
    gMeme.lines[gMeme.selectedLineIdx].fill = color;
}

function updateLineIndx() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx += 1;
    setFocus(gMeme.selectedLineIdx);
}

function filterBySearch(input) {
    var key = input;
    if (!key || key === '') return gImgs;
    var gallery = gImgs.filter(img => {
        // debugger
        return img.keywords.includes(key);
    });
    return gallery;
}

function setFocus(currLine) {
    // currLine = gMeme.selectedLineIdx
    console.log('focus on lineindx', currLine);
    if (gMeme.lines.length === 0) createLines();
    gMeme.lines.forEach(line => line.isFocused = false);
    gMeme.lines[currLine].isFocused = true;
}

function updateKeyFont(word) {
    var keyWord = gKeyWords.find(key => {
        return word === key;
    });

    console.log('adding to', keyWord);
    // need to fix

}

// ----------------------------------- CREATE \ DELETE LINES --------------------------------------
//CREATE
function _createLine() {
    return {
        text: 'new line',
        size: 52,
        font: 'impact',
        align: 'center',
        fill: 'white',
        stroke: 'black',
        pos: { x: 200, y: 250 },
        isFocused: true
    }
}

function createLines() {
    var line = _createLine();
    gMeme.lines.push(line);
}

//DELETE
function removeLines() {
    gMeme.lines.splice(gMeme.lines.length - 1, 1);
}


// ----------------------------------- RENDER CANVAS AND LINES --------------------------------------

//LIST
function drawImg() {
    var img = new Image();
    var imgSrc = _getImgSrc(gMeme.selectedImgId);
    img.src = imgSrc;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height) //img,x,y,xend,yend
        _renderLines();
    }

}

function _renderLines() {
    gMeme.lines.forEach(line => drawText(line));
}

function drawText(line) {
    gCtx.font = `small-caps 900 ${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.lineWidth = '2.5'
    gCtx.fillStyle = line.fill;
    gCtx.fillText(line.text, line.pos.x, line.pos.y);
    gCtx.strokeStyle = line.stroke;
    gCtx.strokeText(line.text, line.pos.x, line.pos.y);
    if (line.isFocused) { //TO FIX: OUTLINE WHEN TEXT IS NOT CENTERED
        var text = gCtx.measureText(line.text);
        var width = text.width;
        var height = line.size;
        var x = line.pos.x;
        var y = line.pos.y;
        gCtx.strokeStyle = 'white';
        gCtx.strokeRect(x - (width / 2), y + 10, width, -height); //x, y, width, heigt
    }
}

function renderImgs(imgs) {
    var strHtml = imgs.map(img => {
        return `
                <img onclick="onChooseImg(${img.id},this)" class="${img.ratio}" id="${img.id}" src="${img.url}">
               `
    })
        .join(' ')

    document.querySelector('.imgs-container').innerHTML = strHtml;
}

function openSaved(data) {
    var strHtml = data.map(image => {
        return ` <img src="${image}"> `
    })
        .join(' ');
    document.querySelector('.saved-imgs').innerHTML = strHtml;
}


//READ
function _getImgSrc(imgId) {
    // imgIdx needed to find img src url in gImgs[]
    var imgIdx = gImgs.findIndex(img => {
        return imgId === img.id;
    });

    return gImgs[imgIdx].url;
}

