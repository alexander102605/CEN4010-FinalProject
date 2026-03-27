import React, { useState } from "react";
import "./App.css";

const sidebarData = {
  Type: ["none", "consonant", "vowel"],
  Place: ["none", "bilabial", "labiodental", "dental", "alveolar", "postalveolar", "palatal", "velar", "glottal"],
  Manner: ["none", "plosive", "nasal", "tap", "fricative", "approximant", "lateral approximant"],
  Voice: ["none", "voiced", "voiceless"],
  Frontness: ["none", "front", "central", "back"],
  Openness: ["none", "close", "close-mid", "mid", "open-mid", "open"],
  Tense: ["none", "tense", "lax"],
  Round: ["none", "rounded", "unrounded"]
};

export default function Sidebar({ selectedFilters, handleChange }) {
  // Sections open by default
  const defaultOpen = { Type: true, Place: true };
  const [openSections, setOpenSections] = useState(defaultOpen);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sidebar">
      {Object.entries(sidebarData).map(([section, options]) => {
        const isOpen = openSections[section];
        return (
          <div key={section} className="section">
            {/* Section Heading with rotating arrow */}
            <h3 onClick={() => toggleSection(section)}>
              {section}{" "}
              <span className={`arrow ${isOpen ? "open" : ""}`}>▶</span>
            </h3>

            {/* Options container with smooth slide */}
            <div className={`options-container ${isOpen ? "open" : ""}`}>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={section.toLowerCase()}
                    value={option}
                    onChange={handleChange}
                    checked={
                      option === "none"
                        ? selectedFilters[section.toLowerCase()] === undefined
                        : selectedFilters[section.toLowerCase()] === option
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}