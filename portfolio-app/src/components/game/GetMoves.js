import {cloneDeep} from "lodash"


class GetMove {
    constructor(w0, w1, w2, w3, w4, w5, w6, red_win) {
        this.result = 0
        this.translateToBoard()
        this.x_one_blue_pieces = 0
        this.x_two_red_pieces = 0
        this.x_three_blue_king_pieces = 0
        this.x_four_red_king_pieces = 0
        this.x_five_blue_threatend = 0
        this.x_six_red_threatened = 0
        this.w_zero = w0
        this.w_one = w1
        this.w_two = w2
        this.w_three = w3
        this.w_four = w4
        this.w_five = w5
        this.w_six = w6
        this.red_win = red_win
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
        if ((row >= 0 && row <= 7) && (collumn >= 0 && collumn <= 7)) {
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
        let neighborsUncheckedJump = []
        // if checker is red, check south neighbors
        if (checker === 'r' && this.checkRowCollumn(currentRow+1, currentCollumn-1) && board[currentRow+1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn-1], 'normal')
        }
        if (checker === 'r' && this.checkRowCollumn(currentRow+1, currentCollumn+1) && board[currentRow+1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn+1], 'normal')
        }
        
        // if checker is blue, check north neighbors
        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn-1) && board[currentRow-1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn-1], 'normal')
        }
        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn+1) && board[currentRow-1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn+1], 'normal')
        }
        
        // if checker is blue and the neighbor is red, then check if blue can jump
        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn-1) 
            && (board[currentRow-1][currentCollumn-1] === 'r' ||  board[currentRow-1][currentCollumn-1] === 'R')
            && this.checkRowCollumn(currentRow-2, currentCollumn-2)
            && board[currentRow-2][currentCollumn-2] === 1) {
            // check if red can jump
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow -2, currentCollumn - 2], 'jump')
        }

        if (checker === 'b' && this.checkRowCollumn(currentRow-1, currentCollumn+1) 
            && (board[currentRow-1][currentCollumn+1] === 'r' || board[currentRow-1][currentCollumn+1] === 'R')
            && this.checkRowCollumn(currentRow-2, currentCollumn+2)
            && board[currentRow-2][currentCollumn+2] === 1) {
            // check if red can jump
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow -2, currentCollumn + 2], 'jump')
        } 
        
        // if checker is red and the neighbor is blue, then check if red can jump
        if (checker === 'r' 
            && this.checkRowCollumn(currentRow+1, currentCollumn-1) 
            && (board[currentRow+1][currentCollumn-1] === 'b' || board[currentRow+1][currentCollumn-1] === 'B')
            && this.checkRowCollumn(currentRow+2, currentCollumn-2)
            && board[currentRow+2][currentCollumn-2] === 1) {
            // check if red can jump
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow + 2, currentCollumn - 2], 'jump')
        }

        if (checker === 'r' 
            && this.checkRowCollumn(currentRow+1, currentCollumn+1) 
            && (board[currentRow+1][currentCollumn+1] === 'b' || board[currentRow+1][currentCollumn+1] === 'B') 
            && this.checkRowCollumn(currentRow+2, currentCollumn+2)
            && board[currentRow+2][currentCollumn+2] === 1) {
            // check if red can jump
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow +2, currentCollumn + 2], 'jump')
        }



        ////////////////////////If Checker is KING //////////////////////
        // if neighbor is a one,
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow-1, currentCollumn-1) && board[currentRow-1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn-1], 'normal')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow-1, currentCollumn+1) && board[currentRow-1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow-1, currentCollumn+1], 'normal')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow+1, currentCollumn-1) && board[currentRow+1][currentCollumn-1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn-1], 'normal')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow+1, currentCollumn+1) && board[currentRow+1][currentCollumn+1] == 1) {
            neighborsUnchecked.push([currentRow, currentCollumn], [currentRow+1, currentCollumn+1], 'normal')
        }

        // if neighbor is an opposite checker,
        function getOppositeChecker(checker) {
            if (checker === 'b' || checker === 'B') {
                return ['r', 'R']
            }
            else if (checker === 'r' || checker === 'R') {
                return ['b', 'B']
            }
            else {
                return ["Nothing"]
            }
        }
        let oppositeChecker = getOppositeChecker(checker)
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow-1, currentCollumn-1) && oppositeChecker.includes(board[currentRow-1][currentCollumn-1]) && this.checkRowCollumn(currentRow-2, currentCollumn-2) && board[currentRow-2][currentCollumn-2] == 1) {
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow-2, currentCollumn-2], 'jump')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow-1, currentCollumn+1) && oppositeChecker.includes(board[currentRow-1][currentCollumn+1]) && this.checkRowCollumn(currentRow-2, currentCollumn+2) && board[currentRow-2][currentCollumn+2] == 1) {
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow-2, currentCollumn+2], 'jump')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow+1, currentCollumn-1) && oppositeChecker.includes(board[currentRow+1][currentCollumn-1]) && this.checkRowCollumn(currentRow+2, currentCollumn-2) && board[currentRow+2][currentCollumn-2] == 1) {
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow+2, currentCollumn-2], 'jump')
        }
        if ((checker === 'B' || checker === 'R') && this.checkRowCollumn(currentRow+1, currentCollumn+1) && oppositeChecker.includes(board[currentRow+1][currentCollumn+1]) && this.checkRowCollumn(currentRow+2, currentCollumn+2) && board[currentRow+2][currentCollumn+2] == 1) {
            neighborsUncheckedJump.push([currentRow, currentCollumn], [currentRow+2, currentCollumn+2], 'jump')
        }




        if (neighborsUncheckedJump[0]) {
            return neighborsUncheckedJump
        }
        else if (neighborsUnchecked[0]) {
            return neighborsUnchecked
        }
        return [false]


    }

    getAllMoves(board=this.board) {
        let result = []
        let redMoves = []
        let redJumps = []
        let blueMoves = []
        let blueJumps = []
        for (let row = 0; row <=7; row++){
            for (let col = 0; col <= 7; col++){
                let neighbor = this.getNeighbors(board, row, col)
                if (neighbor[0]) {
                    if (board[row][col] == 'r' || board[row][col] == 'R') {
                        redMoves.push(this.getNeighbors(board, row, col))
                    }
                    else if (board[row][col] == 'b' || board[row][col] == 'B') {
                        blueMoves.push(this.getNeighbors(board, row, col))
                    }
                }
            }
        }
        result.push(redMoves)
        result.push(blueMoves)
        for (let indexBlue = 0; indexBlue < blueMoves.length; indexBlue++) {
            if (blueMoves[indexBlue][2] == "jump") {
                blueJumps.push(blueMoves[indexBlue])
            }
        }

        for (let indexRed = 0; indexRed < redMoves.length; indexRed++) {
            if (redMoves[indexRed][2] == "jump") {
                redJumps.push(redMoves[indexRed])
            }
        }
        
        if (redJumps.length > 0) {
            result.shift()
            result.unshift(redJumps)
        }

        if (blueJumps.length > 0) {
            result.pop()
            result.push(blueJumps)
        }
        result.push(blueMoves)
        return result
    }

    ///////////////// MACHINE LEARNING //////////////
    separateMoveArray(move) {
        // This function will separate move from [[row,collumn], [row, collumn], "normal", [row,collumn, [row,collumn], "normal"]]
        // to two separate list, [[[row,collumn], [row,collumn], "normal"], [[[row,collumn], [row,collumn], "normal"]]]
        let result = []
        for (let moveIndex = 0; moveIndex < move.length; moveIndex++) {
            for (let nestIndex = 0; nestIndex < move[moveIndex].length; nestIndex = nestIndex + 3){
                let currentRowCol = move[moveIndex][nestIndex]
                let neighborRowCol = move[moveIndex][nestIndex+1]
                let type = move[moveIndex][nestIndex + 2]
                result.push([currentRowCol, neighborRowCol, type])
            }
        }
        return result

    }

    getBlueRedThreatened(board) {
        // this function will return [numberOfRedThreatened, numberOfBlueThreatened]
        // if there are red jumps,
        // check each of the jump and save the killed checker coord in a list if it's not already in the list
        let allMoves = this.getAllMoves(board)
        let redMoves = allMoves[0]
        let blueMoves = allMoves[1]
        redMoves = this.separateMoveArray(redMoves)
        blueMoves = this.separateMoveArray(blueMoves)
        let killedBlueCheckers = []
        let killedRedCheckers = []
        for (let moveIndex = 0; moveIndex < redMoves.length; moveIndex++){
            let currentCoords = redMoves[moveIndex][0]
            let neighborCoords = redMoves[moveIndex][1]
            let killedCheckerCoords = [currentCoords[0] - ((currentCoords[0] - neighborCoords[0]) / 2), currentCoords[1] - ((currentCoords[1] - neighborCoords[1]) / 2)]
            let type = redMoves[moveIndex][2]
            if (type === "jump") {
                if (!killedBlueCheckers.includes(`${killedCheckerCoords}`)) {
                    killedBlueCheckers.push(`${killedCheckerCoords}`)
                }
            }
        }

        for (let moveIndex = 0; moveIndex < blueMoves.length; moveIndex++){
            let currentCoords = blueMoves[moveIndex][0]
            let neighborCoords = blueMoves[moveIndex][1]
            let killedCheckerCoords = [currentCoords[0] - ((currentCoords[0] - neighborCoords[0]) / 2), currentCoords[1] - ((currentCoords[1] - neighborCoords[1]) / 2)]
            let type = blueMoves[moveIndex][2]
            if (type === "jump") {
                if (!killedRedCheckers.includes(`${killedCheckerCoords}`)) {
                    killedRedCheckers.push(`${killedCheckerCoords}`)
                }
            }
        }
        return [killedRedCheckers.length, killedBlueCheckers.length]

    }


    getScore(board) {
        // x1 number of blue pieces on board
        // x2 number of red pieces on board
        // x3 number of blue king pieces on board
        // x4 number of red king pieces on board
        // x5 number of blue pieces threatened by red
        // x6 number of red pieces threatened by blue
        // V^(b) = w0 + w1x1 + w2x2 + w3x3 + w4x4 + w5x5 + w6x6 
        this.x_one_blue_pieces = 0
        this.x_two_red_pieces = 0
        this.x_three_blue_king_pieces = 0
        this.x_four_red_king_pieces = 0
        this.x_five_blue_threatend = 0
        this.x_six_red_threatened = 0
        for (let row = 0; row <= 7 ; row++) {
            for (let col = 0; col <= 7; col++) {
                let checker = board[row][col]
                if (checker == 'b') {
                    this.x_one_blue_pieces++
                }
                else if (checker == 'r') {
                    this.x_two_red_pieces++
                }
                else if (checker == 'B') {
                    this.x_three_blue_king_pieces++
                }
                else if (checker == 'R') {
                   this.x_four_red_king_pieces++
                }
                
            }
        }
        let blueRedThreatened = this.getBlueRedThreatened(board)
        let redThreatened = parseInt(blueRedThreatened[0])
        let blueThreatened = parseInt(blueRedThreatened[1])
        if (redThreatened) {
            this.x_six_red_threatened = redThreatened
        }
        if (blueThreatened) {
            this.x_five_blue_threatend = blueThreatened
        }
        
        //////////////GET SCORE WILL RETURN 0 IF NO REDS ON BOARD /////////////
        if (this.x_two_red_pieces === 0 && this.x_four_red_king_pieces === 0) {
            return 0
        }
        //////////////GET SCORE WILL RETURN 0 IF NO RED MOVES AVAILBLE ///////////
        let all_moves = this.getAllMoves(board)
        let red_moves = all_moves[0]
        let blue_moves = all_moves[1]
        if (red_moves.length === 0) {
            return 0
        }

        ////////////GET SCORE WILL RETURN 100 IF NO BLUES ON BOARD //////////////
        if (this.x_one_blue_pieces === 0 && this.x_three_blue_king_pieces === 0) {
            return 100
        }
        
        ////////////GET SCORE WILL RETURN 100 IF NO BLUE MOVES AVAILABLE ////////
        if (blue_moves.length === 0) {
            return 100
        }



        return this.w_zero + (this.w_one * this.x_one_blue_pieces) 
                + (this.w_two * this.x_two_red_pieces) 
                + (this.w_three * this.x_three_blue_king_pieces) 
                + (this.w_four * this.x_four_red_king_pieces)
                + (this.w_five * this.x_five_blue_threatend)
                + (this.w_six * this.x_six_red_threatened)
    }

    makeNewBoardStateFromMove(board, move) {
        let newBoard = cloneDeep(board)
        let currentRow = move[0][0]
        let currentCol = move[0][1]
        let neighborRow = move[1][0]
        let neighborCol = move[1][1]
        let checker = newBoard[currentRow][currentCol]
        let checkerNeighbor = newBoard[neighborRow][neighborCol]
        if (move[2] === "normal") {
            newBoard[neighborRow][neighborCol] = checker
            newBoard[currentRow][currentCol] = checkerNeighbor
        }
        else if (move[2] === "jump") {
            newBoard[neighborRow][neighborCol] = checker
            newBoard[currentRow][currentCol] = checkerNeighbor
            let killedCheckerRow = currentRow - (currentRow - neighborRow)/2
            let killedCheckerCol = currentCol - (currentCol - neighborCol)/2
            newBoard[killedCheckerRow][killedCheckerCol] = 1
            if (checker === "b" && currentRow === 0) {
                newBoard[currentRow][currentCol] = "B"
            }
            else if (checker === "r" && currentRow === 7) {
                newBoard[currentRow][currentCol] = "R"
            }
        }  

        

        return newBoard
    }

    findRedMoveAfterBlueMoves(bluemove, board) {
        let highestScore = false
        let stack = []
        stack.push([bluemove])
        let result = []
        while (stack.length > 0) {
            let blueMoves = stack.pop(0)
            let blueMove = blueMoves[blueMoves.length-1]
            let newBoard = this.makeNewBoardStateFromMove(board, blueMove)
            let allRedBlueMoves = this.getAllMoves(newBoard)
            let allRedMoves = allRedBlueMoves[0]
            let allBlueMoves = allRedBlueMoves[1]
            if (allRedMoves.length == 1) {
                // this means red can no longer move, hence blue wins.
                // so score is 0
                let redMovesWithScore = []
                redMovesWithScore.push(0, allRedMoves[0])
                result.push({
                    blueMovesAtOneTurn: allBlueMoves[0],
                    redMoves: redMovesWithScore,
                    board: newBoard,
                    score: 0
                })
                console.log("DING!!DING!!DING!!DING!!DING!! one more move from blue and blue wins!", result)
                return result
            }
            for (let index = 0; index < allBlueMoves.length; index ++) {
                for (let blueIndex = 0; blueIndex < allBlueMoves[index].length; blueIndex = blueIndex +3){
                    if (allBlueMoves[index][blueIndex + 2] === "jump" && blueMove[2] === "jump") {
                        let lastJumpEnded = blueMove[1]
                        let thisJumpStarted = allBlueMoves[index][blueIndex+1]
                        // console.log("red's turn", board)
                        // console.log("blue's turn", newBoard)
                        // console.log("red move", allRedMoves)
                        if (lastJumpEnded == thisJumpStarted) {
                            // then we say add it to stack
                            let newStack = []
                            blueMoves.push(allBlueMoves[index])
                            stack.push(blueMove)
                        }
                        else {
                            let redMovesWithScore = []
                        for (let redScoreIndex = 0; redScoreIndex < allRedMoves.length; redScoreIndex++){
                            for (let redScoreInsideIndex = 0; redScoreInsideIndex < allRedMoves[redScoreIndex].length; redScoreInsideIndex = redScoreInsideIndex+ 3) {
                                let redBoard = this.makeNewBoardStateFromMove(newBoard, [allRedMoves[redScoreIndex][redScoreInsideIndex], allRedMoves[redScoreIndex][redScoreInsideIndex+1], allRedMoves[redScoreIndex][redScoreInsideIndex+2]])
                                let redScore = this.getScore(redBoard)
                                if (redScore > highestScore) {
                                    highestScore = redScore
                                }
                                redMovesWithScore.push(redScore, [allRedMoves[redScoreIndex][redScoreInsideIndex], allRedMoves[redScoreIndex][redScoreInsideIndex+1], allRedMoves[redScoreIndex][redScoreInsideIndex+2]])
                            }
                        }
                        result.push({
                            blueMovesAtOneTurn: allBlueMoves[index],
                            redMoves: redMovesWithScore,
                            board: newBoard,
                            score: highestScore
                        })
                        }
                    }
                    else if (allBlueMoves[index][blueIndex + 2] === "normal") {
                        let redMovesWithScore = []
                        for (let redScoreIndex = 0; redScoreIndex < allRedMoves.length; redScoreIndex++){
                            for (let redScoreInsideIndex = 0; redScoreInsideIndex < allRedMoves[redScoreIndex].length; redScoreInsideIndex = redScoreInsideIndex+ 3) {
                                let redBoard = this.makeNewBoardStateFromMove(newBoard, [allRedMoves[redScoreIndex][redScoreInsideIndex], allRedMoves[redScoreIndex][redScoreInsideIndex+1], allRedMoves[redScoreIndex][redScoreInsideIndex+2]])
                                let redScore = this.getScore(redBoard)
                                if (redScore > highestScore) {
                                    highestScore = redScore
                                }
                                redMovesWithScore.push(redScore, [allRedMoves[redScoreIndex][redScoreInsideIndex], allRedMoves[redScoreIndex][redScoreInsideIndex+1], allRedMoves[redScoreIndex][redScoreInsideIndex+2]])
                            }
                        }
                        result.push({
                            blueMovesAtOneTurn: allBlueMoves[index],
                            redMoves: redMovesWithScore,
                            board: newBoard,
                            score: highestScore
                        })
                    }
                }
            }
        }

        return result
            
            

    }

    canRedJumpAgain(move){
        if (move[2] === 'jump') {
            let allMoves = this.getAllMoves(this.board)
            let redMoves = allMoves[0]
            console.log("all red moves in canredjumpagain: ", redMoves)
            console.log("board in canredjumpagain: ", this.board)
            for (let index = 0; index < redMoves.length; index++){
                if (move[1].toString() == redMoves[index][0].toString() && redMoves[0][2] === 'jump') {
                    this.redMove()
                } 
            }
        }
        
    }
    didRedWin() {
        return this.red_win
    }
    moveTheChecker(move, highestscore) {
        let startingPoint = move[0]
        let endingPoint = move[1]
        let type = move[2]
        let startDom = document.getElementById(startingPoint.toString())
        let endDom = document.getElementById(endingPoint.toString())
        if (type === 'normal') {
            if (parseInt(endingPoint[0]) === 7 && startDom.classList.contains("red_checker")) {
                startDom.classList.remove("red_checker")
                startDom.classList.add("movable")
                endDom.classList.add("red_king_checker")
            }
            else {
                if (startDom.classList.contains("red_checker")) {
                    startDom.classList.remove("red_checker")
                    endDom.classList.add("red_checker")

                }
                else if (startDom.classList.contains("red_king_checker")) {
                    startDom.classList.remove("red_king_checker")
                    endDom.classList.add("red_king_checker")

                }
                
                startDom.classList.add("movable")
            }
        }
        else if (type === 'jump') {
            // if it jumps to the last row, it will become "red king checker"
            if (parseInt(endingPoint[0]) === 7 && startDom.classList.contains("red_checker")) {
                startDom.classList.remove("red_checker")
                startDom.classList.add("movable")
                endDom.classList.add("red_king_checker")
            }
            else {
                if (startDom.classList.contains("red_checker")) {
                    startDom.classList.remove("red_checker")
                    endDom.classList.add("red_checker")
                }
                else if (startDom.classList.contains("red_king_checker")) {
                    startDom.classList.remove("red_king_checker")
                    endDom.classList.add("red_king_checker")
                }
                startDom.classList.add("movable")
            }
            

            let killedCheckerRow = startingPoint[0] - (startingPoint[0] - endingPoint[0]) / 2
            let killedCheckerCol = startingPoint[1] - (startingPoint[1] - endingPoint[1]) / 2
            let killedChecker = [killedCheckerRow, killedCheckerCol]
            let killedDom = document.getElementById(killedChecker)
            if (killedDom.classList.contains("blue_checker")) {
                killedDom.classList.remove("blue_checker")
            }
            else if (killedDom.classList.contains("blue_king_checker")) {
                killedDom.classList.remove("blue_king_checker")
            }
        }
        this.translateToBoard()
        console.log("What is the board right now?", this.board)
        this.calculateTheWave(move, this.board, highestscore)
        this.canRedJumpAgain(move)
        let allMoves = this.getAllMoves(this.board)
        let blueMoves = allMoves[1]
        if (blueMoves.length === 0) {
            console.log("RED WON!!!!")
            this.red_win = true
        }
    }

    canBlueMoveAgain(move) {
        
        let allMoves = this.getAllMoves(this.board)
        let blueMoves = allMoves[1]
        console.log("This is the move and this is the next jump move", move, allMoves)
        // check on all the all blue moves, if it is a jump and if the last jump is in the blue moves list, we return true
        for (let index = 0; index < blueMoves.length; index++){
            if (move[1].toString() == blueMoves[index][0].toString() && blueMoves[0][2] === 'jump') {
                return true
            } 
        }
        return false
    }
    
    calculateTheWave(move, board, v_train) {
        // gets v_b, which is the score of current move
        let v_b = this.getScore(this.board)
        console.log("This is number of red and blue threatedned: ", this.x_six_red_threatened, this.x_five_blue_threatend)

        console.log("This is vtrain: ", v_train, " This is v_b", v_b)

        ///////////////////// SAVE THE WEIGHTS TO TEMP WEIGHT //////////
        let temp_w_zero = this.w_zero
        let temp_w_one = this.w_one
        let temp_w_two = this.w_two
        let temp_w_three = this.w_three
        let temp_w_four = this.w_four
        let temp_w_five = this.w_five
        let temp_w_six = this.w_six
        /////////////////////////////////////////////////////////////////


        // calculating weights
        this.w_zero = this.w_zero + 0.01 * (v_train - v_b)
        this.w_one = this.w_one + 0.01 * (v_train - v_b) * this.x_one_blue_pieces
        this.w_two = this.w_two + 0.01 * (v_train - v_b) * this.x_two_red_pieces
        this.w_three = this.w_three + 0.01 * (v_train - v_b) * this.x_three_blue_king_pieces
        this.w_four = this.w_four + 0.01 * (v_train - v_b) * this.x_four_red_king_pieces
        this.w_five = this.w_five + 0.01 * (v_train - v_b) * this.x_five_blue_threatend
        this.w_six = this.w_six + 0.01 * (v_train - v_b) * this.x_six_red_threatened


        if (v_train > 100) {
            this.w_zero = this.w_zero / 2
            this.w_one = this.w_one / 2
            this.w_two = this.w_two / 2
            this.w_three = this.w_three / 2
            this.w_four = this.w_four / 2
            this.w_five = this.w_five / 2
            this.w_six = this.w_six / 2

        }
        // console.log("Weights, 0: ", this.w_zero, 
        //             "one: ", this.w_one,
        //             "two: ", this.w_two,
        //             "three: ", this.w_three,
        //             "four: ", this.w_four,
        //             "five: ", this.w_five,
        //             "six: ", this.w_six)
        
        
        // console.log("Pieces, x_one_blue_pieces:", this.x_one_blue_pieces,
        //                 "x_two_red_pieces:", this.x_two_red_pieces,
        //                 "x_three_blue_king_pieces:", this.x_three_blue_king_pieces,
        //                 "x_four_red_king_pieces:", this.x_four_red_king_pieces,
        //                 "x_five_blue_threatend:", this.x_five_blue_threatend,
        //                 "x_six_red_threatened:", this.x_six_red_threatened,   
        //                 )
        ///////////////////// DIFERENCES BETWEEN OLD AND NEW WEIGHTS //////////////////
        let diff_w_zero = this.w_zero - temp_w_zero
        let diff_w_one = this.w_one - temp_w_one
        let diff_w_two = this.w_two - temp_w_two
        let diff_w_three = this.w_three - temp_w_three
        let diff_w_four = this.w_four - temp_w_four
        let diff_w_five = this.w_five - temp_w_five
        let diff_w_six = this.w_six - temp_w_six
        ///////////////////////////////////////////////////////////////////////////////

        console.log("Weights differences: ")
        console.log("Difference Weight zero: ", diff_w_zero)
        console.log("Difference Weight one: ", diff_w_one)
        console.log("Difference Weight two: ", diff_w_two)
        console.log("Difference Weight three: ", diff_w_three)
        console.log("Difference Weight four: ", diff_w_four)
        console.log("Difference Weight five: ", diff_w_five)
        console.log("Difference Weight six: ", diff_w_six)

    }
    getHighestScoreFromBoardStates(boards){
        let highest_score = -10000000000
        let highestboard = 0
        for (let board_index = 0; board_index < boards.length; board_index++){
            let score = this.getScore(boards[board_index])
            if (score > highest_score) {
                highest_score = score
                highestboard = board_index
            }
        }
        console.log("Highest score board", boards[highestboard], highest_score)
        return highest_score
    }

    getTheWeights() {
        return [this.w_zero, this.w_one, this.w_two, this.w_three, this.w_four, this.w_five, this.w_six]
    }

    updateWeightWhenRedLost() {
        this.w_zero = this.w_zero + 0.1 * (-100)
        this.w_one = this.w_one + 0.1 * (-100) 
        this.w_two = this.w_two + 0.1 * (-100) 
        this.w_three = this.w_three + 0.1 * (-100) 
        this.w_four = this.w_four + 0.1 * (-100)
        this.w_five = this.w_five + 0.1 * (-100) 
        this.w_six = this.w_six + 0.1 * (-100) 
    }

    updateWeightWhenRedWon() {
        this.w_zero = this.w_zero + 0.1 * (100)
        this.w_one = this.w_one + 0.1 * (100) 
        this.w_two = this.w_two + 0.1 * (100) 
        this.w_three = this.w_three + 0.1 * (100) 
        this.w_four = this.w_four + 0.1 * (100) 
        this.w_five = this.w_five + 0.1 * (100) 
        this.w_six = this.w_six + 0.1 * (100)
    }

    blueWon() {
        let blue_won_dom = document.getElementById("id_blue_won")
        blue_won_dom.classList.add("blue_has_won")
        blue_won_dom.classList.remove("invisible")
        console.log("blue won, ", blue_won_dom)
    }
    redMove() {
        // This function will translate a board into possible red moves combination
        // once we get all the red moves, we also need to get all the possible blue moves combination, 
        // finally we get all the possible red moves (once it is our turn again)
        // structure will be like this [[score1, redmove1], [score2, redmove2],...]
        // in redmove, it will be like this [[score1, bluemove1], [score2,bluemove2],...]
        // in bluemove, it will be like this [[score1, redmove1], [score2, redmove2],...]

        ///////////////// GET ALL RED MOVES ///////////////
        // This function will get all the first red moves
        // return an array of arrays of [[currrentRow, currentCol], [neighborRow, neighborCol], "type"]

    //     let allMoves = this.getAllMoves(this.board)
    //     let redMoves = allMoves[0]
    //     redMoves = this.separateMoveArray(redMoves)
    //     let redMovesWithScore = []
    //     let highestScoreWithMove = ''
    //     let highestScore = 0
    //     if (redMoves.length == 1) {
    //         this.moveTheChecker(redMoves[0])

    //     }
    //     else if (redMoves.length == 0) {
    //         console.log("**************BLUE WON*************")
    //         return 0
    //     }
    //     else {
    //         for (let moveIndex = 0; moveIndex < redMoves.length; moveIndex++){
    //             let newBoard = this.makeNewBoardStateFromMove(this.board, redMoves[moveIndex])
    //             let score = this.getScore(newBoard) //////////////// ** WARNING ** ///////////
    //                                                            //////redmoved[moveIndex] is a move not a board state/////
    //             let AllRedBlueMoves = this.getAllMoves(newBoard)
    //             let blueMoves = AllRedBlueMoves[1]
    //             console.log("This is all the blue moves: ", blueMoves, " and length ", blueMoves.length)
    //             let redInBluesMove = []
                
    
    //             for (let blueMoveIndex = 0; blueMoveIndex < blueMoves.length; blueMoveIndex++){
    //                 for (let insideIndex = 0; insideIndex < blueMoves[blueMoveIndex].length; insideIndex = insideIndex + 3) {
    //                     let blueMoveStart = blueMoves[blueMoveIndex][insideIndex]
    //                     let blueMoveEnded = blueMoves[blueMoveIndex][insideIndex+1]
    //                     let blueMoveType = blueMoves[blueMoveIndex][insideIndex+2]
    //                     let newBlueBoard = this.makeNewBoardStateFromMove(newBoard, [blueMoveStart, blueMoveEnded, blueMoveType])
    //                     let redMovesAfterBlue = this.findRedMoveAfterBlueMoves([blueMoveStart, blueMoveEnded, blueMoveType], newBlueBoard)
    //                     // loop through red moves and find the highest score
    //                     for (let redMovesAfterBlueIndex = 0; redMovesAfterBlueIndex < redMovesAfterBlue.length; redMovesAfterBlueIndex++){
    //                         if (redMovesAfterBlue[redMovesAfterBlueIndex]['score'] > highestScore) {
    //                             highestScore = redMovesAfterBlue[redMovesAfterBlueIndex]['score']
    //                             highestScoreWithMove = redMoves[moveIndex]
    //                         }
    //                     }
    //                     redInBluesMove.push([redMovesAfterBlue])
    //                 }
                    
    //             }
    //             redMovesWithScore.push([{
    //                 score: highestScore,
    //                 board: this.board,
    //                 redMove: redMoves[moveIndex],
    //                 redMoveBoard: newBoard,
    //                 blueMovesInRed: redInBluesMove,
    //             }])
    //             console.log(redMovesWithScore)
    
    //             // redMovesWithScore.push([[score, redMoves[moveIndex]], [blueMoves]])
    //         }
    //         console.log("red move with score", redMovesWithScore)
    
    //         // make a function to move the red using the move
    //         this.moveTheChecker(highestScoreWithMove, highestScore)
    //     }

    
    let all_moves = this.getAllMoves()
    let red_moves = all_moves[0]
    let red_moves_separated = this.separateMoveArray(red_moves)
    ////////IF NO RED MOVES AVAILABLE, BLUE WINS ////////////
    if (red_moves_separated.length == 0) {
        console.log("Blue WON!")
        this.updateWeightWhenRedLost()
        this.blueWon()
        return 0
    } 
    



    let final_result = []
    // loops through the above red_moves
    for (let red_index = 0; red_index< red_moves_separated.length; red_index++){

        let new_red_board = this.makeNewBoardStateFromMove(this.board, red_moves_separated[red_index])

        let all_moves_2 = this.getAllMoves(new_red_board)
        let blue_moves = all_moves_2[1]
        blue_moves = this.separateMoveArray(blue_moves)
        let all_possible_blue_moves_in_this_red = []
        let all_possible_red_boards_again = []
        


        ///////////IF NO BLUE MOVES AVAILABLE AFTER A CERTAIN REDMOVE//////////
        ////////////THAT MEANS THAT RED MOVE V TRAIN SHOULD BE 100 /////////////

        if (blue_moves.length == 0) {
            console.log("After one red move, it will win!")
            
            final_result.push({
                v_b: this.getScore(new_red_board),
                v_train: 100,
                red_move: red_moves_separated[red_index],
                red_move_board_after: new_red_board,
                blue_moves_with_red_again: false
            })
            continue
        }
        ////////////////////END//////////////////////////////////////

        // now loops through all the blue_moves
        for (let blue_index = 0; blue_index < blue_moves.length; blue_index++){
            let new_blue_board = this.makeNewBoardStateFromMove(new_red_board, blue_moves[blue_index])
            let all_moves_3 = this.getAllMoves(new_blue_board)
            let red_moves_again = all_moves_3[0]
            all_possible_blue_moves_in_this_red.push({
                blue_move: blue_moves[blue_index],
                red_moves_again: red_moves_again
            })


            /////////////IF NO RED MOVES ONCE BLUE MOVE IS DONE//////////
            ////////////THAT MEANS BLUE HAS WON SO V TRAIN SHOULD BE -100
            if (red_moves_again.length == 0) {
                console.log("That blue move, it has won! No red moves again available")
                all_possible_red_boards_again.push(new_blue_board)
                continue
            }
            /////////////////END//////////////



            for (let red_moves_again_index = 0; red_moves_again_index < red_moves_again.length; red_moves_again_index++){
                let new_red_board_again = this.makeNewBoardStateFromMove(new_blue_board, red_moves_again[red_moves_again_index])
                all_possible_red_boards_again.push(new_red_board_again)
            }
        }
        final_result.push({
            v_b: this.getScore(new_red_board),
            v_train: this.getHighestScoreFromBoardStates(all_possible_red_boards_again),
            red_move: red_moves_separated[red_index],
            red_move_board_after: new_red_board,
            blue_moves_with_red_again: all_possible_blue_moves_in_this_red
        })
    }


    // loops through final result and search for the one with the highest v_train score
    let highest_score_move = [false, -1000000]
    for (let final_result_index = 0; final_result_index < final_result.length; final_result_index++){
        if (highest_score_move[1] < final_result[final_result_index]['v_train']) {
            highest_score_move[0] = final_result[final_result_index]['red_move']
            highest_score_move[1] = final_result[final_result_index]['v_train']
        }
    }
    console.log("final: ", final_result)
    console.log("highest move with score: ", highest_score_move)
    this.moveTheChecker(highest_score_move[0], highest_score_move[1])

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