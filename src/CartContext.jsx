import React from "react"
import axios from "axios"
import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children, isLoggedIn }) => {
	const [cartItems, setCartItems] = useState([])

	const addToCart = (product) => {
		if (isLoggedIn === false) {
			alert("Please log in to add items to the cart")
			return
		}

		try {
			axios.post(
				"https://springboot-e-commerce-project-sab4.onrender.com/cart/add",
				{
					isbn: product.isbn,
					quantity: 1
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				}
			)
		} catch (error) {
			alert("Error adding to cart")
			console.error("Error adding to cart:", error)
		}

		if (cartItems.some((item) => item.isbn === product.isbn)) {
			setCartItems(cartItems.map((item) => (item.isbn === product.isbn ? { ...item, quantity: item.quantity + 1 } : item)))
			return
		}

		setCartItems([...cartItems, { ...product, quantity: 1 }])
	}

	const removeFromCart = (productId) => {
		try {
			axios.post(
				"https://springboot-e-commerce-project-sab4.onrender.com/cart/remove",
				{
					isbn: productId
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`
					}
				}
			)
		} catch (error) {
			alert("Error removing from cart")
			console.error("Error removing from cart:", error)
		}

		setCartItems(
			cartItems.map((item) => (item.isbn === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0)
		)
	}

	return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>{children}</CartContext.Provider>
}
