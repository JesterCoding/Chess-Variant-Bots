/*
Credits given to fontawesome.com for providing the SVG files
ChessBoard Interactive Frontend Program JS part 2
Written by Kshitij Tomar
*/
const gameBoard = document.querySelector("#gameboard")
const underBoard = document.querySelector("#underboard")
const deadBlack = document.querySelector("#deadblack")
const deadWhite = document.querySelector("#deadwhite")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerTurn = 'white'
playerDisplay.textContent = 'white'
const king = '<div class="peice" id = "king"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const knight = '<div class="peice" id = "knight"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg></div>';
const bishop = '<div class="peice" id = "bishop"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg></div>';
const rook = '<div class="peice" id = "rook"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>';
const pawn = '<div class="peice" id = "pawn"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z"/></svg>';
const queen = '<div class="peice" id = "queen"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg>';

const startPeices =
    [
        [rook, knight, bishop, queen, king, bishop, knight, rook],
        [pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        [pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn],
        [rook, knight, bishop, queen, king, bishop, knight, rook]
    ]

/*
@param int a: An integer ranging from 0 to 8
@param int b: An integer randing from 1 to 9
@return color: Return the color of a square, given it's coordinates
This function is called to setUp the classes and 
return the appropriate color for each square
*/
function findId(a, b) 
{
    let id;
    if (b === 1) 
    {
        id = 'A'
    }
    else if (b === 2) 
    {
        id = 'B'
    }
    else if (b === 3) 
    {
        id = 'C'
    }
    else if (b === 4) 
    {
        id = 'D'
    }
    else if (b === 5) 
    {
        id = 'E'
    }
    else if (b === 6)
    {
        id = 'F'
    }
    else if (b === 7) 
    {
        id = 'G'
    }
    else if (b === 8) 
    {
        id = 'H'
    }

    if (a === 0) 
    {
        id += '8'
    }
    else if (a === 1) 
    {
        id += '7'
    }
    else if (a === 2) 
    {
        id += '6'
    }
    else if (a === 3) 
    {
        id += '5'
    }
    else if (a === 4) 
    {
        id += '4'
    }
    else if (a === 5) 
    {
        id += '3'
    }
    else if (a === 6) 
    {
        id += '2'
    }
    else if (a === 7) 
    {
        id += '1'
    }

    return id
}
/*
@param int a: An integer ranging from 0 to 8
@param int b: An integer randing from 1 to 9
@return color: Return the color of a square, given it's coordinates
This function is called to setUp the classes and 
return the appropriate color for each square
*/
function findColor(a, b) 
{
    if ((a + b) % 2 === 0) 
    {
        return 'brown'
    }
    else 
    {
        return 'beige'
    }
}
/*
@param int a: An integer ranging from 0 to 8
@return color: Returns the color of the peice in a given square in the starting chess position
This function is called to return the peiceColor given the row a square is present in 
*/
function peiceColor(a) 
{
    if (a === 0 || a === 1) 
    {
        return 'black'
    }
    else if (a === 6 || a === 7) 
    {
        return 'white'
    }
}
/*
This function is called to create the original board that is interacted with
There are square elements that are enveloped around a gameBoard element
The gameBoard element has been given flex properties to make the square elements wrap in a square
*/
function createBoard() 
{
    let k = 0
    for (let i = 0; i < 8; i++) 
    {
        for (let j = 0; j < 9; j++) 
        {
            const square = document.createElement('div')
            square.classList.add('square')
            if (j === 0) 
            {
                square.innerHTML = 8 - i
                square.classList.add('text1')
                square.style.fontWeight = 'bold'
                square.setAttribute('text-id', i)
            }
            else 
            {
                square.innerHTML = startPeices[i][j - 1]
                square.setAttribute('square-id', findId(i, j))
                square.setAttribute('id', k)
                square.firstChild?.setAttribute('draggable', true)
                square.classList.add(findColor(i, j))
                square.firstChild?.classList.add(peiceColor(i))
                if (startPeices[i][j - 1] === rook || startPeices[i][j - 1] === king) 
                {
                    square.firstChild.setAttribute('castleable', true)
                }
                k++
            }

            gameBoard.append(square)
        }
    }
    for (let i = 0; i < 9; i++) 
    {
        const square = document.createElement('div')
        square.classList.add('text2')
        if (i !== 0) 
        {
            square.innerHTML = String.fromCharCode(i + 64)
            square.style.fontWeight = 'bold'
            square.setAttribute('down-id', i)
        }
        underBoard.append(square)
    }
}

/*
@param target: The targeted square that the peice wants to reach
@return boolean: Whether the move qualigies as a castle
Function to check whether the king can castle during a particular instance in time
It is required that neither the king nor participating rook have moved throughout the round
The king is allowed to castle on the kingside or the queenside, if previous conditions are met
*/
function checkIfCastleValid(target) 
{
    targetId = Number(target.getAttribute('id')) || Number(target.parentNode.getAttribute('id'))
    const startId = Number(positionID)
    console.log(positionID)
    console.log('startId', startId)
    if (playerTurn === 'white') 
    {
        if
            (
            document.querySelector(`[id="${startId}"]`).firstChild?.getAttribute('castleable') === 'true' &&
            document.querySelector(`[id="${startId + 3}"]`) &&
            document.querySelector(`[id="${startId + 3}"]`).firstChild?.getAttribute('castleable') === 'true'
            && startId + 2 === targetId &&
            !document.querySelector(`[id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[id="${startId + 2}"]`).firstChild ||

            document.querySelector(`[id="${startId}"]`).firstChild?.getAttribute('castleable') === 'true' &&
            startId - 2 === targetId && document.querySelector(`[id="${startId - 4}"]`).firstChild &&
            !document.querySelector(`[id="${startId - 1}"]`).firstChild &&
            !document.querySelector(`[id="${startId - 2}"]`).firstChild &&
            !document.querySelector(`[id="${startId - 3}"]`).firstChild &&
            document.querySelector(`[id="${startId - 4}"]`).firstChild?.getAttribute('castleable') === 'true'
            ) 
        {

            return true
        }
    }
    else if (playerTurn === 'black') 
    {
        if
            (
            document.querySelector(`[id="${startId}"]`).firstChild?.getAttribute('castleable') === 'true' &&
            document.querySelector(`[id="${startId - 3}"]`) &&
            document.querySelector(`[id="${startId - 3}"]`).firstChild?.getAttribute('castleable') === 'true'
            && startId - 2 === targetId &&
            !document.querySelector(`[id="${startId - 1}"]`).firstChild &&
            !document.querySelector(`[id="${startId - 2}"]`).firstChild ||
            document.querySelector(`[id="${startId}"]`).firstChild?.getAttribute('castleable') === 'true' &&
            startId + 2 === targetId && document.querySelector(`[id="${startId + 4}"]`) &&
            !document.querySelector(`[id="${startId + 1}"]`).firstChild &&
            !document.querySelector(`[id="${startId + 2}"]`).firstChild &&
            !document.querySelector(`[id="${startId + 3}"]`).firstChild &&
            document.querySelector(`[id="${startId + 4}"]`).firstChild?.getAttribute('castleable') === 'true'
            ) 
        {
            return true
        }
    }
    else 
    {
        return false
    }
}
/*
@param startPos: The starting position of the peice
@return: An array of squares that the peice could move in an L-shape
This is a function that takes in the starting position of some peice and then maps out the pawn moves of that peice
This function is necessary in coding and implementing the moving of pawns
Allows capture of enemy peices
*/
function pawnMoves(startPos)
{
    const moves = new Array()
    let positions = startPos.split("")
    let i = positions[0].charCodeAt(0)
    let j = Number(positions[1]) + 1
    console.log('i', i)
    console.log('j', j)
    console.log('square', document.querySelector(`[square-id="${startPos}"]`))
    if (document.querySelector(`[square-id="${startPos}"]`).firstChild.classList.contains('white'))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`)?.firstChild)
        {
            moves.push(positions[0] + j)
        }
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`)?.firstChild && positions[1] === '2' )
        {
            moves.push(String.fromCharCode(i) + (j+1))
        }
        if (document.querySelector(`[square-id="${String.fromCharCode(i+1) + j}"]`)?.firstChild)
        {
            moves.push(String.fromCharCode(i+1) + j)
        }
        if (document.querySelector(`[square-id="${String.fromCharCode(i-1) + j}"]`)?.firstChild)
        {
            moves.push(String.fromCharCode(i-1) + j)
        }
        console.log('moves', moves)
        return moves
    }
    else
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + (j-2)}"]`)?.firstChild)
        {
            moves.push(positions[0] + (j-2))
        }
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + (j - 2)}"]`)?.firstChild && positions[1] === '7')
        {
            moves.push(String.fromCharCode(i) + (j-3))
        }
        if (document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j - 2)}"]`)?.firstChild)
        {
            moves.push(String.fromCharCode(i+1) + (j-2))
        }
        if (document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j-2)}"]`)?.firstChild)
        {
            moves.push(String.fromCharCode(i-1) + (j-2))
        }
        console.log('moves', moves)
        return moves
    }
}
/*
@param startPos: The starting position of the peice
@return: An array of squares that the peice could move in an L-shape
This is a function that takes in the starting position of some peice and then maps out the knight moves of that peice
This function is necessary in coding and implementing the moving of knights
Allows capture of enemy peices
*/
function knightMoves(startPos)
{
    const moves = new Array()
    console.log('square', document.querySelector(`[square-id="${startPos}"]`))
    let positions = startPos.split("")
    let i = positions[0].charCodeAt(0)
    let j = Number(positions[1]) + 1
    console.log('i', i)
    console.log('j', j)
    moves.push(positions[0] + j)
    console.log('square', document.querySelector(`[square-id="${String.fromCharCode(i+1) + j+1}"]`))
    if (!document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j+1)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i+1) + (j+1))
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j+1)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i-1) + (j+1))
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i-2) + j}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i-2) + j)
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i-2) + (j-2)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i-2) + (j-2))
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j-3)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i+1) + (j-3))
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j-3)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i-1) + (j-3))
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i+2) + j}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i+2) + j)
    }
    if (!document.querySelector(`[square-id="${String.fromCharCode(i+2) + (j-2)}"]`)?.firstChild?.classList.contains(playerTurn)) 
    {
        moves.push(String.fromCharCode(i+2) + (j - 2))
    }
    console.log("moves", moves)
    return moves
}

/*
@param startPos: The starting position of the peice
@return: An array of squares that the peice could move to diagonally
This is a function that takes in the starting position of some peice and then maps out the diagonalMoves of that peice
This function is necessary in coding and implementing the moving of bishops and queens
The function only allows choosing squares within the bounds as well as not allowing a peice to jump over it's fellow peice
The function allows, however, the capture (but not the jumping over) opponent peices
*/
function diagonalMoves(startPos) 
{
    const moves = new Array()
    let positions = startPos.split("")
    let empty = true //4
    let i = positions[0].charCodeAt(0) + 1
    let j = Number(positions[1]) + 1
    while (i < 73 && j < 9 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (!document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i++
            j++
        }
    }
    empty = true

    i = positions[0].charCodeAt(0) - 1
    j = Number(positions[1]) - 1

    while (i > 64 && j > 0 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i--
            j--
        }
    }

    empty = true

    i = positions[0].charCodeAt(0) - 1
    j = Number(positions[1]) + 1

    while (i > 64 && j < 9 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i--
            j++
        }
    }

    empty = true

    i = positions[0].charCodeAt(0) + 1
    j = Number(positions[1]) - 1

    while (i < 73 && j > 0 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i++
            j--
        }
    }
    return moves
}

/*
@param startPos: The starting position of the peice
@return: An array of squares that the peice could move to horizontally
This is a function that takes in the starting position of some peice and then maps out the vertical 
and horizontal movements of that peice. This function is necessary in coding and implementing the
moving of rooks and queens. The function only allows choosing squares within the bounds of the gameboard
as well as not allowing a peice to jump over it's fellow peice. The function allows, however, the 
capture (but not the jumping over) opponent peices
*/

function straightMoves(startPos) 
{
    const moves = new Array()
    let positions = startPos.split("")
    let empty = true
    let i = positions[0].charCodeAt(0) + 1
    let j = Number(positions[1])
    while (i < 73 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i++
        }
    }
    empty = true

    i = positions[0].charCodeAt(0) - 1 
    j = Number(positions[1])

    while (i > 64 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            i--
        }
    }

    empty = true

    i = positions[0].charCodeAt(0)
    j = Number(positions[1]) + 1

    while (j < 9 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            j++
        }
    }

    empty = true

    i = positions[0].charCodeAt(0)
    j = Number(positions[1]) - 1

    while (j > 0 && empty) 
    {
        if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild) 
        {
            if (document.querySelector(`[square-id="${String.fromCharCode(i) + j}"]`).firstChild?.classList.contains(playerTurn)) 
            {
                moves.push(String.fromCharCode(i) + j)
            }
            empty = false
        }
        else 
        {
            moves.push(String.fromCharCode(i) + j)
            j--
        }
    }
    return moves
}
/*
@param startPos: The starting position of the peice
@return: An array of squares that the peice could move in an L-shape
This is a function that takes in the starting position of some peice and then maps out a move in every direction
This function is necessary in coding and implementing the moving of kings
Allows capture of enemy peices
*/
function kingMoves(startPos)
{
    const moves = new Array()
    let positions = startPos.split("")
    let i = positions[0].charCodeAt(0)
    let j = Number(positions[1])
    if (document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j+1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j+1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i+1) + j+1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j+1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j+1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i-1) + j+1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i) + (j+1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + (j+1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i) + j+1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i) + (j - 1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i) + (j-1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i) + j-1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j-1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i+1) + (j-1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i+1) + j-1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j-1)}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i-1) + (j-1)}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i-1) + j-1)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i+1) + j}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i+1) + j}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i+1) + j)
        }
    }
    if (document.querySelector(`[square-id="${String.fromCharCode(i-1) + j}"]`))
    {
        if (!document.querySelector(`[square-id="${String.fromCharCode(i-1) + j}"]`).firstChild?.classList.contains(playerTurn)) 
        {
            moves.push(String.fromCharCode(i-1) + j)
        }
    }
}

createBoard()