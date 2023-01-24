/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Product } from '../../components';
import { client, urlFor } from '../../lib/client';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
	const {
		image,
		name,
		details,
		price,
		product_code,
		sizes,
		made_of,
		stocks,
	} = product;
	const [index, setIndex] = useState(0);
	const [sizeIndex, setSizeIndex] = useState(0);
	const { decQty, incQty, qty, onAdd, setQty, setShowCart } =
		useStateContext();

	useEffect(() => {
		setQty(1);
	}, [product, setQty]);

	const handleBuyNow = () => {
		onAdd(product, qty, sizes[sizeIndex]);

		setShowCart(true);
	};

	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img
							src={urlFor(image && image[index]).url()}
							className="product-detail-image"
						/>
					</div>
					<div className="small-images-container">
						{image?.map((item, i) => (
							<img
								key={i}
								src={urlFor(item).url()}
								className={
									i === index
										? 'small-image selected-image'
										: 'small-image'
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
				<div className="product-detail-desc">
					<h1>{name}</h1>
					<h4>Cod produs: {product_code}</h4>
					<h4>Detalii produs:</h4>
					<p>{details}</p>
					<h4>Material: {made_of}</h4>
					<h4>Marimi:</h4>
					<div className="product-sizes-container">
						{sizes.map((size, i) => (
							<div
								key={i}
								className={
									i === sizeIndex
										? 'product-size selected-size'
										: 'product-size'
								}
								onClick={() => {
									setSizeIndex(i);
									setQty(1);
								}}
							>
								{size}
							</div>
						))}
					</div>
					<h5>
						In stoc:{' '}
						{stocks[sizeIndex] === 0
							? 'la furnizor'
							: stocks[sizeIndex] + ' bucati'}
					</h5>
					<p className="price">{price} RON</p>
					<div className="quantity">
						<h3>Cantitate:</h3>
						<p className="quantity-desc">
							<span className="minus" onClick={() => decQty()}>
								<AiFillMinusCircle />
							</span>
							<span className="num">{qty}</span>
							<span className="plus" onClick={() => incQty()}>
								<AiFillPlusCircle />
							</span>
						</p>
					</div>
					<div className="buttons">
						<button
							type="button"
							className="add-to-cart"
							onClick={() =>
								onAdd(product, qty, sizes[sizeIndex])
							}
						>
							Adauga in cos
						</button>
						<button
							type="button"
							className="buy-now"
							onClick={handleBuyNow}
						>
							Cumpara acum
						</button>
					</div>
				</div>
			</div>

			<div className="maylike-products-wrapper">
				<h2>S-ar putea sa iti placa</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productsQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productsQuery);
	return {
		props: { products, product },
	};
};

export default ProductDetails;
