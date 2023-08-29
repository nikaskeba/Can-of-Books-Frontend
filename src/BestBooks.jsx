import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './carousel.css';

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
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

    
  <div id="bookCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {this.state.books.map((book, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <ol class="list-group">
                <li><p class="h4">{book.title}</p>
                  <ul>
                    <li class="list-group-item">{book.description}</li>
                    <li class="list-group-item">{book.status}</li>
                  </ul>
                </li>
              </ol>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#bookCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bookCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
  

      </>
    )
  }
}

export default BestBooks;
