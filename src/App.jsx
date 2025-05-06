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

function App() {
	return (
		<CartProvider>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/products" element={<ProductListing />} />
					<Route path="/products/:id" element={<ProductDetail />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Router>
		</CartProvider>
	)
}

export default App
