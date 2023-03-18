import React, {useState} from 'react'

export default function Grid() {
    let [nInt] = useState(7)
    let [bInt] = useState(3)
    let [storageArr, setStorageArr] = useState(Array.from({length: nInt}, () => Array.from({length: nInt}, () => '')))
    console.log(storageArr)
  return (
    <div>
        <table>
            <tbody>
                {storageArr.map(row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                            <td key={`cell-${cellIndex}`}>{cell}</td>
                        ))}
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}
