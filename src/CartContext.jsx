import React from "react"
import { createContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([])

	const addToCart = (product) => {
		if (cartItems.some((item) => item.isbn === product.isbn)) {
			setCartItems(cartItems.map((item) => (item.isbn === product.isbn ? { ...item, quantity: item.quantity + 1 } : item)))
			return
		}
		setCartItems([...cartItems, { ...product, quantity: 1 }])
	}

	const removeFromCart = (productId) => {
		setCartItems(
			cartItems.map((item) => (item.isbn === productId ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0)
		)
	}

	return <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>{children}</CartContext.Provider>
}
