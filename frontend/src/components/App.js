// common packages
import React, { Component } from 'react';

// redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// css
import '../App.css';

// custom
import { initCategories, initPosts, fetchComments } from '../actions'
import { REACT_APP_BACKEND } from '../utils/api'
import Default from './Default'



class App extends Component {

  getComments(postId) {

        const url = `${REACT_APP_BACKEND}/posts/${postId}/comments`;        

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
    var url = `${REACT_APP_BACKEND}/categories`;

    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => { 
        this.props.initCategories( JSON.parse(data).categories )
      });

    // get posts
    url = `${REACT_APP_BACKEND}/posts`;

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

  render() {

     return (
      
      <div className="app">

            <div className="container">
              <div className="top">
               <h1 className='header'>Readable</h1>

              </div> 
             <Default /> 

        </div>
        </div>

    )
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

export default  withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
