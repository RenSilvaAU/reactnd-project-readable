import React, { Component } from 'react';
import { connect } from 'react-redux'
import sortBy from 'sort-by' 

import {  downVotePost, upVotePost,  
          downVoteComment, upVoteComment,
          delPost, delComment } from '../actions'

import { Route, withRouter, Link } from 'react-router-dom'

import CreateEdit from './CreateEdit'

import {
  ADD_COMMENT,
  ADD_POST,
} from '../actions'

import { FaArrowUp, FaArrowDown, FaPencil, FaPlus, FaTrash, FaSort } from 'react-icons/lib/fa'

import { DropdownButton, MenuItem } from 'react-bootstrap';


function displayableDate(timestamp) {

  var newDate = new Date();
  newDate.setTime(timestamp);
  
  return newDate.toUTCString();

}

class PostDetail extends Component {

  state={

    commentsOrder: '-voteScore',

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

  noOfComments(postId) {

    if (!this.props.comments) {
      return 0
    } else {
      return this.props.comments.filter( (comment) => (comment.parentId === postId)).length ;
    }
  }

  render() {

    const { comments,  
            downVotePost, upVotePost,  
            downVoteComment, upVoteComment, delComment, delPost
           } = this.props

    const myFaSort =  <FaSort style={{cursor:'pointer'}} className="spacer" /> 


    return (
    <div>
    	{ this.props.catPosts.map( (post) => (
                         
          <div key={post.id}>

            <div className="grid-wrapper">
              <div className="cone"> 
                  <span className="post-author">{post.author}</span>
                   <Link to={`/${this.props.cat.name}/${post.id}`}><FaPencil className="spacer" /></Link>
                   <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.showDialog( ADD_POST, this.props.cat.name, post ) } />
                   <FaTrash  style={{cursor:'pointer'}}  className="spacer" onClick={ () => delPost( post.id ) } />

                  <div className="timestamp">{displayableDate(post.timestamp)}</div>

              </div>
              <div className="ctwo">

                <div className="post-title">{post.title}</div>


                <div className="post-body">{post.body}</div>

                <Route path={`/${this.props.cat.name}/${post.id}`}

                    render={ ({history}) => ( 

                      <CreateEdit 

                        modalForm = { ADD_POST}
                        modalCategory = {this.props.cat.name}
                        modalPost = {post}
                        modalComment = "" 
                        parent = {this}

                        isRouter = {true}

                      /> 
                )} />



                <button className="post-voteScore">{post.voteScore} </button>
                       
                <FaArrowUp  style={{cursor:'pointer'}}   className="spacer" onClick={ () => upVotePost(post.id) } />
                <FaArrowDown style={{cursor:'pointer'}}  className="spacer" onClick={ () => downVotePost(post.id) } />
           
                <div className="grid-wrapper subSubHead">
                  <div className="cone">Comments ({this.noOfComments(post.id)})</div>
                  <div className="ctwo">
                    <FaPlus style={{cursor:'pointer'}}  className="hotTag"  onClick={ () => this.showDialog( ADD_COMMENT, this.props.cat.name, post ) } />

                    <DropdownButton className="simpleButton" bsStyle="default" title={myFaSort} noCaret id="dropdown-no-caret">

                        <MenuItem eventKey="1" onSelect={ () => this.setState( { commentsOrder: 'timestamp' } ) }>Timestamp</MenuItem>
                        <MenuItem eventKey="2" onSelect={ () => this.setState( { commentsOrder: '-voteScore' } ) }>Vote Score</MenuItem>

                    </DropdownButton>

                  </div> 
                </div>
                { ( comments && comments.filter( (comment) => (comment.parentId === post.id)).length > 0 ) 

                ? // then
                (
                  <div>

                    <div className="comments">
                    { comments.filter( (comment) => (comment.parentId === post.id)).sort(sortBy(this.state.commentsOrder)).map( (comment) => {
                      return (
                        <div className="grid-wrapper" key={comment.id}>
                          <div className="cone">
                            <span className="comment-author">{comment.author}</span>
                            <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () =>this.showDialog( ADD_COMMENT, this.props.cat.name, post, comment )  } />
                            <FaTrash  style={{cursor:'pointer'}}  className="spacer" onClick={ () => delComment( comment.id ) } />

                            <div className="timestamp">{displayableDate(comment.timestamp)}</div>

                          </div>
                          <div className="ctwo">

                             <div className="comment-body">{comment.body}</div>

                                <button className="post-voteScore">{comment.voteScore} </button>
                                
                                <FaArrowUp className="spacer" onClick={ () => upVoteComment(comment.id) } />
                                <FaArrowDown className="spacer" onClick={ () => downVoteComment(comment.id) } />
                                
                            </div>
                            <br />
                        </div>

                        )
                      })
                    }
                    </div>
                  </div>
                  )
                : null
              }

              </div>
            </div>
          </div>
        ))}  

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

function mapDispatchToProps (dispatch) {
  return {

    downVotePost: (data) => dispatch(downVotePost(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),

    downVoteComment: (data) => dispatch(downVoteComment(data)),
    upVoteComment: (data) => dispatch(upVoteComment(data)),

    delPost: (data) => dispatch(delPost(data)),
    delComment: (data) => dispatch(delComment(data))


  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return { categories: categories.categories,
           posts:posts.posts, 
           comments: comments.comments }
}

export default  withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail));