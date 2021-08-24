import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  async function fetch() {
    let res  =  await axios.get('/api/values/current')
    setValues(res.data)
    res=  await axios.get('/api/values/all')
    setSeenIndexes(res.data)
  }

  useEffect(() => {
    fetch()
  },[]);

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(", ");
  }

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  }

  return (
    <div className="App-content">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await axios.post("/api/values", {
            index,
          });
          await fetch()
          setIndex("");
        }}
      >
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
};
