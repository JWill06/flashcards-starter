const { expect } = require("chai");
const { beforeEach } = require('mocha');
const { createCard, evaluateGuess } = require('../src/card');
const { createDeck } = require("../src/deck")
const { createRound, takeTurn, calculatePercentageCorrect, endRound } = require("../src/round")

const card1 = createCard(1, "What allows you to define a set of related information using key-value pairs?", ["object", "array", "function"], "object")
const card2 = createCard(2, "What is a comma-separated list of related values?", ["array", "object", "function"], "array")
const card3 = createCard(3, "What type of prototype method directly modifies the existing array?", ["mutator method", "accessor method", "iteration method"], "mutator method")
const card4 = createCard(4, "hat type of prototype method does not modify the existing array but returns a particular representation of the array?", ["mutator method", "accessor method", "iteration method"], "accessor method")
const card5 = createCard(5, "What type of prototype method loops through the existing array and applies a callback function that may mutate each element and return a new value?", ["mutator method", "accessor method", "iteration method"], "iteration method")
const card6 = createCard(6, "What is an example of a mutator method?", ["sort()", "map()", "join()"], "sort()")
const card7 = createCard(7, "Which array prototype is not an accessor method?", ["join()", "slice()", "splice()"], "splice()")
const card8 = createCard(8, "What do iterator methods take in as their first argument?", ["callback function", "current element", "an array"], "callback function")
const card9 = createCard(9, "What does the callback function for find() return?", ["boolean", "array", "object"], "boolean")
const card10 = createCard(10, "Which iteration method returns the first array element where the callback function returns true", ["find()", "filter()", "forEach()"], "find()")
const deck = createDeck([card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]);

describe('Round', function(){
    it('should be an object with default properties', function(){
        const round = createRound(deck);
        expect(round.turns).to.equal(0);
        expect(round.incorrectGuesses).to.deep.equal([]);
    });

});

describe('Turns', function(){
    it('should be able to take turns', function(){
        const round = createRound(deck);
        takeTurn('object', round)
        expect(round.turns).to.equal(1)
        takeTurn('array', round)
        expect(round.turns).to.equal(2)
    });
    it('should be able to know if an answer is right or wrong', function(){
        const round = createRound(deck)
        const rightAnswer = takeTurn('object', round)
        expect(rightAnswer).to.equal('Correct!')
        const wrongAnswer = takeTurn('object', round)
        expect(wrongAnswer).to.equal('Incorrect!')
    })
})

describe('Total Percentage', function(){
    it('should calculate to total percentage after each guess', function(){
        const round = createRound(deck);

        takeTurn('object', round);
        takeTurn('array', round); 
        takeTurn('accessor method', round); 
        takeTurn('accessor method', round); 

        const percentage = calculatePercentageCorrect(round)
        const expectedPercentage = 75

        expect(percentage).to.equal(expectedPercentage)
    })
})

describe('End Game', function(){
    it('should send a message when the game ends', function(){
        const round = createRound(deck)
        const percentage = calculatePercentageCorrect(round)
        const message = endRound(round)
        const expectedOutputMessage = `** Round over! ** You answered ${percentage}% of the questions correctly!`
        expect(message).to.deep.equal(`${expectedOutputMessage}`)
    })
})
