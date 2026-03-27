// App.jsx
import "./App.css";
import { useState, useEffect } from "react";
import ipa from "./assets/data.json" with { type: "json" };
import filterJSON from "./assets/filters.json" with { type: "json" };
import Sidebar from "./Sidebar";

const App = () => {
  let filters = [].concat(filterJSON);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredData, setFilteredData] = useState(ipa);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setSelectedFilters((prev) => {
      if (name === "features") {
        const current = prev.features || [];
        const updated = checked
          ? [...current, value]
          : current.filter((v) => v !== value);
        return { ...prev, features: updated };
      }

      if (value === "none") {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }

      return { ...prev, [name]: value };
    });
  };

  const applyFilters = (filters, data) => {
    return data.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true;

        if (value === "true") value = true;
        if (value === "false") value = false;

        if (key === "features") {
          if (!item.features) return false;
          return value.every((feature) => item.features.includes(feature));
        }

        return item[key] === value;
      });
    });
  };

{/*FUNCTION FOR REMOVING FILTERS ON RIGHT SIDE */} 
const removeFilter = (key, valueToRemove = null) => {
  setSelectedFilters((prev) => {
    const updated = { ...prev };

    // If it's an array (like features)
    if (Array.isArray(updated[key])) {
      const newArr = updated[key].filter((v) => v !== valueToRemove);
      if (newArr.length === 0) {
        delete updated[key];
      } else {
        updated[key] = newArr;
      }
    } else {
      // Normal single-value filter
      delete updated[key];
    }

    return updated;
  });
};

  useEffect(() => {
    const result = applyFilters(selectedFilters, ipa);
    setFilteredData(result);
  }, [selectedFilters]);

  return (
<<<<<<< HEAD
    <div className="container">
      {/* LEFT SIDE */}
      <Sidebar selectedFilters={selectedFilters} handleChange={handleChange} />

      {/* CENTER RESULTS */}
      <div className="centerBox">
        <h2>Results</h2>
        <div className="results-grid">
          {filteredData.map((item) => (
            <div className="result-item" key={item.char}>
              {item.char}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="rightBox">
        <div className="section">
          <h3>Applied Filters</h3>
          <ul>
            {Object.entries(selectedFilters).map(([key, value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;

              const displayKey = key.charAt(0).toUpperCase() + key.slice(1);

              // If it's an array (like features)
              if (Array.isArray(value)) {
                return value.map((v) => (
                  <li key={`${key}-${v}`} className="filter-item">
                    <span>
                      <strong>{displayKey}:</strong> {v}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFilter(key, v)}
                    >
                      ❌
                    </button>
                  </li>
                ));
              }

              // Normal single-value filter
              return (
                <li key={key} className="filter-item">
                  <span>
                    <strong>{displayKey}:</strong> {value}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => removeFilter(key)}
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
=======
    <div>
      <div className="container">
        <form className="leftBox">{categories}</form>
        <div className="centerBox">
          <h2>Results</h2>
          {filteredData.map((item) => {
            return <span key={item.char}> {item.char} </span>;
          })}
>>>>>>> 6719f8cf08fbba00742cefabd01554028f37adc3
        </div>
      </div>
    </div>

  );
};

export default App;