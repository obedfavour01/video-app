import React, { useState } from 'react'
import styled from 'styled-components'
import{ SearchOutlined,AccountCircleOutlined, Close} from '@mui/icons-material';
import { ArrowDropDown, ArrowDropUp, VideoCallOutlined } from '@mui/icons-material'
import {Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Upload from './Upload';
import { logout } from '../Redux/userSlice';
import {toggle} from '../Redux/responsiveSlice'
import MenuIcon from '@mui/icons-material/Menu';
const Container = styled.div`
position:sticky;
top:0;
background-color: ${({theme}) => theme.bgLighter}; 
height: 56px;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  @media screen and (max-width : 600px) {
      border: none;
      padding: 0px 5px
         
    }

`
const Search = styled.div`
width: 40%;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius:3px;
color: ${({theme}) => theme.text};



`
const Input = styled.input`
border: none;
background-color: transparent;
outline:none;
width: 70%;
height: 100%;
color: ${({theme}) => theme.text};
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
@media screen and (max-width : 600px) {
      border: none;
      padding: 5px 0px
         
    }

`
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const ImgContainer = styled.div`
border: 1px solid ${({theme}) => theme.soft};
border-radius:3px;
padding: 10px 20px;

  &:hover{
  background-color:${({theme}) => theme.textSoft};  
  }

  @media screen and (max-width : 600px) {
      width:36px;
      height: 36px;
      padding: 5px 10px;
       
    }

`

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`

const SignOut = styled.div`
position: absolute;
top: 50px;
right: 50px;
background: ${({theme})=> theme.soft};
border-radius: 0 0 5px 5px;
width: 100px;
height: 40px;
font-size: 16px;
transition-duration: 0.4s;
text-align: center;
cursor:pointer;
`

const MenuContainer = styled.div`
  width: 36px;
  height: 36px;
  color: ${({ theme }) => theme.text};
  display: none;
  @media screen and (max-width: 1300px) {
      display: block;
    } 
`
const Navbar = () => {

  const navigate = useNavigate()
  const[mouseover, setMouseOver] = useState(false)
  const [open, setOpen]  = useState(false)
  const [q, setQ] = useState("")
  const {currentUser}  = useSelector(state => state.user)
  const dispatch = useDispatch()
  const {menu} = useSelector(state =>  state.responsive)


  const handleSignOut = () => {
    dispatch(logout())
    navigate('/')
  }

 const handleClick = () => {
    dispatch(toggle())
 }
  return (
  <>

   <Container>
      <Wrapper>

            <MenuContainer onClick = {handleClick} >
                <MenuIcon/>
            </MenuContainer>
        
       
        

        <Search>
          <Input placeholder='Search' onChange = {(e) => setQ(e.target.value)}/>
        <SearchOutlined style = {{color: `${({theme}) => theme.text }`}}
        onClick = {() => {navigate(`/search?q=${q}`)}}
        />
        
        </Search>

        <h2>
          {menu}

        </h2>
        {currentUser ? (
            <User>
              <VideoCallOutlined onClick={() => setOpen(true)} />

              <ImgContainer onClick = {() => {
               setMouseOver((prevState) => !prevState )}}>

              <Avatar src={currentUser.img} />
              { mouseover ? <ArrowDropUp/>:<ArrowDropDown/>}
  
              </ImgContainer>

                <SignOut onClick = {handleSignOut}
                  style = {{display: mouseover ? "block" : "none"}}
                >
                      <a>
                          Sign Out
                      </a>
                </SignOut>

             <small> {currentUser.name} </small> 
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlined/>
                SIGN IN
              </Button>
            </Link>
          )}

   
      </Wrapper>
   </Container>


   { open && <Upload  setOpen = {setOpen} />}

  </>
  )
}

export default Navbar