import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import Signin from "./Pages/Signin";
import Search from "./Pages/Search";
const Container = styled.div`
display:flex;

`
const Main = styled.div`
flex:7;
background-color: ${({theme}) => theme.bg};
`
const  Wrapper = styled.div`
padding: 22px 76px;
`
// The overflow Y when the navbar is open for other 
function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme = {darkMode ? darkTheme : lightTheme}>
      
    <Container>
      <Router>
            <Menu darkMode={darkMode} setDarkMode ={setDarkMode}/>   
          <Main>
            <Navbar/>
            <Wrapper> 
              <Routes>
                <Route path = "/">
                  <Route index element = {<Home type = "random"/>}/>
                  <Route path = "/trend" element = {<Home type = "trend"/>}/>
                  <Route path = "/subscription" element = {<Home type = "sub" />}/>
                  <Route path = "/search" element = {<Search/>}/>


                  <Route path = "signin" element = {<Signin/>}/>
                  <Route path = "/video">
                    <Route path = ":id" element = {<Video/>}/>
                  </Route>
                </Route>
              </Routes>
              
            </Wrapper>
          </Main>
      </Router>
    </Container>

   </ThemeProvider>

  );
}

export default App;
