import React, { Component } from 'react'
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
}from "react-router-dom";

export default class App extends Component {
  pageSize = 10
  render() {
    return (
      <>
      <Router>
      <Navbar/>
      <Routes>

      <Route exact path="/" element={<Dashboard key='general' pageSize={this.pageSize} country={'in'} category={'general'}/>}></Route>
      <Route exact path="/general" element={<Dashboard key='general' pageSize={this.pageSize} country={'in'} category={'general'}/>}></Route>
      <Route exact path="/business" element={<Dashboard key='business' pageSize={this.pageSize} country={'in'} category={'business'}/>}></Route>
      <Route exact path="/entertainment" element={<Dashboard key='entertainment' pageSize={10} country={'in'} category={'entertainment'}/>}></Route>
      <Route exact path="/health" element={<Dashboard key='health' pageSize={this.pageSize} country={'in'} category={'health'}/>}></Route>
      <Route exact path="/science" element={<Dashboard key='science' pageSize={this.pageSize} country={'in'} category={'science'}/>}></Route>
      <Route exact path="/sports" element={<Dashboard key='sports' pageSize={this.pageSize} country={'in'} category={'sports'}/>}></Route>
      <Route exact path="/technology" element={<Dashboard key='technology' pageSize={10} country={'in'} category={'technology'}/>}></Route>

      </Routes>
      </Router>
      </>
    )
  }
}
