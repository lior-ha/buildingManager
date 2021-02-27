import './aside-wrapper.styles.scss';


const AsideWrapper = ({title, extraClasses, children}) => (
    <aside className={`contentBox asideBox ${extraClasses}`}>
        <div className="top">
            <p className="title">{title}</p>
            {/* {extraClasses==='lastAction' ? <i className="closeTab">X</i> : null} */}
        </div>
        {children}
    </aside>
)

export default AsideWrapper;