async function opponentFetch(){
    const response = await fetch('http://localhost:3000/api/opponent')
    const result = response.json();
    return result
}

//Communicate with server at interval for any updates on opponent correct words
function checkOpponent(){
    var result = opponentFetch();
    return result
}

export {checkOpponent}