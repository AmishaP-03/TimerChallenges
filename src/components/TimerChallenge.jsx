import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

/**
 * If the timerId variable was declared here, it won't be reset upon each component-execution since it is no longer declared inside the component function.
 * However, it will now be shared across all the instances of TimerChallenges.
 * 
 * Error scenario (PROBLEM 2):
 * Start the 5 s challenge -> timerId stores the id of the 5s timer
 * Meanwhile start the 1 s challenge -> timerId gets overwritten with the id of 1 s timer
 * Now, if we try to stop the 5 s timer, it will not stop since timerId passed to clearTimeout no longer stores its id.
 * 
 * BEST SOLUTION -> use Refs
 */

export default function TimerChallenge({title, targetTime}) {
    // To store the id of the timer started

    /**
     * 1. This variable will now be component instance specific, hence PROBLEM 2 gets solved
     * 2. It will not get reset when the component re-executes. Just like state values, React stores ref values behind the scenes 
     * and makes sure that they are not lost when component re-executes. Hence, PROBLEM 1 solved
     */
    // Use of ref to define values which do not have a direct impact on the UI
    const timerId = useRef();

    /**
     * Though this way of declaring it is wrong since upon the state update (setTimerStarted(true)), the component re-executes.
     * Thus, timerId is also reset and the old timerId is lost (PROBLEM 1)
     */
    // let timerId;

    const targetTimeInMs = targetTime*1000; // Converting targetTime from seconds to miliseconds
    const [remainingTime, setRemainingTime] = useState(targetTimeInMs); 
    const isTimerActive = remainingTime > 0 && remainingTime < targetTimeInMs

    // Ref variable so that we can access dialog from the RestModal component over here
    const dialog = useRef();

    // Check for time left once the timer is started
    function handleStart() {
        // setInterval executes the callback function everytime the given time elapses (here: 10 ms).
        // It returns a reference/id for the started timer.
        // setInterval goes on infinitely unless it is explicityly cleared
        timerId.current = setInterval(() => {
            setRemainingTime((currentRemainingTime) => currentRemainingTime - 10)
        }, 10);
    }

    // Handle the logic once the remaining time is 0 i.e the timer has expired
    if (remainingTime <= 0) {
        clearInterval(timerId.current);

        // By default dialog has a display:none property set on it. To show it upon timer expiration:
        dialog.current.showModal();
    }

    // Handle the logic when the timer is manually stopped
    function handleStop() {
        // Stop the timer
        clearInterval(timerId.current);
        dialog.current.showModal();
    }

    function handleRemainingTimeReset() {
        setRemainingTime(targetTimeInMs);
    }

    return (
        <>
            {/* This method of passing ref from one component to another alone won't work as we will get an error saying 'ref is not a prop'.
                To do so, we should also use the forwardRef function provided by React.
            */}
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={remainingTime} onReset={handleRemainingTimeReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={isTimerActive ? handleStop : handleStart}>
                        {isTimerActive ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={isTimerActive ? 'active' : undefined}>
                    {isTimerActive ? 'Timmer running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}