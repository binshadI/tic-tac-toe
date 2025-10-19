

const gameboard = (function(){

    let board = ["","","","","","","","",""];
    const getBoard = function(){
        return board;
    }

    const placeMark = function(mark,postion){
        if(board[postion] !==''){
            alert('already occupied')
           return false;
        }
        else if (board[postion] === ''){
            board[postion] = mark;
            return true
        }
    }

    const resetBoard = function(){
        board = ["","","","","","","","",""];        
        return board;
    }
    
    const player = (name,mark)=>{

        const getmark = ()=>{
            console.log(mark);
              
            return mark;
        } 

        const getname = ()=>{
            console.log(name);
            return name;
        }

        return { getmark,getname}

    }
    
    return{
        getBoard,
        placeMark,
        resetBoard,
        player,
    }
})();



const gameController = (function(){
    

    
    let player1;
    let player2;
    
    let currentPlayer;


        const setPlayer = (name1,name2)=>{
           player1 = gameboard.player( prompt(name1),"x")
            player2 = gameboard.player(prompt(name2),"o");
            currentPlayer = player1;
            console.log(player1,player2);           
        }

        // demi code 
        
        const printplayer = ()=>{
            console.log(currentPlayer.getname());
            
        }
        // demi code end


        let switchPlayers = ()=>{

            if(currentPlayer === player1){
                currentPlayer = player2;
                console.log(currentPlayer);
                
            }else{
                currentPlayer = player1;
                console.log(currentPlayer);
                
            }
        }

        const getCurrentplayer = ()=>{
            return currentPlayer;
        }

        const win = (mark)=>{

            const board = gameboard.getBoard();
            const winCondition = [
                [0,1,2],[3,4,5],[6,7,8],
                [0,3,6],[1,4,7],[2,5,8],
                [0,4,8],[2,4,6]
            ];

            for(let i = 0 ; i < winCondition.length; i++){
                let combo = winCondition[i];
                let [a,b,c] = combo;
                if(board[a] === mark && board[b] === mark && board[c] === mark ){

                    return true
                }
            }
            return false

        }

        const checkTie = ()=>{
            const board = gameboard.getBoard();

            if(win('x') || win('o')){
                return false;
            }
            for(let i =0 ; i<board.length; i++){
                if(board[i] === "")
                return false;
            }

            return true

        }

    
    return {
        setPlayer,
        switchPlayers,
        win,
        checkTie,
        //demi
        printplayer,
        getCurrentplayer,    }
})();




const domController = (function(){

    const cells = document.querySelectorAll('.cell');
    
    
    
    const playerSet = ()=>{
        gameController.setPlayer("enter player1 name;","enter player2 name");
    }
    
    const init = ()=>{
        cells.forEach((cell,index) => {
            cell.addEventListener('click',function(){
                const currentMark = gameController.getCurrentplayer().getmark();
                cell.textContent = currentMark;
                
                if(gameboard.placeMark(currentMark,index)){
                    updateBoard();
                    
                    if(gameController.win(currentMark)){
                        alert(`${currentMark} win`)
                        
                    }else if (gameController.checkTie()){
                        
                        alert("its a tie...");
                    }
                    else{
                        gameController.switchPlayers();
                    }
                }
            })
        });
    }
    
    const updateBoard = ()=>{
        const board = gameboard.getBoard();
        cells.forEach((cell,index)=>{
            cell.textContent =  board[index];
        })
    }

    //reset btn..
    document.getElementById('reset').addEventListener('click',()=>{
        gameboard.resetBoard();
        updateBoard();
        
    })




    return{
        init,
        updateBoard,
        playerSet,

    }

})();


domController.playerSet()
domController.init()
domController.updateBoard()