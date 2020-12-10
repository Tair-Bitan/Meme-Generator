'use strict'
// ---------------------------------------- DATA -------------------------------------------
var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 2, url: 'imgs/meme-imgs (square)/2.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 3, url: 'imgs/meme-imgs (square)/3.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 4, url: 'imgs/meme-imgs (square)/4.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 5, url: 'imgs/meme-imgs (square)/5.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 6, url: 'imgs/meme-imgs (square)/6.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 7, url: 'imgs/meme-imgs (square)/7.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 8, url: 'imgs/meme-imgs (square)/8.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 9, url: 'imgs/meme-imgs (square)/9.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 10, url: 'imgs/meme-imgs (square)/10.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 11, url: 'imgs/meme-imgs (square)/11.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 12, url: 'imgs/meme-imgs (square)/12.jpg', ratio: 'square', keywords: ['happy'] }
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            text: 'i hate this sprint',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 50 },
            isFocused: false
        },
        {
            text: 'i will never make memes',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 200 },
            isFocused: false
        },
        {
            text: 'agian in my life',
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

function updateText(newText) {
    // _getLine();
    gMeme.lines[gMeme.selectedLineIdx].text = newText;
}

function updateSize(diff) {
    // _getLine();
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function updatePosY(diff) {
    // _getLine();
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
    // _getLine();
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

function updateFont(newFont) {
    // _getLine();
    gMeme.lines[gMeme.selectedLineIdx].font = newFont;
}

function updateStroke(color) {
    // _getLine();
    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function updateFill(color) {
    // _getLine();
    gMeme.lines[gMeme.selectedLineIdx].fill = color;
}

function updateLineIndx() {
    // console.log('before', gMeme.selectedLineIdx);
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0;
    else gMeme.selectedLineIdx += 1;
    // console.log('afte', gMeme.selectedLineIdx);

    //CONSIDER INSERT drawImg() HERE INSTEAD OF IN onChangeLine() at controller
    setFocus(gMeme.selectedLineIdx);
}

// ----------------------------------- RENDER CANVAS AND LINES --------------------------------------
function setFocus(currLine) {
    console.log('focus on lineindx', currLine);
    gMeme.lines.forEach(line => line.isFocused = false);
    gMeme.lines[currLine].isFocused = true;
}

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

function _getImgSrc(imgId) {
    // imgIdx needed to find img src url in gImgs[]
    var imgIdx = gImgs.findIndex(function (img) {
        return imgId === img.id;
    });

    return gImgs[imgIdx].url;
}

function renderImgs(imgs) {
    var strHtml = imgs.map(function (img) {
        return `
                <img onclick="onChooseImg(${img.id},this)" class="${img.ratio}" id="${img.id}" src="${img.url}">
               `
    })
        .join(' ')

    document.querySelector('.imgs-container').innerHTML = strHtml;
}