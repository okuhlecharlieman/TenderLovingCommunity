import logo from './logo.svg';
import './App.css';
import AppRouter from "./Components/AppRouter";
import getCountApprovals from "../src/ethers";

function App() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your actual contract address
  const isCount = getCountApprovals(contractAddress);
  console.log("numbers ", isCount);
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
