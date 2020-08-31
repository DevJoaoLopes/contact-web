import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  background-color: #ffffff;
`;

export const Title = styled.div`
    width: 100%;
    height: 46px;
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: flex-start;
`;

export const IconHeader = styled.img`
    width: 50px;
    margin: 20px;
    align-self: center;
`;
export const TextHeader = styled.h1`
    align-self: center;
    font-size: 1.8em;
    color: #999;
    margin-left: 20px;
`;

export const Button = styled.button`
    color: #fff;
    font-size: 16px;
    background: #221e5a;
    height: 26px;
    border: 0;
    border-radius: 5px;
    width: 100px;
`;
