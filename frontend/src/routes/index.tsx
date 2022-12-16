import {BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {  useContext } from "react";
import {AuthContext} from '../providers/AccountProvider';
import axios from "axios";

import Login from "../pages/loginPage";
import Signup from "../pages/signupPage";
import Home from "../pages/home";


const RoutesApp = () => {
    const {  username, userId , token, isLogged, setIsLogged } = useContext(AuthContext)
    
    const subVerifyToken = async (token: string | null) => {
        if(token){
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/IsAuth`,
            {
                headers: {"x-access-token" : token, "username": username , "userid": userId, 'Content-Type': 'application/json'}
            })
            return response.data
        }
        else return 0;
    }

    const verifyToken = async (token: string | null) => {
        const result = await subVerifyToken(token)
        setIsLogged(result.toString()) //converts to string to be compatible with localStorage
        localStorage.setItem('isLogged', isLogged)
    }
    verifyToken(token)
    
    return (
            <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={ (isLogged==='1')?  <Home/> : <Navigate to={"/login"}/> } />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={ (isLogged==='1')?  <Home/> : <Navigate to={"/login"}/> } />
            </Routes>
        </BrowserRouter>
    )
}
export default RoutesApp