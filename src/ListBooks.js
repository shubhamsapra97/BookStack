import React , {Component} from 'react';
import Book from './Book';

class ListBooks extends Component {
    
    render() {
        return (            
            <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.books.map((book) => { 
                    return <li key={book.id}>
                        <Book book={book} updateShelf={this.props.updateShelf} />
                    </li>
                })}
                </ol>
            </div>            
        )
    }
    
}

export default ListBooks;