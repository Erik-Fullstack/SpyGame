import { useState } from 'react'
import './App.css'
import Game from './Game/Game'
import { Button } from "@mui/material";

//spygame med kort, knapp för spelregler. (todo)
//spelLoop = <Options/> välj timer för spelet, välj antal spelare(default===min = 3), välj antal spies(default===min = 1)
// <Roles/> slumpa en spion eller flera, rendera korten som visar roller. När sista har valt visa knapp för att starta spelet.
// <Round/> spelet körs. timern visas och knapp för att pausa timern. hoppar till <Finish/> när timern är 0
// <Finish> Tiden är slut. gameActive sätts till false igen

// TODO: Roles korten där man ser om man är spion eller vanlig
function App() {
  const [gameActive, setGameActive] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-black text-slate-100 flex items-center justify-center px-4">
      {!gameActive ? (
        <div className="w-full max-w-sm text-center">
          <h1 className="text-3xl font-extrabold tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]">
            SPY GAME
          </h1>
          <p className="mt-2 text-sm text-neutral-400">Trust no one. Reveal wisely.</p>
          <div className="mt-8">
            <Button
              onClick={() => setGameActive(true)}
              variant='contained'
              color='error'
              className="w-full"
            >
              PLAY
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <Game gameActiveSetter={() => setGameActive(false)} />
        </div>
      )}
    </div>
  )
}

export default App
