/*
ChessBoard Interactive Frontend Program JS part 1
Written By: Kshitij Tomar
*/
//All the necessary starting constants
let checkArray = [0, 0];
/*
This function is repeateduly called to flip the board with all of its contently properly flipped
This is mainly useful in 2 player chess, however may be useful when the computer is given a time restrain
This function does not return anything and does not require any paramaters
*/
function flipBoards() 
{
    let i = 0;
    let j = 63;
    let temp;
    while (i < j) {
        temp = document.querySelector(`[id = "${i}"]`).innerHTML;
        document.querySelector(`[id = "${i}"]`).innerHTML = document.querySelector(`[id = "${j}"]`).innerHTML;
        document.querySelector(`[id = "${j}"]`).innerHTML = temp;

        temp = document.querySelector(`[id = "${i}"]`).getAttribute('square-id');
        document.querySelector(`[id = "${i}"]`).setAttribute('square-id', document.querySelector(`[id = "${j}"]`).getAttribute('square-id'));
        document.querySelector(`[id = "${j}"]`).setAttribute('square-id', temp);

        document.querySelector(`[id = "${i}"]`).setAttribute('id', j);
        document.querySelector(`[id = "${j}"]`).setAttribute('id', i);

        i++;
        j--;
    }

    i = 0;
    j = 7;
    while (i < j) {
        temp = document.querySelector(`[text-id = "${i}"]`).innerHTML;
        document.querySelector(`[text-id = "${i}"]`).innerHTML = document.querySelector(`[text-id = "${j}"]`).innerHTML;
        document.querySelector(`[text-id = "${j}"]`).innerHTML = temp;

        document.querySelector(`[text-id = "${i}"]`).setAttribute('text-id', j);
        document.querySelector(`[text-id = "${j}"]`).setAttribute('text-id', i);

        i++;
        j--;
    }

    i = 1;
    j = 8;
    while (i < j) {
        temp = document.querySelector(`[down-id = "${i}"]`).innerHTML;
        document.querySelector(`[down-id = "${i}"]`).innerHTML = document.querySelector(`[down-id = "${j}"]`).innerHTML;
        document.querySelector(`[down-id = "${j}"]`).innerHTML = temp;

        document.querySelector(`[down-id = "${i}"]`).setAttribute('down-id', j);
        document.querySelector(`[down-id = "${j}"]`).setAttribute('down-id', i);

        i++;
        j--;
    }

    const allPeiceWhite = document.querySelectorAll("#deadwhite .peice");
    const allPeiceBlack = document.querySelectorAll("#deadblack .peice");
    deadWhite.replaceChildren(...allPeiceBlack);
    deadBlack.replaceChildren(...allPeiceWhite);
}

/*
This function is repeateduly called to flip the board as well change the tag and turn of the players
This function does not return anything and does not require any paramaters
*/
function changePlayer() {
    console.log("I am called");
    flipBoards();
    if (playerTurn === 'black') {
        playerTurn = 'white'; //Uses the playerTurn attribute from the peices.js file
        playerDisplay.textContent = 'white';
    }
    else {
        playerTurn = 'black';
        playerDisplay.textContent = 'black';
    }
}


//Here, we add all of the eventListners that we had created
const allSquares = document.querySelectorAll('.square')
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', dragDrop);
})


/*
@param target: Passes in the targeted element
This function handles the values that are saved when the chosen element is picked to be moved
This allows the other methods to perform the operations that they do and handles dragging of the peice
*/
function dragStart(e) 
{
    draggedElement = e.target;
    positionID = draggedElement.parentNode.getAttribute('id');
    startLoc = draggedElement.parentNode.getAttribute('square-id');
}

/*
@param target: Passes in the targeted element
This function takes the standard of the dragOver method and turns it off
This allows the user to drag the peices over the squares without it being stuck
*/
function dragOver(e) 
{
    e.preventDefault();
}

/*
@param startPos: Passes in the starting position of the element
@return moves: An array of elements containing all of the valid moves of the dragged element
This function uses some global variables to check for all the valid moves given a starting position
*/
function moveArray(startPos) 
{
    let moves = new Array();
    console.log('startPos', startPos);
    let peice = document.querySelector(`[square-id = "${startPos}"]`).firstChild.id;
    console.log('peice', peice)
    switch (peice) 
    {
        case 'pawn': //add row checking
            moves = pawnMoves(startPos);
            break;
        
        case 'knight': //add row checking
            moves = knightMoves(startPos);
            break;

        case 'bishop':
            moves = diagonalMoves(startPos);
            break;

        case 'rook':
            moves = straightMoves(startPos);
            break;

        case 'queen':
            moves = diagonalMoves(startPos).concat(straightMoves(startPos));
            break;

        case 'king':
            moves = kingMoves(startPos);
            break;
        default:
            break;
    }
    return moves
}
/*
@param e: Passes in the dragged element of the location where the peice is trying to drop
@return void
Function that handles the dropping of a peice onto a square on the gameboard
The function checks for the all the preconstrains of a given move and implements that to drop the peice
If a peice is not dropped, it returns back to its original square
*/
function dragDrop(e) 
{
    e.stopPropagation();
    const currentPlayerPeice = draggedElement.classList.contains(playerTurn);
    const startPos = startLoc;
    const valid = checkIfValid(e.target, startPos);
    console.log(valid);
    const currentOppPeice = playerTurn === 'white' ? 'black' : 'white';
    const takeable = e.target.classList.contains(currentOppPeice);
    const checkCastle = checkIfCastleValid(e.target, startPos);
    const startId = Number(positionID);
    if (currentPlayerPeice) 
    {
        if (takeable && valid) 
        {
            e.target.parentNode.append(draggedElement);
            if (draggedElement.innerHTML === king || draggedElement.innerHTML === rook) 
            {
                draggedElement.setAttribute('castleable', false);
            }
            deadBlack.append(e.target.parentNode.firstChild);
            lastMove = Number(e.target.getAttribute('id')) || Number(e.target.parentNode.getAttribute('id'));
            checkForWin();
            changePlayer();
            return
        }
        else if (checkCastle) {
            e.target.append(draggedElement)
            if (playerTurn === 'white' && startId < targetId) 
            {
                document.querySelector(`[id = "${targetId - 1}"]`).append(document.querySelector(`[id = "${targetId + 1}"]`).firstChild)
            } 
            else if (playerTurn === 'white' && startId > targetId)
            {
                document.querySelector(`[id = "${targetId + 1}"]`).append(document.querySelector(`[id = "${targetId - 2}"]`).firstChild)
            }
            else if (playerTurn === 'black' && startId > targetId)
            {
                document.querySelector(`[id = "${targetId + 1}"]`).append(document.querySelector(`[id = "${targetId - 1}"]`).firstChild)
            }
            else
            {
                document.querySelector(`[id = "${targetId - 1}"]`).append(document.querySelector(`[id = "${targetId + 2}"]`).firstChild)
            }
            lastMove = Number(e.target.getAttribute('id')) || Number(e.target.parentNode.getAttribute('id'))
            checkForWin()
            changePlayer()
            return
        }
        else if (valid) 
        {
            console.log("I am called");
            e.target.append(draggedElement)
            if (draggedElement.getAttribute('id') === 'king' || draggedElement.getAttribute('id') === 'rook') 
            {
                console.log('element', draggedElement)
                draggedElement.setAttribute('castleable', false)
            }
            lastMove = Number(e.target.getAttribute('id')) || Number(e.target.parentNode.getAttribute('id'))
            checkForWin()
            changePlayer()
            return
        }
        else 
        {
            console.log('fail')
            return
        }
    }
}
/*
@param target: Passes in the targeted element
@return boolean: Indicates whether a given targeted element is contained in the validMoves list
This function uses the above function to construct a valid move array.
The JavaScript in-built function handles and returns a boolean value if that element is present inside the array
*/
function checkIfValid(target, startPos) 
{
    let targetPos
    if (!target.firstChild) //target is a square
    {
        targetPos = target.getAttribute('square-id')
    }
    else //target is a peice
    {
        targetPos = target.parentNode.getAttribute('square-id')
    }
    console.log('targetPos', targetPos)
    console.log('arr', moveArray(startPos))
    return (moveArray(startPos)?.includes(targetPos) || false)
}

/*
@param playerTurn: The current turn of a player
@return: A boolean that tells whether both kings are present on the board
This is a function that checks whether both player's kings are currently in the game
*/
function checkForKing(playerTurn)
{
    let ans = true
    const kings = Array.from(gameBoard.querySelectorAll('#king'))
    const currentOppPeice = playerTurn === 'white' ? 'black' : 'white'
    kings.forEach(king => 
    {
        if (king.classList.contains(currentOppPeice))
        {
            ans = false
        }
    })
    return ans
}

function isInCheck(kings, playerTurn)
{
    const allOppositePeices = Array.from(gameBoard.querySelectorAll(`.${playerTurn}`))
    console.log('peices', allOppositePeices)
    kings.forEach(king => 
    {
        let locationId = king.parentNode.getAttribute("square-id")
        console.log('loc', locationId)
        allOppositePeices.forEach(peice => 
        {
            if (moveArray(peice.parentNode.getAttribute('square-id'))?.includes(locationId))
            {
                return true
            }
        }) 
    })
    return false
}


/*
This is a function that checks whether the game is finished 
Once the game is finished, it decides which player has won and displays that on the screen
All of the peices lose their ability to move 
*/
function checkForWin()
{
    const kings = Array.from(gameBoard.querySelectorAll('#king'))
    console.log('kings', kings)
    const currentTurn = playerTurn === 'white' ? 0 : 1
    if (checkForKing(playerTurn) && playerTurn === 'white')
    {
        infoDisplay.innerHTML = "White Wins"
        const allSquares = document.querySelectorAll('#square')
        allSquares.forEach(square => 
        {
            const peice = square.firstChild
            if (peice)
            {
                peice.setAttribute('draggable', false)
            }
        })
    }
    if (checkForKing(playerTurn) && playerTurn === 'black')
    {
        infoDisplay.innerHTML = "Black Wins"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => 
        {
            const peice = square.firstChild
            if (peice)
            {
                peice.setAttribute('draggable', false)
            }
        }
        )
    }
    if (isInCheck(kings, playerTurn))
    {
        checkArray[currentTurn]++
        console.log('checked!', checkArray[currentTurn])
    }
    if (checkArray[0] === 3)
    {
        infoDisplay.innerHTML = "White Wins"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => 
        {
            const peice = square.firstChild
            if (peice)
            {
                peice.setAttribute('draggable', false)
            }
        }
        )
    }
    else if (checkArray[1] === 3)
    {
        infoDisplay.innerHTML = "Black Wins"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => 
        {
            const peice = square.firstChild
            if (peice)
            {
                peice.setAttribute('draggable', false)
            }
        }
        )
    }
}

