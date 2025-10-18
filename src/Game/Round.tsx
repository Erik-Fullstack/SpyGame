//tar in prop timer från game

import { Button } from "@mui/material"
import { useState, useEffect } from "react"

type RoundProps = {
    timer: number,
    gameEnder: () => void
}
// <div className='w-40 h-40 bg-amber-900 mx-auto flex justify-center items-center'>CARD</div>
export default function Round({ timer, gameEnder }: RoundProps) {
    // timer comes in minutes for now(change in options or game instead?)
    const [countdown, setCountdown] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(timer)
    const [gameLost, setGameLost] = useState(false)

    useEffect(() => {
        const counter = setInterval(() => {
            setCountdown(countdown => countdown - 1)
        }, 1000)
        if (countdown === -1) setMinutes(minutes => minutes - 1)
        if (countdown === -1) setCountdown(59)
        if (minutes === -1) setGameLost(true)
        return () => clearInterval(counter)
    }, [countdown])
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            {!gameLost ? (
                <div className="text-center">
                    <div className="font-mono text-6xl sm:text-7xl md:text-8xl tracking-widest text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]">
                        {minutes > 9 ? minutes : `0${minutes}`}:{countdown > 9 ? countdown : `0${countdown}`}
                    </div>
                    <p className="mt-2 text-xs text-neutral-400">Timer is ticking...</p>
                </div>
            ) : (
                <div className="w-full max-w-sm text-center">
                    <p className="text-2xl font-bold text-neutral-200">Spy Wins</p>
                    <Button className="mt-4 w-full" color="error" variant="contained" onClick={() => gameEnder()}>Play Again?</Button>
                </div>
            )}
        </div>
    )
}