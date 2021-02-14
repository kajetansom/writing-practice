import react, { useState, useEffect } from 'react'
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [activeLetterPos, setActiveLetterPos] = useState(0);
  const [activeWordPos, setActiveWordPos] = useState(0);
  const [displayCount, setDisplayCount] = useState(5);
  const [words, setWords] = useState([
    'hello', 'trust', 'new', 'way', 'fancy', 'word' 
  ])

  const [displayedWords, setDisplayedWords] = useState([]);

  useEffect(() => {
    newWords();
  }, [words]);
 
  const newWords = () => {
    const dWords = [];
    for(let i=0; i<displayCount; i++) {
      const prepWord = {
        word: words[Math.floor(Math.random() * Math.floor(words.length))],
        status: 'default'
      }
      dWords.push(prepWord);
    }
    setActiveWordPos(0)
    setActiveLetterPos(0)
    setDisplayedWords(dWords);
  }

  const changeInput = (e) => {
    setInput(e.target.value); 
  }
  
  const changeInputWords = (e) => {
    e.preventDefault();
    let textAreaInput = e.target.words.value;
    if(textAreaInput !== "" || textAreaInput !== " ") {
      console.log("set new words: ", textAreaInput)
      const inputWords = textAreaInput.split(' ');
      setWords(inputWords)
    }
  }

  const checkLetter = (e) => {
    //let activeWord = displayedWords[activeWordPos]
    let keyInput = e.key
    console.log("key:", keyInput)
    if(keyInput!==' ') {
      let activeLetter = displayedWords[activeWordPos].word[activeLetterPos]
      if (keyInput === activeLetter) {
        if(activeLetterPos+1 >= displayedWords[activeWordPos].word.length) {
          const newdisplayedWords = [...displayedWords];
          newdisplayedWords[activeWordPos].status = 'correct';
          setDisplayedWords(newdisplayedWords);
          setActiveWordPos(activeWordPos+1)
          setActiveLetterPos(0)
          console.log('word completed move to next.. ')
        } else {
          console.log('letter correct')
          setActiveLetterPos(activeLetterPos+1);
        }
        console.log(true)
      } else {
        console.log('letter wrong')
        console.log('expected: ', activeLetter)
      }
    } else {
      console.log('space')
      if(activeWordPos>=displayCount) {
        console.log('get new words')
        setActiveWordPos(0)
        newWords();
      }
    }
    
  }

  let wordlist = displayedWords.map((w, i) => {
    return <span className={w.status} key={i}>{w.word}</span>
  });
  return (
    <div className="App">
      <h1>writing</h1>
      <div className="showcase">
        {wordlist}
      </div>
      <textarea onChange={changeInput} onKeyDown={checkLetter}>
        {input}
      </textarea>
      <h2>Input Words</h2>
      <form onSubmit={changeInputWords}>
        <textarea name="words">
        </textarea>
        <button>set Words</button>
      </form>
    </div>
  );
}

export default App;
