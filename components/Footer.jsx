/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Link from 'next/link';
import { AiFillInstagram, AiFillFacebook, AiFillMail } from 'react-icons/ai';
import { RiWhatsappFill } from 'react-icons/ri';

const Footer = () => {
	return (
		<div className="footer-container">
			<p>
				Copyright © 2023 Motohai, CUI: 32143124312, Reg. Com.
				J432/2342/20324202
			</p>
			<Link href="/legals">
				<h5>Termeni si conditii</h5>
			</Link>
			<p>Contact</p>
			<p className="icons">
				<Link href="mailto:office@motohai.com">
					<AiFillMail />
				</Link>
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
