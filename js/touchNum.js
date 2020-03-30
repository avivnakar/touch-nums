'use strict';

console.log('Ex-touch-nums');

//Global variables and Constants
const EASY = 4;
const HARD = 5;
const EXTREME = 6;
var gDifficulty = EASY;
var gBoard = [];
var gNextClick = 1;
var gInitialTime = 0;
var gCurrTime = 0;
var gLapse;
//------------------------------------------------------------//


//Unit Testing


//------------------------------------------------------------//
function init(difficulty=gDifficulty) 
{
    gDifficulty = difficulty;
    gInitialTime=0;
    gCurrTime=0;
    gNextClick=1;
    var strHTML = '';
    strHTML += createInterface();
    document.querySelector('.container').innerHTML = strHTML;
    adaptWidth();
    updateTime(gInitialTime);
    
}


function createMat(difficulty = gDifficulty) {
    gBoard = [];
    var strHTML = '<table><tbody>\n'
    var cells = [];
    for (var i = 1; i <= difficulty ** 2; i++) {
        cells.push(i);
    }
    for (var i = 0; i < difficulty; i++) {
        gBoard.push([]);
        strHTML += '<tr class="row">\n'
        for (var j = 0; j < difficulty; j++) {
            var rnd = cells.splice(getRandomInteger(0, cells.length), 1)[0];
            gBoard[i].push(rnd);
            strHTML += `<td class="cell" onclick="cellClicked(this)"
             data-i="${i}"data-j="${j}">${gBoard[i][j]}</td>\n`;
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>'
    //console.table(gBoard)
    // console.table(strHTML)
    // document.querySelector('.container').innerHTML = strHTML;
    return strHTML;
}

function cellClicked(clickedNum) {
    var i = clickedNum.dataset.i;
    var j = clickedNum.dataset.j;
    console.log(`(${i},${j})=${gBoard[i][j]}`);
    if (gBoard[i][j] === gNextClick) {
        if(gNextClick===1){
            gInitialTime=Date.now();
            gLapse=setInterval(updateTime, 40);
        }
        clickedNum.classList.add('clicked');
        gNextClick++;
        if(gNextClick>gDifficulty**2) clearInterval(gLapse);
        else document.querySelector('.next').innerText=gNextClick;    
        console.log(gNextClick);
        
    }
}
function updateTime(time=Date.now()){
    gCurrTime = (time-gInitialTime)/1000  ;
    document.querySelector('.stopwatch').innerText=gCurrTime;    
    
}
function createInterface() {
    var strHTML = '';
    strHTML += createNext();
    strHTML += createStopWatch();
    strHTML += createMat();
    strHTML += create3Difficulties();
    return strHTML;
}
function createNext(){
    return `<div class="next dashboard">${gNextClick}</div>\n`;
}
function createStopWatch(){
    return `<div class="stopwatch dashboard">${gCurrTime}</div>\n`;
}
function adaptWidth(){
    document.querySelector('.container').style.width=(gDifficulty*96)+'px';
    document.querySelector('.seperator').style.height=(gDifficulty*96+45)+'px';
    var elBtns=document.querySelectorAll('.button');
    for (var i=0; i<elBtns.length;i++){
        elBtns[i].style.margin=((gDifficulty*96-330)/6)+'px';
    }
}
function clickedDifficulty(difficulty){
    clearInterval(gLapse);
    document.querySelector('.stopwatch').innerText=gCurrTime;    
    init(difficulty);
}
function create3Difficulties(){
    var strHTML='<div class="seperator"></div>'
    strHTML+=`<div class="button" onclick="clickedDifficulty(${EASY})">Easy</div>`;
    strHTML+=`<div class="button" onclick="clickedDifficulty(${HARD})">Hard</div>`;
    strHTML+=`<div class="button" onclick="clickedDifficulty(${EXTREME})">Extreame</div>`;
    return strHTML;
}
// function resetNums(max = 99, min = 1) {
//     gNums = [];
//     for (var i = min; i <= max; i++) {
//         gNums.push(i);
//     }
// }
// function drawNum() {
//     return gNums.splice(getRandomInteger(0, gNums.length), 1)[0];
// };