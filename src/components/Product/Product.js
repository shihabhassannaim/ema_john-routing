import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = ({ product, handleAddToCart , showButton}) => {
  const { name, img, seller, price, ratings, id } = product;
  const showAddToCart = showButton;

  return (
    <div className='product'>
      <img src={img} alt="" />
      <div className='product-info'>
        <p className='product-name'><Link to={`product/${id}`}>{name}</Link></p>
        <p>Price: ${price}</p>
        <p><small>Seller: {seller}</small></p>
        <p><small>Ratings: {ratings} stars</small></p>
      </div>
      {showAddToCart && <button onClick={() => handleAddToCart(product)} className='btn-cart'>
        <p className='btn-text'>Add to Cart</p>
        <FontAwesomeIcon icon={faShoppingCart} />
      </button>}
    </div>
  );
};

export default Product