import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Cards from "../components/Cards"
import { VideoAPI } from '../utils/api'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
const Search = () => {

    const query = useLocation().search
    const [videos,setVideos] = useState([])

    useEffect(() => {
            const fetchVideos = async() => {
                const res = await axios.get(`${VideoAPI}/videos/search/${query}`)
                setVideos(res.data)
            };

            fetchVideos();
    },[query])
  return (
    <Container>
        {
            videos && videos.map((video) => (
                <Cards key = {video._id} video = {video}/>
            ))
        }
    </Container>
  )
}

export default Search