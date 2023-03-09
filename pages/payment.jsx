/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { CartItems } from '../components';

const Payment = () => {
	return (
		<div className="payment-container">
			<CartItems styling="payment-cart-container" />
			<div>
				<form
					action="/send-data-here"
					method="post"
					className="form-container"
				>
					<input
						type="text"
						id="first"
						name="first"
						placeholder="Prenume"
						enterkeyhint="next"
					/>
					<input
						type="text"
						id="last"
						name="last"
						placeholder="Nume"
					/>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="E-mail"
					/>
					<input
						type="tel"
						id="phone"
						name="phone"
						placeholder="Numar de telefon"
					/>
					<input
						type="text"
						id="adress"
						name="adress"
						placeholder="Adresa"
					/>
					<input
						type="text"
						id="oras"
						name="oras"
						placeholder="Oras"
					/>
					<input
						type="text"
						id="judet"
						name="judet"
						placeholder="Judet"
					/>
					<button type="submit" className="submit-form">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Payment;
