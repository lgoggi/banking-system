import styled from "styled-components"
import axios from "axios"
import { format, parseISO, compareDesc } from "date-fns"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../providers/AccountProvider"
import { BalanceContext } from "../../providers/BalanceProvider"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Wrapper = styled.div`
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
const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
  border-bottom: 1px solid black;
  flex-direction: row;
  height: 5rem;
  justify-content: space-evenly;
  width: 20rem;
  @media screen and (max-width: 1000px){
      width: 60vw;
    }
`
const Title = styled.div`
  align-items: center;
  color: black;
  display: flex;
  font-size: 2rem;
  margin-right: auto;
`
const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 4rem;
  width: 9rem;
  .DatePicker{
    border: 1px solid grey;
    border-radius: 5px;
    text-align: center;
    width: 5rem;
  }
  label{
    height: fit-content;
    margin-right: auto;
    width: 3rem;
  }
  .react-datepicker__input-container,
  .react-datepicker-wrapper{
    width: fit-content;
  }
`
const HistoryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 25rem;
  overflow: auto;
  ::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 25px;
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
`
const Card = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  margin: 10px 15px 0 0;
  height: 4rem;
  width: 21rem;
`
const Nome = styled.div`
  color: black;
  font-size: 1.5rem;
  font-weight: 600;
  height: fit-content;
  justify-self: flex-start;
  margin-left: 10px;
  width: fit-content;
  ${props => {
    if (props.className === 'pago') return (
      `
      font-style: italic;
      font-weight: 600;
      `
    )
  }}
`
const Data = styled.div`
  color: black;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: normal;
  height: fit-content;
  width: fit-content;
`
const Valor = styled.div`
  color: black;
  font-size: 1.5rem;
  font-style: italic;
  font-weight: bold;
  height: fit-content;
  margin: 0 0 0 auto;
  width: fit-content;
  ${props => {
    if (props.className === 'pago') return (`color: red;`)
    else return (`color: #1d1dfa`)
  }}
`

interface transaction {
  id: number,
  value: string,
  debitedAccountId: number,
  creditedAccountId: number,
  createdAt: string,
  'credited.User.id': number,
  'credited.User.username': string,
  'debited.User.id': number,
  'debited.User.username': string,
}

const History = () => {
  const [historico, setHistorico] = useState<transaction[]>()
  const [backupHistorico, setBackupHistorico] = useState<transaction[]>()
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const { username, token } = useContext(AuthContext)
  const { trigger } = useContext(BalanceContext)

  const getTransactions = async (username: string, token: string) => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getTransactions`,
      {
        headers: {
          "username": username,
          "x-access-token": token,
          'Content-Type': 'application/json'
        }
      }).then((response) => { 
        setHistorico(response.data) 
        setBackupHistorico(response.data)
      })
  }

  useEffect(() => {
    getTransactions(username!, token!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, token, trigger])

  //ordena o histórico de forma decrescente
  if (historico) {
    historico.sort((a, b) => {
      let dateA = parseISO(a.createdAt)
      let dateB = parseISO(b.createdAt)
      return compareDesc(dateA, dateB)
    })
  }

  const handleDates = ( startDate: Date, endDate: Date) => {
    let newList = backupHistorico

    if (!newList) return
    if (startDate && endDate){
      newList = newList.filter( item => parseISO(item.createdAt) >= startDate && parseISO(item.createdAt) <= endDate)
      console.log(newList)
      setHistorico(newList)
    } else if (startDate) {
      newList = newList.filter( item => parseISO(item.createdAt) >= startDate)
      setHistorico(newList)
    } else if (endDate) {
      newList = newList.filter( item => parseISO(item.createdAt) <= endDate)
      setHistorico(newList)
    } else {
      return 
    }
    
  }

  useEffect(() => {
    handleDates( startDate!, endDate!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historico, startDate, endDate])

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>HISTÓRICO</Title>
        <DateWrapper>
          <label>início:</label>
          <DatePicker placeholderText="data de início"
            className="DatePicker"
            dateFormat="dd/MM/yy"
            selected={startDate}
            maxDate={(endDate)? endDate : new Date()}
            onChange={date => setStartDate(date)} />
          <label>fim:</label>
          <DatePicker
            placeholderText="data de fim"
            className="DatePicker"
            dateFormat="dd/MM/yy"
            selected={endDate}
            minDate={startDate}
            onChange={date => setEndDate(date)} />
        </DateWrapper>
      </InnerWrapper>

      <HistoryBox>
        {historico?.map((hist) => {
          let operacao: string;
          if (username === hist["credited.User.username"]) { operacao = 'recebido' }
          else { operacao = 'pago' }
          return (
            <Card key={hist.id}>
              <Nome className={operacao}>{(username === hist["credited.User.username"]) ? `${hist["debited.User.username"]}` : `${hist["credited.User.username"]}`}</Nome>
              <Data>{
                format(parseISO(hist.createdAt), "dd MMM, HH:mm")
              }</Data>
              <Valor className={operacao}> {(operacao === 'pago') ? '-' : '+'}R${hist.value}</Valor>
            </Card>
          )
        }
        )}
      </HistoryBox>
    </Wrapper>
  )
}

export default History