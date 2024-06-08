'use client'

import React, {useState} from 'react'
import styles from './crossword.module.css'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = () => {
    //Focus Change updates letter grid and moves focus to next letter. Key helps sort, grid is hor or vert.
    const focusChange = (letterObj, key, grid) => {
        const nextLetterGrid = letterGrid.map(obj => {
            if(obj.key != key){
                if(obj.key == key+1){
                    obj.focus = true;
                }
                return obj
            } else{
                //letterObj.focus = false;
                return letterObj;
            }
        });
        //debugger;
        setLetterGrid(nextLetterGrid);
        return true;
    }; 

    const [letterGrid, setLetterGrid] = useState([{'letter':'w', 'key':0, 'focus': false},{'letter':'e', 'key':1, 'focus': false},{'letter':'i', 'key':2, 'focus': false},{'letter':'r', 'key':3, 'focus': false},{'letter':'d', 'key':4, 'focus': false},{'letter':'w', 'key':5, 'focus': false},{'letter':'e', 'key':6, 'focus': false},{'letter':'i', 'key':7, 'focus': false},{'letter':'r', 'key':8, 'focus': false},{'letter':'d', 'key':9, 'focus': false},{'letter':'w', 'key':10, 'focus': false},{'letter':'e', 'key':11, 'focus': false},{'letter':'i', 'key':12, 'focus': false},{'letter':'r', 'key':13, 'focus': false},{'letter':'d', 'key':14, 'focus': false},{'letter':'w', 'key':15, 'focus': false},{'letter':'e', 'key':16, 'focus': false},{'letter':'i', 'key':17, 'focus': false},{'letter':'r', 'key':18, 'focus': false},{'letter':'d', 'key':19, 'focus': false},{'letter':'w', 'key':20, 'focus': false},{'letter':'00', 'key':21, 'focus': false},{'letter':'i', 'key':22, 'focus': false},{'letter':'r', 'key':23, 'focus': false},{'letter':'d', 'key':24, 'focus': false}]);

    return (
        <div className={styles.container}>
            {letterGrid.map((letterObj, index)=>{
                return(<div className={styles.crossword_letter} key={index}><CrosswordLetter letterObj={letterObj} focusChange={focusChange}/></div>)
            })}
        </div>
    )
}

export default Crossword