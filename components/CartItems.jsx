/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import {
	AiFillMinusCircle,
	AiFillPlusCircle,
	AiOutlineShopping,
} from 'react-icons/ai';
import { toast } from 'react-hot-toast';

import { TiDeleteOutline } from 'react-icons/ti';

const CartItems = ({ styling }) => {
	const { cartItems, toggleCartItemQuantity, onRemove, setShowCart } =
		useStateContext();
	return (
		<div className={styling}>
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
					cartItems.map((item, index) => (
						<div className="product" key={index}>
							<img
								src={urlFor(item?.image[0]).url()}
								className="cart-product-image"
							/>
							<div className="item-desc">
								<div className="flex top">
									<h5>{item?.name}</h5>
									<h4>{item?.price} RON</h4>
									<p>Marime: {item?.size}</p>
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
															item.size,
															false
														);
													else onRemove(item);
												}}
											>
												<AiFillMinusCircle />
											</span>
											<span className="num">
												{item?.quantity}
											</span>
											<span
												className="plus"
												onClick={() =>
													toggleCartItemQuantity(
														item._id,
														item.size,
														true
													)
												}
											>
												<AiFillPlusCircle />
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
		</div>
	);
};

export default CartItems;
