import React, { Component } from 'react';
import { connect } from 'react-redux'

import { initCategories, initPosts } from '../actions'

import logo from '../logo.svg';
import '../App.css';

import { Route } from 'react-router-dom'

import Category from './Category'
import CreateEdit from './CreateEdit'
import Default from './Default'
import PostDetail from './PostDetail'


class App extends Component {

  state={
  }

  componentDidMount() {

    // get categories
    var url = `${process.env.REACT_APP_BACKEND}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => { 
        console.log('received data:',data);
        // this.setState({categories:JSON.parse(data).categories})
        this.props.initCategories( JSON.parse(data).categories )
      });

    // get posts
    url = `${process.env.REACT_APP_BACKEND}/posts`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => { 
        console.log('received data:',data);
        // this.setState({categories:JSON.parse(data).categories})
        this.props.initPosts( JSON.parse(data) ) // I love consistency!
      });


  }

  // should list all available categories, which should link to a category view for that category
  // should list all of the posts ordered by voteScore (highest score first)
  // should have a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp
  // should have a control for adding a new post

  render() {

    const {  initCategories, initPosts} = this.props

    return (
      
      <div className="app">

        <div className='container'>

             <h1 className='header'>Readable</h1>


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

            <Route exact path="/edit"

              render={( {history} )=> (

                // list this user's selected books
                <CreateEdit  />

              )}/>

            <Route exact path="/post"

              render={( {history} )=> (

                // list this user's selected books
                <PostDetail  />

              )}/>

        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    initCategories: (data) => dispatch(initCategories(data)),
    initPosts: (data) => dispatch(initPosts(data))
  }
}

function mapStateToProps () {
  // left empty, as I will not need to access any props in this component
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
