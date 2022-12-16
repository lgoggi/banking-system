import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { AuthContext } from "../../providers/AccountProvider"
import { BalanceContext } from "../../providers/BalanceProvider"

const Wrapper = styled.form`
    align-items: center;
    background-color: white;
    border: 2px solid black;
    border-radius: 12px;
    box-shadow: 5px 4px #202020;
    display: flex;
    flex-direction: column;
    height: 30rem;
    justify-content: center;
    width: 25rem;
    @media screen and (max-width: 1000px){
      height: 35vh;
      width: 70vw;
    }
`
const Title = styled.h2`
    color: black;
    margin: 5rem 0 auto 0;
    @media screen and (max-width: 1000px){
        margin: 5rem 0 10px 0;
}
`
const Search = styled.input`
    border: 2px solid black;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 0px grey;
    font-size: 1.35rem;
    height: 1.75rem;
    text-align: center;
    outline-color: blue;
    padding: 0 5px 0 15px;
    width: 15rem;
`
const Value = styled.input`
    border: 2px solid black;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 0px grey;
    height: 3rem;
    font-size: 1.35rem;
    margin: 1.5rem;
    padding: 0 5px 0 15px;
    text-align: center;
    width: 5rem;
    outline-color: blue;
    ::-webkit-inner-spin-button{
        -webkit-appearance: none; 
    }
    ::-webkit-outer-spin-button{
        -webkit-appearance: none; 
    } 
`

const ResponseMsg = styled.div`
    align-self: center;
    display: flex;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 1.5rem 0 0;
    ${props => {
    if(props.className==='approved') return (`color: #0000ff;`)
    else return (`color: red;`)
  }}
`
const SubmitButton = styled.button`
    border: 2px solid black;
    border-radius: 6px;
    box-shadow: 3px 3px 3px 0px grey;
    background-color: white;
    color: black;
    height: 3rem;
    font-size: 2rem;
    text-align: center;
    margin: 1.5rem 0 5rem 0;
    width: 15rem;
    &:active{
    transform: translate(3px, 3px);
    box-shadow: none;
    }
    @media screen and (max-width: 1000px){
        box-shadow: none;
        margin-top: auto;
        &:active{
        transform: none;
    }
}   
`

const Transaction = () => {
    const {token, username} = useContext(AuthContext)
    const {trigger, setTrigger} = useContext(BalanceContext)
    const [searchUser, setSearchUser ] = useState<string>('')
    const [value, setValue] = useState<string>()
    const [responseMsg, setResponseMsg] = useState('')
    const [responseClass, setResponseClass] = useState('')
    const valueRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const regex = new RegExp(/^\$?(\d{1,3},?(\d{3},?)*\d{3}(\.\d{0,2})?|\d{1,3}(\.\d{0,2})?|\.\d{1,2}?)$/)

    const handleUser = (user: string) => {
        setSearchUser(user)
    }
    
    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        if(!regex.test(valueRef.current.value)){
           setResponseMsg('Valor inválido')
        } else {
            setValue(valueRef.current.value)
            valueRef.current.value = ''
        }
    }

    const postTransaction = async (username: string, searchUser: string, value: string, token: string) => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction`,
            {
                "username": username,
                "targetUser": searchUser,
                "tempValue": value,
                "token": token
            })
            .then((response) => {
                setResponseMsg(response.data)
                setTimeout(function() { setResponseMsg('') }, 5000);
                setSearchUser('')
                setValue('')
            })
    }

    useEffect(()=>{
        if( username && value){
           postTransaction(username, searchUser, value, token!)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, value])

    useEffect(()=>{
        if(responseMsg){
            if(responseMsg==='Transação realizada'){
                setResponseClass('approved')
                setTrigger(trigger+1)
            } else{
                setResponseClass('denied')
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseMsg, setTrigger])

    return (
        <Wrapper onSubmit={handleSubmit}>
            <Title>FAÇA UMA TRANSFERÊNCIA</Title>
            <Search type='text' value={searchUser} placeholder='usuário'  onChange={(e)=>handleUser(e.target.value)} required/>
            <Value type='number' min='0.01' step='any' ref={valueRef} placeholder='R$' required/>
            <ResponseMsg className={responseClass} >{responseMsg}</ResponseMsg>
            <SubmitButton type='submit'>ENVIAR</SubmitButton>
        </Wrapper>
        )
}

export default Transaction