import React, { useEffect, useState } from 'react'

import styled from 'styled-components'
import Cards from '../components/Cards'
import axios from "axios"
import CardSkeleton from '../components/CardSkeleton'
import { CardsSkeletons } from '../components/CardsSkeletons'


const Container = styled.div`
color: ${({theme}) => theme.text};
display: flex;
justify-content: space-between;
flex-wrap: wrap;

`
const Home = ({type}) => {

  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchVideos = async() => {
      setIsLoading(true)
      try {
        const res = await axios.get(`videos/${type}`)
        setVideos(res.data)
        setIsLoading(false)
        console.log(videos)
      } catch (error) {
        console.log(error.message)
      }
    }

    fetchVideos()

  },[type])
  return (

    <Container>
      {
     isLoading ? (<CardsSkeletons/>):(  Array.isArray(videos) && videos.map((video) => 
          <Cards key = {video._id} video = {video} isLoading = {isLoading} setIsLoading = {setIsLoading}/>

        ))
      }



    </Container>
  )
}

export default Home
