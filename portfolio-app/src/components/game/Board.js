import React, { useState }  from "react";
import Button from 'react-bootstrap/Button'

function Board() {

    const [ gridState, setGridState ] = useState([])
    
    const skeletion = () => {
        let counter = 0
        for (let row = 0; row <= 7 ; row ++){
            if (counter === 0 || counter % 2 === 0){
                gridState.push([0,1,0,1,0,1,0,1])
            }
            else{
                gridState.push([1,0,1,0,1,0,1,0])
            }
            counter += 1
            }
        
        console.log(gridState)
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
        
        row.forEach(r => {
            collumn.forEach( c => {
                if (gridState[r][c] === 1 && (r <=2)){
                    gridState[r][c] = "r"
                }
                if (gridState[r][c] === 1 && (r >= 5)){
                    gridState[r][c] = "b"
                }
            })
        })



    }

    const ButtonOnClick = (value) =>{
        console.log(value)
    }

    const DivSkeleton = () => {
        skeletion()
        console.log(gridState[0][0])
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
        return [
            <div>
                {row.map( r => <div>{ collumn.map( c => {
                if (gridState[r][c] == "r") {
                    return (<Button onClick={ButtonOnClick} className="red_checker">{gridState[r][c]}</Button>)
                }

                else if (gridState[r][c] == "b") {
                    return (<Button className="blue_checker">{gridState[r][c]}</Button>)
                }

                else {
                    return (<Button>{gridState[r][c]}</Button>)
                }
                
                
                
                })}</div>)}
            
            </div>

        ]
    }



    return (
      <>
      <div>click here</div>
      <DivSkeleton />
      </>
      
    );
  }
  
  export default Board;