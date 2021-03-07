import React, { useState } from 'react';
import GenerationSettingsScreen from './components/GenerationSettingsScreen.react.js'
import GeneratedResultsScreen from './components/GeneratedResultsScreen.react.js'
import seedrandom from 'seedrandom';
import randomstring from 'randomstring'

let seed;
function App() {
  let [isSettingsScreen, setIsSettingsScreen] = React.useState(true);
  function generateExcercises(seedRef){
    setIsSettingsScreen(false);
    seed = seedRef.current.value || randomstring.generate(16)
    seedrandom(seed, { global: true });
  }

  return (
    <>
      {isSettingsScreen?(<GenerationSettingsScreen ongenerate={seedRef => generateExcercises(seedRef)}/>):(<GeneratedResultsScreen seed={seed}/>)}
    </>
  );
}

export default App;
