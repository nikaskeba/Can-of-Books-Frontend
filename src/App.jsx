import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Import Axios
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;
const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const LearningShelf = ({ bestBooksRef }) => {
    const { isAuthenticated } = useAuth0();

      if (!isAuthenticated) return (
        <div className="welcome-message">
            <h2>Welcome</h2>
            <p>Please log in.</p>
        </div>
    );

  render() {
    const location = useLocation();
    const isBestBooksRoute = location.pathname === '/books';

    return (
        <Router>
            <Header />
            {isBestBooksRoute && <LearningShelf />}
            <Button variant="primary" type="button" onClick={this.toggleForm}>Add Book</Button>
            <BookFormModal 
                show={this.state.showForm} 
                toggleForm={this.toggleForm} 
                handleSubmit={this.handleSubmit}
            />
            <Routes>
                <Route path="/books" element={<BestBooks ref={this.bestBooksRef} />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </Router>
    );

};
class BookFormModal extends React.Component {
    render() {
            const { isAuthenticated } = this.props;

        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal">
                <form onSubmit={this.props.handleSubmit}>
                    <h3>New Book</h3>
                    <input type="text" name="title" placeholder="Book Title" required />
                    <input type="text" name="description" placeholder="Book Description" required />
                    <input type="text" name="status" placeholder="Status" required />
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
            description: event.target.description.value,
            status: event.target.status.value,
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
        const { isAuthenticated } = this.props;

    return (
        <Router>
            <Header />
    <LearningShelf bestBooksRef={this.bestBooksRef} />

   

   
            <Footer />
        </Router>
    );
}





}
const AppWrapper = () => {
    const { isAuthenticated } = useAuth0();
    return <App isAuthenticated={isAuthenticated} />;
}

export default AppWrapper;