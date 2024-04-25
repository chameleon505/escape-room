import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "/node_modules/bootstrap/dist/js/bootstrap.min.js"
import './App.css'
import AddRoom from "./components/room/AddRoom"
import BookingSuccess from "./components/booking/BookingSuccess"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import RoomListing from "./components/room/RoomListing"
import RoomInfo from "./components/room/RoomInfo"
import Admin from "./components/admin/Admin"
import Checkout from "./components/booking/Checkout"
import Home from "./components/home/Home"
import EditRoom from "./components/room/EditRoom"
import Bookings from "./components/booking/Bookings"
import ExistingRooms from "./components/room/ExistingRooms"
import Info from "./components/common/Info"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {

  return(
    <main>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/existing-rooms" element={<ExistingRooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/browse-all-rooms" element={<RoomListing />} />
        <Route path="/book-room/:roomId" element={<Checkout />}/>
        <Route path="/info-room/:roomId" element={<RoomInfo />}/>
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/existing-bookings" element={<Bookings/>} />



      </Routes>
    </Router>
    <Footer />
    <Info />

  </main>
    )
  
}

export default App
