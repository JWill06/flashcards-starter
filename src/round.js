const { evaluateGuess } = require("./card")

function createRound(deck){
    let round = {
        deck: deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: []
    }
    return round
}

function takeTurn(guess, round){
    const correctAnswer = round.currentCard.correctAnswer
    const possibility = evaluateGuess(guess, correctAnswer)
    if(possibility === 'Incorrect!'){
        round.incorrectGuesses.push(round.currentCard.id)
    }
    round.turns++
    round.currentCard = round.deck[round.turns]
    return possibility
}

function calculatePercentageCorrect(round) {
    if (round.turns === 0) {
        return 0; 
    }
    const totalGuesses = round.turns  
    const incorrectGuessesCount = round.incorrectGuesses.length;
    const correctGuessesCount = totalGuesses - incorrectGuessesCount;
    const percentageCorrect = (correctGuessesCount / totalGuesses) * 100;
    return percentageCorrect;
}

function endRound(round){
    const totalPercentage = calculatePercentageCorrect(round)
    console.log("TOTAL PERCENT:", totalPercentage)
    return `** Round over! ** You answered ${totalPercentage}% of the questions correctly!`
}


module.exports = {
    createRound,
    takeTurn,
    calculatePercentageCorrect,
    endRound
}