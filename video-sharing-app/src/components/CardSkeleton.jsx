import styled from 'styled-components'
const Container = styled.div`
width: ${(props) => props.Type !== "sm" && "360px"};
margin-bottom: ${(props) => props.Type === "sm" ? "10px" : "45px"};
cursor: pointer;
display: ${(props) => props.Type === "sm" && "flex"};
gap: 10px;

&:hover{
  transform:scale(1.1,1.1);
  transition: transform .7s;
}


`
const ImageDiv = styled.div`
width: 100%;
 height : ${(props) => props.Type === "sm" ? "120px" : "202px"};
 background-color: rgb(204,204,204);
cursor: pointer;
flex: 1;
animation : sleep 1s linear infinite alternate;

@keyframes sleep {
  0%{
   background-color: #a8b8c0;
    
  }
 
  100%{
  background-color: hsl(200,20%,95%);
  }
}
`

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.Type !== "sm" && "16px"};
  gap: 12px;
  flex:1;

`
const ChannelImageBox = styled.div`
flex : 1;

`
const ChannelImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgb(204,204,204);
 display : ${(props) => props.Type === 'sm' && "none"};

`


const Texts = styled.div`
    flex:6;
`
  const Title = styled.div`
    height: 20px;
   width : 80%;
  background: #999;
    
  `

  
  const ChannelName = styled.div`
  margin: 9px 0;
  height: 20px;
   width : 60%;
  background: #999;
  `



function CardSkeleton() {
  return (
    <Container>
        <ImageDiv></ImageDiv>
        <Details>
            <ChannelImageBox> 
                    <ChannelImage></ChannelImage>
             </ChannelImageBox>
            <Texts>
                <Title></Title> 
                <ChannelName></ChannelName>
            </Texts>
        </Details>
    </Container>
  )
}

export default CardSkeleton