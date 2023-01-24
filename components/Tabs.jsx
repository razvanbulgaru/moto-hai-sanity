import { useState } from 'react';

const Tabs = ({ children }) => {
	const [activeTab, setActiveTab] = useState(children[0].props.lable);

	return (
		<div>
			<ul className="tabs-header">
				{children.map((tab) => {
					const lable = tab.props.lable;
					return (
						<li
							key={lable}
							className={
								activeTab === lable ? 'current-tab' : 'tab'
							}
							onClick={() => setActiveTab(lable)}
						>
							{lable}
						</li>
					);
				})}
			</ul>
			{children.map((content) => {
				const lable = content.props.lable;
				if (lable === activeTab)
					return (
						<div
							key={lable}
							className="tab-content products-container"
						>
							{content.props.children}
						</div>
					);
			})}
		</div>
	);
};

export default Tabs;
