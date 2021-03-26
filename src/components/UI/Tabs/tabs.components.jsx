import './tabs.styles.scss';

const Tabs = ({tabs, activeTab, setActiveTab}) => {

    return (
        <div className="tabs">
            {
                tabs.map(tab => (
                    <div key={tab.type} className={`tab ${activeTab===tab.type && 'active'}`} onClick={() => setActiveTab(tab.type)}>{tab.text}</div>
                ))
            }
        </div>
    )
};

export default Tabs;
