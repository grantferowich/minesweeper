import React from 'react';
import './Grid.css';

export default function Grid() {
    // nInt -> N by N dimension grid
    const nInt = 7;
    // # of bombs on the grid
    const bombsInt = 3;
    let bombCoordinatesArr = []
    // cell object for handling state changes after click events
    let cellObj = {
        keyStr: {},
        defaultValStr: "?",
        realValueStrOrInt: 0,
        exposedTorF: false
    }
    // array of arrays for initializing the grid 
    let arrayOfArrays = [];

    // populate array of arrays with cell objects
    for (let xInt = 0; xInt < nInt; xInt++){
        let row = [];
        for (let yInt = 0; yInt < nInt; yInt++){
            cellObj.keyStr = `${xInt}-${yInt}`;
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
            let bombMap = new Map()
            let bombCountInt = 0
            // populate bombMap 
            while(bombCountInt < this.bInt){
                const rowInt = this.generateRandomCoordinateInt()
                const colInt = this.generateRandomCoordinateInt()
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
            for (let [kInt, v] of bombMap){
                let coordinatesPair0Int = parseInt(kInt.split(',')[0])
                let coordinatesPair1Int = parseInt(kInt.split(',')[1])
                bombCoordinatesArr.push([coordinatesPair0Int, coordinatesPair1Int])
            }
    }

    const getCellValue = (row, col) => {
        /// which value? haha
        return arrayOfArrays[row][col]
    }

    // util method for updating array of arrays
    const getBombCountOfCellInt = (rowInt, colInt) => {
        // down, right, up, left, bottom right diag, bottom left diag, top left, top right
        let coordinatesArr = [[1, 0], [0, 1], [-1, 0], [0, -1], [ 1, 1], [1, -1], [-1, -1,], [-1, 1]];
        let countInt = 0;
        let x = 0;
        while (x < coordinatesArr.length){
            let rowCoordinateToCheckInt = rowInt + coordinatesArr[x][0];
            let colCoordinateToCheckInt = colInt + coordinatesArr[x][1];
            if (rowCoordinateToCheckInt >= 0 && rowCoordinateToCheckInt < nInt && colCoordinateToCheckInt >= 0 && colCoordinateToCheckInt < nInt){
                let cellValueToCheckStr = getCellValue(rowCoordinateToCheckInt, colCoordinateToCheckInt);
                if (cellValueToCheckStr === '*'){
                    countInt++;
                }
            }
            x++
        }
        return countInt
    }

  return (
    <div>
        <table>
            <tbody>
                {arrayOfArrays.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                            <td key={`cell-${cellIndex}`}>{cellObj.defaultValStr}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
