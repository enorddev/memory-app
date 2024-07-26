import React, {useState, useEffect} from 'react';
import './index.css'
import './App.css';
import Cards from './components/Cards';

const CardsData = [
  {"img": "./ace_of_spades2.png" , matched: false},
  {"img": "./ace_of_diamonds.png" , matched: false},
  {"img": "./ace_of_hearts.png", matched: false},
  {"img": "./red_joker.png", matched: false},
  {"img": "./black_joker.png", matched: false},
  {"img": "./ace_of_spades.png", matched: false},
  {"img": "./king_of_hearts2.png", matched: false},
  {"img":"./7_of_clubs.png", matched: false},
  {"img":"./queen_of_diamonds2.png", matched: false},
  {"img":"./9_of_hearts.png", matched: false},
  {"img":"./queen_of_clubs.png", matched: false},
  {"img":"./6_of_spades.png", matched: false},
  {"img":"./4_of_diamonds.png", matched: false},
  {"img":"./8_of_diamonds.svg", matched: false},
  {"img":"./2_of_clubs.svg", matched: false}

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
    

const winner = () => {
 cards.every(card => card.isFlipped) 
   return console.log("winner");

}

  

 


  return (
  
    <div className="App">
    
      <header className="header">
      <img src='/img/brain-emoji-96.png' alt='Top Image Braim' className='rotating' id='brain'/>
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
