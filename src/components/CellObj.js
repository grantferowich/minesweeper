import React, { useState } from 'react'

// class CellObj{
//     constructor(keyStr='', realValueInt = 0){
//         this.keyStr = keyStr;
//         this.defaultValStr = "?";
//         this.realValueInt = realValueInt;
//         this.exposedTorF = false
//     }
// }


export default function CellObj({keyStr='', realValueInt = 0}) {
  let [defaultValStr, setDefaultValStr] = useState('?')
  let [exposedTorF, setExposedTorF] = useState(false)

  const handleClick = () => {
    setExposedTorF(true)
  }
  return (
    <div onClick={handleClick}>
        {exposedTorF ? realValueInt : defaultValStr}
    </div>
  )
}
