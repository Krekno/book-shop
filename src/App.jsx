import React from "react"
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./CartContext"
import Navbar from "./components/Navbar"
import ProductListing from "./pages/ProductListing"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import AdminPanel from "./pages/AdminPanel"
import { useState, useEffect } from "react"
import axios from "axios"

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [role, setRole] = useState("")
	const [books, setBooks] = useState([])
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get("https://springboot-e-commerce-project-sab4.onrender.com/book/get-all-book")
				const data = response.data
				setBooks(data)

				const uniqueCategories = [...new Set(data.map((book) => book.category))]
				setCategories(uniqueCategories)
			} catch (error) {
				console.error("Error fetching books:", error)
			}
		}

		fetchBooks()
	}, [])

	return (
		<CartProvider>
			<Router>
				<Navbar isLoggedIn={isLoggedIn} role={role} />
				<Routes>
					<Route path="/" element={<ProductListing books={books} categories={categories} />} />
					<Route path="/products/:id" element={<ProductDetail books={books} />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
					<Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />}></Route>
					<Route path="/admin" element={<AdminPanel />} />
				</Routes>
			</Router>
		</CartProvider>
	)
}

export default App
