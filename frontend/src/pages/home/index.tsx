import styled from "styled-components";
import Header from "../../components/header";
import Transaction from "../../components/main/transaction";
import History from "../../components/main/history";


const Wrapper = styled.div`
    align-items: center;
    background-color: white;
    display: flex;
    flex-direction: row;
    height: 80vh;
    justify-content: space-evenly;
    margin: auto;
    @media screen and (max-width: 1000px){
        flex-direction: column;
}
`

const Home = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <Transaction />
                <History />
            </Wrapper>
        </>
    )
}

export default Home;