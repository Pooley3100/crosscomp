'use client'

import Image from "next/image";
import Crossword from "@/Components/Crossword/Crossword"
import Question from '@/Components/Question/Question'
import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState('');
  const changeQuestion = (question: string) => {
    setQuestion(question);
  }

  return (
    <main className="container">
      <Crossword changeQuestion={changeQuestion}/>
      <Question question={question}/>
    </main>
  );
}
