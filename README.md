# react-items-slider

> slider for anything, whether it be like mediums navigation, a single image carousel, or a multiple item product slider... whatever you want. 

[![NPM](https://img.shields.io/npm/v/react-items-slider.svg)](https://www.npmjs.com/package/react-items-slider) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install
npm
```bash
npm install --save react-items-slider
```
yarn 
```bash
yarn add react-items-slider
```

## Usage

```jsx
import React from 'react'
import { Link } from 'react-router'
import ReactItemSlider from 'react-items-slider'
import ProductCard from './ProductCard' // product card component, could be anything.

const Example = () => (
  <div>
    <ReactItemSlider productsInView="max" arrowSize="small">
      <Link to="/home">home</Link>
      <Link to="/about">about</Link>
      <Link to="/contact">contact</Link>
      <Link to="/blog">blog</Link>
      <Link to="/shop">shop</Link>
      <Link to="/faq">faq</Link>
      <Link to="/deals">deals</Link>
    </ReactItemSlider>

    <ReactItemSlider productsInView={1} arrowSize="medium">
      <img alt="car" src="/img/car.jpg" />
      <img alt="monkey" src="/img/monkey.jpg" />
      <img alt="taco" src="/img/taco.jpg" />
      <img alt="pogo stick" src="/img/pogo-stick.jpg" />
    </ReactItemSlider>

    <ReactItemSlider productsInView={2} arrowSize="large">
      <ProductCard 
        title="car"
        price="12"
        image="/img/car.jpg"
      />
      <ProductCard 
        title="monkey"
        price="100"
        image="/img/monkey.jpg"
      />
      <ProductCard 
        title="taco"
        price="19"
        image="/img/taco.jpg"
      />
      <ProductCard 
        title="pogo stick"
        price="15"
        image="/img/pogostick.jpg"
      />
    </ReactItemSlider>
  </div>
) 

export default Example
```

## License

MIT © [fraserisland](https://github.com/fraserisland)
# react-items-slider
