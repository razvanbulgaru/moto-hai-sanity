/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
	return (
		<div className="hero-banner-container">
			<div className="details-container">
				<div>
					<p className="beats-solo">{heroBanner.smallText}</p>
				</div>
				<h3>{heroBanner.midText}</h3>
				<h1>{heroBanner.largeText1}</h1>
				<div className="desc">
					<h5>Descriere</h5>
					<p>{heroBanner.desc}</p>
				</div>
				<div>
					<Link href={`/product/${heroBanner.product}`}>
						<button type="button">{heroBanner.buttonText}</button>
					</Link>
				</div>
			</div>
			<img
				src={urlFor(heroBanner.image).url()}
				alt="casca"
				className="hero-banner-image"
			/>
		</div>
	);
};

export default HeroBanner;
