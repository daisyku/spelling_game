// Filename - App.js

// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";

function scoring(word) {
  return word.length
}

function App() {


  const [letters, setLetters] = useState([]); // State to store the letters
  const [correctInputs, setCorrectInputs] = useState([]); // State to store the correct inputs
  const [lst, setLst] = useState([]); // State to store the special inputs
  const [userInput, setUserInput] = useState(''); // State to store the user's input
  //const [guess, setGuess] = useState(''); // State to store the current guess
  const [alreadyGuessed, setAlreadyGuessed] = useState([]); // State to store the already guessed words
  const [points, setPoints] = useState(0); // State to store the points
  const [special_letter, setSpecialLetter] = useState('')
  
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
  };

  // Fetch the letters from the server when the component mounts
  useEffect(() => {
    fetchGameState();
  }, []);

  const handleButtonClick = (letter) => {
    setUserInput(userInput + letter)
    const newUserInput = userInput + letter;
    console.log('userintput is:', newUserInput);
    setUserInput(newUserInput);
  };

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setUserInput(userInput.slice(0, -1));
  };

  const handleGuessSubmission = () => {
   //setGuess(userInput);
    console.log('submitting guess: ', userInput)
    //console.log('guess is: ', guess)
    if (correctInputs.includes(userInput) &&  userInput.includes(special_letter) ) {
      if (alreadyGuessed.includes(userInput) ) {
        alert("Already Guessed");
      } else if (lst.includes(userInput)){
        alert("its a pangram!!!");
        // fetch(`/score?word=${userInput}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     setPoints(points + data.score);
        //     //setAlreadyGuessed(alreadyGuessed + guess);
        //     alreadyGuessed.push(userInput)
        //     //setGuess('');
        //     //setUserInput('')
        //   });
        var current = scoring(userInput)
        setPoints(points+current)
      }
      else {
        alert("Great!");
        // fetch(`/score?word=${userInput}`)
        //   .then(response => response.json())
        //   .then(data => {
        //     setPoints(points + data.score);
        //     //setAlreadyGuessed(alreadyGuessed + guess);
        //     alreadyGuessed.push(userInput)
        //   });
        current = scoring(userInput)
        setPoints(points+current)
      }
    } else {
      alert("Not a valid word!");
    }
    setUserInput('');
    //setGuess('');
  };


	return (
		<div className="App">
			<header className="App-header">
				<h1>Spelling Bee!!</h1>
				{/* Calling a data from setdata for showing */}
				{/* <p>{data.name}</p>
				<p>{data.age}</p>
				<p>{data.date}</p>
				<p>{data.programming}</p> */}
        {/* {letters.map((letter) => (
          <button key={letter}>{letter}</button>
        ))} */}
        
        <button onClick={() => handleButtonClick(letters[0])}>{letters[0]}</button>
        <button onClick={() => handleButtonClick(letters[1])}>{letters[1]}</button>
        <button onClick={() => handleButtonClick(letters[2])}>{letters[2]}</button>
        <button onClick={() => handleButtonClick(letters[3])}>{letters[3]}</button>
        <button onClick={() => handleButtonClick(letters[4])}>{letters[4]}</button>
        <button onClick={() => handleButtonClick(letters[5])}>{letters[5]}</button>
        <button onClick={() => handleButtonClick(letters[6])}>{letters[6]}</button>
        <button onClick={fetchGameState}>New Game</button>
        <p>{userInput}</p>
        <button onClick={handleDeleteClick}>Delete</button>
        <button onClick={handleGuessSubmission}>Submit Guess</button>
        <p>Current Guess: {userInput}</p>
        <p>Points: {points}</p>
        <p>Already Guessed: {alreadyGuessed.join(', ')}</p>

			</header>
		</div>
	);
}

export default App;
