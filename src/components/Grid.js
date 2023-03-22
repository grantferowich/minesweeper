import React, { useCallback, useEffect, useState } from 'react';
import './Grid.css';
import CellObj from './CellObj';


export default function Grid() {
    // nInt -> N by N dimension grid
    const nInt = 7;
    // # of bombs on the grid
    const bombsInt = 3;
    let [bombCoordinatesArr, setBombCoordinatesArr] = useState([])
    // cell object for handling state changes after click events
    // array of arrays for initializing the grid 
    let [arrayOfArrays, setArrayOfArrays] = useState([]);
    let [bombArr, setBombArr] = useState([])

    // populate array of arrays with cell objects
    const memoizePopulateArrayOfArrays = useCallback(() => {
        const newArrayOfArrays = [];
        for (let i = 0; i < 7; i++) {
          const row = [];
          for (let j = 0; j < 7; j++) {
            const obj = {
              id: i * 7 + j, // unique identifier based on row and column
              exposedToF: null, // initial value for exposedToF
              defaultValStr: "?", // initial value for defaultValStr
              valStrOrInt: 0 // initial value for valStrOrInt
            };
            row.push(obj);
          }
          newArrayOfArrays.push(row);
        }
        setArrayOfArrays(newArrayOfArrays)
    }, [])


    // utility method
    const generateRandomCoordinateInt = () => {
        return parseInt(Math.random() * nInt);
    }

    const exposeCell = (rowInt, colInt) => {
        let newArrayOfArrays = arrayOfArrays
        newArrayOfArrays[rowInt][colInt].exposedToF = true
        setArrayOfArrays(newArrayOfArrays);
    }

    const memoizeGenerateBombCoordinatesArr = useCallback(() => {
        // populate bombArr
        while (bombArr.length < bombsInt){
            const rowInt = generateRandomCoordinateInt()
            const colInt = generateRandomCoordinateInt()
            let coordinatePairStr = rowInt.toString() + ',' + colInt.toString()
            if (!bombArr.includes(coordinatePairStr)){
                bombArr.push(coordinatePairStr)
            }
        }
        setBombArr(bombArr)
    },[])


    const getCellValue = (rowInt, colInt) => {
        return arrayOfArrays[rowInt][colInt]['realValueInt']
    }

    // util method for updating array of arrays
    const getBombCountOfCellInt = (rowInt, colInt) => {
        // down, right, up, left, bottom right diag, bottom left diag, top left, top right
        let coordinatesArr = [[1, 0], [0, 1], [-1, 0], [0, -1], [ 1, 1], [1, -1], [-1, -1,], [-1, 1]];
        let countInt = 0;
        let xInt = 0;
        while (xInt < coordinatesArr.length){
            let rowCoordinateToCheckInt = rowInt + coordinatesArr[xInt][0];
            let colCoordinateToCheckInt = colInt + coordinatesArr[xInt][1];
            if (rowCoordinateToCheckInt >= 0 && rowCoordinateToCheckInt < nInt && colCoordinateToCheckInt >= 0 && colCoordinateToCheckInt < nInt){
                let cellValueToCheckStr = getCellValue(rowCoordinateToCheckInt, colCoordinateToCheckInt);
                if (cellValueToCheckStr === '*'){
                    countInt++;
                }
            }
            xInt++
        }
        return countInt
    }

    // change array of arrays with setArrayOfArrays
    const updateCellValue = (rowInt, colInt, val) => {
        let newArrayOfArrays = [...arrayOfArrays];
        let cellObj = newArrayOfArrays[rowInt][colInt]
        const updatedCellObj = React.cloneElement(cellObj, { realValueInt: val});
        newArrayOfArrays[rowInt][colInt] = updatedCellObj;
        setArrayOfArrays(newArrayOfArrays)
    }    

    // const updateCellExposedState = (rowInt, colInt, valToF) => {
    //     // arrayOfArrays[rowInt][colInt].exposedTorF = valToF;
    // }

    // update class property, storageArr
    const setBombsOnGridArr = () => {
            let xInt = 0;
            while (xInt < bombCoordinatesArr.length){
                let rowInt = bombCoordinatesArr[xInt][0];
                let colInt = bombCoordinatesArr[xInt][1];
                updateCellValue(rowInt, colInt, "*");
                xInt++;
            }
    }

    const setNumbersOnGridArr = () => {
        for (let rowInt = 0; rowInt < nInt; rowInt++){
            for (let colInt = 0; colInt < nInt; colInt++){
                let cellObj = arrayOfArrays[rowInt][colInt]

                let valInt = getBombCountOfCellInt(rowInt, colInt)
                if (cellObj['realValueInt'] !== "*"){
                    updateCellValue(rowInt, colInt, valInt)
                }
            }
        }
    }

    const handleClick = ([rowIndex, colIndex]) => {
       console.log('hi')
       console.log('[rowIndex, colIndex]', [rowIndex, colIndex])
       console.log(arrayOfArrays[rowIndex][colIndex])
        // let keyStr = cellObj.keyStr
        // let rowInt = parseInt(keyStr.split('-')[0])
        // let colInt = parseInt(keyStr.split('-')[1])
        // updateCellExposedState(rowInt, colInt, true)
        // console.log('later')
        // cellObj.defaultValStr = cellObj.realValueInt.toString()
        // let valInt = cellObj.realValueInt
        // cellObj.defaultValStr = valInt
        // console.log(cellObj)
    }

    // initialization sequence: place bombs and numbers as 
    useEffect(() => {
        setTimeout(() => {
            memoizePopulateArrayOfArrays();;
            memoizeGenerateBombCoordinatesArr();
            
        },0)
        console.log('//// Debug arrayOfArrays', arrayOfArrays);
        console.log('/// debug bomb coordinates arr', bombCoordinatesArr);
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
                            // <td key={`cell-${rowIndex}-${colIndex}`} onClick={() => handleClick([rowIndex, colIndex])}>{arrayOfArrays[rowIndex][colIndex]['defaultValStr']}</td>
                            <td onClick={() => handleClick([rowIndex, colIndex])}>{arrayOfArrays[rowIndex][colIndex].defaultValStr}</td>
                            // <td>{arrayOfArrays[rowIndex][colIndex]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
