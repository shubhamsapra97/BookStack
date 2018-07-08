import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
      books: []
  }

  componentWillMount() {
      
      BooksAPI.getAll().then((books)=>{
          
          this.setState({books});
          
      });
      
  }

  updateShelf = (book, shelf) => {
    
     BooksAPI.update(book, shelf).then(()=>{
         
         BooksAPI.getAll().then((books)=>{
            this.setState({books}); 
         });
          
      });
      
  }

  render() {
      
    let currentReadingBooks = this.state.books.filter((book)=>{
        return book.shelf === 'currentlyReading'; 
    });
      
    let wantToReadBooks = this.state.books.filter((book)=>{
       return book.shelf === 'wantToRead'; 
    });
      
    let readBooks = this.state.books.filter((book)=>{
       return book.shelf === 'read'; 
    });
      
    return (
      <div className="app">   
        
        <Route path="/addBooks" render={()=>(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        
        <Route exact={true} path="/" render={()=>(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <ListBooks books={currentReadingBooks} updateShelf={this.updateShelf} />
                </div>
              </div>

              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <ListBooks books={wantToReadBooks} updateShelf={this.updateShelf} />
                </div>
              </div>


              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <ListBooks books={readBooks} updateShelf={this.updateShelf} />
                </div>
              </div>

            <div className="open-search">
              <Link to="/addBooks">Add a book</Link>
            </div>

          </div> 
          </div>
        )} /> 

      </div>
    )
  }
}

export default BooksApp;
