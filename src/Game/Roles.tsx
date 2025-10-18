import { Button } from "@mui/material"
import { useEffect, useState } from "react"

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

    useEffect(() => {
        const playerArr = []
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
        console.log(playerArr)
    }, [])
    // return <p>players: {numOfPlayers} spies: {numOfSpies}</p>
    return (
        <>
            {showRoles ? <><div className="border rounded-lg">
                <p>Player: {player + 1}</p>
                <p>Role: {players[player].type}</p>
            </div>
            <Button onClick={() => {
                console.log("player är: ", player)
                console.log("Denna player är ", players[player])
                player === players.length - 1 ? gameStateSetter("round") : setPlayer(player => player+1)
            }} variant="contained">{player < players.length - 1 ? "Accept" : "Start Game!"}</Button></>
            :
            <p>denna ska vara en loader</p>}
        </>
    )
}