import { useState } from "react";
import Options from "./Options";
import Roles from "./Roles";
import Round from "./Round";

type GameProps = {
    gameActiveSetter: () => void
}

export default function Game({ gameActiveSetter }: GameProps) {
    const [gameState, setGameState] = useState<string>("options") //enum? options, roles, round, finish 
    const [timer, setTimer] = useState<number>(10)
    const [numOfPlayers, setNumOfPlayers] = useState<number>(6)
    const [numOfSpies, setNumOfSpies] = useState<number>(1)
    // const [location, setLocation] = useState<string>("") //kanske bara behövs i roles, om inte så slumpa fram något här.

    function progressGameLoop(gameState: string) {
        setGameState(gameState)
    }
    function selectTimer(timer: number) {
        setTimer(timer)
    }
    function selectnumOfPlayers(players: number) {
        setNumOfPlayers(players)
    }
    function selectNumOfSpies(spies: number) {
        setNumOfSpies(spies)
    }
    return (
        <div className="px-4 py-6">
            {gameState == "options" && <Options
                gameStateSetter={progressGameLoop}
                timerSetter={selectTimer}
                spiesSetter={selectNumOfSpies}
                playersSetter={selectnumOfPlayers}
            />}
            {gameState == "roles" && <Roles
                gameStateSetter={progressGameLoop}
                numOfPlayers={numOfPlayers}
                numOfSpies={numOfSpies} />}
            {gameState == "round" && <Round gameEnder={gameActiveSetter} timer={timer} />}
            {/* {gameState == "finish" && <Finish/>} */}
            {/* old component, not needed? */}
        </div>
    )
}