import React, { useCallback, useEffect, useState } from 'react';
import './Grid.css';


export default function Grid() {
    // nInt -> N by N dimension grid
    const nInt = 7;
    // # of bombs on the grid
    const bombsInt = 3;
    // cell object for handling state changes after click events
    // array of arrays for initializing the grid 
    let [arrayOfArrays, setArrayOfArrays] = useState([]);
    let [bombArr, setBombArr] = useState([])

    // ## UPDATE STATE
    const memoizePopulateArrayOfArrays = useCallback(async () => {
        const newArrayOfArrays = [];
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
          newArrayOfArrays.push(row);
        }
        console.log('arrayOfArrays', newArrayOfArrays)
        await setArrayOfArrays(newArrayOfArrays)
    }, [])

    // ## UPDATE STATE
    const generateRandomCoordinateInt = () => {
        return parseInt(Math.random() * nInt);
    }

    // ## UPDATE STATE
    const exposeCell = (rowIndex, colIndex) => {
        let newArrayOfArrays = [...arrayOfArrays]
        newArrayOfArrays[rowIndex][colIndex].exposedToF = true
        setArrayOfArrays(newArrayOfArrays);
    }

    // ## UPDATE STATE
    const memoizeGenerateBombCoordinatesArr = useCallback(async () => {
        // populate bombArr
        while (bombArr.length < bombsInt){
            const rowInt = generateRandomCoordinateInt()
            const colInt = generateRandomCoordinateInt()
            let coordinatePairStr = rowInt.toString() + ',' + colInt.toString()
            if (!bombArr.includes(coordinatePairStr)){
                bombArr.push(coordinatePairStr)
            }
        }
        await setBombArr(bombArr)
    },[])


    // ## READ STATE
    // const getCellValue = (rowInt, colInt) => {
    //     // console.log('// debug getCellValue', arrayOfArrays[rowInt][colInt].valStrOrInt)
    //     // console.log('// debug getCellValue', arrayOfArrays)
    //     // console.log('// debug getCellValue', arrayOfArrays[rowInt])
    //     // return arrayOfArrays[rowInt][colInt].valStrOrInt
    // }

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
                // the 
                let cellObj = arrayOfArrays[rowCoordinateToCheckInt][colCoordinateToCheckInt]
                if (cellObj.valStrOrInt === '💣'){
                    countInt++;
               
                }
            }
            xInt++
        }
        return countInt
    }

    // ## UPDATE STATE
    const updateCellValue = (rowInt, colInt, val) => {
        setArrayOfArrays(prevArray => {
          const newArray = prevArray.map(row => {
            return row.map(cell => {
              if (cell.id === rowInt * nInt + colInt) {
                return { ...cell, valStrOrInt: val };
              } else {
                return cell;
              }
            });
          });
          return newArray;
        });
    };
      

    // ## UPDATE STATE
    const updateGridWithBombs = () => {
            let xInt = 0;
            console.log('bombArr', bombArr)
            while (xInt < bombArr.length){
                let bombRowColStr = bombArr[xInt]
                let bombLocationArr = bombRowColStr.split(',')
                let rowInt = parseInt(bombLocationArr[0]);
                let colInt = parseInt(bombLocationArr[1]);
                updateCellValue(rowInt, colInt, "💣");
                xInt++;
            }
    }

    // ## UPDATE STATE
    const updateGridWithNumbers = () => {
        console.log('updateGridWithNumbers')
        for (let x = 0; x < nInt; x++){
            for (let y = 0; y < nInt; y++){
                let cellValue = getBombCountOfCellInt(x,y)
                if (cellValue !== "💣" && cellValue > 0){
                    updateCellValue(x,y,cellValue)
                }
            }
        }
        console.log(bombArr)
        console.log(arrayOfArrays)
        // const updatedArray = []
        // for (let rowInt = 0; rowInt < nInt; rowInt++){
        //   const rowArray = []
        //   for (let colInt = 0; colInt < nInt; colInt++){
        //     let cellObj = arrayOfArrays[rowInt][colInt]
        //     // let valInt = getBombCountOfCellInt(rowInt, colInt)
        //     // if (cellObj['realValueInt'] !== "💣" && valInt > 0){
        //     //   cellObj = {...cellObj, realValueInt: valInt}
        //     // }
        //     rowArray.push(cellObj)
        //   }
        //   updatedArray.push(rowArray)
        // }
        // setArrayOfArrays(updatedArray)
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
        exposeCell(rowIndex, colIndex)

        
        // if the user clicked on a cell which has ValStrOrInt > 1, 
            // expose the cell 
            // terminate recursion 
        // if the user clicked on a cell which has valStrOrInt === 0, 
            // Expose the current cell
            // call the function to recursively explore the 8 surrounding cells
        // if the user clicked on a cell which has valStrOrInt === "💣"
            // don't expose the current cell
            // terminate recursion
    }

    // ## RENDER STATE
    useEffect(() => {
            memoizePopulateArrayOfArrays();
            memoizeGenerateBombCoordinatesArr();    
            // do something to update the array of arrays to include bombs
            updateGridWithBombs();
            // do stuff to update the array of arrays to include bombs
            updateGridWithNumbers();
            

    }, []);

  return (
    <div>
        <table>
            <tbody>
                {arrayOfArrays.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((col, colIndex) => (
                            <td key={`${arrayOfArrays[rowIndex][colIndex].id}`} onClick={() => handleClick(rowIndex, colIndex)}> {arrayOfArrays[rowIndex][colIndex].exposedToF ? arrayOfArrays[rowIndex][colIndex].valStrOrInt : arrayOfArrays[rowIndex][colIndex].defaultValStr}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
