import React from 'react';
import './Grid.css';

class CellObj{
    constructor(keyStr=''){
        this.keyStr = keyStr;
        this.defaultValStr = "?";
        this.realValueInt= 0;
        this.exposedTorF = false
    }
}
export default function Grid() {
    // nInt -> N by N dimension grid
    const nInt = 7;
    // # of bombs on the grid
    const bombsInt = 3;
    let bombCoordinatesArr = []
    // cell object for handling state changes after click events
    // array of arrays for initializing the grid 
    let arrayOfArrays = [];

    // populate array of arrays with cell objects
    for (let xInt = 0; xInt < nInt; xInt++){
        let row = [];
        for (let yInt = 0; yInt < nInt; yInt++){
            let cellObj = new CellObj()
            let keyStr = `${xInt}-${yInt}`;

            cellObj.keyStr = keyStr
            row.push({cellObj})

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

    const updateCellValue = (rowInt, colInt, val) => {

        arrayOfArrays[rowInt][colInt]['realValueInt'] = val
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
                if (cellObj['realValueInt'] !== "*"){
                    updateCellValue(rowInt, colInt, valInt)
                }
            }
        }
    }

    // const viewCellInfo = () => {
    //     for (let rowInt=0; rowInt < nInt; rowInt){
    //         for (let colInt = 0; colInt<nInt; colInt){
    //             console.log('cellObj', cellObj)
    //         }
    //     }
    // }

    // initialization sequence
    generateBombCoordinatesArr();
    setBombsOnGridArr();
    setNumbersOnGridArr();
    console.log('bombCoordinatesArr', bombCoordinatesArr)
    console.log('arrrayOfArrays', arrayOfArrays)


    

  return (
    <div>
        <table>
            <tbody>
                {arrayOfArrays.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cellObj, cellIndex) => (
                            <td key={`cell-${cellIndex}`}>{cellObj.defaultValStr}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
