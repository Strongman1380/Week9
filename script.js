// Card Class - Represents an individual playing card
class Card {
    constructor(suit, rank, value) {
        this.suit = suit; // Suit of the card (Spades, Hearts, Diamonds, Clubs)
        this.rank = rank; // Rank of the card (2, 3, ... , King, Ace)
        this.value = value; // Numerical value for game logic
    }
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}

// Deck Class - Represents a full deck of 52 playing cards
class Deck {
    constructor() {
        this.cards = [];
        this.suits = ["Spades 🗡️", "Hearts ❤️", "Diamonds 💎", "Clubs 🍀"];
        this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
        this.values = {"2":2, "3":3, "4":4, "5":5, "6":6, "7":7, "8":8, "9":9, "10":10, "Jack":11, "Queen":12, "King":13, "Ace":14};
        this.createDeck();
    }
    
    createDeck() {
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.cards.push(new Card(suit, rank, this.values[rank]));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    deal() {
        return [this.cards.slice(0, 26), this.cards.slice(26)];
    }
}

// Player Class - Represents each player in the game
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    drawCard() {
        return this.hand.shift();
    }

    addCards(cards) {
        this.hand.push(...cards);
    }
}

// Game Class - Handles the game logic
class Game {
    constructor(player1Name, player2Name) {
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.deck = new Deck();
        this.deck.shuffle();
        [this.player1.hand, this.player2.hand] = this.deck.deal();
        this.rounds = 0;
    }

    playRound() {
        if (this.player1.hand.length === 0 || this.player2.hand.length === 0) {
            return false; // Stop game if any player has no more cards
        }

        let card1 = this.player1.drawCard();
        let card2 = this.player2.drawCard();
        let outputDiv = document.getElementById("output");

        outputDiv.innerHTML += `${this.player1.name} plays ${card1.toString()}<br>`;
        outputDiv.innerHTML += `${this.player2.name} plays ${card2.toString()}<br>`;

        if (card1.value > card2.value) {
            this.player1.score++;
            outputDiv.innerHTML += `${this.player1.name} wins this round!<br>`;
        } else if (card2.value > card1.value) {
            this.player2.score++;
            outputDiv.innerHTML += `${this.player2.name} wins this round!<br>`;
        } else {
            outputDiv.innerHTML += "It's a tie!<br>";
        }

        this.rounds++;
        return true;
    }

    playGame() {
        let outputDiv = document.getElementById("output");
        outputDiv.innerHTML = "Starting the game of WAR!<br>";
        while (this.playRound()) {} // Keep playing rounds
        this.determineWinner();
    }

    determineWinner() {
        let outputDiv = document.getElementById("output");
        outputDiv.innerHTML += "Game Over!<br>";
        outputDiv.innerHTML += `${this.player1.name}'s Score: ${this.player1.score}<br>`;
        outputDiv.innerHTML += `${this.player2.name}'s Score: ${this.player2.score}<br>`;

        if (this.player1.score > this.player2.score) {
            outputDiv.innerHTML += `${this.player1.name} wins the game!<br>`;
        } else if (this.player2.score > this.player1.score) {
            outputDiv.innerHTML += `${this.player2.name} wins the game!<br>`;
        } else {
            outputDiv.innerHTML += "It's a tie!<br>";
        }
    }
}

// Function to start the game when button is clicked
function startGame() {
    const game = new Game("Alice", "Bob");
    game.playGame();
}