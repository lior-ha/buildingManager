import AddressTemplate from '../addressTemplate/addressTemplate';

const Dropdown = ({holdingsAddresses, setCurHolding}) => (
    <div className="dropDown">
        {!holdingsAddresses.addressesLoading && holdingsAddresses && holdingsAddresses.addressData.map(holding => (
            <div 
                onClick={() => 
                    setCurHolding({building: holding.building, apt: holding.apt})
                } 
                key={`${holding.building}-${holding.apt}`}>
                <AddressTemplate address={holding} apt={holding.aptNum} />
            </div>
        ))}
    </div>
)

export default Dropdown;