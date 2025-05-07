import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./CartContext"
import Navbar from "./components/Navbar"
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
	const [books, setBooks] = useState([])
	const [categories, setCategories] = useState([])

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

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get("https://springboot-e-commerce-project.onrender.com/book/get-all-book")
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
				<Navbar isLoggedIn={isLoggedIn} username={username} />
				<Routes>
					<Route path="/" element={<ProductListing books={books} categories={categories} />} />
					<Route path="/products/:id" element={<ProductDetail books={books} />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
					<Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />}></Route>
				</Routes>
			</Router>
		</CartProvider>
	)
}

export default App
