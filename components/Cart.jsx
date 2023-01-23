/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef } from 'react';
import Link from 'next/link';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
	const cartRef = useRef();
	const {
		totalPrice,
		totalQuantities,
		cartItems,
		setShowCart,
		toggleCartItemQuantity,
		onRemove,
		useClickOutside,
	} = useStateContext();

	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch('/api/stripe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cartItems),
		});

		if (response.status === 500) return;

		const data = await response.json();

		toast.loading('Redirecting...');

		stripe.redirectToCheckout({ sessionId: data.id });
	};
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
				{cartItems.length < 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3> Cosul tau de cumparaturi e gol</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continua cumparaturile
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map((item) => (
							<div className="product" key={item._id}>
								<img
									src={urlFor(item?.image[0]).url()}
									className="cart-product-image"
								/>
								<div className="item-desc">
									<div className="flex top">
										<h5>{item?.name}</h5>
										<h4>{item?.price} RON</h4>
									</div>
									<div className="flex bottom">
										<div>
											<p className="quantity-desc">
												<span
													className="minus"
													onClick={() => {
														if (item.quantity > 1)
															toggleCartItemQuantity(
																item._id,
																false
															);
														else onRemove(item);
													}}
												>
													<AiOutlineMinus />
												</span>
												<span className="num">
													{item?.quantity}
												</span>
												<span
													className="plus"
													onClick={() =>
														toggleCartItemQuantity(
															item._id,
															true
														)
													}
												>
													<AiOutlinePlus />
												</span>
											</p>
										</div>
										<button
											type="button"
											className="remove-item"
											onClick={() => {
												onRemove(item);
												toast.success(
													`${item.quantity} ${item.name} a fost sters din cos.`
												);
											}}
										>
											<TiDeleteOutline />
										</button>
									</div>
								</div>
							</div>
						))}
				</div>
				{cartItems.length >= 1 && (
					<div className="cart-bottom">
						<div className="total">
							<h3>Subtotal:</h3>
							<h3>{totalPrice} RON</h3>
						</div>
						<div className="btn-container">
							<button
								type="button"
								className="btn"
								onClick={handleCheckout}
							>
								Catre plata
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
