import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/project")
      .then((res) => {
        console.log("Response: ", res.data);
        this.setState({ projects: res.data });
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          {this.state.projects.map((project) => {
            {
              project.name;
            }
            {
              project.description;
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;
