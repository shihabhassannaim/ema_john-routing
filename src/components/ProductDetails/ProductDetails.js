import React from 'react';
import data from './products.json';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const ProductDetails = () => {
    const details = data ;
    console.log(details);
    const {productKey} = useParams();
    return (
        <div>
            <h1>{productKey} details coming soon</h1>
        </div>
    );
};

export default ProductDetails;