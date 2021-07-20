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
        
    }

    const DivSkeleton = () => {
        skeletion()
        console.log(gridState[0][0])
        let row = [0, 1, 2, 3, 4, 5, 6, 7]
        let collumn = [0, 1, 2, 3, 4, 5, 6, 7]
        return [
            <div>
                {row.map( r => <div>{ collumn.map( c => <Button>{gridState[r][c]}</Button>)}</div>)}
            <div>
                {collumn.map( c => <Button>{gridState[0][c]}</Button>)}
            </div>
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