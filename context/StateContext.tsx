import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import product from '../sanitymotohai/schemas/product';

const Context = createContext();

export const StateContext = ({ children }: any) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const onAdd = (product, quantity) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		index = cartItems.findIndex((item) => item._id === product._id);

		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities + quantity
		);

		if (foundProduct) {
			const newCartItems = cartItems.filter(
				(item) => item._id !== product._id
			);
			let updatedProduct = {
				...foundProduct,
				quantity: foundProduct.quantity + quantity,
			};
			newCartItems.splice(index, 0, updatedProduct);
			setCartItems(newCartItems);
		} else {
			product.quantity = quantity;

			setCartItems([...cartItems, { ...product }]);
		}

		toast.success(`${qty} ${product.name} a fost adaugat in cos.`);
	};

	const onRemove = (product) => {
		foundProduct = cartItems.find((item) => item._id === product._id);
		const newCartItems = cartItems.filter(
			(item) => item._id !== product._id
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

	const toggleCartItemQuantity = (id, increment) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((product) => product._id === id);
		const newCartItems = cartItems.filter((item) => item._id !== id);

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
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
