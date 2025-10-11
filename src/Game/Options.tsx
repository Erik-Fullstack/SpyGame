import { useState } from "react";
import { Button } from "@mui/material";
import {Slider} from "@mui/material";

type OptionsProps = {
    gameStateSetter: (str: string) => void,
    spiesSetter: (num: number) => void,
    playersSetter: (num: number) => void,
    timerSetter: (num: number) => void
}

//spelLoop = <Options/> välj timer för spelet, välj antal spelare(default===min = 3), välj antal spies(default===min = 1)
export default function Options({gameStateSetter, spiesSetter, playersSetter, timerSetter}: OptionsProps) {
    const [timer, setTimer] = useState<number>(10)
    const [numOfPlayers, setNumOfPlayers] = useState<number>(6)
    const [numOfSpies, setNumOfSpies] = useState<number>(1)
    return (
    <>
        <p>Players: {numOfPlayers}</p>
        <Slider 
            defaultValue={6} 
            min={3} 
            max={16} 
            step={1} 
            marks 
            valueLabelDisplay="auto" 
            onChange={(event, value) => setNumOfPlayers(value)}
        />
        <p>Timer: {timer} minutes</p>
        <Slider 
            defaultValue={10} 
            min={2} 
            max={30} 
            valueLabelDisplay="auto" 
            onChange={(event, value) => setTimer(value)}
        />
        {/* måste sättas till max 3 ELLER en tredjedel av alla spelar, numret som är mindre ska tas. */}
        <p>Spies: {numOfSpies}</p>
        <Slider 
            defaultValue={1} 
            min={1} 
            max={3 < Math.floor(numOfPlayers / 3) ? 3 : Math.floor(numOfPlayers / 3)} 
            valueLabelDisplay="auto" 
            onChange={(event, value) => setNumOfSpies(value)}
        />
        <Button 
            variant="contained" 
            onClick={() => {
                if(numOfSpies > numOfPlayers / 3) {
                    alert("Can't have more than 33% of playerbase as spies!")
                    return
                } else {
                    playersSetter(numOfPlayers)
                    spiesSetter(numOfSpies)
                    timerSetter(timer)
                    gameStateSetter("roles")
                }
            }}
        >
            Render Roles
        </Button>
    </>
    )
}