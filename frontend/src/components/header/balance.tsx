import styled from "styled-components";
import { useContext } from "react";
import { BalanceContext } from "../../providers/BalanceProvider";

const Wrapper = styled.div`
    align-items: center;
    background-color: #B8E2F2;
    border: none;
    border-radius: 6px;
    color: #000000;
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
    height: 4rem;
    justify-content: center;
    margin: 0 auto 0 15px;
    min-width: 4rem;
    width: fit-content;
    .balance{
        align-self: center;
        font-size: 2rem;
        justify-content: center;
    }
`

const Balance = () => {
    const { balance } = useContext(BalanceContext)
    let displayBalance = 0;
    if (balance){
        displayBalance = parseFloat(balance!.toFixed(2))
    }

    return (
        <Wrapper>
           R$<div className='balance'>{displayBalance.toFixed(2)}</div>
        </Wrapper>
    )
}

export default Balance