import { useState } from "react";
import { Button } from "@mui/material";
import { Slider } from "@mui/material";

type OptionsProps = {
    gameStateSetter: (str: string) => void,
    spiesSetter: (num: number) => void,
    playersSetter: (num: number) => void,
    timerSetter: (num: number) => void
}

//spelLoop = <Options/> välj timer för spelet, välj antal spelare(default===min = 3), välj antal spies(default===min = 1)
export default function Options({ gameStateSetter, spiesSetter, playersSetter, timerSetter }: OptionsProps) {
    const [timer, setTimer] = useState<number>(10)
    const [numOfPlayers, setNumOfPlayers] = useState<number>(6)
    const [numOfSpies, setNumOfSpies] = useState<number>(1)
    return (
        <div className="mx-auto max-w-md p-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur p-4 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                <h2 className="text-xl font-semibold tracking-wide text-neutral-200">Game Setup</h2>
                <p className="mt-1 text-xs text-neutral-400">Tune your parameters and proceed to role assignment.</p>

                <div className="mt-5 space-y-4">
                    <div>
                        <div className="flex justify-between text-sm text-neutral-300">
                            <span>Players</span>
                            <span className="font-mono text-red-400">{numOfPlayers}</span>
                        </div>
                        <Slider
                            defaultValue={6}
                            min={3}
                            max={16}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            onChange={(_event, value) => setNumOfPlayers(value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm text-neutral-300">
                            <span>Timer (minutes)</span>
                            <span className="font-mono text-red-400">{timer}</span>
                        </div>
                        <Slider
                            defaultValue={10}
                            min={2}
                            max={30}
                            valueLabelDisplay="auto"
                            onChange={(_event, value) => setTimer(value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm text-neutral-300">
                            <span>Spies</span>
                            <span className="font-mono text-red-400">{numOfSpies}</span>
                        </div>
                        <Slider
                            defaultValue={1}
                            min={1}
                            max={3 < Math.floor(numOfPlayers / 3) ? 3 : Math.floor(numOfPlayers / 3)}
                            valueLabelDisplay="auto"
                            onChange={(_event, value) => setNumOfSpies(value)}
                        />
                        <p className="mt-1 text-[10px] text-neutral-500">Max spies is the lesser of 3 or a third of players.</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Button
                        fullWidth
                        color="error"
                        variant="contained"
                        onClick={() => {
                            if (numOfSpies > numOfPlayers / 3) {
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
                        Continue to Roles
                    </Button>
                </div>
            </div>
        </div>
    )
}