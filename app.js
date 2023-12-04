const firstPlayer = {
    playerChoice: [],
    moveCount: 0
};

const secondPlayer = {
    playerChoice: [],
    moveCount: 0
};

let matrix = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3]
];

function addToPlayerChoices(playerObject, choice) {
    playerObject.playerChoice.push(choice);
}

function removeFromMatrix(matrix, choice) {
    for (let j = 0; j < matrix.length; j++) {
        if (matrix[j][0] === choice[0] && matrix[j][1] === choice[1]) {
            matrix.splice(j, 1);
            break;
        }
    }
}

function determineWinner(firstPlayerChoices, secondPlayerChoices) {
    // Satır ve sütunlardaki eşleşmeleri kontrol et
    for (let i = 1; i <= 3; i++) {
        // Satırlar için kontrol
        let firstPlayerRowMatch = 0;
        let secondPlayerRowMatch = 0;

        // Sütunlar için kontrol
        let firstPlayerColMatch = 0;
        let secondPlayerColMatch = 0;


         // Çapraz kontrol için değişkenler
        let firstPlayerDiagonal1 = 0;
        let firstPlayerDiagonal2 = 0;
        let secondPlayerDiagonal1 = 0;
        let secondPlayerDiagonal2 = 0;


        //satır sütün kontrolü
        for (let j = 0; j < firstPlayerChoices.length; j++) {
            if (firstPlayerChoices[j][0] === i) {
                firstPlayerRowMatch++;
            }
            if (firstPlayerChoices[j][1] === i) {
                firstPlayerColMatch++;
            }
        }

        for (let j = 0; j < secondPlayerChoices.length; j++) {
            if (secondPlayerChoices[j][0] === i) {
                secondPlayerRowMatch++;
            }
            if (secondPlayerChoices[j][1] === i) {
                secondPlayerColMatch++;
            }
        }

         // Çapraz kontrol
        firstPlayerChoices.forEach(choice => {
            if (choice[0] === choice[1]) { // Sol üstten sağ alta
                firstPlayerDiagonal1++;
             }
             if (choice[0] + choice[1] === 4) { // Sağ üstten sol alta
                 firstPlayerDiagonal2++;
             }
         });

         secondPlayerChoices.forEach(choice => {
             if (choice[0] === choice[1]) {
                 secondPlayerDiagonal1++;
             }
             if (choice[0] + choice[1] === 4) {
                secondPlayerDiagonal2++;
             }
         });



        // Kazananı kontrol et

        if (firstPlayerRowMatch === 3 || firstPlayerColMatch === 3 || firstPlayerDiagonal1 === 3 || firstPlayerDiagonal2 === 3) {
            console.log('First player is the winner');
            return 'firstPlayer';
        }
        if (secondPlayerRowMatch === 3 || secondPlayerColMatch === 3 || secondPlayerDiagonal1 === 3 || secondPlayerDiagonal2 === 3) {
            console.log('Second player is the winner');
            return 'secondPlayer';
        }

    }

    // Kazanan yoksa
    return null;
}


function showWinnerPopup(winnerText) {
    document.getElementById('winner-message').textContent = winnerText;
    document.getElementById('container-pop-up').classList.remove('hidden');
}

function restartGame() {
    window.location.reload(); // Sayfayı yeniden yükler
}


document.querySelectorAll('.thecontainer div').forEach(div => {
    div.addEventListener('click', function() {
        const x = parseInt(this.getAttribute('data-x'), 10);
        const y = parseInt(this.getAttribute('data-y'), 10);
        const choice = [x, y];

        const currentPlayer = (firstPlayer.moveCount <= secondPlayer.moveCount) ? firstPlayer : secondPlayer;

        if (matrix.some(([mx, my]) => mx === choice[0] && my === choice[1])) {
            addToPlayerChoices(currentPlayer, choice);
            removeFromMatrix(matrix, choice);
            currentPlayer.moveCount++;

            if (currentPlayer === firstPlayer) {
            this.textContent = 'X';
            this.classList.add('player-x'); // "X" için CSS sınıfı ekle
        } else {
            this.textContent = 'O';
            this.classList.add('player-o'); // "O" için CSS sınıfı ekle
        }


            // Kazananı kontrol etme
            if (currentPlayer.moveCount >= 3) {
                const winner = determineWinner(firstPlayer.playerChoice, secondPlayer.playerChoice);
                if (winner) {
                    const winnerText = winner === 'firstPlayer' ? "First Player wins!" : "Second Player wins!";
                    setTimeout(() => {
                        showWinnerPopup(winnerText);
                    }, 500);
                    return; // Oyunu sonlandır
                }
            }

            // Tüm hamleler tamamlandıysa ve kazanan yoksa, berabere durumunu kontrol et
            if (matrix.length === 0 && !determineWinner(firstPlayer.playerChoice, secondPlayer.playerChoice)) {
                console.log("It's a draw!");
                return; // Oyunu sonlandır
            }
        } else {
            console.log("Invalid move or already taken.");
        }
    });
});
