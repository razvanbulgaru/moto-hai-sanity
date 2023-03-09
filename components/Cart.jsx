/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineLeft } from 'react-icons/ai';
import { useStateContext } from '../context/StateContext';
import CartItems from './CartItems';

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		useClickOutside,
	} = useStateContext();

	useClickOutside(cartRef, () => {
		setShowCart(false);
	});

	return (
		<div className="cart-wrapper">
			<div className="cart-container" ref={cartRef}>
				<button
					type="button"
					className="cart-heading"
					onClick={() => setShowCart(false)}
				>
					<AiOutlineLeft />
					<span className="heading">Cosul tau</span>
					<span className="cart-num-items">
						({totalQuantities} produse)
					</span>
				</button>

				<CartItems />
				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>{totalPrice} RON</h3>
						</div>
						<div className="btn-container">
							<Link href={`/payment`}>
								<button
									type="button"
									className="btn"
									onClick={() => setShowCart(false)}
								>
									Catre plata
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
