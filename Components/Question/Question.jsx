import React from 'react'
import styles from './question.module.css'
import { useWindowSize } from "@uidotdev/usehooks";

const Question = (props) => {
  const size = useWindowSize();

  return (
    <div className={styles.container}>
      {size.width < 700 ?
        <div className={styles.questionBox}>
          <p>{props.question}</p>
        </div>
        :
        <>
          <div className={styles.questionListHorizontal}>
            <ul className={styles.questionList}>
              <li className={styles.questionText}>
                1. Salty
              </li>
            </ul>
          </div>
          <div className={styles.questionListVertical}>
          <ul className={styles.questionList}>
              <li className={styles.questionText}>
                1. Salty
              </li>
            </ul>
          </div>
        </>
      }
    </div>
  )
}

export default Question