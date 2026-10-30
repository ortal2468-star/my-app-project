import './App.css'
import "./Menu.css"
import Menu from "./Menu"
import Products from "./Products"
import Customers from "./Customers"
import Purchases from "./Purchases"
import { NavLink, Routes, Route } from "react-router-dom"

function App() {

  return (
    <div>

      <h1>app</h1>

      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/Products" element={<Products />} />
        <Route path="/Customers" element={<Customers />} />
        <Route path="/Purchases" element={<Purchases />} />
      </Routes>

      <NavLink to="/" className={({isActive})=> isActive ? "active" : ""}>Menu</NavLink>&nbsp;|&nbsp;
      <NavLink to="/Products" className={({isActive})=> isActive ? "active" : ""}>Products</NavLink>&nbsp;|&nbsp;
      <NavLink to="/Customers" className={({isActive})=> isActive ? "active" : ""}>Customers</NavLink>&nbsp;|&nbsp;
      <NavLink to="/Purchases" className={({isActive})=> isActive ? "active" : ""}>Purchases</NavLink>&nbsp;|&nbsp;
    </div>
  )
}

export default App
