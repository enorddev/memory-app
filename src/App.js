import React, {useState, useEffect} from 'react';
import './index.css'
import './App.css';
import Cards from './components/Cards';

const CardsData = [
  {"img": "./icons8-smiley-64.png" , matched: false},
  {"img": "./icons8-chocolate-bar-emoji-64.png" , matched: false},
  {"img": "./icons8-horse-emoji-64.png", matched: false},
  {"img": "./icons8-mirror-emoji-64.png", matched: false},
  {"img": "./icons8-ninja-emoji-64.png", matched: false},
  {"img": "./icons8-potted-plant-emoji-64.png", matched: false},
]

function App() {

  const [cards, setCards] = useState([])
  const [flip, setFlip] = useState(0)
  const [flipOne, setFlipOne] = useState(null)
  const [flipTwo, setFlipTwo] = useState(null)
  const [win, setWin] = useState(false)


  const suffleImages = () => {
    const shuffledImages = [...CardsData, ...CardsData]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    setFlipOne(null)
    setFlipTwo(null)
    setCards(shuffledImages)
    setFlip(0)
  }

  
  const handleCard = (card) => {
    flipOne ? setFlipTwo(card) : setFlipOne(card)
  }

  useEffect(() => {
   if (flipOne && flipTwo) {
    
    if (flipOne.img === flipTwo.img) {
      setCards(prevState => {
        return prevState.map(card => {
          if(card.img === flipOne.img) {
            return {...card , matched: true}
          } else {
            return card
          }
        })
      })

      resetFlip()
    } else {
      setTimeout(() => resetFlip(), 600)
      
    }
   }
  }, [flipOne, flipTwo])


  console.log(cards);

  const resetFlip = () => {
    setFlipOne(null)
    setFlipTwo(null)
    setFlip(prevFlip => prevFlip + 1)
  }

  useEffect(() => {
    suffleImages()
  }, [])
    
  // useEffect(() => {
  //   const allFlipped = cards.every(card => card.isFlipped)
  //   if(allFlipped) {
  //     setWin(true)
  //     console.log("winner");
  //   }
  // })

 


  return (
    <div className="App">
      <header className="header">
        <h1>MEMORY GAME</h1>
        <button onClick={suffleImages}>Shuffle</button>
      </header>
      <div className='card-container'>
        {cards.map(card => (
          <Cards
            key={card.id}
            card = {card}
            handleCard = {handleCard}
            isFlipped ={card === flipOne || card === flipTwo || card.matched}
          />
        ))}
      </div>
      
    </div>
      

  );
}

export default App;
