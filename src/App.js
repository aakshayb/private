import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import "./App.css";
import Line from "./components/Line";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Stock Awards over the years</h1>
        {/* other graphs */}
        <div className="section">
          <Line />          
        </div>        
      </div>
    </div>
  );
}

export default App;