'use strict'
// ---------------------------------------- DATA -------------------------------------------
var gImgs = [
    { id: 1, url: 'imgs/meme-imgs (square)/1.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 2, url: 'imgs/meme-imgs (square)/10.jpg', ratio: 'square', keywords: ['happy'] },
    { id: 3, url: 'imgs/meme-imgs (square)/11.jpg', ratio: 'square', keywords: ['happy'] }
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
            pos: { x: 200, y: 50 }
        },
        {
            text: 'i will never make memes',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 200 }
        },
        {
            text: 'agian in my life',
            size: 52,
            font: 'impact',
            align: 'center',
            fill: 'white',
            stroke: 'black',
            pos: { x: 200, y: 350 }
        }
    ]
};

// ----------------------------------- MEME MANIPULATIONS --------------------------------------

function updateText(newText) {
    // _getLine();
    gMeme.lines[0].text = newText;
}

function updateSize(diff) {
    // _getLine();
    gMeme.lines[0].size += diff;
}

function updatePosY(diff) {
    // _getLine();
    if (gMeme.lines[0].pos.y >= gCanvas.height) {
        gMeme.lines[0].pos.y -= 10;
    }
    if (gMeme.lines[0].pos.y <= 30) {
        gMeme.lines[0].pos.y += 10;
    } else {
        gMeme.lines[0].pos.y += diff;
        console.log('y is:', gMeme.lines[0].pos.y);
    }
}

function updatePosX(dir) {
    switch (dir) {
        case 'left':
            gMeme.lines[0].align = 'left';
            gMeme.lines[0].pos.x = 5;
            break;
        case 'center':
            gMeme.lines[0].align = 'center';
            gMeme.lines[0].pos.x = 200;
            break;
        case 'right':
            gMeme.lines[0].align = 'right';
            gMeme.lines[0].pos.x = 395;
            break;
    }
}

function updateFont(newFont) {
    // _getLine();
    gMeme.lines[0].font = newFont;
}

function updateStroke(color) {
    // _getLine();
    gMeme.lines[0].stroke = color;
}

function updateFill(color) {
    // _getLine();
    gMeme.lines[0].fill = color;
}

// function _getLine(lineIdx) {
//     var lineIndex = gMeme.lines.findIndex(function (line) {
//         return lineIdx === line.idx;
//     });

//     return gMeme.lines[lineIndex].text;
// }

// ----------------------------------- RENDER CANVAS AND LINES --------------------------------------
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
    gCtx.strokeStyle = line.Stroke;
    gCtx.strokeText(line.text, line.pos.x, line.pos.y);
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