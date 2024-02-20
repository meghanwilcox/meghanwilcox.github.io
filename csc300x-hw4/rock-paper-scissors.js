//this function will be called as soon as the page is loaded
document.addEventListener('DOMContentLoaded', function() {

    //declare global variables
    let playerChoice = '';
    let computerChoice = '';
    let choicesDisabled = false;

    // Function to handle the user's button clicks
    function handleButtonClick(choice) {

        //check if choices are disabled
        if(choicesDisabled){
            return;
        }

        playerChoice = choice;
        console.log('Player chose: ' + playerChoice);

        //make the computer's choice
        makeComputerChoice();
        
        //highlight player choice
        changeSelectionColor(playerChoice);

        //discontinue gameplay until reset
         choicesDisabled = true;
    }

    //function to choose the computer's move
    function makeComputerChoice() {
        //get the computer's choice element and add it to the class to highlight it in blue
        const compChoiceElement = document.getElementById('comp');
        compChoiceElement.classList.add('computer-choice');

        const choices  = [
            'rock', 
            'paper',
            'scissors'
        ]

        //set the duration of the shuffling to be 3000 milliseconds or 3 seconds
        const duration = 3000;

        //shuffle the image in the computer's choice element every 1/2 second for 3 seconds
        const intervalID = setInterval(() => {
            const index = Math.floor(Math.random() * 3);
            compChoiceElement.innerHTML = `<img src="images/${choices[index]}.PNG" alt="">`;
            computerChoice = choices[index];
            console.log('change image: ' + computerChoice); 
        }, 500);

        
        setTimeout(() => {
            //when the shuffle is finished, call the decide winner function to declare a winner of the game
            clearInterval(intervalID);
            console.log('COMPUTER CHOICE: ' + computerChoice); 
            const winner = decideWinner();

            //display the results
            const resultsElement = document.getElementById('results');
            resultsElement.innerHTML = `
                <p>RESULTS: ${winner}!</p>`;

        }, duration);

    }

    //function to decide the winner of the game
    function decideWinner(){
        if(playerChoice === computerChoice){
            winner = 'TIE';
        }
        else if(playerChoice === 'rock' && computerChoice === 'scissors'){
            winner = 'YOU WIN';
        }
        else if(playerChoice === 'rock' && computerChoice === 'paper'){
            winner = 'COMPUTER WINS';
        }
        else if(playerChoice === 'paper' && computerChoice === 'rock'){
            winner = 'YOU WIN';
        }
        else if(playerChoice === 'paper' && computerChoice === 'scissors'){
            winner = 'COMPUTER WINS';
        }
        else if(playerChoice === 'scissors' && computerChoice === 'paper'){
            winner = 'YOU WIN';
        }
        else if(playerChoice === 'scissors' && computerChoice === 'rock'){
            winner = 'COMPUTER WINS';
        }
        console.log(winner);
        return winner;
    }

    //function to change the color of the border of the image that is clicked by the user
    function changeSelectionColor(choice) {
        //get the image element that was clicked
        const image = document.getElementById(choice);

        //add the image to the clickedChoice class
        image.classList.add('clickedChoice');
    }

    //function to handle play again click
    function handlePlayAgain(){
        //get images by id
        const image1 = document.getElementById('rock');
        const image2 = document.getElementById('paper');
        const image3 = document.getElementById('scissors');

        const images = [
            image1, image2, image3
        ];

        //remove the red border around the clicked image
        for(let i = 0; i < images.length; i++){
            if(images[i].classList.contains('clickedChoice')){
                images[i].classList.remove('clickedChoice');
            }
        }

        //remove border around computer's choice
        const comp = document.getElementById('comp');
        comp.classList.remove('computer-choice');

        //reset the results window to the original display
        const results = document.getElementById('results');
        results.innerHTML = `
            <p>RESULTS: </p>`;

        //reset the computer's choice image to the original question make image
        comp.innerHTML = `<img src="images/question-mark.PNG" alt="">`;

        //renable game play
        choicesDisabled = false;
        console.log('Play Again');
    }

    // Add event listeners to buttons
    document.getElementById('rock').addEventListener('click', function () {
        handleButtonClick('rock');
    });

    document.getElementById('paper').addEventListener('click', function () {
        handleButtonClick('paper');
    });

    document.getElementById('scissors').addEventListener('click', function () {
        handleButtonClick('scissors');
    });

    document.getElementById('play-again-btn').addEventListener('click', function() {
        handlePlayAgain();
    });

});