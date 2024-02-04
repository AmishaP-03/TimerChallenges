import { useState, useRef } from "react";

export default function Player() {
  // GOAL: SIMPLIFY THE BELOW LOGIC USING REF

  // const [playerName, setPlayerName] = useState('');
  // const [isSubmitted, setIsSubmitted] = useState(false);

  // function handleInputChange(event) {
  //   setPlayerName(event.target.value);
  // }

  // function handleButtonClick() {
  //   setIsSubmitted(true);
  // }

  // return (
  //   <section id="player">
  //     <h2>Welcome {isSubmitted ? playerName : 'unknown entity'}</h2>
  //     <p>
  //       <input type="text" value={playerName} onChange={handleInputChange}/>
  //       <button onClick={handleButtonClick}>Set Name</button>
  //     </p>
  //   </section>
  // );

  const playerNameRef = useRef(); // playerNameRef is a JS object
  const [playerName, setPlayerName] = useState('');

  function handleButtonClick() {
    // playerNameRef.current --> input element or the element to which ref is connected to
    setPlayerName(playerNameRef.current.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName || 'unknown entity'}</h2>
      <p>
        {/* 
          1. ref is a special prop provided by React on input element.
          2. It connects the input element to the created ref value.
          3. We don't need to set value explicitly, ref handles it all
        */}
        <input ref={playerNameRef} type="text"/>
        <button onClick={handleButtonClick}>Set Name</button>
      </p>
    </section>
  );
}
