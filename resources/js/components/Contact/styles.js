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
    justify-content: space-between;
`;

export const ViewForm = styled.div`
    width: 40%;
    height: 300px;
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
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

export const ButtonAdd = styled.button`
    color: #fff;
    font-size: 16px;
    background: #221e5a;
    height: 36px;
    border: 0;
    border-radius: 5px;
    width: 100px;
    margin-right: 40px;
    align-self: center;
    cursor: pointer;
`;

export const ButtonCancel = styled.button`
    color: #fff;
    font-size: 16px;
    background: red;
    height: 36px;
    border: 0;
    border-radius: 5px;
    width: 100px;
    margin-right: 40px;
    align-self: center;
    cursor: pointer;
`;

export const Form = styled.form`
    width: 400px;
    background: #fff;
    padding: 20px;
    border-radius: 2px;
    border-color: #64636f;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 2px 2px 2px 2px #64636f;
    margin-top: 100px;
    img {
        width: 100px;
        margin: 10px 0 40px;
        font-size: 30px;
        align-self: center;
    }
    p {
        color: #ff3333;
        margin-bottom: 15px;
        border: 1px solid #ff3333;
        padding: 10px;
        width: 100%;
        text-align: center;
    }
    input {
        flex: 1;
        height: 46px;
        margin-bottom: 15px;
        padding: 10px;
        color: #777;
        font-size: 15px;
        width: 95%;
        border: 1px solid #ddd;
        &::placeholder {
            color: #999;
        }
    }
    button {
        color: #fff;
        font-size: 16px;
        background: #221e5a;
        height: 56px;
        border: 0;
        border-radius: 5px;
        width: 100%;
    }
    hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%;
    }
    a {
        font-size: 16;
        font-weight: bold;
        color: #999;
        text-decoration: none;
    }
    div {
        width: 100%;
        flex-direction: row;
        display: flex;
    }
`;
