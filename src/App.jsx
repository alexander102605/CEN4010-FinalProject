import "./App.css";
import { useState, useEffect } from "react";
import ipa from "./assets/data.json" with { type: "json" };
import filterJSON from "./assets/filters.json" with { type: "json" };

const App = () => {
  let filters = [];
  filters = filters.concat(filterJSON);

  let [selectedFilters, setSelectedFilters] = useState({});
  let [filteredData, setFilteredData] = useState(ipa);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let checked = e.target.checked;

    setSelectedFilters((prev) => {
      if (name === "features") {
        let current = prev.features || [];
        let updated = checked ? [...current, value] : current.filter((v) => v !== value);
        return { ...prev, features: updated };
      }

      if (value === "none") {
        let updated = { ...prev };
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

        if (value === "true") {
            value = true
        };

        if (value === "false") {
            value = false
        };

        if (key === "features") {
          if (!item.features) return false;
          return value.every((feature) => item.features.includes(feature));
        }

        return item[key] === value;
      });
    });
  };

  useEffect(() => {
    let result = applyFilters(selectedFilters, ipa);
    setFilteredData(result);
  }, [selectedFilters]);

  let categories = filters.map((item) => {
    let key = Object.keys(item)[0];
    if (!item[key]) return null;
    let values = item[key];

    return (
      <div key={key}>
        <h1>{key}</h1>
        {values.map((x) => {
          if (key === "features") {
          } else {
            return (
              <label key={x} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={key}
                  value={x}
                  onChange={handleChange}
                  checked={
                    x === "none"
                      ? selectedFilters[key] === undefined
                      : selectedFilters[key] === x
                  }
                />
                {x}
              </label>
            );
          }
        })}
      </div>
    );
  });

  return (
    <div>
      <div className="container">
        <form className="leftBox">{categories}</form>
        <div className="centerBox">
          <h2>Results</h2>
          {filteredData.map((item) => {
            return <div key={item.char}>{item.char}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default App;