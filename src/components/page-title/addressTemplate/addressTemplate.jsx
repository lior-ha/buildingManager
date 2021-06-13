const AddressTemplate = ({address, apt}) => (
    <>
        {address.street}&nbsp;
        {address.number},&nbsp;
        {address.entrance && `כניסה ${address.entrance}, `}
        {address.city}&nbsp;
        {apt && <span>- דירה {apt}</span>}
    </>
)

export default AddressTemplate;