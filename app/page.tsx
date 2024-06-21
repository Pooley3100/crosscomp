'use client'

import Crossword from "@/Components/Crossword/Crossword"
import Question from '@/Components/Question/Question'
import { useState } from "react";

export default function Home() {
  //Current Question Obj
  const [question, setQuestion] = useState({ 'key': 0, 'grid': 'horizontal', 'question': 'powdery mineral', 'answer': 'talc', 'letters': 4 });
  //Curently selected cell item in crossword
  const [currentCell, setCurrentCell] = useState(0);

  const onCellChange = (key: number) => {
    setCurrentCell(key);

    //Compute if question changes
    let questionNumber = 0
    if (question.grid == 'vertical') {
      questionNumber = (key % 5)  + 5;
    } else {
      questionNumber = Math.floor(key / 5);
    }
    let questionObj: object = {}
    for(let i: number = 0; i<questions.length; i++){
      if(questions[i].key == questionNumber){
        questionObj = questions[i]
      }
    }
    changeQuestion(questionObj)
  }
  const changeQuestion = (question: any) => {
    setQuestion(question);
  }

  //Put questions on api at some point
  //0,1,2,3,4 for horizontal Qs then (+ 5 on each key) to get to vertical levels
  const questions = [{ 'key': 0, 'grid': 'horizontal', 'question': 'powdery mineral', 'answer': 'talc', 'letters': 4 },{ 'key': 1, 'grid': 'horizontal', 'question': 'This may make you cry', 'answer': 'onion', 'letters': 5 }, { 'key': 2, 'grid': 'horizontal', 'question': 'Candy maker responsible for lickable wallpaper', 'answer': 'wonka', 'letters': 5 }, { 'key': 3, 'grid': 'horizontal', 'question': 'Good puzzle piece to start with', 'answer': 'edges', 'letters': 5 }, { 'key': 4, 'grid': 'horizontal', 'question': 'Tolstoy', 'answer': 'leo', 'letters': 3 }, { 'key': 5, 'grid': 'vertical', 'question': 'Item in a beach bag', 'answer': 'towel', 'letters': 5 }, { 'key': 6, 'grid': 'vertical', 'question': 'One end of a battery', 'answer': 'anode', 'letters': 5 }, { 'key': 7, 'grid': 'vertical', 'question': 'Specialized "-speak"', 'answer': 'lingo', 'letters': 5 }, { 'key': 8, 'grid': 'vertical', 'question': 'Jack and __(mixed drink)', 'answer': 'coke', 'letters': 4 }, { 'key': 9, 'grid': 'vertical', 'question': '"stillmatic" rapper', 'answer': 'nas', 'letters': 3 }];

  return (
    <main className="container">
      <Crossword currentQuestionObj={question} currentCell={currentCell} changeCell={onCellChange} questions={questions} changeQuestion={changeQuestion} />
      <Question question={question} changeQuestion={changeQuestion} questionList={questions} changeCell={onCellChange} />
    </main>
  );
}
