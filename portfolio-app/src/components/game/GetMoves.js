function GetMove(board) {
    function getNeighbors(board, currentRow, currentCollumn) {
        // if checker is red
        // check row + 1 and either column +/- 1
        // because red checker can only move down
        let checker = board[currentRow, currentCollumn]

        if (checker == 'r') {
            nextRowMinusColumn = board[currentRow+1][currentCollumn-1]
            nextRowPlusColumn = board[currentRow+1][currentCollumn+1]
            return [nextRowMinusColumn, nextRowPlusColumn]
        }

        // if checker is red King or blue King
        // checker row +/-1 and column +/-1
        // because red King and Blue King can move up or down
        else if (checker == 'R' || checker == 'B') {
            nextMinusRowMinusColumn = board[currentRow-1][currentCollumn-1]
            nextMinusRowPlusColumn = board[currentRow-1][currentCollumn+1]
            nextPlusRowMinusColumn = board[currentRow+1][currentCollumn-1]
            nextPlusRowPlusColumn = board[currentRow+1][currentCollumn+1]
            return [nextMinusRowMinusColumn, nextMinusRowPlusColumn, nextPlusRowMinusColumn, nextPlusRowPlusColumn]
        }

        // if checker is blue 
        // checker row - 1 and either column +/- 1
        // because blue checker can only move up
        else if (checker == 'b') {
            lastRowMinusColumn = board[currentRow-1][currentCollumn-1]
            lastRowPlusColumn = board[currentRow-1][currentCollum+1]
            return [lastRowMinusColumn, lastRowPlusColumn]
        }
    }




}