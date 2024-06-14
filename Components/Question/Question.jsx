import React from 'react'
import styles from './question.module.css'
import { useWindowSize } from "@uidotdev/usehooks";

const Question = (props) => {
  const size = useWindowSize();

  return (
    <div className={styles.container}>
      {size.width < 700 ?
      <div className={styles.questionBox}>
        <p className={styles.questionText}>{props.question}</p>
      </div>
      :
      <>
      <div className={styles.questionListHorizontal}>
        <p>Test</p>
      </div>
      <div className={styles.questionListVertical}>
      <p>Test</p>
      </div>
      </>
      }
    </div>
  )
}

export default Question