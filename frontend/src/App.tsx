import {AuthProvider} from "./providers/AccountProvider";
import { BalanceProvider } from "./providers/BalanceProvider";
import RoutesApp from "./routes";

function App() {
  return(
    <AuthProvider >
      <BalanceProvider>
        <RoutesApp />
      </BalanceProvider>
    </AuthProvider>
  )
}

export default App;
