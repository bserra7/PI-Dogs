import React from "react";
import styled from "styled-components";

const Content = styled.div`
    position: relative;
    background-color: #fefefe;
    border: 5px solid #414141;
    margin: auto;
    width: 30%;
    font-size: 35px;
    padding: 20px;
`;

const Span = styled.span`
    background-color: #41414100;
    border: 1px solid #414141;
    width: 30px;
    height: 30px;
    color: #414141;
    border-radius: 99px;
    float: right;
    font-size: 20px;
    font-weight: bold;
    &:hover{ 
    color: #fff;
    background-color: #414141;
    text-decoration: none;
    cursor: pointer;
    }
`;


const Modal = ({show, message, setShow}) => {

    const Modaldiv = styled.div`
    display: ${show ? 'block': 'none'};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding-top: 200px;
    width: 100%;
    height: 100%;
    background-color: #000;
    background-color: #00000040;
`;

    return(
        <Modaldiv>
            <Content>
            <Span onClick={e => setShow(false)}>x</Span>
                {message} 
            </Content>
        </Modaldiv>        
    )
}

export default Modal;