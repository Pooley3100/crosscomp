'use client'

import React, { useState, useEffect } from 'react'
import styles from './crossword.module.css'
import { findWords, checkCorrect, sortOpponent } from '@/lib/sortGrid'
import { checkOpponent } from '@/lib/opponent'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = (props) => {
    //Currently stores crossword grid, this will be moved to API
    const [letterGrid, setLetterGrid] = useState(() => {
        var letterArray = []
        for (var i = 0; i < 25; i++) {
            if (i == 24 || i == 23 || i == 4) {
                letterArray.push({ 'letter': '00', 'key': i, 'focus': false, 'id': 0 })
            } else {
                letterArray.push({ 'letter': '', 'key': i, 'focus': false, 'id': 0 })
            }

        }
        return letterArray
    });

    const [opponent, setOpponent] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            checkOpponent().then((result) => {
                if (result.length != opponent.length) {
                    setOpponent(result)
                }
            })
            return () => {
                clearInterval(interval)
            };
        }, 10000)
    }, [opponent]);

    //Recalculate letterGrid based on opponent array of answers they have done
    var update = sortOpponent(letterGrid, opponent)
    if(update){
        setLetterGrid(update)
    }

    //False for horizontal question, true for vertical question
    let gridOrient = false

    if (props.currentQuestionObj.grid == 'horizontal') {
        gridOrient = false
    } else {
        gridOrient = true
    }

    //Called on every click of a cell to move focus and inform which Question to select
    const cellChange = (key) => {
        if (key != props.currentCell) {
            props.changeCell(key);
        }
        setLetterGrid((currentLetterGrid) => {
            return (currentLetterGrid.map(obj => {
                if (obj.key == key) {
                    obj.focus = true
                    return obj
                } else {
                    obj.focus = false
                    return obj
                }
            }))
        });
    }

    //One every re-render compute that the cell focus is still correct
    letterGrid.map(obj => {
        if (obj.focus == true && obj.key != props.currentCell) {
            cellChange(props.currentCell)
        }
    })

    //Call to lib to extract all words and check all
    const checkCrossword = (newLetterGrid) => {
        let request = findWords(newLetterGrid);
        request.then((result) => { console.log(result) })
    }

    //Called when letter is entered and move automatically to next cell
    //Calls checkCrossword on each enter
    const focusChange = (letterObj) => {
        setLetterGrid((currentLetterGrid) => {
            var newLetterGrid = (currentLetterGrid.map(obj => {
                if (obj.key != letterObj.key) {
                    //Set Orient Increment on enter:
                    if (obj.key == letterObj.key + 1 && !gridOrient && obj.letter != '00') {
                        obj.focus = true;
                        props.changeCell(obj.key);
                    } else if (obj.key == letterObj.key + 5 && gridOrient && obj.letter != '00') {
                        obj.focus = true;
                        props.changeCell(obj.key);
                    }
                    return obj
                } else {
                    //letterObj.focus = false;
                    return letterObj;
                }
            }))
            checkCrossword(newLetterGrid);
            return (newLetterGrid);
        });
        return true;
    };

    //Function to swith between hor and vert on double click
    function onGridHandler() {
        props.changeCell(props.currentCell, true)
    };

    //Calculates what the current question is by using grid orient and the current cell TODO: Maybe put questionKey into lettergrid?
    var questionNumber = 0;
    //Calculate grid level to select horizontal or vertical cells background
    if (gridOrient) {
        var currentCellGridLevel = props.currentCell % 5;
        questionNumber = currentCellGridLevel + 5
    } else {
        var currentCellGridLevel = Math.floor(props.currentCell / 5);
        questionNumber = currentCellGridLevel
    }

    //Check if current word is correct when enter key hit
    const checkWord = () => {
        checkCorrect(letterGrid, props.currentQuestionObj).then((result) => {
            if (result != false) {
                setLetterGrid(result)
            }
        })
    }

    return (
        <div className={styles.container}>
            {letterGrid.map((letterObj, index) => {
                if (gridOrient) {
                    var objCellGridLevel = letterObj.key % 5;
                } else {
                    var objCellGridLevel = Math.floor(letterObj.key / 5);
                }
                var backgroundColor = ``;
                (letterObj.key == props.currentCell || objCellGridLevel === currentCellGridLevel) ? backgroundColor = `${styles.selectBackground} ${styles.crossword_letter}` : backgroundColor = `${styles.crossword_letter}`;
                return (<div className={backgroundColor} key={index}><CrosswordLetter checkWord={checkWord} letterObj={letterObj} focusChange={focusChange} cellChange={cellChange} onGridHandler={onGridHandler} /></div>)
            })}
        </div>
    )
}

export default Crossword