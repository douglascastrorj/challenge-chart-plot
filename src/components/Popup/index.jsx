import React from 'react';
import './popup.css'

const Popup = (props) => {

    return (
        <div className='popup'>
            <div className='popup_inner'>
                <button className='close-btn' onClick={props.closePopup}> X </button>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
            </div>
        </div>
    );

}

export default Popup;