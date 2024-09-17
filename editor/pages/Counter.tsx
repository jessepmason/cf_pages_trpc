import React from "react"
import ReactDOM from "react-dom/client"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import {createBrowserRouter,RouterProvider,Route,Link,} from "react-router-dom";

class Timer {
    secondsPassed = 0
    prefix :string;
    constructor(prefix:string) {
        this.prefix = prefix
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
        // console.log(this.secondsPassed)

    }
}


// PROPS
const propsTimer = new Timer("Props")
const TimerViewByPropsChild = observer(({ timer }) => <span>Props Seconds passed: {timer.secondsPassed}</span>)
const TimerViewByProps = ()=>{
    return <TimerViewByPropsChild timer={propsTimer}></TimerViewByPropsChild>
}
setInterval(() => {
    propsTimer.increaseTimer()
}, 1000)

// GLOBAL
const gblTimer = new Timer("Global")
const TimerViewByGblVar = observer(() => <span>GBL Seconds passed: {gblTimer.secondsPassed}</span>)

setInterval(() => {
    gblTimer.increaseTimer()
}, 1000)


// STATE AND EFFECT
const TimerViewWithState = observer(() => {
    const [timer] = React.useState(() => new Timer("State and Effect")) // See the Timer definition above.

    React.useEffect(() => {
        const handle = setInterval(() => {
            timer.increaseTimer()
        }, 1000)
        return () => {
            clearInterval(handle)
        }
    }, [timer])

    return <span>State and Effect Seconds passed: {timer.secondsPassed}</span>
})


// CONTEXT
const contextTimer = new Timer("Context");
const TimerContext = React.createContext<Timer>(contextTimer)

const TimerContextView = observer(() => {
    // Grab the timer from the context.
    const timer = React.useContext(TimerContext) // See the Timer definition above.
    React.useEffect(() => {
        const handle = setInterval(() => {
            timer.increaseTimer()
        }, 1000)
        return () => {
            clearInterval(handle)
        }
    }, [timer])

    return (
        <span>Context Seconds passed: {timer.secondsPassed}</span>
    )
})

export const Timers = ()=>{

    return <div style={{display:"flex",flexDirection:"column"}}>
        <TimerViewByProps></TimerViewByProps>
        <TimerViewByGblVar></TimerViewByGblVar>
        <TimerViewWithState></TimerViewWithState>
        <TimerContext.Provider value={contextTimer}>
            <TimerContextView />
        </TimerContext.Provider>
   

    </div>

}

