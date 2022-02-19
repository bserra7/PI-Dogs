import { React } from 'react';
import styled from 'styled-components';
import '../css/Loader.css';

const LoaderContainer= styled.div`
    margin: 300px 0;
    display: flex;
    justify-content: center;
`;

const Loader = () => {
    return(
        <LoaderContainer>
        <div className="loader"></div>
        </LoaderContainer>
    )        
}

export default Loader;