//Communicate with backend for individual word
async function sendWord(word, questionKey) {
    const response = await fetch('http://localhost:3000/api/word',
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

//Communicate with backend for checking whole crossword
async function sendCrossword(questions) {
    const response = await fetch('http://localhost:3000/api/crossword',
        {
            method: "POST",
            body: JSON.stringify(questions)
        })
    const result = await response.json();
    console.log(`Server response: ${result.result}`)
    return (result.result);
}

//Get all words from lettergrid and check all
async function findWords(letterGrid) {
    var questionKey = 0
    var questions = []
    let word = ''
    for (var row = 0; row < letterGrid.length; row++) { 
        if((row%5 == 0 && row != 0) || row == letterGrid.length - 1){
            questions.push({'key': questionKey, 'word': word})
            questionKey+=1
            word = ''
        }  
        if(letterGrid[row].letter != ' ' && letterGrid[row].letter != '00'){
            word += letterGrid[row].letter
        }     
    }
    for(var column = 0; column<5; column++){
        word = ''
        for (var i = column; i <= column+(20); i+=5) {
            if(letterGrid[i].letter != ' ' && letterGrid[i].letter != '00'){
                word += letterGrid[i].letter
            }
        }
        questions.push({'key': questionKey, 'word': word})
        questionKey+=1
    }
    var result = sendCrossword(questions)
    return result
}

//Return false if update not needed, else update letterGrid with opponent answer 
function sortOpponent(letterGrid, opponent){
    var change = false
    for(var i = 0; i<opponent.length; i++){
        var ans = opponent[i]
        //Horizontal
        if(ans.wordKey < 5){
            var row = 5*ans.wordKey
            for(var j = 0;j<ans.Answer.length;j++){
                if(letterGrid[row].id == 0){
                    change = true
                    letterGrid[row].letter = ans.Answer[j]
                    letterGrid[row].id = 2
                }
                row+=1
            }
        } else{
            var column = ans.wordKey % 5
            for(var j = 0;j<ans.Answer.length;j++){
                if(letterGrid[column].id == 0){
                    change = true
                    letterGrid[column].letter = ans.Answer[j]
                    letterGrid[column].id = 2
                }
                column+=5
            }
        }
    }
    if(change){
        return letterGrid
    } else{
        return false
    }
}


//Gets lettergrid, and current question, retrieves responding current answer and checks with backend if corrent
async function checkCorrect(letterGrid, currentQuestion) {

    var currentWord = ''
    for (let i = 0; i < letterGrid.length; i++) {
        if (currentQuestion.grid === 'horizontal') {
            if (Math.floor(letterGrid[i].key / 5) == currentQuestion.key && letterGrid[i].letter != '00') {
                currentWord += letterGrid[i].letter
            }
        } else {
            if (letterGrid[i].key % 5 == currentQuestion.key % 5 && letterGrid[i].letter != '00') {
                currentWord += letterGrid[i].letter
            }
        }
    }
    //Change correct based on result return
    var grid = sendWord(currentWord, currentQuestion.key).then((result) => {
        if (result) {
            var returnGrid = letterGrid.map((letterObj) => {
                if (currentQuestion.grid === 'horizontal') {
                    if (Math.floor(letterObj.key / 5) == currentQuestion.key && letterObj.letter != '00') {
                        letterObj.id = 1
                        return letterObj
                    }
                } else {
                    if (letterObj.key % 5 == currentQuestion.key % 5 && letterObj.letter != '00') {
                        letterObj.id = 1
                        return letterObj
                    }
                }
                return letterObj
            })
            return returnGrid
        } else {
            return false
        }
    });
    return grid
}

export { findWords, checkCorrect, sortOpponent }