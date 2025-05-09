import React from "react"
import logo from "/logo.jpg"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../CartContext"

const Navbar = ({ isLoggedIn, role }) => {
	const { cartItems } = useContext(CartContext)

	return (
		<nav className="navbar navbar-expand-xl navbar-light bg-light shadow-sm">
			<div className="container">
				<Link to="/" className="navbar-brand d-flex align-items-center">
					<img src={logo} alt="Logo" width={50} height={50} className="me-2 rounded-circle" />
					<span className="fw-bold">Book Shop</span>
				</Link>

				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						{isLoggedIn ? (
							<li className="nav-item">
								<Link to="/orders" className="nav-link">
									Orders
								</Link>
							</li>
						) : null}
						{role === "ROLE_ADMIN" && (
							<li className="nav-item">
								<Link to="/admin" className="nav-link">
									Admin Panel
								</Link>
							</li>
						)}
						{isLoggedIn ? (
							<li className="nav-item">
								<Link to="/profile" className="nav-link">
									Profile
								</Link>
							</li>
						) : (
							<li className="nav-item">
								<Link to="/login" className="nav-link">
									Login/Register
								</Link>
							</li>
						)}
						<li className="nav-item">
							<Link to="/cart" className="nav-link">
								Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
