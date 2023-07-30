import React from 'react';
import data from './products.json';
import { useParams } from 'react-router-dom';
import Product from './../Product/Product';

const ProductDetails = () => {
  const { productKey } = useParams();
  const product = data.find(pd => pd.id === productKey);
  const showButton = false;
    return (
        <div>
            <Product showButton={showButton} product={product}></Product>
        </div>
    );
};

export default ProductDetails;