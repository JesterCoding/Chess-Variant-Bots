// script.js
/*Old document, not gonna be used*/
const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerTurn = 'white'
playerDisplay.textContent = 'white'

const startPeices = 
[
    rook, knight, bishop, queen, king, bishop, knight, rook, 
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook
]

function createBoard()
{
    //Lexical Scoping: Obtains the variable access from parent element
    startPeices.forEach((startPeice, i) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPeice
        square.firstChild?.setAttribute('draggable', true) //Checks if it has a first child
        square.setAttribute('square-id', 63-i)
        const row = Math.floor((63 - i)/ 8) + 1
        if (row % 2 === 0 && i % 2 === 0)
        {
            square.classList.add("beige")
        }
        else if (row % 2 === 1 && i % 2 === 0)
        {
            square.classList.add("brown")
        }
        else if (row % 2 === 0 && i % 2 === 1)
        {
            square.classList.add("brown")
        }
        else
        {
            square.classList.add("beige")
        }
        if (i <= 15)
        {
            square.firstChild.firstChild.classList.add('black')
        }
        else if (i >= 48)
        {
            square.firstChild.firstChild.classList.add('white')
        }
        
        gameBoard.append(square)
    })
}

createBoard()

let positionID
let draggedElement
let lastMove = 0
let targetId = 0
let castleBlack = true
let castleWhite = true

const allSquares = document.querySelectorAll('.square')
allSquares.forEach(square => {
   square.addEventListener('dragstart', dragStart)
   square.addEventListener('dragover', dragOver)
   square.addEventListener('drop', dragDrop)
})

function dragStart (e)
{
    positionID = e.target.parentNode.getAttribute('square-id')
    draggedElement = e.target
}

function dragOver(e)
{
    e.preventDefault()
}

function dragDrop (e)
{
    e.stopPropagation()
    console.log('playerTurn', playerTurn)
    console.log('e.target', e.target)
    const currentPlayerPeice = draggedElement.firstChild.classList.contains(playerTurn)
    const taken = e.target.classList.contains('peice')
    const valid = checkIfValid(e.target)
    const currentOppPeice = playerTurn === 'white' ? 'black': 'white' 
    const takenByOpp = e.target.firstChild?.classList.contains(currentOppPeice) 
    const enpassantByOpp = document.querySelector(`[square-id = "${lastMove}"]`).firstChild?.getAttribute('id') === 'pawn' 
    const enpassantValid = checkIfenpassantValid(e.target)
    const castleValid = checkIfCastleValid(e.target, playerTurn)
   // const promotionValid = checkIfPromotion(e.target)
    console.log("castleValid", castleValid)
    if (currentPlayerPeice)
    {
        if (takenByOpp && valid)
        {
            e.target.parentNode.append(draggedElement)
            lastMove = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id')) 
            console.log("lastMove", lastMove)
            e.target.remove()
            changePlayer()
            return
        }
        else if (enpassantByOpp && enpassantValid)
        {
            document.querySelector(`[square-id = "${lastMove}"]`).firstChild.remove()
            e.target.append(draggedElement)
            lastMove = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id')) 
            console.log("lastMove", lastMove)
            changePlayer()
            return
        }
        else if (castleValid === "Right") //Add no checks later
        {
            e.target.append(draggedElement)
            if (playerTurn === 'white')
            {
                document.querySelector(`[square-id = "${targetId + 1}"]`).append(document.querySelector(`[square-id = "${targetId - 1}"]`).firstChild)
            }
            else
            {
                document.querySelector(`[square-id = "${targetId - 1}"]`).append(document.querySelector(`[square-id = "${targetId + 1}"]`).firstChild)
            }
            lastMove = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id')) 
            console.log("lastMove", lastMove)
            changePlayer()
            return
        }
        else if (castleValid === "Left")
        {
            e.target.append(draggedElement)
            if (playerTurn === 'white')
            {
                document.querySelector(`[square-id = "${targetId - 1}"]`).append(document.querySelector(`[square-id = "${targetId + 2}"]`).firstChild)
            }
            else if (playerTurn === 'black')
            {
                document.querySelector(`[square-id = "${targetId + 1}"]`).append(document.querySelector(`[square-id = "${targetId - 2}"]`).firstChild)
            }
            lastMove = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id')) 
            console.log("lastMove", lastMove)
            changePlayer()
            return
        }
        //Same side capture is attempted --> Ignore
        else if (taken && !takenByOpp)
        {
            return
        }
        else if (valid)
        {
            e.target.append(draggedElement)
            changePlayer()
            lastMove = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id')) 
            console.log("lastMove", lastMove)
            return
        }
    }
}
/*
function checkIfPromotion(target)
{
    const lastRow = [56, 57, 58, 59, 60, 61, 62, 63]
    targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(positionID)
    if (
        lastRow.contains(targetId) && 
        document.querySelector(`[square-id="${startId}"]`).firstChild.getAttribute('id') === 'pawn')
    {
        //add the code here
    }
}
*/
function checkIfCastleValid(target, currPeice)
{
    targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(positionID)
    if (
        currPeice === 'white' && castleWhite &&
        document.querySelector(`[square-id="${startId}"]`).firstChild.getAttribute('id') === 'king' &&
        startId - 2 === targetId && 
        !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && 
        document.querySelector(`[square-id="${startId - 3}"]`).firstChild?.getAttribute('id') === 'rook' ||
        currPeice === 'black' && castleBlack &&
        document.querySelector(`[square-id="${startId}"]`).firstChild?.getAttribute('id') === 'king' &&
        startId + 2 === targetId &&  
        !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && 
        document.querySelector(`[square-id="${startId + 3}"]`).firstChild?.getAttribute('id') === 'rook' 
        
    )
    {
        if (currPeice === 'white')
        {
            castleWhite = false
            console.log("castleWhite", castleWhite)
        }
        else
        {
            castleBlack = false
        }
        return "Right"
    }
    else if (
        document.querySelector(`[square-id="${startId}"]`).firstChild?.getAttribute('id') === 'king' &&
        startId + 2 === targetId && currPeice === 'white' && castleWhite &&
        !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && 
        !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && 
        !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && 
        document.querySelector(`[square-id="${startId + 4}"]`).firstChild?.getAttribute('id') === 'rook' ||
        document.querySelector(`[square-id="${startId}"]`).firstChild?.getAttribute('id') === 'king' &&
        startId - 2 === targetId && currPeice === 'black' && castleBlack &&
        !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && 
        !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && 
        !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && 
        document.querySelector(`[square-id="${startId - 4}"]`).firstChild?.getAttribute('id') === 'rook'
    )
    {
        if (currPeice === 'white')
        {
            castleWhite = false
        }
        else
        {
            castleBlack = false
        }
        return "Left"
    }
    else
    {
        return
    }
}
function checkIfenpassantValid(target)
{
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(positionID)
    const enpassantRow = [32, 33, 34, 35, 36, 37, 38, 39]
    if (
        startId - 1 === lastMove && enpassantRow.includes(startId) && lastMove + width === targetId ||
        startId + 1 === lastMove && enpassantRow.includes(startId) && lastMove + width === targetId && 
        document.querySelector(`[square-id = "${lastMove}"]`).firstChild.getAttribute('id') === 'pawn' && 
        document.querySelector(`[square-id = "${startId}"]`).firstChild.getAttribute('id') === 'pawn'
        )
    {
        return true;
    }
}

function checkIfValid(target)
{
    targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(positionID)
    const peice = draggedElement.id 
    console.log('targetId', targetId)
    console.log('startId', startId)
    console.log('peice', peice)

    switch(peice)
    { /* Add king can't move to checked sqaures, \, gamewin()
    , gamedraw(), gamelose(), moving dead peices to bottom, show all moves (back and forth) and promotion*/
        case 'pawn' :
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild|| 
                startId + width - 1 === targetId && 
                document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                startId + width + 1 === targetId && 
                document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild
                )
            {
                return true
            }
            break;
        case 'knight' :
            if (
                startId + width*2 - 1 === targetId || 
                startId + width*2 + 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width*2 - 1 === targetId || 
                startId - width*2 + 1 === targetId ||
                startId - width - 2 === targetId ||
                startId - width + 2 === targetId
                ) 
            {
                return true;
            }
            break;
        case 'bishop' :
            if (
                startId + width + 1 === targetId ||

                startId + width*2 + 2 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                
                startId + width*3 + 3 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild ||
                
                startId + width*4 + 4 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild || 
                
                startId + width*5 + 5 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild ||
                
                startId + width*6 + 6 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 + 5}"]`).firstChild ||
                
                startId + width*7 + 7 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 + 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + width*6 + 6}"]`).firstChild ||

                startId + width - 1 === targetId ||
                
                startId + width*2 - 2 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                
                startId + width*3 - 3 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild ||
                
                startId + width*4 - 4 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild || 
                
                startId + width*5 - 5 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild ||
                
                startId + width*6 - 6 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 - 5}"]`).firstChild ||
                
                startId + width*7 - 7 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 - 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + width*6 - 6}"]`).firstChild ||

                startId - width + 1 === targetId ||
                
                startId - width*2 + 2 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                
                startId - width*3 + 3 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild ||
                
                startId - width*4 + 4 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild || 
                
                startId - width*5 + 5 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild ||
                
                startId - width*6 + 6 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 + 5}"]`).firstChild ||
                
                startId - width*7 + 7 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 + 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - width*6 + 6}"]`).firstChild ||

                startId - width - 1 === targetId ||
                
                startId - width*2 - 2 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                
                startId - width*3 - 3 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild ||
                
                startId - width*4 - 4 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild || 
                
                startId - width*5 - 5 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild ||
                
                startId - width*6 - 6 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 - 5}"]`).firstChild ||
                
                startId - width*7 - 7 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 - 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - width*6 - 6}"]`).firstChild
                )
            {
                console.log('color', document.querySelector(`[square-id="${startId + width + 1}"]`).getAttribute('background-color'))
                return true;
            }
            break;
        case 'rook' :
            if (
                startId + width === targetId ||
                
                startId + 2*width === targetId  && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                
                startId + 3*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild||
                
                startId + 4*width === targetId &&
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild ||
                
                startId + 5*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild ||
                
                startId + 6*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5*width}"]`).firstChild ||
                
                startId + 7*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6*width}"]`).firstChild ||

                startId - width === targetId ||

                startId - 2*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||

                startId - 3*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild ||
                
                startId - 4*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild ||

                startId - 5*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild ||

                startId - 6*width === targetId && 
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5*width}"]`).firstChild ||
                
                startId - 7*width === targetId && 
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6*width}"]`).firstChild ||
                //Problamatic Code
                startId + 1 === targetId ||
                
                startId + 2 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||

                startId + 3 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                
                startId + 4 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                
                startId + 5 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                
                startId + 6 === targetId && 
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                
                startId + 7 === targetId && 
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                
                startId - 1 === targetId ||
                
                startId - 2 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                
                startId - 3 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                
                startId - 4 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                
                startId - 5 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                
                startId - 6 === targetId && 
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                
                startId - 7 === targetId && 
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
                )
            {
                return true;
            }
            break;
        case 'queen' :
            if (
                startId + width === targetId ||
                
                startId + 2*width === targetId  && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                
                startId + 3*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild||
                
                startId + 4*width === targetId &&
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild ||
                
                startId + 5*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild ||
                
                startId + 6*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5*width}"]`).firstChild ||
                
                startId + 7*width === targetId && 
                !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5*width}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6*width}"]`).firstChild ||

                startId - width === targetId ||

                startId - 2*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||

                startId - 3*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild ||
                
                startId - 4*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild ||

                startId - 5*width === targetId &&
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild ||

                startId - 6*width === targetId && 
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5*width}"]`).firstChild ||
                
                startId - 7*width === targetId && 
                !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4*width}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5*width}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6*width}"]`).firstChild ||
                
                startId + 1 === targetId ||
                
                startId + 2 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||

                startId + 3 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                
                startId + 4 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                
                startId + 5 === targetId &&
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                
                startId + 6 === targetId && 
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                
                startId + 7 === targetId && 
                !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||
                //Problamatic Code
                startId - 1 === targetId ||
                
                startId - 2 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                
                startId - 3 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                
                startId - 4 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                
                startId - 5 === targetId &&
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                
                startId - 6 === targetId && 
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                
                startId - 7 === targetId && 
                !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild ||

                startId + width + 1 === targetId ||
                
                startId + width*2 + 2 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild ||
                
                startId + width*3 + 3 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild ||
                
                startId + width*4 + 4 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild || 
                
                startId + width*5 + 5 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild ||
                
                startId + width*6 + 6 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 + 5}"]`).firstChild ||
                
                startId + width*7 + 7 === targetId && 
                !document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 + 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + width*6 + 6}"]`).firstChild ||

                startId + width - 1 === targetId ||
                
                startId + width*2 - 2 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
                
                startId + width*3 - 3 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild ||
                
                startId + width*4 - 4 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild || 
                
                startId + width*5 - 5 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild ||
                
                startId + width*6 - 6 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 - 5}"]`).firstChild ||
                
                startId + width*7 - 7 === targetId && 
                !document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width*5 - 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId + width*6 - 6}"]`).firstChild ||

                startId - width + 1 === targetId ||
                
                startId - width*2 + 2 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild ||
                
                startId - width*3 + 3 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild ||
                
                startId - width*4 + 4 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild || 
                
                startId - width*5 + 5 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild ||
                
                startId - width*6 + 6 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 + 5}"]`).firstChild ||
                
                startId - width*7 + 7 === targetId && 
                !document.querySelector(`[square-id="${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 + 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 + 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - width*6 + 6}"]`).firstChild ||

                startId - width - 1 === targetId ||
                
                startId - width*2 - 2 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild ||
                
                startId - width*3 - 3 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild ||
                
                startId - width*4 - 4 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId + width*3 - 3}"]`).firstChild || 
                
                startId - width*5 - 5 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild ||
                
                startId - width*6 - 6 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 - 5}"]`).firstChild ||
                
                startId - width*7 - 7 === targetId && 
                !document.querySelector(`[square-id="${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*2 - 2}"]`).firstChild  && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild
                && !document.querySelector(`[square-id="${startId - width*3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width*5 - 5}"]`).firstChild &&
                !document.querySelector(`[square-id="${startId - width*6 - 6}"]`).firstChild
                )
            {
                return true;
            }
            break;
            case 'king':
                if (
                    startId + width === targetId ||
                    startId - width === targetId ||
                    startId - width - 1 === targetId ||
                    startId - width + 1 === targetId ||
                    startId + width - 1 === targetId ||
                    startId + width + 1 === targetId ||
                    startId + 1 === targetId ||
                    startId - 1 === targetId
                )
            {
                if (playerTurn === 'white')
                {
                    castleWhite = false
                }
                else
                {
                    castleBlack = false
                }
                return true;
            }
            break;
    }
}
/*function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}*/

function changePlayer() 
{
    if (playerTurn === 'black')
    {
        reverseIds()
        playerTurn = 'white'
        playerDisplay.textContent = 'white'
    }
    else
    {
        revertIds()
        playerTurn = 'black'
        playerDisplay.textContent = 'black'
    }
}

function reverseIds() 
{
    const allSqaures = document.querySelectorAll('.square')
    allSqaures.forEach((square, i) => 
        square.setAttribute('square-id', (width * width - 1) - i))
}

function revertIds()
{
    const allSqaures = document.querySelectorAll('.square')
    allSqaures.forEach((square, i) => 
        square.setAttribute('square-id', i))
}