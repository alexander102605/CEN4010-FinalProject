import "./App.css";
import { useState, useEffect } from 'react';
import ipa from './assets/data.json' with {type: 'json'};




const App = () => {
  const [filters, setFilters] = useState([]);
  const [chars, setChars] = useState([]);
  
useEffect(() => {setFilters([{"type": "consonant"}, {"type": "vowel"}])}, []);
  

  const applyFilters = (filters, data) => {
    let result = [];
      for (let i of filters) {
        let temp = data.filter((item) => item[Object.keys(i)] == Object.values(i))
        result.push(...temp)
      }
      setChars(result)
  }

  return (
    <div>
      test
      <button onClick={() => applyFilters(filters, ipa)}>test button</button>
      <button onClick={() => console.log(chars)}>print chars</button>
    </div>
  );
}

export default App;