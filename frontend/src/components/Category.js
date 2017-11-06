
import React, { Component } from 'react';
import { connect } from 'react-redux'
import sortBy from 'sort-by'

import CreateEdit from './CreateEdit'
import PostDetail from './PostDetail'


import {
  ADD_POST,
} from '../actions'
 

import { FaPlus, FaSort } from 'react-icons/lib/fa'

import { DropdownButton, MenuItem } from 'react-bootstrap';

class Category extends Component {

  state={

    isShowingDialog : false,
    modalForm : ADD_POST,
    modalCategory : null,
    modalPost : null,
    modalComment : null,
    postOrder: '-voteScore'


  }

  showDialog( modalForm, modalCategory, modalPost=null, modalComment=null  ) {
    this.setState( {modalForm : modalForm,
                    modalCategory : modalCategory,
                    modalPost : modalPost,
                    modalComment: modalComment,
                    isShowingDialog: true});

  }

  hideDialog() {
    this.setState( {isShowingDialog: false})
  }

  render() {

    const {  posts  } = this.props;

    const myFaSort =  <FaSort style={{cursor:'pointer'}} className="spacer" /> 


    return (
      <div>
 
          <div className="ctwo">

                  <span className="subheader"></span>
                  <FaPlus style={{cursor:'pointer'}}  className="hotTag" onClick={ () => this.showDialog(ADD_POST, this.props.cat.name) } /> 
                  
                  <DropdownButton className="simpleButton" bsStyle="default" title={myFaSort} noCaret id="dropdown-no-caret">

                      <MenuItem eventKey="1" onSelect={ () => this.setState( { postsOrder: 'timestamp' } ) }>Timestamp</MenuItem>
                      <MenuItem eventKey="2" onSelect={ () => this.setState( { postsOrder: '-voteScore' } ) }>Vote Score</MenuItem>

                  </DropdownButton>

                
                  { (posts && posts.filter( (post) => (post.category === this.props.cat.name)).length > 0 )

                    ? // then
                    <PostDetail 

                      catPosts = {posts.filter( (post) => (post.category === this.props.cat.name)).sort(sortBy(this.state.postsOrder))}
                      cat = {this.props.cat}
                      parentComponent = {this}

                    />

                    : null
                  }

        </div>

        {this.state.isShowingDialog ?


          <CreateEdit 

            modalForm = {this.state.modalForm}
            modalCategory = {this.state.modalCategory}
            modalPost = {this.state.modalPost}
            modalComment = {this.state.modalComment}
            parent = {this}

          />

          : null
        }  
    	
      </div>
    )

  }
}


function mapStateToProps ({ posts }) {
  return { posts:posts.posts}
}

export default  connect(
  mapStateToProps
)(Category);

