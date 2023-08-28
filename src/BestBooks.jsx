import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

 componentDidMount() {
    this.getBooks();
  }

  getBooks = async () => {
    try {
      const response = await fetch('https://can-of-books-backend-0qwx.onrender.com/books'); //add backend url
      if (response.ok) {
        const data = await response.json();
        // console.log('extracting: ', data[0].title); //this
        this.setState({ books: data, isLoading: false });
      } else {
        console.error('Failed to fetch books');
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      this.setState({ isLoading: false });
    }
  }



  render() {
   return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Link to="/">Home</Link>
        <Link to="/about">About</Link>


        <ol>
        {this.state.books.map((book, index) => (
          <>
            <li key={index}>{book.title}</li>
            <ul>
              <li>{book.description}</li>
              <li>{book.status}</li>
            </ul>
          </>
        ))}
        </ol>

      </>
    )
  }
}

export default BestBooks;
