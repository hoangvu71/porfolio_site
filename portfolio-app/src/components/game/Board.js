import React, { useState }  from "react";
import Button from 'react-bootstrap/Button'
import GetMove from './GetMoves'

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastButtonClick: [],
            stateLoaded: true,
            didBlueWin: false,
            didRedWin: false
        }
        this.gridState = []
        this.initializeState = false
        this.skeleton()
        this.setStorage()
        this.getWeightFromStorage()
        this.ButtonOnClick = this.ButtonOnClick.bind(this)
    }

    
    setStorage() {
        if (window.sessionStorage.getItem("weight_one") === null) {
            window.sessionStorage.setItem("weight_zero", 0.25)
            window.sessionStorage.setItem("weight_one", 0.25)
            window.sessionStorage.setItem("weight_two", 0.25)
            window.sessionStorage.setItem("weight_three", 0.25)
            window.sessionStorage.setItem("weight_four", 0.25)
            window.sessionStorage.setItem("weight_five", 0.25)
            window.sessionStorage.setItem("weight_six", 0.25)
        }
    }

    getWeightFromStorage() {
        this.w_zero = parseFloat(window.sessionStorage.getItem("weight_zero"))
        this.w_one = parseFloat(window.sessionStorage.getItem("weight_one"))
        this.w_two = parseFloat(window.sessionStorage.getItem("weight_two"))
        this.w_three = parseFloat(window.sessionStorage.getItem("weight_three"))
        this.w_four = parseFloat(window.sessionStorage.getItem("weight_four"))
        this.w_five = parseFloat(window.sessionStorage.getItem("weight_five"))
        this.w_six = parseFloat(window.sessionStorage.getItem("weight_six"))
        }
    
    updateWeight(weights) {
        window.sessionStorage.setItem("weight_zero", weights[0])
        window.sessionStorage.setItem("weight_one", weights[1])
        window.sessionStorage.setItem("weight_two", weights[2])
        window.sessionStorage.setItem("weight_three", weights[3])
        window.sessionStorage.setItem("weight_four", weights[4])
        window.sessionStorage.setItem("weight_five", weights[5])
        window.sessionStorage.setItem("weight_six", weights[6])
        this.getWeightFromStorage()
    }
    skeleton() {
        this.gridState = 
        [[0, 'r', 0, 'r', 0, 'r', 0, 'r'],
        ['r', 0, 'r', 0, 'r', 0, 'r', 0],
        [0, 'r', 0, 'r', 0, 'r', 0, 'r'],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        ['b', 0, 'b', 0, 'b', 0, 'b', 0],
        [0, 'b', 0, 'b', 0, 'b', 0, 'b'],
        ['b', 0, 'b', 0, 'b', 0, 'b', 0]]
       
    }

    ButtonOnClick (value) {

        // This will dictate what button is being clicked and controll the css
        // Choose from a list of moves. 
        // Check if the button that is being clicked is in the list of moves
        if (!this.didBlueWin && !this.didRedWin) {
            console.log("this is all the weights: ", this.w_zero, this.w_one, this.w_two, this.w_three, this.four, this.w_five, this.w_six, this.didRedWin)
            let getMove = new GetMove(this.w_zero, this.w_one, this.w_two, this.w_three, this.w_four, this.w_five, this.w_six, this.didRedWin)    
            let all_moves = getMove.getAllMoves() // exp: [move1, move2,move3, move4] -> move1 = [[array], [array], "normal", [array], [array], "jump"]
            let red_moves = all_moves[0]
            if (red_moves.length === 0) {
                this.state.didBlueWin = true
                console.log("well i guess blue won")
                console.log(this.state.didBlueWin)
            }
            let blue_moves = all_moves[1]
            if (blue_moves.length === 0) {
                console.log("RED WON!!!!!")
                
                
            }
            console.log("red move: ", red_moves, "blue move: ",blue_moves, "non-jump blue moves: ", all_moves[2])
            let buttonId = value.target.id // exp: string like "2.5"
            if (this.state.lastButtonClicked) {
                // if there was a legit move that was clicked previously
                // get the neighbors of the previous buttons and push it into an array
                let neighborsArrayPrevious = []
                for (let index = 1; index < this.state.lastButtonClicked.length; index = index + 3) {
                    neighborsArrayPrevious.push(this.state.lastButtonClicked[index])
                    
                    // loop through the neighbors and check if the button that was just clicked is in there or not
                    for (let indexNeighbor = 0; indexNeighbor < neighborsArrayPrevious.length; indexNeighbor++){
                        if (buttonId == neighborsArrayPrevious[indexNeighbor] && this.state.lastButtonClicked[2] === 'normal'){
                            // then we can change the css (remember css dictates the board state in GetMove component)
                            let domPresentButton = document.getElementById(buttonId)
                            let domPreviousButton = document.getElementById(this.state.lastButtonClicked[0])

                            if (domPreviousButton.classList.contains("blue_checker")) {
                                if (parseInt(buttonId[0]) === 0 && domPreviousButton.classList.contains("blue_checker")) {
                                    domPresentButton.classList.add("blue_king_checker")
                                    domPreviousButton.classList.remove('blue_checker')

                                }
                                else {
                                    domPresentButton.classList.add("blue_checker")
                                    domPreviousButton.classList.remove('blue_checker')
                                }

                                domPreviousButton.classList.add('movable')
                                getMove.translateToBoard()
                                getMove.redMove()
                                let weights = getMove.getTheWeights()
                                this.updateWeight(weights)

                            }
                            else if (domPreviousButton.classList.contains("blue_king_checker")) {
                                domPresentButton.classList.add("blue_king_checker")
                                domPreviousButton.classList.remove('blue_king_checker')
                                domPreviousButton.classList.add('movable')
                                getMove.translateToBoard()
                                getMove.redMove()
                                let weights = getMove.getTheWeights()
                                this.updateWeight(weights)
                            }
                            
                            
                        }


















                        else if (buttonId == neighborsArrayPrevious[indexNeighbor] && this.state.lastButtonClicked[2] === 'jump'){
                            // then we can change the css (remember css dictates the board state in GetMove component)
                            let domPresentButton = document.getElementById(buttonId)
                            let domPreviousButton = document.getElementById(this.state.lastButtonClicked[0])
                            let domKilledButtonRow = this.state.lastButtonClicked[0][0] - (this.state.lastButtonClicked[0][0] - parseInt(buttonId[0]))/2
                            let domKilledButtonCol = this.state.lastButtonClicked[0][1] - (this.state.lastButtonClicked[0][1] - parseInt(buttonId[2]))/2
                            let domString = `${domKilledButtonRow},${domKilledButtonCol}`
                            let domKilledButton = document.getElementById(domString)
                            
                            console.log("Currently on: ", buttonId, "Last clicked: ", this.state.lastButtonClicked)
                            
                            if (domPreviousButton.classList.contains("blue_checker")) {
                                if (parseInt(buttonId[0]) === 0) {
                                    domPresentButton.classList.add("blue_king_checker")
                                    domPresentButton.classList.remove("blue_checker")
                                }
                                else {
                                    domPresentButton.classList.add('blue_checker')
                                }
                                domPreviousButton.classList.remove('blue_checker')
                                if (domKilledButton.classList.contains("red_checker")) {
                                    domKilledButton.classList.remove('red_checker')
                                    domKilledButton.classList.add('movable')
                                }
                                else if (domKilledButton.classList.contains('red_king_checker')) {
                                    domKilledButton.classList.remove('red_king_checker')
                                    domKilledButton.classList.add('movable')
                                }
                                getMove.translateToBoard()
                                if (!getMove.canBlueMoveAgain(this.state.lastButtonClicked)) {
                                    getMove.redMove()
                                    let weights = getMove.getTheWeights()
                                    this.updateWeight(weights)
                                }
                            }
                            else if (domPreviousButton.classList.contains("blue_king_checker")) {
                                domPresentButton.classList.add('blue_king_checker')
                                domPreviousButton.classList.remove('blue_king_checker')
                                if (domKilledButton.classList.contains("red_checker")) {
                                    domKilledButton.classList.remove('red_checker')
                                    domKilledButton.classList.add('movable')
                                    console.log("Killed the: ", domString, " button")
                                }
                                else if (domKilledButton.classList.remove("red_king_checker")) {
                                    domKilledButton.classList.remove("red_king_checker")
                                    domKilledButton.classList.add('movable')
                                }
                                getMove.translateToBoard()
                                if (!getMove.canBlueMoveAgain(this.state.lastButtonClicked)) {
                                    getMove.redMove()
                                    let weights = getMove.getTheWeights()
                                    this.updateWeight(weights)
                                }
                            }
                            

                            











                        }
                        
                    }
                }


                for (let index = 1; index < this.state.lastButtonClicked.length; index = index + 3) {
                    let moveFrom = this.state.lastButtonClicked[0]
                    // moveFrom is the id of the last button clicked
                    let getLastButton = document.getElementById(moveFrom)
                    // this will remove the class only if they are clicked anywhere except the button previously clicked on
                    
                    if (buttonId != moveFrom) {
                        getLastButton.classList.remove("red_chosen")
                        // also remove the css from previous button's neighbors
                        let domNeighbor = document.getElementById(this.state.lastButtonClicked[index])
                        domNeighbor.classList.remove("neighbor_chosen")
                    }
                }
            }

            for (let index = 0; index < blue_moves.length; index++){
                let move = blue_moves[index] // [[array], [array], "normal", [array], [array], "jump"]
                let moveFrom = move[0]
                if (moveFrom == buttonId) {
                    // get the button and modify classname
                    let button_being_clicked = document.getElementById(buttonId)
                    button_being_clicked.classList.add("red_chosen")

                    // deal with previously clicked button, need to remove the class
                    // we add that previously clicked button to a global variable in order to access it every single time
                    this.setState({lastButtonClicked: move})
                    console.log("last button click: ", this.state.lastButtonClicked)
                    // not only that, we want to make sure to let the player know where that checker can go 
                    // by changing the css 
                    // get the ids of where the checker can go, let's call it neighbors
                    // for ex: [[array], [array], "normal", [array], [array], "jump"], the neighbor is the 1st, 4th, 7th, and the 11th array
                    for (let indexNeighbor = 1; indexNeighbor < move.length; indexNeighbor += 3) {
                        // get the dom from that indexNeighbor and then change css
                        let domNeighbor = document.getElementById(move[indexNeighbor])
                        domNeighbor.classList.add("neighbor_chosen")
                    }
                }
            }
        
        }

        







    }
    
    DivSkeleton(props) {
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
        return [
            <div className="modal_content">
                {row.map( r => <div>{ collumn.map( c => {
                if (props.grid[r][c] == "r") {
                    return (<Button onClick={props.clickEv} className="red_checker movable" id={[r,c]}>{props.grid[r][c]}</Button>)
                }

                else if (props.grid[r][c] == "R") {
                    return (<Button onClick={props.clickEv} className="red_king_checker movable" id={[r,c]}>{props.grid[r][c]}</Button>)
                }

                else if (props.grid[r][c] == "b") {
                    return (<Button onClick={props.clickEv} className="blue_checker movable" id={[r,c]}>{props.grid[r][c]}</Button>)
                }

                else if (props.grid[r][c] == "B") {
                    return (<Button onClick={props.clickEv} className="blue_king_checker movable" id={[r,c]}>{props.grid[r][c]}</Button>)
                }

                else if (props.grid[r][c] == 1){
                    return (<Button onClick={props.clickEv} className="no_checker movable"id={[r,c]}>{props.grid[r][c]}</Button>)
                }
                else if (props.grid[r][c] == 0){
                    return (<Button onClick={props.clickEv} className="no_checker not-movable"id={[r,c]}>{props.grid[r][c]}</Button>)

                }
                })}</div>)}
            </div>
        ]
    }

    render() {
        return (

            <div>{this.state.stateLoaded ? <div><this.DivSkeleton grid={this.gridState} clickEv={this.ButtonOnClick} blueWin={this.state.didBlueWin}/>  </div> : null}</div>
            )
        // <div>
        //     <this.DivSkeleton grid={this.gridState} clickEv={this.ButtonOnClick} props={this.setUp()}/>  
        // </div>
        // )
        
    }
}

export default Board