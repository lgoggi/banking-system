import styled from "styled-components";

import Balance from "./balance";
import Logout from "./logout";
import User from "./user";

const Wrapper = styled.div`
    width: 100%;
    height: 10vh;
    background-color: #1d6ea3;
    display: flex;
    flex-direction: row;
    align-items: center;
`



const Header = () => {
   
    return (
        <Wrapper>
            <User />
            <Balance />
            <Logout />
        </Wrapper>
    )
}

export default Header;