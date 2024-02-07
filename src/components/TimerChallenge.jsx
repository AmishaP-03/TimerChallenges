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

    const [timerStarted, setTimerStarted] = useState(false);
    const [timeExpired, setTimerExpired] = useState(false);

    // Ref variable so that we can access dialog from the RestModal component over here
    const dialog = useRef();

    // Start the timer when 'Start challenge' button is clicked
    function handleStart() {
        timerId.current = setTimeout(() => {
            setTimerExpired(true);

            // By default dialog has a display:none property set on it. To show it upon timer expiration:
            dialog.current.showModal();
        }, targetTime*1000); // Converting targetTime from seconds to miliseconds

        setTimerStarted(true);
    }

    function handleStop() {
        // Stop the timer.
        // clearTimeout needs the id of the time to be stopped as an input.
        // However this fails to stop the timer
        clearTimeout(timerId.current);
        setTimerStarted(false);
    }
    return (
        <>
            {/* This method of passing ref from one component to another alone won't work as we will get an error saying 'ref is not a prop'.
                To do so, we should also use the forwardRef function provided by React.
            */}
            <ResultModal ref={dialog} result="lost" targetTime={targetTime} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerStarted ? 'Stop' : 'Start'} challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : undefined}>
                    {timerStarted ? 'Timmer running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}