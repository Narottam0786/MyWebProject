

import { AppBar, Box, Toolbar, Typography } from '@material-ui/core';
import './App.css';
import { Home } from './Pages/Home';
import { useEffect } from 'react';
import { setData } from './Redux/action';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BaseUrl } from './Services/HttpsFile';


function App() {
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      const res = await axios.get(BaseUrl);
      const data = res.data;
  
      
      dispatch(setData(data));
      
  
      return data;
    } catch (err) {
      console.log("Error: " + err);
    }
  };
  useEffect(()=>{
    getData();
  },[])
  
  return (
    <Box className="App">
      <AppBar>
        <Toolbar style={{background:"#7286D3",textAlign:"center"}}>
          
          <div style={{width:"100%"}}>
          <h2>CROSSPOLES DIGITAL</h2>
          </div>
          
        </Toolbar>
      </AppBar>
      
      <Home />
      
    
    </Box>
  );
}

export default App;
