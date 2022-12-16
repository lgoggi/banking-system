import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContext } from "./AccountProvider";

type BalanceContextProps = {
  children: ReactNode;
}
type BalanceContextTypes = {
  balance: number | undefined;
  setBalance: React.Dispatch<React.SetStateAction<number | undefined>>
  trigger: number ;
  setTrigger: React.Dispatch<React.SetStateAction<number>>
}

export const BalanceContext  = createContext<BalanceContextTypes>({} as BalanceContextTypes);

export const BalanceProvider = ({ children }: BalanceContextProps) => {
  const [balance, setBalance] = useState<number>()
  const [trigger, setTrigger] = useState<number>(0)
  const {username, token, userId} = useContext(AuthContext)
  
  const getBalance = async (username: string, token: string, userId: string) => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/balance`,
      {
        headers: { "x-access-token": token, "username": username, "userid": userId, 'Content-Type': 'application/json', ' access-control-allow-credentials': true }
      })
      .then(
        (response) => {
          setBalance(response.data)
        })
  }
  
  if( username && token && userId!) getBalance(username!, token!, userId!)

  return (
    <BalanceContext.Provider value={{ balance, setBalance, trigger, setTrigger }}>
      {children}
    </BalanceContext.Provider>
  )
}