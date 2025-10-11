import { useState } from "react";
import Options from "./Options";
import Finish from "./Finish";
import Roles from "./Roles";
import Round from "./Round";



export default function Game(){
    const [gameState, setGameState] = useState<string>("options") //enum? options, roles, round, finish 
    const [timer, setTimer] = useState<number>(10)
    const [numOfPlayers, setNumOfPlayers] = useState<number>(6)
    const [numOfSpies, setNumOfSpies] = useState<number>(1)
    const [location, setLocation] = useState<string>("") //kanske bara behövs i roles, om inte så slumpa fram något här.

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
        <div className="bg-red-400">
            {gameState == "options" && <Options 
                gameStateSetter={progressGameLoop}
                timerSetter={selectTimer}
                spiesSetter={selectNumOfSpies}
                playersSetter={selectnumOfPlayers}
            />}
            {gameState == "roles" && <Roles
                gameStateSetter={progressGameLoop}
                numOfPlayers={numOfPlayers}
                numOfSpies={numOfSpies}/>}
            {gameState == "round" && <Round/>}
            {gameState == "finish" && <Finish/>}
        </div>
    )
}