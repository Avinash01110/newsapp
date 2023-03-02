import React, { useEffect,useState } from 'react'
import Dashboard from './Components/Dashboard';
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'
import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
}from "react-router-dom";
const App = () =>{
  const pageSize = 10
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setprogress] = useState(0)

  const setProgress = (progress)=>{
      setprogress(progress)
  }

    return (
      <>
      <Router>
        <Navbar/>
        <LoadingBar
          color='red'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      <Routes>

      <Route exact path="/" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country={'in'} category={'general'}/>}></Route>
      <Route exact path="/general" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='general' pageSize={pageSize} country={'in'} category={'general'}/>}></Route>
      <Route exact path="/business" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='business' pageSize={pageSize} country={'in'} category={'business'}/>}></Route>
      <Route exact path="/entertainment" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='entertainment' pageSize={pageSize} country={'in'} category={'entertainment'}/>}></Route>
      <Route exact path="/health" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='health' pageSize={pageSize} country={'in'} category={'health'}/>}></Route>
      <Route exact path="/science" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='science' pageSize={pageSize} country={'in'} category={'science'}/>}></Route>
      <Route exact path="/sports" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='sports' pageSize={pageSize} country={'in'} category={'sports'}/>}></Route>
      <Route exact path="/technology" element={<Dashboard apiKey={apiKey} setProgress={setProgress} key='technology' pageSize={pageSize} country={'in'} category={'technology'}/>}></Route>

      </Routes>
      </Router>
      </>
    )
}

export default App
