import {  useRef, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Wrapper, Title, Username, Password, Button, LinkSignup, ButtonSignUp, ErrorMsg } from '../../components/form/styles';


const SignupPage = ()=>{
    const [username, setUsername]=useState('')
    const [pwd, setPwd]=useState('')
    const usernameRef =  useRef() as React.MutableRefObject<HTMLInputElement>
    const pwdRef =  useRef() as React.MutableRefObject<HTMLInputElement>
    const pwd2Ref =  useRef() as React.MutableRefObject<HTMLInputElement>
    const [errorMsg, setErrorMsg] = useState('')
    const navigate = useNavigate();
    const regex= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")

    const passwordCheck = (senha: string, senha2: string) => {
        if(regex.test(senha)){
            if(senha===senha2){
                setPwd(senha)
            } else {
                setErrorMsg('Senhas diferentes')
            }
        } else {
            setErrorMsg('Senha fraca')
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setUsername(usernameRef?.current?.value!)
        passwordCheck(pwdRef?.current?.value!, pwd2Ref?.current?.value!) 
    }

    const postSignup = (username: string, pwd: string) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`,{
            "name": username,
            "password": pwd,
        })
        .then((response) => {
            if (response.data === "Novo usuário criado") navigate("/login")
            else setErrorMsg(response.data)
        })
    }
    
    useEffect(()=>{
        if (username && pwd){
           postSignup(username, pwd)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, pwd])

    return(
        <Wrapper onSubmit={handleSubmit}>
            <Title>SIGN UP</Title>
            <Username type='text' id="username" name='username'  placeholder='user' ref={usernameRef} autoComplete="off" required />
            <Password type='password' id="password" name='password'  placeholder='password' ref={pwdRef} required />
            <Password type='password' id="confirm" name='confirm'  placeholder='confirm password' ref={pwd2Ref} required />         
            <ErrorMsg>{errorMsg}</ErrorMsg>  
            <Button type="submit">Send</Button>
            <LinkSignup>
                <div className='or'>or</div>
                <ButtonSignUp onClick={ ()=> navigate("/login")}>Login</ButtonSignUp>
            </LinkSignup>
        </Wrapper> 
    )
}

export default SignupPage
