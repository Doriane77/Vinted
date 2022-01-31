import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containers/Home-page/Home";
import Offer from "./containers/Offer-page/Offer";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/offer" element={<Offer />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
