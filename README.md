# CRUD on api App

# Features

[Link to Repo](https://github.com/manaaliii/react-typicode-fetch-api)

# Overview
This project is a comprehensive web application that facilitates CRUD (Create, Read, Update, Delete) operations with API integration. It provides an intuitive user interface for managing various entities such as posts, comments, and todos.

# Features
- **User Authentication**: Secure login functionality with email and password.
- **Dynamic Navigation**: A responsive navigation bar for easy access to different sections.
- **Detailed Views**: Components for viewing individual posts, comments, and todos in detail.
- **Add Functionality**: Capability to add new posts, comments, and todos.
- **Update Operations**: Options to modify existing posts, comments, and todos.
- **Deletion Support**: Intuitive modal prompts for safely deleting records.
- **Global User Context**: Efficient global access to user information.

## Installation

To install dependencies, run the following command:

```bash
npm install
```

To include login during testing, use the following credentials:

- **Email:** user1@example.com
- **Password:** 123456

## Project Structure
### Components

#### `Main.tsx`

This component serves as the central entry point, rendering the navigation bar, various endpoints, and the footer.

#### `Footer.tsx`

This component serves as the footer of the page.

#### `Header.tsx`

Enables dynamic rendering of the header.

#### `Endpoint.tsx`

The main file containing various endpoints for accessing functionality.

#### `Home.tsx`

Represents the home page of the app.

#### `Login.tsx`

A component dedicated to the login functionality.


#### `Navbar.tsx`

Handles the navigation throughout the application.

#### `ViewComment.tsx`

Displays detailed information about a specific comment.

#### `ViewPost.tsx`


Displays detailed information about a specific post.

#### `ViewTodo.tsx`

Provides detailed information about a particular todo.

#### `CommentForm.tsx`

Allows users to add comments.

#### `PostForm.tsx`

Enables the addition of new posts.

#### `TodoForm.tsx`

Facilitates the addition of new todos.

#### `DisplayComments.tsx`

Displays all comments and provides functionality for updating and adding comments.

#### `DisplayPosts.tsx`

Displays all posts and provides functionality for updating, adding, and deleting posts.

#### `DisplayTodos.tsx`

Displays all todos and provides functionality for updating, adding, and deleting todos.

### Custom Modals

#### `DeleteModal.tsx`

A modal designed for deleting records.

### Contexts

#### `UserContext.tsx`

A context that allows global access to user information.

### Reducers

#### `UserReducer.tsx`

A reducer responsible for setting or removing user information.

### App.js

Main entry point and coordinator of the React application.
