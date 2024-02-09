import { forwardRef } from 'react';

/**
 * Value returned by forwardRef is also a component
 * Our component function will now receive 2 parameters: props (which is destructured here) and ref
 */
const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
    const result = remainingTime <= 0 ? 'lost' : 'win';
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2); // To show till 2 decimal places

    // Compute a score between 0-100
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    return (
        // ref prop is supported by all built-in components

        /**
         * The <dialog> element allows website visitors to close the opened dialog by pressing the ESC (Escape) key on their keyboard.
         * Currently, this will not trigger the onReset function though (unlike closing the dialog with a button click).
         * To make sure that onReset gets triggered when the dialog is closed via the escape key, we should add the built-in onClose prop to the <dialog> element and bind it to the onReset prop value.
         */
        <dialog ref={ref} className="result-modal" onClose={onReset}>
            <h2>You {result}</h2>
            {result === 'win' && <h3>Your score: {score}</h3>}
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