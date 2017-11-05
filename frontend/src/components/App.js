import React, { Component } from 'react';
import { connect } from 'react-redux'

import { initCategories, initPosts, fetchComments } from '../actions'

import '../App.css';

import { Route } from 'react-router-dom'

import Category from './Category'

import Default from './Default'
import PostDetail from './PostDetail'


class App extends Component {

  getComments(postId) {

        const url = `${process.env.REACT_APP_BACKEND}/posts/${postId}/comments`;        

        fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
          .then( (res) => { return(res.text()) })
          .then( (data) => { 
 
              try {
                this.props.fetchComments( JSON.parse(data) )
              } catch(err) {
                // couldn't be done
              }
        });

  }

  componentDidMount() {

    // get categories
    var url = `${process.env.REACT_APP_BACKEND}/categories`;

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => { 

        this.props.initCategories( JSON.parse(data).categories )
      });

    // get posts
    url = `${process.env.REACT_APP_BACKEND}/posts`;

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => { 
 
        const readPosts = JSON.parse(data); // array containing posts just loaded

        this.props.initPosts( readPosts ); 

        readPosts.forEach( (post) => {
          this.getComments(post.id);
        });



      });

  }

  // should list all available categories, which should link to a category view for that category
  // should list all of the posts ordered by voteScore (highest score first)
  // should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
  // should have a control for adding a new post

  render() {

     return (
      
      <div className="app">

            <div className="container">
              <div className="top">
               <h1 className='header'>Readable</h1>
              </div>
            </div>

            <Route exact path="/"

              render={( {history} )=> (

                // list this user's selected books
                <Default  />

              )}/>

            <Route exact path="/category"

              render={( {history} )=> (

                // list this user's selected books
                <Category  />

              )}/>


            <Route exact path="/post"

              render={( {history} )=> (

                // list this user's selected books
                <PostDetail  />

              )}/>

        </div>

    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initCategories: (data) => dispatch(initCategories(data)),
    initPosts: (data) => dispatch(initPosts(data)),
    fetchComments: (data) => dispatch(fetchComments(data))
  }
}

function mapStateToProps ({ posts }) {
  return { posts:posts.posts }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
