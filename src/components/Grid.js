import React, { useState } from 'react';
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

    // populate array of arrays with cell objects
    for (let xInt = 0; xInt < nInt; xInt++){
        let row = [];
        for (let yInt = 0; yInt < nInt; yInt++){
            let keyStr = `${xInt}-${yInt}`;
            row.push(<CellObj keyStr={keyStr}/>)
        }
        arrayOfArrays.push(row)
    }

    // utility method
    const generateRandomCoordinateInt = () => {
        return parseInt(Math.random() * nInt);
    }

    // updates bombCoordinatesArr
    const generateBombCoordinatesArr = () => {
            let bombMap = new Map();
            let bombCountInt = 0;
            // populate bombMap 
            while(bombCountInt < bombsInt){
                const rowInt = generateRandomCoordinateInt()
                const colInt = generateRandomCoordinateInt()
                let coordinatePairStr = rowInt.toString() + ',' + colInt.toString()
                if (!bombMap.has(coordinatePairStr)){
                    // add new coords to map
                    bombMap.set(coordinatePairStr, true)
                    bombCountInt++
                }
            }
            // get an array of arrays out of the bombMap
            return convertMapToCoordinatesArr(bombMap)
    }

    // helper method for updating bombCoordinatesArr
    const convertMapToCoordinatesArr = (bombMap) => {
            for (let [kInt] of bombMap){
                let coordinatesPair0Int = parseInt(kInt.split(',')[0])
                let coordinatesPair1Int = parseInt(kInt.split(',')[1])
                bombCoordinatesArr.push([coordinatesPair0Int, coordinatesPair1Int])
            }
    }

    const getCellValue = (rowInt, colInt) => {
        let x = arrayOfArrays[rowInt][colInt]
        console.log(x)
        return 
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

    const updateCellValue = (rowInt, colInt, val) => {
        let keyStr = `${rowInt}-${colInt}`;
        setArrayOfArrays(prevState => {
            return prevState.map(row => {
                return row.map(cell => {
                    if (cell.keyStr === keyStr){
                        return {...cell, realValueInt: val}
                    } else {
                        return cell;
                    }
                })
            })
        })
    }    

    const updateCellExposedState = (rowInt, colInt, valToF) => {
        return arrayOfArrays[rowInt][colInt].exposedTorF = valToF;
    }

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
                if (cellObj['realValueInt'] !== "*" ){
                    updateCellValue(rowInt, colInt, valInt)
                }
            }
        }
    }

    const handleClick = (cellObj) => {
       console.log('hi')
        let keyStr = cellObj.keyStr
        let rowInt = parseInt(keyStr.split('-')[0])
        let colInt = parseInt(keyStr.split('-')[1])
        updateCellExposedState(rowInt, colInt, true)
        console.log('later')
        cellObj.defaultValStr = cellObj.realValueInt.toString()
        // let valInt = cellObj.realValueInt
        // cellObj.defaultValStr = valInt
        // console.log(cellObj)
    }

    // initialization sequence: place bombs and numbers as 
    generateBombCoordinatesArr();
    setBombsOnGridArr();
    setNumbersOnGridArr();
    console.log(arrayOfArrays);    
    console.log('getCellValue, 0,0 -- ')
    getCellValue(0,0)

  return (
    <div>
        <table>
            <tbody>
                {arrayOfArrays.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cellObj) => (
                            <td key={cellObj.keyStr} onClick={() => handleClick(cellObj)}>{cellObj.exposedTorF ? cellObj.realValueInt: cellObj.defaultValStr}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
