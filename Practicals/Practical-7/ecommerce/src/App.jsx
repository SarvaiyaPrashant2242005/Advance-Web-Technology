import React from 'react';
import Carousel from './components/Corousel/Carousel';
import Accordion from './components/Accordion/Accordion';
import ProductList from './components/ProductList/ProductList';

const App = () => {
  // Sample data for Carousel
  const carouselImages = [
    'https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-background-template_120329-5119.jpg',
    'https://img.freepik.com/free-vector/dark-style-realistic-smart-watch-horizontal-banner-with-advertising-site-vector-illustration_1284-30193.jpg',
    'https://i.pinimg.com/736x/b2/2d/29/b22d296ca37c3400fe8838d135ae2c3d.jpg',
    'https://www.shutterstock.com/image-vector/sport-shoes-banner-website-button-260nw-2167767027.jpg'
  ];

  // Sample data for Accordion
  const faqItems = [
    {
      question: 'How do I place an order?',
      answer: 'You can place an order by selecting products and clicking the checkout button.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, PayPal, and bank transfers.'
    },
    {
      question: 'What is your return policy?',
      answer: 'You can return items within 30 days of purchase with original receipt.'
    }
  ];

  // Sample data for ProductList
  const products = [
    { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 99.99, image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Smart Watch', category: 'electronics', price: 199.99, image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Cotton T-Shirt', category: 'clothing', price: 24.99, image: 'https://via.placeholder.com/300' },
    { id: 4, name: 'Running Shoes', category: 'footwear', price: 89.99, image: 'https://via.placeholder.com/300' },
    { id: 5, name: 'Coffee Mug', category: 'home', price: 12.99, image: 'https://via.placeholder.com/300' },
    { id: 6, name: 'Bluetooth Speaker', category: 'electronics', price: 59.99, image: 'https://via.placeholder.com/300' },
  ];

  return (
    <div className="app">
      <h1>Image Carousel</h1>
      <Carousel images={carouselImages} />
      

      
      <h1>Product List with Filters</h1>
      <ProductList products={products} />

      <h1>FAQ Accordion</h1>
      <Accordion items={faqItems} />
    </div>
  );
};

export default App;