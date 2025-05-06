import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./CartContext"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import ProductListing from "./pages/ProductListing"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { useState, useEffect } from "react"
import axios from "axios"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [username, setUsername] = useState("")

	useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await axios.get("https://springboot-e-commerce-project.onrender.com/auth/check", {
					withCredentials: true
				})
				setIsLoggedIn(true)
				setUsername(res.data.username)
			} catch (err) {
				setIsLoggedIn(false)
			}
		}
		checkLogin()
	}, [])

	return (
		<CartProvider>
			<Router>
				<Navbar isLoggedIn={isLoggedIn} username={username} />
				<Routes>
					{/*<Route path="/" element={<Homepage />} />*/}
					<Route path="/" element={<ProductListing />} />
					<Route path="/products/:id" element={<ProductDetail />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
					<Route path="/profile" element={<Profile />}></Route>
				</Routes>
			</Router>
		</CartProvider>
	)
}

export default App
