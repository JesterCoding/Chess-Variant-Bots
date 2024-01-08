/*
ChessBoard Interactive Frontend Program HTML
Written By: Kshitij Tomar
*/

const computerButton = document.querySelector('#btn1')
const playerButton = document.querySelector('#btn2')

function onButtonClick()
{
    const check = document.getElementById('pvp')
    if (!check)
    {
        const newScript = document.createElement('script')
        newScript.src = '2Player.js'
        newScript.id = 'pvp'
        document.body.appendChild(newScript)
    }
}

function onClick()
{
    const check = document.getElementById('comp')
    if (!check)
    {
        const newScript = document.createElement('script')
        newScript.src = 'Computer.js'
        newScript.id = 'comp'
        document.body.appendChild(newScript)
    }
}