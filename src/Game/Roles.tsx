import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"

type OptionsProps = {
    gameStateSetter: (str: string) => void,
    numOfPlayers: number,
    numOfSpies: number,
}
type Player = {
    type: string,
    number: number,
    name: string
}
// ska looparna vara i useEffect?
export default function Roles({ gameStateSetter, numOfPlayers, numOfSpies }: OptionsProps) {
    const [player, setPlayer] = useState(0)
    const [showRoles, setShowRoles] = useState(false)
    const [players, setPlayers] = useState<Player[]>([])
    const [revealed, setRevealed] = useState(false)
    const dragY = useRef(0)
    const startY = useRef<number | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const playerArr: Player[] = []
        for (let i = 1; i <= numOfPlayers; i++) {
            playerArr.push({ type: "Player", number: i, name: `Player ${i}` })
        }
        const indices = Array.from({ length: numOfPlayers }, (_, i) => i)
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
                ;[indices[i], indices[j]] = [indices[j], indices[i]]
        }
        for (let k = 0; k < numOfSpies; k++) {
            playerArr[indices[k]].type = "Spy"
        }
        setPlayers(playerArr)
        setShowRoles(true)
    }, [numOfPlayers, numOfSpies])

    const onStart = (y: number) => { startY.current = y }
    const onMove = (y: number) => {
        if (startY.current === null) return
        const delta = startY.current - y
        dragY.current = Math.max(0, delta)
        const overlay = overlayRef.current
        if (overlay) overlay.style.transform = `translateY(${-dragY.current}px)`
    }
    const onEnd = () => {
        const overlay = overlayRef.current
        const threshold = 140
        if (dragY.current > threshold) {
            if (overlay) overlay.style.transform = 'translateY(-100%)'
            setRevealed(true)
        } else {
            if (overlay) overlay.style.transform = 'translateY(0)'
        }
        startY.current = null
        dragY.current = 0
    }

    // Touch + Mouse events
    const onTouchStart = (e: React.TouchEvent) => onStart(e.touches[0].clientY)
    const onTouchMove = (e: React.TouchEvent) => onMove(e.touches[0].clientY)
    const onTouchEnd = () => onEnd()
    const onMouseDown = (e: React.MouseEvent) => onStart(e.clientY)
    const onMouseMove = (e: React.MouseEvent) => { if (startY.current !== null) onMove(e.clientY) }
    const onMouseUp = () => onEnd()

    const nextOrStart = () => {
        if (!revealed) return
        if (player === players.length - 1) {
            gameStateSetter("round")
        } else {
            setPlayer(p => p + 1)
            setRevealed(false)
            const overlay = overlayRef.current
            if (overlay) overlay.style.transform = 'translateY(0)'
        }
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            {showRoles ? (
                <div className="w-full max-w-sm">
                    <div className="text-center mb-4">
                        <p className="text-sm text-neutral-400">Only one player looks at a time</p>
                    </div>
                    <div className="relative h-64 sm:h-72 rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                            <p className="text-neutral-400 text-xs">Role</p>
                            <p className={`text-3xl font-extrabold tracking-wide ${players[player]?.type === 'Spy' ? 'text-red-500' : 'text-neutral-200'}`}>
                                {players[player]?.type}
                            </p>
                        </div>
                        <div
                            id="role-overlay"
                            ref={overlayRef}
                            className={`absolute inset-0 bg-gradient-to-b from-neutral-950 to-black flex flex-col items-center justify-center transition-transform duration-300 ${revealed ? '-translate-y-full' : 'translate-y-0'}`}
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            onMouseDown={onMouseDown}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                        >
                            <div className="pointer-events-none">
                                <p className="text-neutral-400 text-xs">Player</p>
                                <p className="text-5xl font-bold tracking-widest text-red-500">{player + 1}</p>
                            </div>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                                <div className="h-1 w-16 rounded-full bg-neutral-700" />
                                <p className="mt-2 text-[10px] text-neutral-500">Drag up to reveal</p>
                            </div>
                        </div>
                    </div>
                    <Button
                        fullWidth
                        color={revealed ? 'error' : 'primary'}
                        variant="contained"
                        onClick={nextOrStart}
                        className="mt-4"
                    >
                        {player < players.length - 1 ? (revealed ? 'Hide and pass to next' : 'Reveal by dragging') : (revealed ? 'Start Game!' : 'Reveal by dragging')}
                    </Button>
                </div>
            ) : (
                <div className="text-neutral-400 text-sm">Preparing roles…</div>
            )}
        </div>
    )
}
