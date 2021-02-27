import './page-title.styles.scss';

const PageTitle = ({address}) => (
    <div className="pageTitle">וועד בית - 
        {address.street}&nbsp;
        {address.number},&nbsp;
        {address.entrance && `כניסה ${address.entrance}, `}
        {address.city}
    </div>
);

export default PageTitle;