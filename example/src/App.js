import React, { Component } from 'react'
import ReactItemSlider from 'react-items-slider'
import bananaCar from './banana-car.jpg'
import ProductCard from './productCard'

export default class App extends Component {

  render () {
    return (
      <div>
        <ReactItemSlider 
          productsInView="max" 
          arrowSize="small"
        >
          <p>home</p>
          <p>about</p>
          <p>contact</p>
          <p>blog</p>
          <p>shop</p>
          <p>faq</p>
          <p>eatyum</p>
        </ReactItemSlider>
        <ReactItemSlider 
          productsInView={2} 
          arrowSize="medium"
        >
          <ProductCard 
            title="car"
            price="12"
            image={bananaCar}
          />
          <ProductCard 
            title="monkey"
            price="100"
            image={bananaCar}
          />
          <ProductCard 
            title="taco"
            price="19"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
        </ReactItemSlider>
        <ReactItemSlider 
          productsInView={1} 
          arrowSize="large"
        >
          <ProductCard 
            title="car"
            price="12"
            image={bananaCar}
          />
          <ProductCard 
            title="monkey"
            price="100"
            image={bananaCar}
          />
          <ProductCard 
            title="taco"
            price="19"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
          <ProductCard 
            title="pogo stick"
            price="15"
            image={bananaCar}
          />
        </ReactItemSlider>
      </div>
    )
  }
}
