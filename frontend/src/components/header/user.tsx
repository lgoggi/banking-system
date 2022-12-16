import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../providers/AccountProvider"

const Wrapper = styled.div`
    font-size: 2rem;
    font-weight: bold;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 4rem;
    margin: 0 0 0 15px;
    color: black;
`

const User = ()=>{
    const {username} = useContext(AuthContext)
    return (
        <Wrapper>
            @{username}
        </Wrapper>
    )
}

export default User