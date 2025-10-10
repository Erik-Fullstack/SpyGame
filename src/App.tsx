import { useState } from 'react'
import './App.css'
import Game from './Game/Game'
import { Button } from "@mui/material";

//spygame med kort knapp för spelregler. (todo)
//spelLoop = <Options/> välj timer för spelet, välj antal spelare(default===min = 3), välj antal spies(default===min = 1)
// <Roles/> slumpa en spion eller flera, rendera korten som visar roller. När sista har valt visa knapp för att starta spelet.
// <Round/> spelet körs. timern visas och knapp för att pausa timern. hoppar till <Finish/> när timern är 0
// <Finish> Tiden är slut. gameActive sätts till false igen
function App() {
  const [gameActive, setGameActive] = useState<boolean>(false)

  return (
    <>
    <h1>SPIONSPEL</h1>
    {gameActive ? <Game/> : <Button onClick={() => setGameActive(true)} variant='contained'>PLAY</Button>}
    </>
  )
}

export default App
