# Project-Books_Management
It is a project that focuses on managing books and their reviews. It provides a set of APIs to perform various operations related to users, books, and reviews. 
Models
User Model
    {
  title: {string, mandatory, enum[Mr, Mrs, Miss]},
  name: {string, mandatory},
  phone: {string, mandatory, unique},
  email: {string, mandatory, valid email, unique}, 
  password: {string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {string},
    city: {string},
    pincode: {string}
  },
  createdAt: {timestamp},
  updatedAt: {timestamp}
}

Books Model
{
  title: {string, mandatory, unique},
  excerpt: {string, mandatory}, 
  userId: {ObjectId, mandatory, refs to user model},
  ISBN: {string, mandatory, unique},
  category: {string, mandatory},
  subcategory: {string, mandatory},
  reviews: {number, default: 0, comment: Holds number of reviews of this book},
  deletedAt: {Date, when the document is deleted}, 
  isDeleted: {boolean, default: false},
  releasedAt: {Date, mandatory, format("YYYY-MM-DD")},
  createdAt: {timestamp},
  updatedAt: {timestamp},
}

Review Model
{
  bookId: {ObjectId, mandatory, refs to book model},
  reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
  reviewedAt: {Date, mandatory},
  rating: {number, min 1, max 5, mandatory},
  review: {string, optional}
  isDeleted: {boolean, default: false},
}


## User APIs

1. **Register** - Allows users to create an account. Returns the user document upon successful creation.

2. **Login** - Allows users to log in with their email and password. Returns a JWT token upon successful login.

## Books API

1. **Create Book** - Allows users to create a book. Checks if the provided user ID is valid and creates a book document.

2. **Get Books** - Retrieves all books that are not deleted. Returns basic information about each book.

3. **Get Book by ID** - Retrieves a specific book by its ID. Returns detailed information about the book, including its reviews.

4. **Update Book** - Updates the details of a book, such as title, excerpt, release date, and ISBN.

5. **Delete Book** - Marks a book as deleted, preventing further access to it.

## Review APIs

1. **Add Review** - Adds a review for a specific book. Checks if the book exists and updates its review count.

2. **Update Review** - Updates an existing review for a book. Checks if the book and review exist.

3. **Delete Review** - Deletes a review for a book. Checks if the book and review exist and updates the book's review count.

## Authentication

All book routes are protected, requiring authentication with a valid JWT token.

## Authorization

Only the owner of a book can create, edit, or delete it. Unauthorized access will result in an appropriate error message.
