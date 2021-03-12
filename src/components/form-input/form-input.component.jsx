import { Fragment, useState } from 'react';

import './form-input.styles.scss';

export const FormInputSingle = ({handleChange, rtl, label, ...otherProps}) => (
    <div className="inputSet">
        <input className={`form-input ${rtl && 'rtl' }`} onChange={handleChange} {...otherProps} />
        {
            label ?
            (<label className={`${otherProps.value ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)
            :
            null
        }
        
    </div> 
);

export const FormInputIntoList = ({
        type,
        label,
        name,
        value,
        listToShow,
        listDir,
        rtl,
        updateList,
        handleChange
    }) => {
        
    const [list, setList] = useState([...listToShow]);
    const [inputValue, setInputValue] = useState('');

    const addToList = (value) => {
        if (value !== '') {
            const newArr = [...list];
            if (value) newArr.push(inputValue);

            setList(newArr);
            setInputValue('');
            handleChange(name, '');
            
            updateList(name, newArr)
        }
    }

    const handleInputChange = e => {
        const value = e.target.value;
        if (e.keyCode !== 13) {            
            handleChange(name, value);
            setInputValue(value);
        } else {
            e.preventDefault();
            addToList(value);
        }
    }
    
    const removeFromList = (item) => {
        const newArr = listToShow.filter(listItem => listItem !== item);

        setList(newArr);        
        updateList(name, newArr)
    }
    return (
        <Fragment>
            <div className="inputSet">
                <input 
                    name={name} 
                    type={type}
                    value={value}
                    className={`form-input ${rtl && 'rtl' }`}
                    onChange={handleInputChange}
                    onKeyDown={handleInputChange}
                    onBlur={() => addToList(value)}
                />
                {label && <label className={`${value ? 'shrink' : ''} form-input-label`}>{label}</label>}
                
            </div>
            {/* <i onClick={addToList} name={name} className="addToList">הוסף</i> */}
            <div className={`${listDir} formList`}>
                {listToShow && listToShow.map(item => <p onClick={() => removeFromList(item)} key={item} className="formListItem">{item}</p>)}
            </div>
        </Fragment>
    )
};


export const FormTextArea = ({handleChange, rtl, label, ...otherProps}) => (
    <div className="inputSet">
        <textarea className={`form-input form-input-textarea ${rtl && 'rtl' }`} onChange={handleChange} {...otherProps} />
        {
            label ?
            (<label className={`${otherProps.value ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)
            :
            null
        }
        
    </div> 
);

const sortByApt = (a, b) => {
    return a.apartment - b.apartment;
}

export const FormSelect = ({handleChange, rtl, label, apartmentsData, ...otherProps}) => (
    <div className="inputSet">
        <select className={`form-input form-input-select ${rtl && 'rtl' }`} onChange={handleChange} {...otherProps}>
            {/* name="incomeSource" 
            
            value={paymentDetails.incomeSource}
            onChange={handleSelectEvent} */}
            <option>{label}</option>
            
            {apartmentsData
                .sort(sortByApt)
                .map(apartment => (
                <option key={apartment.apartment} value={`דירה ${apartment.apartment}`}>{`דירה ${apartment.apartment}`}</option>
            ))}   

            <option value="other">אחר</option>
        </select>
    </div>
)