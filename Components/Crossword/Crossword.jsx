'use client'

import React, {useState} from 'react'
import styles from './crossword.module.css'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = () => {
    //Stores currently selected cell and this with gridOrient infrom Question to show
    const [currentCell, setCurrentCell] = useState(0);
    //False for horizontal question, true for vertical question
    const [gridOrient, setGridOrient] = useState(false);
    //Focus Change updates letter grid and moves focus to next letter when typed. grid is hor or vert.
    const cellChange = (key) => {
        setCurrentCell(key);
        setLetterGrid(letterGrid.map(obj => {
            if(obj.key == key){
                obj.focus = true
                return obj
            } else{
                obj.focus = false
                return obj
            }
        }));
    }
    //Called when letter is set and move automatically to next cell
    const focusChange = (letterObj) => {
        const nextLetterGrid = letterGrid.map(obj => {
            if(obj.key != letterObj.key){
                //Set Orient Increment:
                if(obj.key == letterObj.key+1 && !gridOrient){
                    obj.focus = true;
                    setCurrentCell(obj.key);
                } else if(obj.key == letterObj.key+5 && gridOrient){
                    obj.focus = true;
                    setCurrentCell(obj.key);
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
    //Function to swith between hor and vert
    const onGridHandler = () => setGridOrient(!gridOrient);

    //Currently stores crossword grid, this will be moved to API
    const [letterGrid, setLetterGrid] = useState([{'letter':'w', 'key':0, 'focus': false},{'letter':'e', 'key':1, 'focus': false},{'letter':'i', 'key':2, 'focus': false},{'letter':'r', 'key':3, 'focus': false},{'letter':'d', 'key':4, 'focus': false},{'letter':'w', 'key':5, 'focus': false},{'letter':'e', 'key':6, 'focus': false},{'letter':'i', 'key':7, 'focus': false},{'letter':'r', 'key':8, 'focus': false},{'letter':'d', 'key':9, 'focus': false},{'letter':'w', 'key':10, 'focus': false},{'letter':'e', 'key':11, 'focus': false},{'letter':'i', 'key':12, 'focus': false},{'letter':'r', 'key':13, 'focus': false},{'letter':'d', 'key':14, 'focus': false},{'letter':'w', 'key':15, 'focus': false},{'letter':'e', 'key':16, 'focus': false},{'letter':'i', 'key':17, 'focus': false},{'letter':'r', 'key':18, 'focus': false},{'letter':'d', 'key':19, 'focus': false},{'letter':'w', 'key':20, 'focus': false},{'letter':'00', 'key':21, 'focus': false},{'letter':'i', 'key':22, 'focus': false},{'letter':'r', 'key':23, 'focus': false},{'letter':'d', 'key':24, 'focus': false}]);
    // 0,1,2,3,4 for horizontal Qs then (+ 5 on each key) to get to vertical levels
    const questions = [{'key' : 0, 'grid': 'horizontal', 'question': 'something is a bit off', 'answer': 'weird', 'letters': 5}];
    
    //Calculates what the current question is by using grid orient and the current cell
    var questionNumber = 0;
    //Calculate grid level to select horizontal or vertical cells background
    if(gridOrient){
        var currentCellGridLevel = currentCell % 5;
        questionNumber = currentCellGridLevel + 5
    } else{
        var currentCellGridLevel = Math.floor(currentCell/5);
        questionNumber = currentCellGridLevel
    }
    
    questions.map((question) => {
        if(question.key == questionNumber){
            console.log(question.question)
        }
    });

    return (
        <div className={styles.container}>
            {letterGrid.map((letterObj, index)=>{
                if(gridOrient){
                    var objCellGridLevel = letterObj.key % 5;
                } else{
                    var objCellGridLevel = Math.floor(letterObj.key/5);
                }
                var backgroundColor = ``;
                (letterObj.key == currentCell || objCellGridLevel === currentCellGridLevel) ? backgroundColor = `${styles.selectBackground} ${styles.crossword_letter}` : backgroundColor = `${styles.crossword_letter}`;
                return(<div className={backgroundColor} key={index}><CrosswordLetter letterObj={letterObj} focusChange={focusChange} cellChange={cellChange} onGridHandler={onGridHandler}/></div>)
            })}
        </div>
    )
}

export default Crossword