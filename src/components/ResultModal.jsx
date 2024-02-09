import { forwardRef } from 'react';

/**
 * Value returned by forwardRef is also a component
 * Our component function will now receive 2 parameters: props (which is destructured here) and ref
 */
const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
    const result = remainingTime <= 0 ? 'lost' : 'win';
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // To show till 2 decimal places

    return (
        // ref prop is supported by all built-in components
        <dialog ref={ref} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime}</strong> seconds left</p>

            {/* The below logic will close the dialog without any extra JS logic */}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;