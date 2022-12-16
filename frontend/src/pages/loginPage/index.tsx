import {  useContext, useRef, useState,  useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../../providers/AccountProvider';
import { Wrapper, Title, Username, Password, Button, LinkSignup, ButtonSignUp, ErrorMsg } from '../../components/form/styles'


const LoginPage = ()=>{
    
    const [pwd, setPwd]=useState<string|null>(null)
    const { setUserId, isLogged, setToken, username, setUsername} = useContext(AuthContext)
    const [errorMsg, setErrorMsg] = useState('')
    const usernameRef =  useRef() as React.MutableRefObject<HTMLInputElement>
    const pwdRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const navigate =useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setUsername(usernameRef?.current?.value!)
        setPwd(pwdRef?.current?.value!)
  
    }
    const postLogin = (username: string, pwd: string) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,
        {
            "name": username,
            "password": pwd,
        })
        .then((response)=> {
            if(response.data.auth){
                setToken(response.data.accessToken)
                setUserId(response.data.userId)
                localStorage.setItem('username', username)
                localStorage.setItem("token", response.data.accessToken)
                localStorage.setItem("userId", response.data.userId)
            }
            else {
                setErrorMsg(response.data)
            }
        })
    }
    
    useEffect(()=>{
        if( username && pwd){
            postLogin(username, pwd)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, pwd])

    useEffect( ()=> { //performs the redirect once IsLogged change 
        if(isLogged==='1') navigate("/home")

    }, [isLogged, navigate])

    return(
        <Wrapper onSubmit={handleSubmit}>
            <Title>login</Title>
            <Username type='text' id="username" name='username' placeholder='user' ref={usernameRef} autoComplete="off" required/>
            <Password type='password' id="password" name='password' placeholder='password' ref={pwdRef} required/>
            <ErrorMsg>{errorMsg}</ErrorMsg>
            <Button type="submit">Login</Button>
            <LinkSignup>
                <div className='or'>or</div>
                <ButtonSignUp onClick={ ()=> navigate("/signup")}>create account</ButtonSignUp>
            </LinkSignup>
        </Wrapper>
    )
}

export default LoginPage