import { React } from 'react';
import styled from 'styled-components';
import sad_dog from '../assets/sad_dog.png';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 300px 0;
    @media (max-width: 550px){
        margin: 150px 0;
    }
    @media (max-width: 370px){
        margin: 100px 0;
    }
`; 

const Text = styled.div`
    font-size: 35px;
    @media (max-width: 550px){
        font-size: 25px;
    }
    @media (max-width: 370px){
        font-size: 20px;
    }
`;
const Img = styled.img`
    width: 200px;
    @media (max-width: 370px){
        width: 150px;
    }
`; 

const NotFound = () => {
    return(
        <Container>
            <div><Img src={sad_dog} alt="Page not Found" /></div>
            <Text>404 - Page not found</Text>
        </Container>
    )        
}

export default NotFound;