import React, {useState} from 'react'
import Cell from './Cell'
import './Grid.css';

export default function Grid() {
    // let [nInt] = useState(7)
    // let [bInt] = useState(3)
    // let [storageArr, setStorageArr] = useState(Array.from({length: nInt}, () => Array.from({length: nInt}, () => '')))
    const rows = 7;
    const cols = 7;

    let arrayOfArrays = []
    for (let x = 0; x < rows; x++){
        let row = [];
        for (let y = 0; y < cols; y++){
            row.push(<Cell key={`${x}-${y}`} />)
        }
        arrayOfArrays.push(row)
    }
  return (
    <div>
        <table>
            <tbody>
                {arrayOfArrays.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                            <td key={`cell-${cellIndex}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}
