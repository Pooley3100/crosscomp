'use client'

import React, {useState} from 'react'
import styles from './crosswordletters.module.css'

const CrosswordLetter = (props) => {
    const [letterObj, setLetterObj] = useState(props.letterObj)
    const selectHandler = () => {
        props.cellChange(props.letterObj.key)
    }
    const autoFocus = (element) => {
        //If state variable is used here it won't update fast enough on render and focus will lag sometimes (TODO: why this is necessary?)
        if(props.letterObj.focus){
            element?.focus()
        }
    };
    function changeLetter(letter) {
        if(letter.target.value.length == 1){
            if(props.letterObj.letter != '00'){
            setLetterObj({'letter':letter.target.value, 'key':props.letterObj.key, 'focus': props.letterObj.focus, 'correct': props.letterObj.correct});
            //Move focus to next crossword letter block
            }
            props.focusChange({'letter':letter.target.value, 'key':props.letterObj.key, 'focus': false, 'correct': props.letterObj.correct});
        } else if(letter.target.value.length == 0){
            setLetterObj({'letter':letter.target.value, 'key':props.letterObj.key, 'focus': props.letterObj.focus, 'correct': props.letterObj.correct});
        }
    }
    function checkHandler(e){
        if(e.key === 'Enter'){
            props.checkWord();
        }  
    }
    function submitHandler(event) {
        props.checkWord();
        event.preventDefault();    
    }
    var inputStyles = (props.letterObj.correct) ? `${styles.input} ${styles.goldBox}` : `${styles.input}`
    return (
        <div className={styles.container}>
            {props.letterObj.letter != '00' ? 
            <form className={styles.letterButton} onSubmit={submitHandler}>
                <input ref={autoFocus} onKeyDown={checkHandler} onClick={selectHandler} onDoubleClick={props.onGridHandler} type="text" value={letterObj.letter} onChange={changeLetter} className={inputStyles}></input>
            </form>
            :
            <div className={styles.blackBox}></div>
            }
        </div>
    )
}

export default CrosswordLetter