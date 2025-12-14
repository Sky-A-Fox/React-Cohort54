import Guarantee from "./components/Guarantee";
import img1 from "./assets/exercise2.png";
import "./App.css";

function App() {
  return (




    <div className="app">
      <h2 className="page-title">SORRY CUSTOMER DIDN'T PAY FOR EXTRA STYLES</h2>
      
      <h1>Our Guarantees</h1>
      <div className="guarantees-list">
        <Guarantee
          img={img1}
          title="Fast Delivery"
          description="We deliver your products quickly and safely."
        />
        <Guarantee
          img={img1}
          title="High Quality"
          description="Our products are made from the best materials."
        />
        <Guarantee
          img={img1}
          title="Customer Support"
          description="We are here for you 24/7 with friendly support."
        />
      </div>
    </div>
  );
}

export default App;
