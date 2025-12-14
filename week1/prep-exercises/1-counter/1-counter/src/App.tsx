import Counter from "./components/Counter";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Prep exercise Counter</h1>
      </header>
      <main className="main">
        <Counter />
      </main>
    </div>
  );
}

export default App;
