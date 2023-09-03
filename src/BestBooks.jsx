import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './carousel.css';
import Button from 'react-bootstrap/Button';



// ... inside the BestBooks component:



class EditBookModal extends React.Component {
    render() {
        if (!this.props.show || !this.props.book) {
            return null;
        }

        return (
            <div className="modal">
              <form onSubmit={(event) => this.props.handleEditSubmit(event, this.props.book._id)}>

                    <h3>Edit Book</h3>
                    <input type="text" name="title" id="title" placeholder="Book Title" defaultValue={this.props.book.title} required />
                    <input type="text" name="description" placeholder="Book Description" defaultValue={this.props.book.description} required />
                    <input type="text" name="status" placeholder="status" defaultValue={this.props.book.status} required />
                    <button type="submit">Update</button>
                </form>
                <button onClick={this.props.hideEditModal}>Close</button>
            </div>
        );
    }
}


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     books: [],
    selectedBook: null,
    showEditModal: false,
    bookToEdit: null  // To track which book is being edited
    }
  }
  showEditModal = (book) => {
    this.setState({ showEditModal: true, bookToEdit: book });
}

hideEditModal = () => {
    this.setState({ showEditModal: false, bookToEdit: null });
}

handleEditSubmit = async (event, bookId) => {
    event.preventDefault();

    const updatedBookData = {
        title: event.target.title.value,
        description: event.target.description.value,
        status: event.target.status.value
    };

  try {
        const response = await fetch(`https://can-of-books-backend-0qwx.onrender.com/books/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBookData)
        });
        if (response.ok) {
            const updatedBook = await response.json();
            this.setState(prevState => ({
                books: prevState.books.map(book => book._id === bookId ? updatedBook : book),
                showEditModal: false,
                bookToEdit: null
            }));
        } else {
            console.error('Failed to update the book:', await response.text());
        }
    } catch (error) {
        console.error("There was an error updating the book:", error);
    }
}

  addNewBook = (book) => {
    this.setState(prevState => ({
      books: [...prevState.books, book]
    }));
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
        console.error('Failed to fetch books', await response.text());
        this.setState({ isLoading: false });
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      this.setState({ isLoading: false });
    }
  }

  handleDelete = async (bookId) => {
    try {
        await fetch(`https://can-of-books-backend-0qwx.onrender.com/books/${bookId}`, {
            method: 'DELETE'
        });
        this.setState(prevState => ({
            books: prevState.books.filter(book => book._id !== bookId)
        }));
    } catch (error) {
        console.error('Failed to delete the book:', error);
    }
}

  render() {
   return (
      <>
    
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

  <div id="bookCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {this.state.books.map((book, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <ol className="list-group">
                <li>
                  <ul><p className="h4">{book.title}</p>
                    <li className="list-group-item">{book.description}</li>
                    <li className="list-group-item">{book.status}</li>
                               <Button  variant="secondary" onClick={() => this.handleDelete(book._id)}>Delete</Button>
<Button variant="secondary" onClick={() => this.showEditModal(book)}>Edit</Button>

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
  
<EditBookModal 
    show={this.state.showEditModal} 
    book={this.state.bookToEdit}
    hideEditModal={this.hideEditModal}
    handleEditSubmit={this.handleEditSubmit}
/>       
      </>
    )
  }
}

export default BestBooks;
