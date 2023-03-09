/* eslint-disable @next/next/link-passhref */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } =
		useStateContext();

	useEffect(() => {
		localStorage.clear();
		setCartItems([]);
		setTotalPrice(0);
		setTotalQuantities(0);
		runFireworks();
	}, [setCartItems, setTotalPrice, setTotalQuantities]);

	return (
		<div className="success-wrapper">
			<div className="success">
				<p className="icon">
					<BsBagCheckFill />
				</p>
				<h2>Va multumim pentru comanda!</h2>
				<p className="email-msg">
					Pentru factura verificati e-mail-ul.
				</p>
				<p className="description">
					Daca aveti intrebari va rog sa ne contactati la
					<a className="email" href="mailto:office@motohai.com">
						office@motohai.com
					</a>
				</p>
				<Link href="/">
					<button type="button" width="300px" className="btn">
						Continua cumparaturile
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Success;
