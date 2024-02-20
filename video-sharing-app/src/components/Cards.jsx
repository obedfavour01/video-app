import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//import card from '../images/cardImage.PNG'
import channelImage from '../images/ChannelImage.png'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js'
import axios from 'axios'
import { VideoAPI } from '../utils/api'


const Container = styled.div`
width: ${(props) => props.type !== "sm" && "360px"};
margin-bottom: ${(props) => props.type === "sm" ? "10px" : "45px"};
cursor: pointer;
display: ${(props) => props.type === "sm" && "flex"};
gap: 10px;

&:hover{
  transform:scale(1.1,1.1);
  transition: transform .7s;
}
`

const Image = styled.img`
width: 100%;
 height : ${(props) => props.type === "sm" ? "120px" : "202px"};
background-color: #999;
cursor: pointer;
flex: 1;
`

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex:1;

`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #999;
  object-fit: cover;
  object-position: top left;
  display : ${(props) => props.Type === 'sm' && "none"};
`

const Texts = styled.div``
  const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  `
  const ChannelName = styled.h1`
  font-size: 14px;
  color: ${({theme}) => theme.textSoft};
  margin: 9px 0;

  `
  const Info = styled.div`
  color: ${({theme}) => theme.text};
  font-size: 12px;
  `


const Cards = ({type,video}) => {
  const [channel,setChannel] = useState({})

  useEffect(() => {
    const fetchChannel = async() => {
    const res = await axios.get(`${VideoAPI}/users/find/${video.userId}`);
      setChannel(res.data)
    } 

fetchChannel()
  },[video.userId])
  return (
    <Link to = {`/video/${video?._id}`} style={{textDecoration: "none",color: 
    "inherit"}}>
    <Container Type = {type}>
      <Image src= {video.imgUrl} Type = {type}/>
      <Details Type = {type}>
        <ChannelImage src = {channel.imgURL} Type = {type}/>    

        <Texts>
        <Title>{video.title}</Title>
        <ChannelName>{channel.name}</ChannelName>
        <Info> {video.views} views <> &#183;</> {format(video.createdAt)}</Info>
        </Texts>
      </Details>
    </Container>
    </Link>
  )
}

export default Cards