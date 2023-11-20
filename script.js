const gameContainer = document.getElementById('game-container')


const winCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


var userOne = []
var userTwo = []

var currentUserClick = 0

var gameOver = false;

var playerOneWins = 0
var playerTwoWins = 0
var catsGameWins = 0

function renderGame(){
    const cellstoDelete = document.querySelectorAll('.cell')
    cellstoDelete.forEach(cell => {
        cell.remove();
    });



    for(let i=0; i <=8; i++){
        renderGameWins()
        const cell = document.createElement('div')
        cell.id=i
        cell.className="cell"
        let gameDetails = document.getElementById('game-details')

        const currentTurn = document.getElementById('currentTurn')
        currentTurn.innerHTML = ' '
        currentTurn.innerHTML = "Your turn: Player 1"
        anime({
            targets: cell,
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 500},
                {value: 1, easing: 'easeInOutQuad', duration: 1000}
              ],
            rotate:'180',
         
              delay: anime.stagger(5, {grid: [3, 3], from: 'center'})
        });

        gameContainer.appendChild(cell)
        if(i%2 == 0 ){
            cell.style.background="#fff"

        }else{
            cell.style.background="#ggg"
        }
        cell.addEventListener('click', function(){

            if(userOne.includes(i) || userTwo.includes(i)){
                return
            }
            
            if(gameOver){
                return
            }

            if(currentUserClick%2 == 0 ){
                cell.innerHTML = "X"
                anime({
                    targets: cell,
                    translateX: 0,
                    rotate: {
                        value: 0,
                        duration: 2000,
                        easing: 'easeOutElastic'
                      },
                    duration:2000
                });
                currentTurn.innerHTML = ' '
                currentTurn.innerHTML = "Your turn: Player 2"
    
            }else{
                cell.innerHTML = "O"
                anime({
                    targets: cell,
                    translateX: 0,
                    rotate: '0',
                    duration:2000
                });
                currentTurn.innerHTML = ' '
                currentTurn.innerHTML = "Your turn: Player 1"
            }

            if(currentUserClick %2 == 0 ){
                userOne.push(i)
                checkCatsGame()
                currentUserClick++
                if(winCheck(userOne)){
                    
                    gameDetails.style.opacity="1"
                    gameDetails.innerHTML = " "
                    gameDetails.innerHTML = "You won player 1"
                    playerOneWins++
                    anime({
                        targets: gameDetails,
                        translateX: 200,
                        duration:2000
                    });
                    ResetGame()
                }else{
                    
                    // console.log(userOne)

                }
            }else{
                userTwo.push(i)
                checkCatsGame()
                currentUserClick++
                if(winCheck(userTwo)){
                    
                    gameDetails.style.opacity="1"
                    gameDetails.innerHTML = " "
                    gameDetails.innerHTML = "You won player 2"
                    playerTwoWins++
                    anime({
                        targets: gameDetails,
                        translateX: 200,
                        duration:2000
                    });
                    // gameOver=true
                    ResetGame()
                }else{
                    
                    // console.log( userTwo)

                }
            }
    
        })
        
    }
}

renderGame()



function winCheck(userList){
    return winCombinations.some(combination =>
        combination.every(elem => userList.includes(elem))
    );

    
}

function checkCatsGame(){
    if((userOne.length + userTwo.length) >= 9){
        let gameDetails = document.getElementById('game-details')
            gameDetails.style.opacity="1"
            gameDetails.innerHTML = " "
            gameDetails.innerHTML = "Cats game"
            anime({
                targets: gameDetails,
                translateX: 200,
                duration:2000
            });
            // gameOver=true
            catsGameWins++
            ResetGame()

    }
}

function ResetGame(){
    // location.reload()
    let gameDetails = document.getElementById('game-details')
    userOne = []
    userTwo=[]
    currentUserClick = 0
    renderGame()

}

function renderGameWins(){
    const totalWins = document.getElementById('total-wins')
    totalWins.innerHTML = ''
    totalWins.innerHTML= 'Player 1: ' + playerOneWins +"&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp Player 2: " + playerTwoWins  +" &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Cats Game: " + catsGameWins
}