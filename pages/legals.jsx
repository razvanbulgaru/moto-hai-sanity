import React from 'react';
import { client } from '../lib/client';
import { useState } from 'react';

const Legals = ({ legals }) => {
	const [activeTab, setActiveTab] = useState(legals[0].title);
	return (
		<div className="legals-container">
			<ul className="legals-header">
				{legals?.map((tab) => {
					const lable = tab.title;
					return (
						<li
							key={lable}
							className={
								activeTab === lable
									? 'a-legal-tab'
									: 'legal-tab'
							}
							onClick={() => setActiveTab(lable)}
						>
							{lable}
						</li>
					);
				})}
			</ul>
			{legals.map((content) => {
				const lable = content.title;
				if (lable === activeTab)
					return (
						<div
							key={lable}
							className="legal-content products-container"
						>
							{content.text}
						</div>
					);
			})}
		</div>
	);
};

export const getServerSideProps = async () => {
	const query = '*[_type == "legals"]';
	const legals = await client.fetch(query);

	return {
		props: { legals },
	};
};

export default Legals;
