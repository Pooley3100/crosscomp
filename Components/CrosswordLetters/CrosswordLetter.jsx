'use client'

import React, {useState} from 'react'
import styles from './crosswordletters.module.css'

const CrosswordLetter = (props) => {
    const [letterObj, setLetterObj] = useState(props.letterObj)
    const selectHandler = () => {
        props.cellChange(letterObj.key)
    }
    const autoFocus = (element) => {
        if(letterObj.focus){
            element?.focus()
        }
    };
    function changeLetter(letter) {
        if(letter.target.value.length == 1){
            setLetterObj({'letter':letter.target.value, 'key':letterObj.key, 'focus': letterObj.focus});
            //Move focus to next crossword letter block
            props.focusChange({'letter':letter.target.value, 'key':letterObj.key, 'focus': false});
        } else if(letter.target.value.length == 0){
            setLetterObj({'letter':letter.target.value, 'key':letterObj.key, 'focus': letterObj.focus});
        }
    }
    function submitHandler(event) {
        event.preventDefault();
    }
    return (
        <div className={styles.container}>
            {letterObj.letter != '00' ? 
            <form className={styles.letterButton} onSubmit={submitHandler}>
                <input ref={autoFocus} onClick={selectHandler} onDoubleClick={props.onGridHandler} type="text" value={letterObj.letter} onChange={changeLetter} className={styles.input}></input>
            </form>
            :
            <div className={styles.blackBox}></div>
            }
        </div>
    )
}

export default CrosswordLetter