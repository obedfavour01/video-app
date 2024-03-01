import React, { useEffect,useState} from 'react'
import styled from 'styled-components'
//import Cards from '../components/Cards'
import ReactPlayer from 'react-player'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined"
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined"
//import channelImage from '../images/ChannelImage.png'
import Comments from '../components/Comments';
import { useDispatch,useSelector} from 'react-redux'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislike, fetchStart, fetchSuccess, like } from '../Redux/videoSlice';
import { format } from 'timeago.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { subscription } from '../Redux/userSlice';
import Recommendation from '../components/Recommendation';
import { VideoAPI } from '../utils/api';

const Container = styled.div`
  display: flex;
  gap: 24px;

  @media screen and (max-width : 600px) {
          flex-direction  : column ;
    }
`
const Content = styled.div`
flex:5;

@media screen and (max-width : 600px) {
         width: 100%;
    }
`

const VideoWrapper = styled.div``
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({theme}) => theme.text};
@media screen and (max-width : 600px) {
       font-size: 14px;
    }
`
const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
@media screen and (max-width : 600px) {
     flex-direction: column;
     align-items: start;
     gap: 15px;
     width: 100%;
  
    }
`
const Info = styled.div`
color: ${({theme}) => theme.textSoft};
@media screen and (max-width : 600px) {
       font-size: 12px;

    }
`
const Buttons = styled.div`
display: flex;
gap: 20px;
color: ${({theme}) => theme.text};
@media screen and (max-width : 600px) { 

    width: 100%;
    gap:60px;
  }
`
const Button = styled.button`
display: flex;
align-items: center;
gap: 5px;
cursor:pointer;
background: transparent;  
color: ${({theme}) => theme.text};
border : none;
@media screen and (max-width : 600px) {
        width: 8px;
       height: 8px;
       
    }
`

const Hr = styled.hr`
margin: 15px 0;
  border: 0.2px solid ${({theme}) => theme.soft};
`

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
  
`

const Image = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
object-fit: cover;
@media screen and (max-width : 600px) {
     width: 24px;
      height: 24px;
    }
`
  
const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({theme}) => theme.text};

`
const ChannelName = styled.span`
font-weight: 500;
@media screen and (max-width : 600px) {
  font-size: 12px;
       
    }
`
const ChannelCounter = styled.span`
font-size: 12px;
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme}) => theme.textSoft};

`
const Description = styled.p`
  font-size: 14px;
  @media screen and (max-width : 600px) {
  font-size: 10px;
       
    }
`
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  padding: 10px 20px;
  color: white;
  border: none;
  height: max-content;

  @media screen and (max-width : 600px) {
       font-size: 10px;
       padding : 8px 10px;
       
    }
`


const VideoFrame =  styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`
const Video = () => {

  const {currentUser}  = useSelector(state => state.user)
  const {currentVideo}  = useSelector(state => state.video)

  const dispatch = useDispatch()

  const path = useLocation().pathname.split("/")[2]
  
  const[channel, setChannel] = useState({})


  useEffect(()=> {
    const fetchData = async() => {
      dispatch(fetchStart())

      try{
          const videoRes =await axios.get(`${VideoAPI}/videos/find/${path}`)
          const channelRes =await axios.get(`${VideoAPI}/users/find/${videoRes.data.userId}`)
          setChannel(channelRes.data)
          dispatch(fetchSuccess(videoRes.data))



      }catch(err){

      }
    }
    fetchData()
  },[path,dispatch])


  const handleLike = async() =>{

    await axios.put(`${VideoAPI}/users/like/${currentVideo._id}`)
    dispatch(like(currentUser._id))
  }


  const handleDislike = async() =>{
    await axios.put(`${VideoAPI}/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentUser._id))
}

const handleSub = async() => {

  try{

    currentUser.subscribedUsers?.includes(channel._id) ? 
  
    await axios.put(`${VideoAPI}/users/unsub/${channel._id}`)
  :
  
    await axios.put(`${VideoAPI}/users/sub/${channel._id}`);

    dispatch(subscription(channel._id));
  }
  catch(err){
    console.log(err.message)
  }

}
  return (
    <Container>
      <Content>
          <VideoWrapper>
            {
              !(currentVideo?.url) ?
              <VideoFrame src = {currentVideo?.videoUrl} controls autoPlay/>:
              (<div>loading</div>)

            }
          </VideoWrapper>

          <Title>{currentVideo?.title}</Title>
          <Details>

              <Info>{currentVideo?.views} views<> &#183;</> {format(currentVideo?.createdAt)}</Info>
              <Buttons>
                    <Button onClick={handleLike} className = 'btn'>
                     {currentVideo?.likes?.includes(currentUser?._id) ? <ThumbUpIcon/> :<ThumbUpOffAltIcon/>}  {currentVideo?.likes?.length}
                    </Button>


                    <Button onClick={handleDislike}>
                      {currentVideo?.dislikes?.includes(currentUser._id) ? <ThumbDownIcon/> :<ThumbDownAltIcon/>} Dislike</Button>
                    <Button><ReplyOutlinedIcon/> Share</Button>
                    <Button><AddTaskOutlinedIcon/></Button>


              </Buttons>
          </Details>


          <Hr/>
      
      <Channel>
        <ChannelInfo>
            <Image src= {channel.img}/>
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
        </ChannelInfo>

        <Subscribe onClick={handleSub}>
          {currentUser?.subscribedUsers?.includes(channel._id) ? 
          "SUBSCRIBED": 
          "SUBSCRIBE"
          }
          </Subscribe>
      </Channel>



      <Hr/>

      <Comments videoId = {currentVideo._id}/>
      </Content>

        <Recommendation tags = {currentVideo.tags}/>
    </Container>
  )
}

export default Video