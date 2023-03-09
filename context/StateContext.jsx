import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext([]);

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);
	const [cookieAccepted, setCookieAccepted] = useState(false);
	const showCookiePop = useRef(true);

	let foundProduct;
	let index;

	useEffect(() => {
		const l_totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
		if (l_totalPrice) {
			setTotalPrice(l_totalPrice);
		}
		const l_totalQuantities = JSON.parse(
			localStorage.getItem('totalQuantities')
		);
		if (l_totalQuantities) {
			setTotalQuantities(l_totalQuantities);
		}
		const l_cartItems = JSON.parse(localStorage.getItem('cartItems'));
		if (l_totalPrice) {
			setCartItems(l_cartItems);
		}
		const l_cookieAccepted = JSON.parse(
			localStorage.getItem('cookieAccepted')
		);
		if (l_cookieAccepted) {
			setCookieAccepted(l_cookieAccepted);
			showCookiePop.current = false;
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
		localStorage.setItem(
			'totalQuantities',
			JSON.stringify(totalQuantities)
		);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		localStorage.setItem('cookieAccepted', JSON.stringify(cookieAccepted));
		if (showCookiePop.current) {
			showCookiePop.current = false;
			toast(
				(t) => (
					<div className="pop-up">
						<span>
							Acest website foloseste cookies, continuarea
							navigarii implica acceptarea lor.
						</span>
						<button
							className="cookie"
							onClick={() => {
								toast.dismiss(t.id);
								setCookieAccepted(true);
							}}
						>
							Accept
						</button>
					</div>
				),
				{
					duration: Infinity,
				}
			);
		}
	}, [totalPrice, totalQuantities, cartItems, cookieAccepted]);

	const useClickOutside = (ref, callback) => {
		const handleOutsideClick = (e) => {
			if (!ref.current.contains(e.target)) {
				callback();
			}
		};
		useEffect(() => {
			document.addEventListener('mousedown', handleOutsideClick);
			return () => {
				document.removeEventListener('mousedown', handleOutsideClick);
			};
		});
	};

	const onAdd = (product, quantity, size) => {
		foundProduct = cartItems.find(
			(item) => item?._id === product._id && item?.size === size
		);
		index = cartItems.findIndex(
			(item) => item?._id === product._id && item?.size === size
		);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities + quantity
		);

		if (foundProduct) {
			const newCartItems = cartItems.filter(
				(item) => item._id !== product._id || item.size !== size
			);
			let updatedProduct = {
				...foundProduct,
				quantity: foundProduct.quantity + quantity,
			};
			newCartItems.splice(index, 0, updatedProduct);
			setCartItems(newCartItems);
		} else {
			product.quantity = quantity;
			product.size = size;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} a fost adaugat in cos.`);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find(
			(item) => item._id === product._id && item.size === product.size
		);
		const newCartItems = cartItems.filter(
			(item) => item._id !== product._id || item.size !== product.size
		);
		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
		setCartItems(newCartItems);
	};

	const toggleCartItemQuantity = (id, size, increment) => {
		foundProduct = cartItems.find(
			(item) => item._id === id && item.size === size
		);
		index = cartItems.findIndex(
			(product) => product._id === id && product.size === size
		);
		const newCartItems = cartItems.filter(
			(item) => item._id !== id || item.size !== size
		);
		console.log(foundProduct);

		let updatedProduct = {
			...foundProduct,
			quantity: increment
				? foundProduct.quantity + 1
				: foundProduct.quantity - 1,
		};
		newCartItems.splice(index, 0, updatedProduct);
		setCartItems(newCartItems);
		setTotalPrice((prevTotalPrice) =>
			increment
				? prevTotalPrice + foundProduct.price
				: prevTotalPrice - foundProduct.price
		);
		setTotalQuantities((prevTotalQuantities) =>
			increment ? prevTotalQuantities + 1 : prevTotalQuantities - 1
		);
	};

	const incQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decQty = () => {
		setQty((prevQty) => {
			if (prevQty == 1) return prevQty;
			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				setShowCart,
				setCartItems,
				setTotalPrice,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				incQty,
				decQty,
				onAdd,
				toggleCartItemQuantity,
				onRemove,
				setQty,
				setTotalQuantities,
				useClickOutside,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
