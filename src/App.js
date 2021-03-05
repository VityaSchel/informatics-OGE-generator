import React, { useState } from 'react';
import GenerationSettingsScreen from './components/GenerationSettingsScreen.react.js'
import GeneratedResultsScreen from './components/GeneratedResultsScreen.react.js'
import seedrandom from 'seedrandom';

let seed;
function App() {
  let [isSettingsScreen, setIsSettingsScreen] = React.useState(true);
  function generateExcercises(seedRef){
    setIsSettingsScreen(false);
    if(seedRef.current.value !== ''){
      seed = seedRef.current.value
      seedrandom(seedRef.current.value, { global: true });
    }
  }

  return (
    <>
      {isSettingsScreen?(<GenerationSettingsScreen ongenerate={seedRef => generateExcercises(seedRef)}/>):(<GeneratedResultsScreen seed={seed}/>)}
    </>
  );
}

export default App;
