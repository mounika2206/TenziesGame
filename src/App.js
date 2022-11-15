import  React from 'react';
import './style.css';
import Die from './Die.js';
import {nanoid} from "nanoid";
import Confetti from "react-confetti"
function App() {
  const[dice,setDice]=React.useState(allowNewDice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
const allHeld=dice.every(die=>die.isHeld)
const firstValue=dice[0].value
const allSameValue=dice.every(die=>die.value===firstValue)
if(allHeld &&allSameValue){
  setTenzies(true)
  console.log("You won!!")
}
  },[dice])

  
  function generateNewDie()
  {
    return {value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }
  function allowNewDice()
  {
   
    const newDice=[]
    for(let i=0;i<10;i++)
    {
      newDice.push(generateNewDie()
        )
        
    }
    return newDice;

  }
  function rollDice()
  {
    if(!tenzies){
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld?die:generateNewDie()
    }))
  }
  else{
    setTenzies(false)
    setDice(allowNewDice())
  }
}
  function holdDice(id)
  {
  setDice(oldDice=>oldDice.map(die=>{
    return die.id=== id?{...die,isHeld:!die.isHeld}:die
  }
    ))
  }


  const diceElements=dice.map(die=><Die key={die.id} value={die.value} isHeld={die.isHeld}
    holdDice={()=>holdDice(die.id)}/>)
  return (
   <main>
    {tenzies && <Confetti/>}
    <h1 className='title'>Tenzies</h1>
    <p className='para'>Roll until all dies are same.Click each die to freeze it at its current value between rolls.</p>
    <div className="dice-container">
{diceElements}
</div>
<button className="roll-dice"onClick={rollDice}>
  
  {tenzies?"New Game":"Roll"}</button>
   </main>
  )
}

export default App;
