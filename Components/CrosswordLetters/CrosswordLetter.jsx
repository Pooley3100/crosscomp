'use client'

import React, {useState} from 'react'
import styles from './crosswordletters.module.css'

const CrosswordLetter = (props) => {
    const [letter, setLetter] = useState(props.letter)
    function changeLetter(letter) {
        if(letter.target.value.length <= 1){
            setLetter(letter.target.value);
        }
    }
    function submitHandler(event) {
        event.preventDefault();
    }
    return (
        <div className={styles.container}>
            {letter != '00' ? 
            <form className={styles.letterButton} onSubmit={submitHandler}>
                <input type="text" value={letter} onChange={changeLetter} className={styles.input}></input>
            </form>
            :
            <div className={styles.blackBox}></div>
            }
        </div>
    )
}

export default CrosswordLetter