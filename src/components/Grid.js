import React, { useCallback, useEffect, useState } from 'react';
import './Grid.css';

const nInt = 7;
const totalSquaresInt = nInt * nInt
// # of bombs on the grid
const bombsInt = 2;
let arrayOfArrays = []
let bombsArr = []

    
// ## UPDATE STATE
function populateArrayOfArrays(){
        for (let i = 0; i < 7; i++) {
          const row = [];
          for (let j = 0; j < 7; j++) {
            const obj = {
              id: i * 7 + j, // unique identifier based on row and column
              exposedToF: false, // initial value for exposedToF
              defaultValStr: "?", // initial value for defaultValStr
              valStrOrInt: 0 // initial value for valStrOrInt
            };
            row.push(obj);
          }
          arrayOfArrays.push(row);
        }
        
}

    // ## UPDATE STATE
const generateRandomCoordinateInt = () => {
        return parseInt(Math.random() * nInt);
}

    // ## UPDATE STATE
// const exposeCell = (rowIndex, colIndex) => {
//         arrayOfArrays[rowIndex][colIndex].exposedToF = true;
//     }

    // ## UPDATE STATE
const memoizeGenerateBombCoordinatesArr = async () => {
        let xInt = 0
        while (xInt < bombsInt){
            const rowInt = generateRandomCoordinateInt()
            const colInt = generateRandomCoordinateInt()
            let coordinatePairStr = rowInt.toString() + ',' + colInt.toString()
            if (!bombsArr.includes(coordinatePairStr)){
                bombsArr.push(coordinatePairStr)
            }
            xInt++
        }
}

    // ## UPDATE STATE
    // util method for updating array of arrays
const getBombCountOfCellInt = (rowInt, colInt) => {
        // down, right, up, left, bottom right diag, bottom left diag, top left, top right
        let coordinatesArr = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, -1,], [-1, 1]];
        let countInt = 0;
        let xInt = 0;
        

        let nInt = arrayOfArrays.length;
        // loop over coordinates, add 1 to counter for each bomb found
        while (xInt < coordinatesArr.length){
            let rowCoordinateToCheckInt = rowInt + coordinatesArr[xInt][0];
            let colCoordinateToCheckInt = colInt + coordinatesArr[xInt][1];
            if (rowCoordinateToCheckInt >= 0 && rowCoordinateToCheckInt < nInt && colCoordinateToCheckInt >= 0 && colCoordinateToCheckInt < nInt){
                let cellObj = arrayOfArrays[rowCoordinateToCheckInt][colCoordinateToCheckInt];
                if (cellObj.valStrOrInt === '💣'){
                    countInt++;
                }
            }
            xInt++
        }
        return countInt
}

    // ## UPDATE STATE
    // const updateCellValue = (rowInt, colInt, val) => {
    //    arrayOfArrays[rowInt][colInt].valStrOrInt = val
    // };

    // ## set initial state
const updateGridWithBombs = () => {
            let xInt = 0;
            while (xInt < bombsArr.length){
                let bombRowColStr = bombsArr[xInt]
                let bombLocationArr = bombRowColStr.split(',')
                let rowInt = parseInt(bombLocationArr[0]);
                let colInt = parseInt(bombLocationArr[1]);
                arrayOfArrays[rowInt][colInt].valStrOrInt = "💣";
                // updateCellValue(rowInt, colInt, "💣");
                xInt++;
            }
    }

    // ## UPDATE STATE
const updateGridWithNumbers = () => {
        for (let x = 0; x < nInt; x++){
            for (let y = 0; y < nInt; y++){
                let cellValue = getBombCountOfCellInt(x,y)
                // console.log(`x${x}-y${y} cell value ${cellValue}`)
                // console.log(cellValue)
                if (cellValue !== "💣" && cellValue > 0){
                    // console.log(`x${x}-y${y} cell value ${cellValue}`)
                    arrayOfArrays[x][y].valStrOrInt = cellValue
                    // updateCellValue(x,y,cellValue)
                }
            }
        }
    }   





    // ## Sequence to set initial state
    populateArrayOfArrays();
    memoizeGenerateBombCoordinatesArr();    
    // do something to update the array of arrays to include bombs
    updateGridWithBombs();
    // do stuff to update the array of arrays to include bombs
    updateGridWithNumbers();
    // update grid with numbers and bombs working
    // initial state === set -> looks good
    // console.log(arrayOfArrays)
    console.log(bombsArr)

    
            // does the number exposed === totalSquares - bombCount? 
const countExposedCells = () => {
    let exposedInt = 0
    for (let rInt = 0; rInt < nInt; rInt++){
        for (let cInt = 0; cInt < nInt; cInt++){
            if (arrayOfArrays[rInt][cInt].exposedToF){
                exposedInt++
            }
        }
    }
    return exposedInt
}

export default function Grid() {
    const [grid, setGrid] = useState(arrayOfArrays)
    const [lossResultToF, setLossResultToF] = useState(false)
    const [winResultToF, setWinResultToF] = useState(false)


    const traverseGrid = (rowInt, colInt) => {
        let coordinatesArr = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, -1,], [-1, 1]];
        const traverse = (r, c) => {
            let cellObj = arrayOfArrays[r][c]
            
            if (cellObj.valStrOrInt === "💣"){
                return
            }

            if (cellObj.valStrOrInt > 0){
                exposeCell(r,c)
                return
            }

            if (cellObj.exposedToF){
                return
            }

            if (cellObj.valStrOrInt === 0){
                exposeCell(r,c)
                let xInt = 0
                while (xInt < coordinatesArr.length){
                    let rowCoordinateToCheckInt = r + coordinatesArr[xInt][0];
                    let colCoordinateToCheckInt = c + coordinatesArr[xInt][1];
                    if (rowCoordinateToCheckInt >= 0 && rowCoordinateToCheckInt < nInt && colCoordinateToCheckInt >= 0 && colCoordinateToCheckInt < nInt && cellObj.valStrOrInt === 0 && !cellObj.valStrOrInt){
                        traverse(rowCoordinateToCheckInt, colCoordinateToCheckInt)
                    }
                    xInt++
                }
            }
        }
        return traverse(rowInt, colInt)
    }

    function checkVictory(){
        let exposedInt = countExposedCells()
        console.log(exposedInt)
        return totalSquaresInt - bombsInt === exposedInt
    }
    


    const exposeCell = (rowIndex, colIndex) => {
       let newGrid = [...grid]
       newGrid[rowIndex][colIndex].exposedToF = true
       setGrid(newGrid);
    }

    // ## UPDATE STATE
    // const updateGridWithNumbers = () => {
    //     const updatedArray = []
    //     for (let rowInt = 0; rowInt < nInt; rowInt++){
    //       const rowArray = []
    //       for (let colInt = 0; colInt < nInt; colInt++){
    //         let cellObj = arrayOfArrays[rowInt][colInt]
    //         let valInt = getBombCountOfCellInt(rowInt, colInt)
    //         console.log(`valInt is === ${valInt}`)
    //         if (cellObj.realValueInt !== "💣"){
    //           cellObj = {...cellObj, realValueInt: valInt}
    //         }
    //         rowArray.push(cellObj)
    //       }
    //       updatedArray.push(rowArray)
    //     }
    //     setArrayOfArrays(updatedArray)
    //   }


    // ## HANDLE EVENTS
    const handleClick = (rowIndex, colIndex) => {
        let cellValStrOrInt = grid[rowIndex][colIndex].valStrOrInt

        if (cellValStrOrInt === 0){
            traverseGrid(rowIndex, colIndex);
        }
        if (cellValStrOrInt > 0){
            exposeCell(rowIndex, colIndex)
        }
        if (cellValStrOrInt === "💣"){
            setLossResultToF(true)
        }
        
        const victoryStatusToF = checkVictory()
        console.log(victoryStatusToF)
        
        if (victoryStatusToF){
            setWinResultToF(true)
        }
    }

  return (

    <div>
        <div>{lossResultToF ? <p>Game over. You lost 😞 </p> : null}</div>
        <div>{winResultToF ? <p>Victory! 🎉 </p> : null}</div>
        <table>
            <tbody>
                {grid.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((col, colIndex) => (
                            <td key={`${grid[rowIndex][colIndex].id}`} onClick={() => handleClick(rowIndex, colIndex)}> {grid[rowIndex][colIndex].exposedToF ? grid[rowIndex][colIndex].valStrOrInt : grid[rowIndex][colIndex].defaultValStr}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
