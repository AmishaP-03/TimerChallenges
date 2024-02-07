import { forwardRef } from 'react';

/**
 * Vale returned by forwardRef is also a component
 * Our component function will now receive 2 parameters: props (which is destructured here) and ref
 */
const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref) {
    return (
        // ref prop is supported by all built-in components
        <dialog ref={ref} className="result-modal">
            <h2>You {result}</h2>
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped the timer with X seconds left</p>

            {/* The below logic will close the dialog without any extra JS logic */}
            <form method="dialog">
                <button>Close</button>
            </form>
        </dialog>
    );
});

export default ResultModal;