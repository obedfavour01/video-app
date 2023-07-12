import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch, useSelector,} from 'react-redux'
import styled from 'styled-components'
import { loginFailure, loginStart, loginSuccess, signUpStart, signUpSuccesful } from '../Redux/userSlice'
import {  signInWithPopup  } from "firebase/auth"
import { auth,provider } from '../firebase'
import google from "../images/google.png"
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 56px);
    
    
`


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: ${({theme})=> theme.bgLighter};
    color: ${({theme}) => theme.text};
    padding: 20px 50px ;
    border: 1px solid ${({theme}) => theme.soft};
    gap: 10px;
    border: 2px solid black;

    @media screen and (max-width : 600px) {
          padding: 0;
          background-color: transparent;
          border: none;
    }
`


const Title = styled.h1`
font-size: 24px;

@media screen and (max-width : 600px) {
    font-size: 14px;
         
    }
`
const SubTitle = styled.h2`

@media screen and (max-width : 600px) {
    font-size: 14px;
         
    }
`


const Input = styled.input`
border: 1px solid ${({theme}) => theme.soft};
border-radius:3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: ${({theme}) => theme.text};


`
const Button = styled.button`
border: 1px solid ${({theme}) => theme.soft};
border-radius:3px;
padding: 10px 20px;
background-color: ${({theme})=> theme.soft};
cursor: pointer;
color: ${({theme}) => theme.textSoft};

`
const More = styled.div`
display: flex;
color: ${({theme}) => theme.textSoft};
font-size: 12px;
margin-top: 10px;
`

const Links = styled.div`
margin-left: 50px;
`
const Link = styled.span`
margin-left: 30px;
`

const Hr = styled.hr`
    margin: 15px 0px;
    width: calc(100vw / 9) ;
    border: 0.3px solid ${({theme}) => theme.textSoft};
`


const ModalContainer = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: #000000a7;
display: flex;
justify-content: center;
align-items: center;
`

const Modal = styled.div`
  
    width: 300px;
    height: 300px;
    background-color: ${({theme}) => theme.bgLighter}; 
    color: ${({theme}) => theme.text};
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: relative;
`

const Text = styled.h1`
  font-size: 30px;

`
const Signin = () => {

    const[name, setName ] = useState("")
    const[password, setPassword ] = useState("")
    const[email, setEmail ] = useState("")


    const dispatch = useDispatch()
   const navigate = useNavigate()
   const {loadingforSignUp} = useSelector(state => state.user)


   useEffect(() => {
    dispatch(signUpSuccesful())
   },[dispatch])

   const handleSignUp = async(e) => {
    e.preventDefault();
    dispatch(signUpStart())
    try{
      const res = await axios.post("/auth/signup", {
        name:name,
        password:password,
        email: email
      } )
       res && dispatch(signUpSuccesful())
       res.status === 200 && navigate('/')
       
    }catch(e){
      console.error(e)
    }
   }
    
const handleLogin = async(e) => {
    e.preventDefault();
    dispatch(loginStart())
    try{
        const res = await axios.post("/auth/signin", {name,password})
       dispatch(loginSuccess(res.data))
       res.status === 200 && navigate('/')

    }catch(err){

        dispatch(loginFailure())
            console.log(err.message)
    }
}


const signInWithGoogle = async () => {
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {

        console.log(result)
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));

            res.status === 200 && navigate('/')
       
          });
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
  console.log(loadingforSignUp)
  return (
  <Container>
        <Wrapper>
         <Title>Sign In {loadingforSignUp}</Title>
        <SubTitle>to continue to Youtube</SubTitle>
        <Input placeholder='username' type = 'text' onChange={(e)=> setName(e.target.value)}/>
        <Input placeholder='password' type = 'password'  onChange={(e)=> setPassword(e.target.value)}/>
        <Button onClick={handleLogin}>Sign In</Button>

        <Hr/>
        <Title>Or</Title>
        
        <Button onClick = {signInWithGoogle}>Sign In with google
        <img src= {google}alt="" 
        style={{width: "24px", marginLeft : "5px" , marginTop: "0px"}}/>
        </Button>
        <Hr/>

        <Title>Or</Title>


        <Input placeholder='username' type = 'text'  onChange={(e)=> setName(e.target.value)}/>
        <Input placeholder='email' type = 'email'  onChange={(e)=> setEmail(e.target.value)}/>
        <Input placeholder='password' type = 'password'  onChange={(e)=> setPassword(e.target.value)}/>
        <Button onClick={handleSignUp}>Sign Up</Button>


        </Wrapper>

        <More>

            English(USA)
            <Links>
                <Link> Help </Link>
                <Link> Privacy</Link>
                <Link> Terms</Link>

            
            </Links>
        </More>

    {
      loadingforSignUp ?
(

    <ModalContainer>
              <Modal>
                    <Text> This might take a while</Text>
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                     </Box>
              </Modal>
       </ModalContainer>

)    :

" "
    }
  </Container>
  )
}

export default Signin