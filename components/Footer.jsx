/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';

const Footer = () => {
	return (
		<div className="footer-container">
			<p>2022 MotoHai echipamente moto All rights reserved</p>
			<p className="icons">
				<Link href="https://www.facebook.com/profile.php?id=100089325766237">
					<AiFillFacebook />
				</Link>
				<Link href="https://www.instagram.com/motohai.ro/">
					<AiFillInstagram />
				</Link>
				<Link href="https://wa.me/+40742362752">
					<RiWhatsappFill />
				</Link>
			</p>
		</div>
	);
};

export default Footer;
