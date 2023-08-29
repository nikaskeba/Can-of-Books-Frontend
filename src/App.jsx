import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    showForm: false
  };
  this.bestBooksRef = React.createRef();
}

    toggleForm = () => {
    this.setState(prevState => ({ showForm: !prevState.showForm }));
  }

handleSubmit = async (event) => {
    event.preventDefault();

    const bookData = {
      title: event.target.title.value,
      description: event.target.description.value
    };

    try {
      const response = await fetch('https://can-of-books-backend-0qwx.onrender.com/books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookData)
      });
      
      if (response.ok) {
        const newBook = await response.json();
        this.bestBooksRef.current.addNewBook(newBook);
      } else {
        console.error('Failed to add book:', await response.text());
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
}


  render() {
    return (
      <Router>
        <Header />
        <button onClick={this.toggleForm}>Add Book</button>
            {this.state.showForm && (
        <form onSubmit={this.handleSubmit}>
          <h3>New Book</h3>
          <input type="text" name="title" placeholder="Book Title" />
          <input type="text" name="description" placeholder="Book Description" />
          {/* ... other form fields ... */}
          <button type="submit">Submit</button>
        </form>
      )}
      <Routes>
        <Route path="/" element={<BestBooks ref={this.bestBooksRef} />} />
        <Route path="/About" element={<About />} />
      </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;