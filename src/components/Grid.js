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
    //     return arrayOfArrays[rowInt][colInt]['realValueInt']
    // }

    // ## UPDATE STATE
    // util method for updating array of arrays
    // const getBombCountOfCellInt = (rowInt, colInt) => {
    //     // down, right, up, left, bottom right diag, bottom left diag, top left, top right
    //     let coordinatesArr = [[1, 0], [0, 1], [-1, 0], [0, -1], [ 1, 1], [1, -1], [-1, -1,], [-1, 1]];
    //     let countInt = 0;
    //     let xInt = 0;
    //     while (xInt < coordinatesArr.length){
    //         let rowCoordinateToCheckInt = rowInt + coordinatesArr[xInt][0];
    //         let colCoordinateToCheckInt = colInt + coordinatesArr[xInt][1];
    //         if (rowCoordinateToCheckInt >= 0 && rowCoordinateToCheckInt < nInt && colCoordinateToCheckInt >= 0 && colCoordinateToCheckInt < nInt){
    //             let cellValueToCheckStr = getCellValue(rowCoordinateToCheckInt, colCoordinateToCheckInt);
    //             if (cellValueToCheckStr === '*'){
    //                 countInt++;
    //             }
    //         }
    //         xInt++
    //     }
    //     return countInt
    // }

    // ## UPDATE STATE
    const updateCellValue = (rowInt, colInt, val) => {
        let newArrayOfArrays = [...arrayOfArrays];
        newArrayOfArrays[rowInt][colInt].valStrOrInt = val;
        setArrayOfArrays(newArrayOfArrays);
    }     

    // UPDATE STATE
    // const updateGridWithBombs = () => {
    //         let xInt = 0;
    //         while (xInt < bombArr.length){
    //             let bombRowColStr = bombArr[xInt]
    //             let bombLocationArr = bombRowColStr.split(',')
    //             let rowInt = parseInt(bombLocationArr[0]);
    //             let colInt = parseInt(bombLocationArr[1]);
    //             updateCellValue(rowInt, colInt, "💣");
    //             xInt++;
    //         }
    // }

    // ## UPDATE STATE
    // const setNumbersOnGridArr = () => {
    //     for (let rowInt = 0; rowInt < nInt; rowInt++){
    //         for (let colInt = 0; colInt < nInt; colInt++){
    //             let cellObj = arrayOfArrays[rowInt][colInt]

    //             let valInt = getBombCountOfCellInt(rowInt, colInt)
    //             if (cellObj['realValueInt'] !== "*"){
    //                 updateCellValue(rowInt, colInt, valInt)
    //             }
    //         }
    //     }
    // }

    // ## HANDLE EVENTS
    const handleClick = (rowIndex, colIndex) => {
        exposeCell(rowIndex, colIndex)
        // call recursive function
        // stuff
    }

    // ## RENDER STATE
    useEffect(() => {
            memoizePopulateArrayOfArrays();
            memoizeGenerateBombCoordinatesArr();    
            // do something to update the array of arrays to include bombs
            // updateGridWithBombs();
            // do stuff to update the array of arrays to include bombs
    }, []);
        
      
    


    // generateBombCoordinatesArr();
    // setBombsOnGridArr();
    // setNumbersOnGridArr();
    // console.log(arrayOfArrays);    
    // console.log('getCellValue, 0,0 -- ')
    // getCellValue(0,0)

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
