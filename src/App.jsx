import "./App.css";
import { useState, useEffect } from 'react';
import ipa from './assets/data.json' with {type: 'json'};
import filterJSON from './assets/filters.json' with {type: 'json'};




const App = () => {
  const [filters, setFilters] = useState([]);
  const [chars, setChars] = useState([]);

  let filterSet = []
  filterSet.concat(filterJSON)
  
// useEffect(() => {setFilters([{"type": "consonant"}, {"type": "vowel"}])}, []);
  

  const applyFilters = (filters) => {
    let result = [];
      for (let i of filters) {
        let temp = ipa.filter((item) => item[Object.keys(i)] == Object.values(i))
        result.push(...temp)
      }
      setChars(result)
  }

  const results = chars.map((i) => {return <div key={i["char"]}>{i["char"]}</div>})



  // const filterDisplay = filterSet.map((item) => {return <button key={Object.values(item)} onClick={() => applyFilters(item)}>{item}</button>})




  return (
    <div>
      test
      {/* <button onClick={() => applyFilters(filters, ipa)}>test button</button> */}
      {/* <button onClick={() => console.log(chars)}>print chars</button> */}
      <button></button>
      {filterDisplay}
      <br />
      <br />
      <hr />
      <div>
        {results}
      </div>
    </div>
  );
}

export default App;