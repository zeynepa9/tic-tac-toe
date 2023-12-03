
function getUserInput(player, matrix) {
    while (true) {
        let input = prompt(`${player}, enter your location (format: x,y):`);
        let choice = input.split(',').map(Number);
        
        // Matrix'te bu seçimin olup olmadığını kontrol et
        if (matrix.some(([x, y]) => x === choice[0] && y === choice[1])) {
            return choice;
        } else {
            console.log("Invalid move or already taken. Please try again.");
        }
    }
}


function addToPlayerChoices(playerObject, choice) {
    playerObject.playerChoice.push(choice);
    // playerObject.moveCount++;
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





  for (let i = 0; i < 5; i++) {
      // First player'ın hamlesi
      if (matrix.length > 0) {
          let firstPlayerChoice = getUserInput("First player", matrix);
          addToPlayerChoices(firstPlayer, firstPlayerChoice);
          removeFromMatrix(matrix, firstPlayerChoice);
          firstPlayer.moveCount++;
      }
  
      // Kazananı 3 veya daha fazla hamleden sonra kontrol et
      if (firstPlayer.moveCount >= 3 && determineWinner(firstPlayer.playerChoice, secondPlayer.playerChoice)) {
          console.log("Game over, we have a winner!");
          break;
      }
  
      // Second player'ın hamlesi
      if (matrix.length > 0) {
          let secondPlayerChoice = getUserInput("Second player", matrix);
          addToPlayerChoices(secondPlayer, secondPlayerChoice);
          removeFromMatrix(matrix, secondPlayerChoice);
          secondPlayer.moveCount++;
  
    // Kazananı 3 veya daha fazla hamleden sonra kontrol et
          if (secondPlayer.moveCount >= 3 && determineWinner(firstPlayer.playerChoice, secondPlayer.playerChoice)) {
              console.log("Game over, we have a winner!");
              break;
          }
      } else {
          console.log("Berabere!");
          break;
      }
  }
  






console.log("First Player Choices: ", firstPlayer.playerChoice);
console.log("Second Player Choices: ", secondPlayer.playerChoice);

console.log("First Player Move Count: ", firstPlayer.moveCount);
console.log("Second Player Move Count: ", secondPlayer.moveCount);

console.log("Updated Matrix: ", matrix);
