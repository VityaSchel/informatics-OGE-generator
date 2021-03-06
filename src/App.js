import React, { useState } from 'react';
import GenerationSettingsScreen from './components/GenerationSettingsScreen.react.js'
import GeneratedResultsScreen from './components/GeneratedResultsScreen.react.js'
import seedrandom from 'seedrandom';
import randomstring from 'randomstring'

let _seedRef = React.createRef()
let seed;
function App() {
  let [isSettingsScreen, setIsSettingsScreen] = React.useState(true);
  function generateExcercises(seedRef){
    _seedRef = seedRef
    setIsSettingsScreen(false);
    seed = seedRef.current.value.substring(0, 20)
    if(seed === '')
      seed = randomstring.generate(16)
    seedrandom(seed, { global: true });
  }

  return (
    <>
      {isSettingsScreen?(<GenerationSettingsScreen ongenerate={seedRef => generateExcercises(seedRef)}/>):(<GeneratedResultsScreen seed={seed} seedRef={_seedRef}/>)}
    </>
  );
}

export default App;
