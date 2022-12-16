import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useContext } from "react";
import axios from "axios";

import {AuthContext} from "../../providers/AccountProvider";

const ButtonLogout = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: end;
    margin: 0 30px;
    width: 8rem;
    height: 3rem;
    background-color: #0a293d;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 6px;
    border: none;
`

const Logout = () => {
    const {token, username, userId, setToken, setUsername} = useContext(AuthContext)

    const handleLogout = async ()=>{
        getLogout()
        setToken('')
        setUsername('')
        localStorage.removeItem('username')
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
    }
    const getLogout = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, 
        {
            headers: {"x-access-token" : token, "username": username, "userid": userId, 'Content-Type': 'application/json'}
        })
        return response.data
    }
    return (
        <ButtonLogout onClick={()=>handleLogout()}>
                <Icon icon="tabler:logout" height={30}></Icon>
                LOGOUT
            </ButtonLogout>
    )
}

export default Logout