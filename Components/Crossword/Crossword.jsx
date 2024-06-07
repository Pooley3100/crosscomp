import React from 'react'
import styles from './crossword.module.css'
import CrosswordLetter from '@/Components/CrosswordLetters/CrosswordLetter'

const Crossword = () => {
    const letterGrid = ['w', 'e', 'i', 'r', 'd', 'w', 'e', 'i', 'r', 'd', 'w', 'e', '00', 'r', 'd', 'w', 'e', 'i', 'r', 'd', 'w', '00', 'i', 'r', 'd']
    return (
        <div className={styles.container}>
            {letterGrid.map((letter, index)=>{
                return(<div className={styles.crossword_letter} key={index}><CrosswordLetter letter={letter} /></div>)
            })}
        </div>
    )
}

export default Crossword