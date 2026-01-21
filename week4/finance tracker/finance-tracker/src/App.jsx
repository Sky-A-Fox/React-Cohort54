import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Home from "./pages/Home/Home";
import Budget from "./pages/Budget/Budget";
import Calculator from "./pages/Calculator/Calculator";
import Analytics from "./pages/Analytics/Analytics";

function App() {
  return (
    <FinanceProvider>
      <Router>
        <Header />
        <Navigation />
        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </Router>
    </FinanceProvider>
  );
}

export default App;
