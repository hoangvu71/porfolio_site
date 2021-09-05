import React, { useState }  from "react";
import Button from 'react-bootstrap/Button'
import GetMove from './GetMoves'
// function Board() {

//     const [ gridState, setGridState ] = useState([])
//     const [ initializeState, setInitializeState ] = useState(false)

//     const skeletion = () => {
//         if (initializeState == false) {
//             let counter = 0
//             for (let row = 0; row <= 7 ; row ++){
//                 if (counter === 0 || counter % 2 === 0){
//                     gridState.push([0,1,0,1,0,1,0,1])
//                 }
//                 else{
//                     gridState.push([1,0,1,0,1,0,1,0])
//                 }
//                 counter += 1
//                 console.log("this is gridState: ", gridState)
//                 }
            
//             let row = [0, 1, 2, 3, 4, 5, 6, 7]
//             let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
            
//             row.forEach(r => {
//                 collumn.forEach( c => {
//                     if (gridState[r][c] === 1 && (r <=2)){
//                         gridState[r][c] = "r"
//                     }
//                     if (gridState[r][c] === 1 && (r >= 5)){
//                         gridState[r][c] = "b"
//                     }
//                 })
//             })
//         }
//         setInitializeState(prev => true)
//         console.log(initializeState)



//     }



//     const ButtonOnClick = (value) =>{
//         console.log(value.target)
//         console.log(value.target.className);
//         if (value.target.classList.contains("red_checker")) {
//             value.target.classList.remove("red_checker")
//         }
//         else {
//             value.target.classList.add("red_checker")

//         }
//         console.log("This is gridstate: ", gridState)
//         let all_possible_moves = GetMove(gridState)
//         console.log(all_possible_moves)
//     }

//     const DivSkeleton = () => {
//         skeletion()
//         console.log(gridState[0][0])
//         let row = [0, 1, 2, 3, 4, 5, 6, 7]
//         let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
//         return [
//             <div>
//                 {row.map( r => <div>{ collumn.map( c => {
//                 if (gridState[r][c] == "r") {
//                     return (<Button onClick={ButtonOnClick} className="red_checker" id={[r,c]}>{gridState[r][c]}</Button>)
//                 }

//                 else if (gridState[r][c] == "b") {
//                     return (<Button onClick={ButtonOnClick} className="blue_checker" id={[r,c]}>{gridState[r][c]}</Button>)
//                 }

//                 else {
//                     return (<Button onClick={ButtonOnClick} className="no_checker"id={[r,c]}>{gridState[r][c]}</Button>)
//                 }
                
                
                
//                 })}</div>)}
            
//             </div>

//         ]
//     }



//     return (
//       <>
//       <div>click here</div>
//       <DivSkeleton />
//       </>
      
//     );
//   }
  
//   export default Board;

class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lastButtonClick: []
        }
        this.gridState = []
        this.initializeState = false
        this.skeleton()
        this.lastButtonClick = []
        this.ButtonOnClick = this.ButtonOnClick.bind(this)
    }
    
    
    skeleton() {
        let counter = 0
        for (let row = 0; row <= 7 ; row ++){
            if (counter === 0 || counter % 2 === 0){
                this.gridState.push([0,1,0,1,0,1,0,1])
            }
            else{
                this.gridState.push([1,0,1,0,1,0,1,0])
            }
            counter += 1
        }               
        
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
            
        row.forEach(r => {
            collumn.forEach( c => {
                if (this.gridState[r][c] === 1 && (r <=2)){
                    this.gridState[r][c] = "r"
                }
                if (this.gridState[r][c] === 1 && (r >= 5)){
                    this.gridState[r][c] = "b"
                }
            })
        })
        console.log(this.gridState)
    }
    ButtonOnClick (value) {
        // This will dictate what button is being clicked and controll the css
        // Choose from a list of moves. 
        // Check if the button that is being clicked is in the list of moves
        let getMove = new GetMove()
        let all_moves = getMove.getAllMoves() // exp: [move1, move2,move3, move4] -> move1 = [[array], [array], "normal", [array], [array], "jump"]
        let red_moves = all_moves[0]
        let blue_moves = all_moves[1]
        let buttonId = value.target.id // exp: string like "2.5"
        console.log("redmoves: ", all_moves)
        if (this.state.lastButtonClicked) {
            // if there was a legit move that was clicked previously
            // get the neighbors of the previous buttons and push it into an array
            let neighborsArrayPrevious = []
            for (let index = 1; index < this.state.lastButtonClicked.length; index = index + 3) {
                neighborsArrayPrevious.push(this.state.lastButtonClicked[index])
                
                // loop through the neighbors and check if the button that was just clicked is in there or not
                for (let indexNeighbor = 0; indexNeighbor < neighborsArrayPrevious.length; indexNeighbor++){
                    if (buttonId == neighborsArrayPrevious[indexNeighbor]){
                        console.log("Yes, you can move here!")
                        // then we can change the css (remember css dictates the board state in GetMove component)
                        let domNeighbor = document.getElementById(buttonId)
                        domNeighbor.classList.add("blue_checker")
                        domNeighbor.classList.remove("movable")
                        let domPreviousButton = document.getElementById(this.state.lastButtonClicked[0])
                        domPreviousButton.classList.remove("blue_checker")
                        domPreviousButton.classList.add("movable")
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
    
    DivSkeleton(props) {
        console.log("This is grid: ", props.grid)
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
        return [
            <div>
                {row.map( r => <div>{ collumn.map( c => {
                if (props.grid[r][c] == "r") {
                    return (<Button onClick={props.clickEv} className="red_checker" id={[r,c]}>{props.grid[r][c]}</Button>)
                }

                else if (props.grid[r][c] == "b") {
                    return (<Button onClick={props.clickEv} className="blue_checker" id={[r,c]}>{props.grid[r][c]}</Button>)
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
        <div>
            {console.log("This is all props: ", this.props.gridState)}
            <this.DivSkeleton grid={this.gridState} clickEv={this.ButtonOnClick}/>  
        </div>
        )
        
    }
}

export default Board