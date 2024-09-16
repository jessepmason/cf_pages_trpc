import React from "react"
import ReactDOM from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

// A function component wrapped with `observer` will react
// to any future change in an observable it used before.
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.createRoot(document.getElementById("app") ).render(<TimerView timer={myTimer} />)

setInterval(() => {
    myTimer.increaseTimer()
}, 1001)