import React from 'react'
import styles from './question.module.css'
import { useWindowSize } from "@uidotdev/usehooks";

const Question = (props) => {
  const size = useWindowSize();
  const questionChange = (questionObj) => {
    if(questionObj.key < 5) questionObj.key *= 5;
    props.changeCell(questionObj.key);
    props.changeQuestion(questionObj);
  }

  var selectedQuestion = `${styles.questionText} ${styles.selectedQuestion}`
  return (
    <div className={styles.container}>
      {size.width < 700 ?
        <div className={styles.questionBox}>
          <p>{props.question.question}</p>
        </div>
        :
        <>
          <div className={styles.questionListHorizontal}>
            <ol className={styles.questionList}>
              {props.questionList.slice(0, 5).map((question, index) => {
                return (<li key={index} className={question.question == props.question.question ? selectedQuestion : styles.questionText}>
                  <button onClick={() => questionChange(question)}>{question.question}</button>
                </li>)
              })
              }
            </ol>
          </div>
          <div className={styles.questionListVertical}>
            <ol className={styles.questionList}>
              {props.questionList.slice(5, 10).map((question, index) => {
                return (<li key={index} className={question.question == props.question.question ? selectedQuestion : styles.questionText}>
                  <button onClick={() => questionChange(question)}>{question.question}</button>
                </li>)
              })
              }
            </ol>
          </div>
        </>
      }
    </div>
  )
}

export default Question