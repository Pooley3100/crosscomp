'use client'

import React, { useEffect, useState } from 'react'
import styles from './crossword.module.css'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = (props) => {
    useEffect(() => {
        setLetterGrid(letterGrid.map(obj => {
            if (obj.key == props.currentCell) {
                obj.focus = true
                return obj
            } else {
                obj.focus = false
                return obj
            }
        }))
        if (props.currentQuestionObj.grid == 'horizontal') {
            setGridOrient(false)
        } else {
            setGridOrient(true)
        }
    }, [props.currentCell])
    //Stores currently selected cell and this with gridOrient infrom Question to show
    const currentCell = props.currentCell
    //False for horizontal question, true for vertical question
    const [gridOrient, setGridOrient] = useState(false);

    async function sendWord(word, questionKey) {
        const response = await fetch('http://localhost:3000/api/Crossword',
            {
                method: "POST",
                body: JSON.stringify({
                    'answer': word,
                    'key': questionKey
                })
            })
        const result = await response.json();
        console.log(`Server response: ${result.result}`)
        return (result.result);
    }

    const cellChange = (key) => {
        props.changeCell(key);
        setLetterGrid(letterGrid.map(obj => {
            if (obj.key == key) {
                obj.focus = true
                return obj
            } else {
                obj.focus = false
                return obj
            }
        }));
    }

    //Called when letter is set and move automatically to next cell
    const focusChange = (letterObj) => {
        const nextLetterGrid = letterGrid.map(obj => {
            if (obj.key != letterObj.key) {
                //Set Orient Increment:
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
        });
        //debugger;
        setLetterGrid(nextLetterGrid);
        return true;
    };
    //Function to swith between hor and vert
    const onGridHandler = () => setGridOrient(!gridOrient);

    //Currently stores crossword grid, this will be moved to API
    const [letterGrid, setLetterGrid] = useState([{ 'letter': '', 'key': 0, 'focus': false, 'correct': false }, { 'letter': '', 'key': 1, 'focus': false, 'correct': false }, { 'letter': '', 'key': 2, 'focus': false, 'correct': false }, { 'letter': '', 'key': 3, 'focus': false, 'correct': false }, { 'letter': '00', 'key': 4, 'focus': false, 'correct': false }, { 'letter': '', 'key': 5, 'focus': false, 'correct': false }, { 'letter': '', 'key': 6, 'focus': false, 'correct': false }, { 'letter': '', 'key': 7, 'focus': false, 'correct': false }, { 'letter': '', 'key': 8, 'focus': false, 'correct': false }, { 'letter': '', 'key': 9, 'focus': false, 'correct': false }, { 'letter': '', 'key': 10, 'focus': false, 'correct': false }, { 'letter': '', 'key': 11, 'focus': false, 'correct': false }, { 'letter': '', 'key': 12, 'focus': false, 'correct': false }, { 'letter': '', 'key': 13, 'focus': false, 'correct': false }, { 'letter': '', 'key': 14, 'focus': false, 'correct': false }, { 'letter': '', 'key': 15, 'focus': false, 'correct': false }, { 'letter': '', 'key': 16, 'focus': false, 'correct': false }, { 'letter': '', 'key': 17, 'focus': false, 'correct': false }, { 'letter': '', 'key': 18, 'focus': false, 'correct': false }, { 'letter': '', 'key': 19, 'focus': false, 'correct': false }, { 'letter': '', 'key': 20, 'focus': false, 'correct': false }, { 'letter': '', 'key': 21, 'focus': false, 'correct': false }, { 'letter': '', 'key': 22, 'focus': false, 'correct': false }, { 'letter': '00', 'key': 23, 'focus': false, 'correct': false }, { 'letter': '00', 'key': 24, 'focus': false, 'correct': false }]);

    //Calculates what the current question is by using grid orient and the current cell
    var questionNumber = 0;
    //Calculate grid level to select horizontal or vertical cells background
    if (gridOrient) {
        var currentCellGridLevel = currentCell % 5;
        questionNumber = currentCellGridLevel + 5
    } else {
        var currentCellGridLevel = Math.floor(currentCell / 5);
        questionNumber = currentCellGridLevel
    }

    props.questions.map((question) => {
        if (question.key == questionNumber && question.key != props.currentQuestionObj.key) {
            props.changeQuestion(question)
        }
    });

    //Check if current word is correct
    const checkCorrect = () => {
        //Need to get corresponding word from lettergrid
        var currentWord = ''
        letterGrid.forEach((letterObj) => {
            if (props.currentQuestionObj.grid === 'horizontal') {
                if (Math.floor(letterObj.key / 5) == props.currentQuestionObj.key && letterObj.letter != '00') {
                    currentWord += letterObj.letter
                }
            } else {
                if (letterObj.key % 5 == props.currentQuestionObj.key % 5 && letterObj.letter != '00') {
                    currentWord += letterObj.letter
                }
            }
        })
        //Change correct based on result return
        sendWord(currentWord, props.currentQuestionObj.key).then((result) => {
            if (result) {
                setLetterGrid(letterGrid.map((letterObj) => {
                    if (props.currentQuestionObj.grid === 'horizontal') {
                        if (Math.floor(letterObj.key / 5) == props.currentQuestionObj.key && letterObj.letter != '00') {
                            letterObj.correct = true
                            return letterObj
                        }
                    } else {
                        if (letterObj.key % 5 == props.currentQuestionObj.key % 5 && letterObj.letter != '00') {
                            letterObj.correct = true
                            return letterObj
                        }
                    }
                    return letterObj
                }))
            }
        });
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
                (letterObj.key == currentCell || objCellGridLevel === currentCellGridLevel) ? backgroundColor = `${styles.selectBackground} ${styles.crossword_letter}` : backgroundColor = `${styles.crossword_letter}`;
                return (<div className={backgroundColor} key={index}><CrosswordLetter checkWord={checkCorrect} letterObj={letterObj} focusChange={focusChange} cellChange={cellChange} onGridHandler={onGridHandler} /></div>)
            })}
        </div>
    )
}

export default Crossword