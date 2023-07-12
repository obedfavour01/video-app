import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Cards from './Cards'


const Container = styled.div`
    flex:2;

`
const Recommendation = ({tags}) => {

    const [videos, setVideos] = useState([])

useEffect(() => {

    try{
        const fetchVideos =
        async() => {
           const res = await axios.get(`videos/tags?tags=${tags}`)
   
           setVideos(res.data)
       }

       fetchVideos()
    }catch(e){
        console.error(e.message)
    }

    
}, [tags])
  return (  
        <Container>
           {
            videos.map((video) => 
                <Cards key = {video._id} video = {video} type = "sm"/>
            )
           }
        </Container>
  )
}

export default Recommendation