 import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import  '../styles/responsives.css'
import logo from '../images/youtube.png'
import {toggle} from '../Redux/responsiveSlice' 
import MenuIcon from '@mui/icons-material/Menu';  
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import{ AccountCircleOutlined, ArticleOutlined, ExploreOutlined, FlagOutlined, HelpOutlineOutlined, HistoryOutlined, Home, LibraryMusicOutlined, LiveTvOutlined, MovieOutlined, SettingsBrightnessOutlined, SettingsOutlined, SportsBasketballOutlined, SportsEsportsOutlined, SubscriptionsOutlined, VideoLibraryOutlined} from '@mui/icons-material';

const Container = styled.div`
flex: 1;
background-color: ${({theme}) => theme.bg}; 
height: 100vh; 
color: ${({theme}) => theme.text};
position: sticky;
top: 0;
overflow-y: scroll;
overflow-x: hidden;

::-webkit-scrollbar{
    width: 7px;
  
  }
::-webkit-scrollbar-track{
    background-color: ${({theme}) => theme.bg}
}
::-webkit-scrollbar-thumb{
    background:  grey;
    border-radius: 10px;
    height: 30px;

}
`

const Wrapper = styled.div`
    padding: 18px 26px;

`

const Logo = styled.div`
   display: flex;
   align-items: center;
   width: 36px;
   font-weight: bold;
   height: 36px;
 


    &  img {
        width: 100%;
    }

    & > h3{
        line-height: 40px;
        height: 40px;

    }
`
    const Item = styled.div`
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
        padding: 7.5px 0px;
      

        &:hover {
            background-color: ${({theme}) => theme.soft}
        }
    `


const Hr = styled.hr`
    margin: 15px 0px;
    width: calc(100vw / 9) ;
    border: 0.3px solid ${({theme}) => theme.textSoft};
`

const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;
    color:#3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
`

const Login = styled.div`
    
`

const Title = styled.h2`
    font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.softText};
  margin-bottom: 20px;
`


const MenuContainer = styled.div`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.text};
  display: none;
  position: relative;
  top: 10px;
  left: 15px;

  @media screen and (max-width: 1300px) {
      display: block;
    } 
`
 const Menu = ({darkMode,setDarkMode}) => {
  const [innerWidth,setInnerWIdth] = useState(window.innerWidth)
  const {currentUser}  = useSelector(state => state.user)
  const {menu} = useSelector(state =>  state.responsive)
  const dispatch = useDispatch()

  useEffect(() => {
    window.addEventListener('resize', () => {
      setInnerWIdth(window.innerWidth)
      console.log(innerWidth)
    })
  })
  
   return (
    <Container 
    className = {(menu && innerWidth < 1300) && 'responsiveMenu' }
    style={{display: (innerWidth > 1300 || menu)  ? 'block' : 'none',
            position : (menu && innerWidth < 1300) ? 'absolute' : '',
            zIndex : (menu && innerWidth < 1300) && 10,
            transition :(menu && innerWidth < 1300) && 'display 1s'
          
    }}> 
            
            <MenuContainer onClick = {() => dispatch(toggle())} >
                <MenuIcon/>
            </MenuContainer>
        

      <Wrapper>
        <Link to = '/' style={{textDecoration: "none",color: 
        "inherit"}}>

            <Logo>
                  <img src= {logo} alt="logo" />
                  <h3> ObedTube</h3> 
            </Logo>

        </Link>

        

 
        <Link to = '/random' style={{textDecoration: "none",color: 
        "inherit"}}>

            <Item> 
                <Home/> Home
            </Item> 
        </Link>
            <Link to = "/trend" style={{textDecoration: "none",color: 
              "inherit"}}>
                <Item>
                    <ExploreOutlined/>
                    Explore
                </Item>

            </Link>


            <Link to = "/subscription" style={{textDecoration: "none",color: 
            "inherit"}}>
              <Item>
                    <SubscriptionsOutlined />
                    Subscriptions
              </Item>

            </Link>
        <Hr />
        <Item>
          <VideoLibraryOutlined />
          Library
        </Item>
        <Item>
          <HistoryOutlined/>
          History
        </Item>
        <Hr />
        {!currentUser &&
          <>
          <Login>
            <Link to = "/signin" style={{textDecoration: "none",color: 
              "inherit"}}>
                        <Button>
                          <AccountCircleOutlined/>
                          SIGN IN
                        </Button>
            </Link>
         
        </Login>
        <Hr />
          </>

        }
        <Title>Best Of ObedTube</Title>
        <Item>
          <LibraryMusicOutlined />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlined/>
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlined />
          Gaming
        </Item>
        <Item>
          <MovieOutlined/>
          Movies
        </Item>
        <Item>
          <ArticleOutlined />
          News
        </Item>
        <Item>
          <LiveTvOutlined />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlined />
          Settings
        </Item>
        <Item>
          <FlagOutlined/>
          Report
        </Item>
        <Item>
          <HelpOutlineOutlined/>
          Help
        </Item>

        <Item  onClick = {() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlined />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>
        </Wrapper>
     
    </Container>
   )
 }








 
 
 export default Menu