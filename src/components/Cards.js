import React from 'react'



export default function Cards({card, handleCard, isFlipped}) {
  const handleFlipOne = () => {
    handleCard(card)
  }
  return (
    <div className='card-images'>
            <div className={isFlipped ? "flipped" : ""}>
                <img className='front-card' src={card.img} alt="Front Card"/>
                
                <img className='back-card' 
                    src='./icons8-card-100.png' 
                    onClick={handleFlipOne} 
                    alt='Back Card'/>
            </div>
    </div>

            
    
  )
}
