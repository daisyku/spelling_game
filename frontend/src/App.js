// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
import Icon from './arrow.png';
import "./App.css";

function scoring(word) {
  if (word.length == 4 ) {
    return 1
  }
  return word.length
}

function totalPoints (lst) {
  var points = 0
  for ( var i = 0; i < lst.length ; i++ ) {
    points += scoring(lst[i])
  }
  return points
}

function App() {


  const [letters, setLetters] = useState([]); // State to store the letters
  const [correctInputs, setCorrectInputs] = useState([]); // State to store the correct inputs
  const [lst, setLst] = useState([]); // State to store the special inputs
  const [userInput, setUserInput] = useState(''); // State to store the user's input
  const [alreadyGuessed, setAlreadyGuessed] = useState([]); // State to store the already guessed words
  const [points, setPoints] = useState(0); // State to store the points
  const [special_letter, setSpecialLetter] = useState('')
  const [maxPoints, setMaxPoints] = useState(0)
  const [inputColor, setInputColor] = useState('black');


  const fetchGameState = () => {
    fetch('/game_state')
      .then(response => response.json())
      .then(data => {
        setLetters(data.letters);
        setCorrectInputs(data.correct_inputs);
        setLst(data.lst);
        setSpecialLetter(data.special_letter)
        setUserInput('')
        console.log('Special letter: ', data.special_letter);
        console.log('pangrams: ', data.lst);

      });
    setPoints(0)
    setAlreadyGuessed([])
    setMaxPoints(totalPoints(correctInputs))
    console.log('max points: ', maxPoints)
  };

  // Fetch the letters from the server when the component mounts
  useEffect(() => {
    fetchGameState();
  }, []);

  const handleButtonClick = (letter) => {
    setUserInput(userInput + letter)
    const newUserInput = userInput + letter;
    //console.log('userintput is:', newUserInput);
    setUserInput(newUserInput);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check if the key is a letter
      if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        // Update the userInput state
        setUserInput(userInput + event.key);
      }

      else if (event.key === 'Enter') {
        handleGuessSubmission()
      }
      
      else if (event.key === 'Backspace') {
        handleDeleteClick()
      }
    };

    // Add the event listener
    window.addEventListener('keydown', handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [userInput]); // Re-run the effect when `userInput` changes

  // const handleIncorrectLetter = (event) => {
  //   const newInput = event.target.value;
  //   const lastChar = newInput[newInput.length - 1];

  //   if (letters.includes(lastChar)) {
  //       setInputColor('green');
  //   } else {
  //       setInputColor('gray');
  //   }

  //   setUserInput(newInput);
  // };
  // Function to handle delete button click
  const handleDeleteClick = () => {
    setUserInput(userInput.slice(0, -1));
  };

  const handleGuessSubmission = () => {
    console.log('handling guess: ', userInput)
    console.log('already guessed is: ', alreadyGuessed)
    if (correctInputs.includes(userInput) &&  userInput.includes(special_letter) ) {
      if (alreadyGuessed.includes(userInput) ) {
        alert("Already Guessed");
      } else if (lst.includes(userInput)){
        alert("its a pangram!!!");
        var current = scoring(userInput)
        setPoints(points+current)
        setAlreadyGuessed([...alreadyGuessed, userInput]);
      }
      else {
        alert("Great!");
        current = scoring(userInput)
        setPoints(points+current)
        setAlreadyGuessed([...alreadyGuessed, userInput]);
      }
    } else {
      alert("Not a valid word!");
    }
    setUserInput('');
    // Update the state variable with the new guess
  };

  const handleShuffle = () => {
    let shuffledLetters = [...letters];
    for (let i = shuffledLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
    }
    setLetters(shuffledLetters); // This will trigger a re-render
  };

	return (
		<div className="App">
			<header className="App-header">
				<h1>Spelling Bee!!</h1>

        <p>Points: {points}</p>
        
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <button className={letters[0] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[0])}>{letters[0]}</button>
        <button className={letters[1] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[1])}>{letters[1]}</button>
        <button className={letters[2] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[2])}>{letters[2]}</button>
        <button className={letters[3] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[3])}>{letters[3]}</button>
        <button className={letters[4] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[4])}>{letters[4]}</button>
        <button className={letters[5] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[5])}>{letters[5]}</button>
        <button className={letters[6] === special_letter ? "specialButton" : "myButton"} onClick={() => handleButtonClick(letters[6])}>{letters[6]}</button>
        </div>

        {/* <p>{userInput}</p> */}
        <input 
          style={{
            background: 'transparent', 
            border: 'none', 
            borderBottom: '1px solid #000', 
            outline: 'none',
            fontSize: '30px', 
            height: '30px', 
            caretColor: 'yellow' 
          }} 
          type="text" 
          placeholder="Type or Click"
          value={userInput} 
          //onChange={handleIncorrectLetter} 
        />


        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={handleGuessSubmission}>Submit Guess</button>
        <button className = {"shuffleButton"} onClick={handleShuffle}>
          <img src={Icon} alt="Shuffle Icon" style={{ width: '20px', height: '20px' }}/>
        </button>

        <p>Already Guessed: {alreadyGuessed.join(', ')}</p>
        <p>Max Points: {maxPoints}</p>
        <button onClick={fetchGameState}>New Game</button>

			</header>
		</div>
	);
}

export default App;
