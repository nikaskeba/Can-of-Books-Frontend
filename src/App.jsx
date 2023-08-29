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
class BookFormModal extends React.Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal">
                <form onSubmit={this.props.handleSubmit}>
                    <h3>New Book</h3>
                    <input type="text" name="title" placeholder="Book Title" required />
                    <input type="text" name="description" placeholder="Book Description" required />
                    {/* ... other form fields ... */}
                    <button type="submit">Submit</button>
                </form>
                <button onClick={this.props.toggleForm}>Close</button>
            </div>
        );
    }
}
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
            const response = await axios.post('https://can-of-books-backend-0qwx.onrender.com/books/', bookData);
            if (response.data) {
                this.bestBooksRef.current.addNewBook(response.data);
            }
        } catch (error) {
            console.error("There was an error sending the POST request:", error);
        }
    }


render() {
    return (
        <Router>
            <Header />
            <button type="button" onClick={this.toggleForm}>Add Book</button>

            
            <BookFormModal 
                show={this.state.showForm} 
                toggleForm={this.toggleForm} 
                handleSubmit={this.handleSubmit}
            />

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