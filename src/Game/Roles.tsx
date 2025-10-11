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
    const players: Player[] = []

    for (let i = 1; i <= numOfPlayers; i++) {
        players.push({ type: "Player", number: i, name: `Player ${i}` })
    }
    const indices = Array.from({ length: numOfPlayers }, (_, i) => i)
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[indices[i], indices[j]] = [indices[j], indices[i]]
    }
    for (let k = 0; k < numOfSpies; k++) {
        players[indices[k]].type = "Spy"
    }
    console.log(players)
    return <p>players: {numOfPlayers} spies: {numOfSpies}</p>
}