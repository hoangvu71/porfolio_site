class GetMove {
    constructor() {
        this.result = 0
        this.translateToBoard()
    }

    translateToBoard() {
        let board = []
        for (let row = 0; row <= 7; row++) {
            let rowIteration = []
            for (let collumn = 0; collumn <= 7; collumn++) {
                let checkerButton = document.getElementById([row, collumn])
                if (checkerButton.classList.contains("red_checker")){
                    rowIteration.push("r")
                }
                else if (checkerButton.classList.contains("blue_checker")){
                    rowIteration.push("b")
                }
                else if (checkerButton.classList.contains("red_king_checker")) {
                    rowIteration.push("R")
                }
                else if (checkerButton.classList.contains("blue_king_checker")) {
                    rowIteration.push("B")
                }
                else if (checkerButton.classList.contains("movable")) {
                    rowIteration.push(1)
                }
                else {
                    rowIteration.push(0)
                }
            }
            board.push(rowIteration)
        }
        console.log("This is from translated board: ", board)
        this.board = board    
    }

    checkRowCollumn(row, collumn) {
        // This will return false if row is less than 0 or bigger than 7.
        // Same with collumn
        if ((row >= 0 || row <= 7) && (collumn >= 0 || collumn <= 7)) {
            return true
        }
        else {return false}
    }

    getNeighbors(board, currentRow, currentCollumn) {
        // This should return the neighbor if it's 1 and if it's a possible jump neighbor
        // Result should be like this. [[currentRow, currentCollumn][neighborRow, neighborCollumn], 'normal'] if it's a normal move
        // [[currentRow, currentCollumn][neighborRow, neighborCollumn], 'jump'] if it's a jump move
        let checker = board[currentRow][currentCollumn]
        
        //////////// Checker's four neighbors are /////////////
        // let last_row_last_collumn = board[currentRow - 1][currentCollumn - 1]
        // let last_row_next_collumn = board[currentRow - 1][currentCollumn + 1]
        // let next_row_last_collumn = board[currentRow + 1][currentCollumn - 1]
        // let next_row_next_collumn = board[currentRow + 1][currentCollumn + 1]
        ///////////////////////////////////////////////////////

        let neighborsUnchecked = []
        // if checker is red, check south neighbors
        if (checker === 'r' && this.checkRowCollumn(currentRow+1, currentCollumn-1) && this.board[currentRow+1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn-1], 'normal')
        }
        if (checker === 'r' && this.checkRowCollumn(currentRow+1, currentCollumn+1) && this.board[currentRow+1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn+1], 'normal')
        }
        
        // if checker is blue, check north neighbors
        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn-1) && this.board[currentRow-1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn-1], 'normal')
        }
        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn+1) && this.board[currentRow-1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn+1], 'normal')
        }
        
        
        
        
        return neighborsUnchecked


    }

    getAllMoves() {
        let result = []
        let redMoves = []
        let blueMoves = []
        for (let row = 0; row <=7; row++){
            for (let col = 0; col <= 7; col++){
                let neighbor = this.getNeighbors(this.board, row, col)
                if (neighbor[0]) {
                    if (this.board[row][col] == 'r') {
                        redMoves.push(this.getNeighbors(this.board, row, col))
                    }
                    else if (this.board[row][col] == 'b') {
                        blueMoves.push(this.getNeighbors(this.board, row, col))
                    }
                }
            }
        }
        result.push(redMoves)
        result.push(blueMoves)

        console.log("Result: ", result)
        return result
    }

}



































//     let board = translateDocumentToBoard()
    

//     function getNeighbors(board, currentRow, currentCollumn) {
//         // if checker is red
//         // check row + 1 and either column +/- 1
//         // because red checker can only move down
//         let checker = board[currentRow, currentCollumn]

//         if (checker == 'r') {
//             let nextRowMinusColumn = [currentRow+1, currentCollumn-1]
//             let nextRowPlusColumn = [currentRow+1, currentCollumn+1]
//             return [nextRowMinusColumn, nextRowPlusColumn]
//         }

//         // if checker is red King or blue King
//         // checker row +/-1 and column +/-1
//         // because red King and Blue King can move up or down
//         else if (checker == 'R' || checker == 'B') {
//             let nextMinusRowMinusColumn = [currentRow-1, currentCollumn-1]
//             let nextMinusRowPlusColumn = [currentRow-1, currentCollumn+1]
//             let nextPlusRowMinusColumn = [currentRow+1, currentCollumn-1]
//             let nextPlusRowPlusColumn = [currentRow+1, currentCollumn+1]
//             return [nextMinusRowMinusColumn, nextMinusRowPlusColumn, nextPlusRowMinusColumn, nextPlusRowPlusColumn]
//         }

//         // if checker is blue 
//         // checker row - 1 and either column +/- 1
//         // because blue checker can only move up
//         else if (checker == 'b') {
//             let lastRowMinusColumn = [currentRow-1, currentCollumn-1]
//             let lastRowPlusColumn = [currentRow-1, currentCollumn+1]
//             return [lastRowMinusColumn, lastRowPlusColumn]
//         }
//         else {
//             return false
//         }
//     }

//     function getOpenNeighbors(board, currentRow, currentCollumn) {
//         // receive a list of neighbors
//         // check if that particular neighbor is a 1 
//         // if it is a 1, we can move there
//         let neighbors = getNeighbors(board, currentRow, currentCollumn)
//         console.log("This is neighbor", neighbors)
//         let openNeighbors = []
//         if (neighbors != false) {
//             for (const neighbor of neighbors){
//                 let row = neighbor[0]
//                 let collumn = neighbor[1]
//                 if (board[row][collumn] == 1){
//                     openNeighbors.append([row,collumn])
//                 }
//             }
//             return openNeighbors
//         }
//         return false
        
//     }
//     let result = []
//     for (let row = 0; row < 7; row++) {
//         for (let collumn = 0; collumn < 7; collumn++) {
//             if (getOpenNeighbors(board, row, collumn) != false){
//                 result.push(getOpenNeighbors(board, row, collumn))
//             }
//         }
//     }
//     console.log("*****", result)
//     return result
// }

export default GetMove