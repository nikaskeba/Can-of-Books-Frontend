import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
{this.state.books.map((book, index) => (
  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
    <h5>{book.title}</h5>
    <p>{book.description}</p>
    {/* Additional book details here */}
  </div>
))}
<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="sr-only">Previous</span>
</a>
<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="sr-only">Next</span>
</a>
            </div>
          </div>
        ) : (
          <h3>No Books Found :(</h3>
        )}
                  <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </>
    )
  }
}

export default BestBooks;
