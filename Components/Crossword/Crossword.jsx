'use client'

import React, {useState} from 'react'
import styles from './crossword.module.css'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = (props) => {
    //Stores currently selected cell and this with gridOrient infrom Question to show
    const [currentCell, setCurrentCell] = useState(0);
    //False for horizontal question, true for vertical question
    const [gridOrient, setGridOrient] = useState(false);
    var currentQuestion = '';
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
                if(obj.key == letterObj.key+1 && !gridOrient && obj.letter != '00'){
                    obj.focus = true;
                    setCurrentCell(obj.key);
                } else if(obj.key == letterObj.key+5 && gridOrient && obj.letter != '00'){
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
    const [letterGrid, setLetterGrid] = useState([{'letter':'', 'key':0, 'focus': false},{'letter':'', 'key':1, 'focus': false},{'letter':'', 'key':2, 'focus': false},{'letter':'', 'key':3, 'focus': false},{'letter':'00', 'key':4, 'focus': false},{'letter':'', 'key':5, 'focus': false},{'letter':'', 'key':6, 'focus': false},{'letter':'', 'key':7, 'focus': false},{'letter':'', 'key':8, 'focus': false},{'letter':'', 'key':9, 'focus': false},{'letter':'', 'key':10, 'focus': false},{'letter':'', 'key':11, 'focus': false},{'letter':'', 'key':12, 'focus': false},{'letter':'', 'key':13, 'focus': false},{'letter':'', 'key':14, 'focus': false},{'letter':'', 'key':15, 'focus': false},{'letter':'', 'key':16, 'focus': false},{'letter':'', 'key':17, 'focus': false},{'letter':'', 'key':18, 'focus': false},{'letter':'', 'key':19, 'focus': false},{'letter':'', 'key':20, 'focus': false},{'letter':'', 'key':21, 'focus': false},{'letter':'', 'key':22, 'focus': false},{'letter':'00', 'key':23, 'focus': false},{'letter':'00', 'key':24, 'focus': false}]);
    // 0,1,2,3,4 for horizontal Qs then (+ 5 on each key) to get to vertical levels
    const questions = [{'key' : 0, 'grid': 'horizontal', 'question': 'Powdery mineral', 'answer': 'talc', 'letters': 4},{'key' : 1, 'grid': 'horizontal', 'question': 'This may make you cry', 'answer': 'onion', 'letters': 5},{'key' : 2, 'grid': 'horizontal', 'question': 'Candy maker responsible for lickable wallpaper', 'answer': 'wonka', 'letters': 5},{'key' :3, 'grid': 'horizontal', 'question': 'Good puzzle piece to start with', 'answer': 'edges', 'letters': 5},{'key' : 4, 'grid': 'horizontal', 'question': 'Tolstoy', 'answer': 'leo', 'letters': 3},{'key' : 5, 'grid': 'vertical', 'question': 'Item in a beach bag', 'answer': 'towel', 'letters': 5},{'key' : 6, 'grid': 'vertical', 'question': 'One end of a battery', 'answer': 'anode', 'letters': 5},{'key' : 7, 'grid': 'vertical', 'question': 'Specialized "-speak"', 'answer': 'lingo', 'letters': 5},{'key' : 8, 'grid': 'vertical', 'question': 'Jack and __(mixed drink)', 'answer': 'coke', 'letters': 4},{'key' : 9, 'grid': 'vertical', 'question': '"stillmatic" rapper', 'answer': 'nas', 'letters': 3}];
    
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
            props.changeQuestion(question.question)
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