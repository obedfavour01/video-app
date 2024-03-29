import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import channelImage from '../images/ChannelImage.png'
import Comment from './Comment'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { VideoAPI } from '../utils/api'


const Container = styled.div`
`

const NewComment = styled.div`
display: flex;
align-items: center;

`

const Avatar = styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
object-fit: cover;`

const Input = styled.input`
color: ${({theme}) => theme.text};
border: none;
border-bottom: 1px solid ${({theme}) => theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
width: 100% ;
`




const Comments = ({videoId}) => {

  const {currentUser} = useSelector((state) => state.user)
const [comments, setComments] = useState([])

useEffect(() => {
  const fetchComments = async() => {

    try{
      const res = await axios.get(`${VideoAPI}/comments/${videoId}`)

      setComments(res.data)
    }catch(err){

    }

  }

  fetchComments()
},[videoId])
  return (
<Container>
    <NewComment>
        <Avatar src = {currentUser.img}/>
        <Input placeholder = "Add a comment ..." />
    </NewComment>

{
  comments.map((comment) => (
    <Comment key = {comment._id} comment = {comment}/>

  )

  )
}
 


</Container>
  )
}

export default Comments