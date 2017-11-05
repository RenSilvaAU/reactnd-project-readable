import React, { Component } from 'react';
import { connect } from 'react-redux'
import sortBy from 'sort-by'

import CreateEdit from './CreateEdit'
import PostDetail from './PostDetail'


import {
  ADD_POST,
} from '../actions'
 

import changeCase from 'change-case'

import { FaPlus, FaSort } from 'react-icons/lib/fa'

import { DropdownButton, MenuItem } from 'react-bootstrap';



class Default extends Component {


  state={

    isShowingDialog : false,
    modalForm : ADD_POST,
    modalCategory : null,
    modalPost : null,
    modalComment : null

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

    const { categories, posts  } = this.props

    const myFaSort =  <FaSort style={{cursor:'pointer'}} className="spacer" /> 

    return (

    	<div className="container">
    	
          <div className="padding-top"></div>
                    
          {categories && categories.map( (cat) => {
            return (
              <div key={cat.name}>
                <div className="grid-wrapper divider">
                <div className="cone">
                  <div className="subheader" >{changeCase.titleCase(cat.name)}</div>
                </div>

                <div className="ctwo">

                  <span className="subheader"></span>
                  <FaPlus style={{cursor:'pointer'}}  className="empty" onClick={ () => this.showDialog(ADD_POST, cat.name) } /> 
                  
                  <DropdownButton className="simpleButton" bsStyle="default" title={myFaSort} noCaret id="dropdown-no-caret">

                      <MenuItem eventKey="1" onSelect={ () => this.setState( { postsOrder: 'timestamp' } ) }>Timestamp</MenuItem>
                      <MenuItem eventKey="2" onSelect={ () => this.setState( { postsOrder: 'voteScore' } ) }>Vote Score</MenuItem>

                  </DropdownButton>

                </div>
                </div>
                  { (posts && posts.filter( (post) => (post.category === cat.name)).length > 0 )

                    ? // then
                    <PostDetail 

                      catPosts = {posts.filter( (post) => (post.category === cat.name)).sort(sortBy(this.state.postsOrder))}
                      cat = {cat}
                      parentComponent = {this}

                    />

                    : null
                  }

              </div>
            )
          })}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>

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
    );
  }
}



function mapStateToProps ({ categories, posts }) {
  return { categories: categories.categories,
           posts:posts.posts}
}

export default  connect(
  mapStateToProps
)(Default);
