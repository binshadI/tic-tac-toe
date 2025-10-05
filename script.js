const gameboard = function (){


    let board = ["","","","","","","","","","",];


    //displaying the board...

    let getboard = ()=>{
        return board;
    };

    //postion marking ...

    let placemark = (index,mark) =>{
        board.splice(index,1,mark);
    }

    //resting the board...
    let rest = () =>{
        board = ["","","","","","","","","","",];
    };

    return{
        getBoard : getboard,
        placeMark : placemark,
        restBoard : rest,
    }

    
}();