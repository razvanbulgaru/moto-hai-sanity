import React from 'react';

import { client } from '../lib/client';
import { Product, HeroBanner, Tabs } from '../components';

const Home = ({ products, bannerData }) => (
	<>
		<HeroBanner heroBanner={bannerData.length && bannerData[0]} />

		<div className="products-heading">
			<h2>Categorii de produse</h2>
			<p>Gama variata de echipamente moto</p>
		</div>
		<Tabs>
			<div lable="Casti">
				{products?.map((product) => {
					if (product.category === 'casti')
						return <Product key={product._id} product={product} />;
				})}
			</div>
			<div lable="Barbati">
				{products?.map((product) => {
					if (product.category === 'barbati')
						return <Product key={product._id} product={product} />;
				})}
			</div>
			<div lable="Femei">
				{products?.map((product) => {
					if (product.category === 'femei')
						return <Product key={product._id} product={product} />;
				})}
			</div>
			<div lable="Accesorii">
				{products?.map((product) => {
					if (product.category === 'accesorii')
						return <Product key={product._id} product={product} />;
				})}
			</div>
		</Tabs>
	</>
);

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: { products, bannerData },
	};
};

export default Home;
