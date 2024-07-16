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
        //Move focus to next crossword letter block if length 1
        if(letter.target.value.length == 1){
            if(props.letterObj.letter != '00'){
                setLetterObj((letterObj) => {return({...letterObj, 'letter':letter.target.value})});
            }
            props.focusChange({...letterObj, 'letter':letter.target.value});
        } else if(letter.target.value.length == 0){
            setLetterObj((letterObj) => {return({...letterObj, 'letter':letter.target.value})});
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

    //Calc whether empty or user 1 or 2 enter
    var inputStyles = ''
    if(props.letterObj.id == 1){
        inputStyles = `${styles.input} ${styles.goldBox}`
     } else if(props.letterObj.id == 2){
        inputStyles = `${styles.input}  ${styles.redBox}`
     } else{
        inputStyles = `${styles.input}`
     } 
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