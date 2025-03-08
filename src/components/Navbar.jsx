import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../CartContext';

const Navbar = () => {
	const { cartItems } = useContext(CartContext);

	return (
		<nav className="navbar">
			<Link to="/" className="logo">MyStore</Link>
			<div className="nav-links">
				<Link to="/">Home</Link>
				<Link to="/products">Products</Link>
				<Link to="/cart">
					Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;