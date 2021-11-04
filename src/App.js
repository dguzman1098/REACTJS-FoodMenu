import React, { Component } from 'react';
import './App.css';
import ProductMenu from './components/menu';


class App extends Component {
  render() {
    return (
      <div className="App" id="root">

        <ProductMenu/>

      </div>
    );

  }
}

export default App;
