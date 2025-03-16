// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  // Fetch all links
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/links/")
      .then(response => {
        setLinks(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/links/", { url });
      setLinks([...links, response.data]); // Add new link to the state
      setUrl(""); // Reset the form
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>DSA Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
        />
        <button type="submit">Add Link</button>
      </form>

      <h2>All Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
