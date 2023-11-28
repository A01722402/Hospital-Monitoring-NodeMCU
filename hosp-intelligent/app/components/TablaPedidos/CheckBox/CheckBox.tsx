'use client';

import { useEffect, useState } from 'react';
import styles from './CheckBox.module.css'

const CheckBox = ({ onCheck } : {onCheck:any}) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    onCheck();
  }



  return (
    <button className={styles.Xbox} onClick={handleCheck}>
      <p className="m-0 -py-3">X</p>
    </button>
  )
}

export default CheckBox