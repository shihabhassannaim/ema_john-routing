import React from 'react';

const ReviewItem = (props) => {
    const {name , quantity , id} = props.product;
    const reviewItem = {
        borderBottom : '1px solid gray',
        marginBottom : '5px',
        paddingBottom : '5px',
        marginLeft : '200px',
        backgroundColor : 'lightgray'
    }
    return (
        <div style={reviewItem} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity : {quantity}</p>
            <br />
            <button 
            onClick={()=>props.removeProduct(id)}
            > Remove</button>
        </div>
    );
};

export default ReviewItem;