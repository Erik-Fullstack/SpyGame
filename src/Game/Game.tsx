import { useState } from "react";
import Options from "./Options";
import Finish from "./Finish";
import Roles from "./Roles";
import Round from "./Round";

export default function Game(){
    const [gameState, setGameState] = useState<string>("options") //enum? options, roles, round, finish 
    const [timer, setTimer] = useState<number>(0)
    const [amountOfPlayers, setAmountOfPlayers] = useState<number>(3)
    const [numOfSpies, setNumOfSpies] = useState<number>(1)
    const [location, setLocation] = useState<string>("") //kanske bara behövs i roles

    return (
        <div className="bg-red-400">
            {gameState == "options" && <Options/>}
            {gameState == "roles" && <Roles/>}
            {gameState == "round" && <Round/>}
            {gameState == "finish" && <Finish/>}
        </div>
    )
}