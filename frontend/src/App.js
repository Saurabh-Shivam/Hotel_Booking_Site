import { BrowserRouter, Routes, Route } from "react-router-dom";
import AirportTaxis from "./pages/airportTaxis/AirportTaxis";
import Attractions from "./pages/attactions/Attractions";
import CarRentals from "./pages/carRentals/CarRentals";
import Flights from "./pages/flights/Flights";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/carRentals" element={<CarRentals />} />
        <Route path="/airportTaxis" element={<AirportTaxis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
