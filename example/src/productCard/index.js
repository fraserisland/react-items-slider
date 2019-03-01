import React from 'react';
import './styles.css';

const ProductCard = ({title, image, price}) => {
  return (
    <div className="container">
      <h1>{title}</h1>
      <img className="img" src={image}/>
      <p>{price}</p>
    </div>
  );
}
 
export default ProductCard;