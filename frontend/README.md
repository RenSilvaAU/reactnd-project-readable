# reactnd-project-readable

##### Ren Silva [ren.j.silva@outlook.com](mailto:ren.j.silva@outllook.com)
This **MyReads** app is Ren Silva's  project for Udacity's React Fundamentals course,

## App Purpose

The app lets the users create, edit and delete posts, comment on othrers' posts, and vote on others' posts and comemnts.


It has four views:

### Default (Root)
Lists all available categories, which link to a category view for that category
Lists all of the posts ordered by voteScore (highest score first)
The user can change the sort method for the list, by voteScore or by timestamp
The user can add, remove and update posts
Lists all of the comments for that post, ordered by voteScore (highest first)
Users can add, edit or delete posts
Users can add, edit or delete comments
Incluces current score and controls to increment or decrement the voteScore for the post/comment

### Category View
identical to the default view, but filtered to only include posts with the selected category

### Post Detail View
Modal view with details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score

The Post Detail, Create and Edit views were implemented as modal, using Bootstrap modal

### Create/Edit View
Forms to create posts/comments or edit existing posts/comments

 Posts should display the number of comments associated with the post.


## Build status

This is version 0.1 of the app. It is being resubmitted for the first project review.

## Tech used

### Built with:
- React
- Redux 

### Packages Used
NB -> These packages will be installed by the Installation procedure
- change-case
- react
- react-bootstrap
- react-dom
- react-icons
- react-redux
- react-router-dom
- react-select
- redux
- sort-by
- uuid

## Installation

First clone this repository:
```sh
$ git clone https://github.com/RenSilvaAU/reactnd-project-readable.git
```

Now install React and the project dependencies
### Using NPM
If you prefer to use NPM run:

#### Install dependencies
```sh
$ cd react-project-readable/frontend
$ npm install
```
#### Start app
```sh
$ npm start
```
### Using Yarn
#### Install dependencies
```sh
$ cd react-project-readable/frontend
$ yarn install
```
#### Start app
```
$ yarn start
```

## Author

* **Ren Silva** - [ren.j.silva@outlook.com](mailto:ren.j.silva@outllook.com)


## License

This project is licensed under the MIT License.