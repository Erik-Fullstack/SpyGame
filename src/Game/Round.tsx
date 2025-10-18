//tar in prop timer från game

import { useState } from "react"

// <div className='w-40 h-40 bg-amber-900 mx-auto flex justify-center items-center'>CARD</div>
export default function Round({timer}) {
    const [time, setTime] = useState(timer* 60)
    return <p>{time}</p>
}