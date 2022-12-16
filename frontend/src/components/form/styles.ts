import styled from "styled-components"

export const Wrapper = styled.form`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    margin: auto;
    width: 50rem;
`
export const Title = styled.h1`
    font-size: 2rem;
    margin: -4rem 0 1rem 0;
`
export const Username = styled.input`
    background-color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.5rem;
    height: 3rem;
    margin: 3rem auto 0 auto;
    outline-color: blue;
    padding: 0 5px 0 15px;
    text-align: start;
    width: 27.5rem;
`
export const Password = styled.input`
    background-color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.5rem;
    height: 3rem;
    margin: 3rem auto 0 auto;
    outline-color: blue;
    padding: 0 5px 0 15px;
    text-align: start;
    width: 27.5rem;
`
export const Button = styled.button`
    background-color: #1d6ea3;
    border: none;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 0px grey;
    color: white;
    font-size: 2rem;
    height: 3rem;
    margin: 3rem 0 3rem 0;
    text-align: center;
    width: 27.5rem;
    &:active{
    transform: translate(3px, 3px);
    box-shadow: none;
    }
`
export const LinkSignup = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 10rem;
    justify-content: center;
    width: 27.5rem;
    margin-top: 3rem;
    .or{
        color: #2a2727;
        font-size: 2rem;
        margin-bottom: -2rem;
    }
`
export const ButtonSignUp = styled.button`
    background-color: white;
    border: none;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 0px grey;
    color: #2a2727;
    font-size: 2rem;
    height: 3rem;
    margin: 3rem 0 3rem 0;
    text-align: center;
    width: 27.5rem;
    &:active{
    transform: translate(3px, 3px);
    box-shadow: none;
    }
`
export const ErrorMsg=styled.div`
color: red;
font-size: 1.2rem;
font-weight: bold;
margin: 4rem auto 0 auto;
`