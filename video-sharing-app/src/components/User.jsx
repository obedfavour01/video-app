import { ArrowDropDown, ArrowDropUp, VideoCallOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch,} from 'react-redux'
import { logout } from '../Redux/userSlice'
import Upload from './Upload'
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-weight: 500;
    color: ${({theme}) => theme.text};
  position:relative;



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
left: 40px;
background: ${({theme})=> theme.soft};
border-radius: 0 0 5px 5px;
width: 100px;
height: 40px;
font-size: 16px;
transition-duration: 0.4s;
text-align: center;

cursor:pointer;
`

const ImgContainer = styled.div`
border: 1px solid ${({theme}) => theme.soft};
border-radius:3px;
padding: 10px 20px;

  &:hover{
  background-color:${({theme}) => theme.textSoft};  
  }

`
const User = ({user}) => {


const [open, setOpen]  = useState(false)
  const[mouseover, setMouseOver] = useState(false)
  const dispatch = useDispatch()




  return (
    <>
<Container>
    <VideoCallOutlined onClick= {()=> {setOpen(true)}}/>


  <ImgContainer onClick = {() => {
    setMouseOver((prevState) => !prevState )}}>

  <Avatar src = {user.img}/>
      { mouseover ? <ArrowDropUp/>:<ArrowDropDown/>}
  </ImgContainer>
     

    
      <SignOut onClick = {() =>  dispatch(logout())}
        style = {{display: mouseover ? "block" : "none"}}
      >
          <a>
              Sign Out
          </a>
        </SignOut>
    {(user.name).split(" ")[0]}
    
 
</Container>

      { open && <Upload  setOpen = {setOpen} />}

   </>
  )
}

export default User