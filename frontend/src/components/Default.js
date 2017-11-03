import React, { Component } from 'react';
import { connect } from 'react-redux'
import {  addComment, addCategory, addPost, 
          downVotePost, upVotePost,  
          downVoteComment, upVoteComment} from '../actions'

import changeCase from 'change-case'

import { FaArrowUp, FaArrowDown, FaPencil, FaPlus, FaSort } from 'react-icons/lib/fa'


import { Modal, Button, Row, Grid, DropdownButton, MenuItem } from 'react-bootstrap';

const uuidv1 = require('uuid/v1');

function displayableDate(timestamp) {

  var newDate = new Date();
  newDate.setTime(timestamp);
  
  return newDate.toUTCString();


}
class Default extends Component {


  state={

    myvotes : { },

    isShowingDialog : false,
    isShowingTitle : false,

    modalFormTitle : "Comment",

    postCallBack : null,

    modalTitle : "",
    modalBody  : "",
    modalAuthor : "",
    modalCategory : "",
    modalPostId : null,


  }

  showDialog( formTitle,  postCallBack, showTitle=true ) {
    this.setState( {modalFormTitle : formTitle,
                    isShowingDialog : true,
                    postCallBack : postCallBack,
                    isShowingTitle: showTitle });



  }

  hideDialog() {
    this.setState( {isShowingDialog: false})
  }

  showPostDialog( category="" , title="",body="",author="",voteScore=0 ) {

    this.setState( {  modalTitle : title,
                      modalBody  : body,
                      modalAuthor : author,
                      modalCategory : category,
                      modalVoteScore : voteScore} );

    this.showDialog("Your Post", this.postPost , true);

  }

  showCommentDialog( postId=null , body="",author="", voteScore=0) {

    this.setState( {  modalBody  : body,
                      modalAuthor : author,
                      modalPostId : postId,
                      modalVoteScore : voteScore} );   

    this.showDialog("Your Comment", this.postComment, false );


  }



  toggleVote(id) {

      this.setState( (state) => { 

        if ( typeof(state.myvotes[id]) === 'undefined' ) {
          state.myvotes[id] = true
        } else {
          state.myvotes[id] = !(state.myvotes[id]) ;
        }

        return ( { myvotes : state.myvotes });

      });

  }



  postComment(text, parent) {
    // post  stuff

    const id = uuidv1();

    const newComment = {  author:   parent.state.modalAuthor  ,
                          body:     parent.state.modalBody,
                          deleted:  false,
                          id:       id,
                          parentDeleted: false,
                          parentId:  parent.state.modalPostId,
                          timestamp: Date.now() ,
                          voteScore: parent.state.modalVoteScore 
                        }

    parent.props.addComment(  newComment );

  }

  postPost(text, parent) {
    // post  stuff

    const id = uuidv1();

    // alert('will post a Post with text ' + text + ' and UID= ' +  id);


    const newPost = {     author:     parent.state.modalAuthor ,
                          body:       parent.state.modalBody,
                          category:   parent.state.modalCategory,
                          deleted:    false,
                          id:         id,
                          timestamp:  Date.now() ,
                          title:      parent.state.modalTitle,
                          voteScore: parent.state.modalVoteScore
                    }

    parent.props.addPost(  newPost  );

  }


  voted(id)  {

    if  ( typeof(this.state.myvotes[id]) !== 'undefined' && this.state.myvotes[id] ) {
      return "my-vote"
    } else {
      return "" 
    }

  }

  upvote(id) {

    this.props.upVote(id) 

  }

  downvote(id) {

    this.props.downVote(id) 

  }
  render() {

    const { categories, posts, comments, addComment, addPost, 
            addCategory, downVotePost, upVotePost,  
            downVoteComment, upVoteComment,  
          } = this.props

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
                  <FaPlus style={{cursor:'pointer'}}  className="empty" onClick={ () => this.showPostDialog( cat.name  ) } /> 
                  <FaSort style={{cursor:'pointer'}}  className="spacer" onClick={ () => {alert('Will Sort')}   } /> 

                    <DropdownButton bsStyle="default" title="Sort Order" noCaret id="dropdown-no-caret">

                      <MenuItem eventKey="1">Timestamp</MenuItem>
                      <MenuItem eventKey="2">Author</MenuItem>

                    </DropdownButton>

                </div>
                </div>
                  { (posts && posts.filter( (post) => (post.category === cat.name)).length > 0 )

                    ? // then

                    ( posts.filter( (post) => (post.category === cat.name)).map( (post) => {
                        return (
                          <div key={post.id}>

                            <div className="grid-wrapper">
                              <div className="cone"> 
                                  <span className="post-author">{post.author}</span>
                                   <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.showPostDialog( cat.name, post.title, post.body, post.author, post.voteScore ) } />
                                  <div className="timestamp">{displayableDate(post.timestamp)}</div>
 
                              </div>
                              <div className="ctwo">

                                <div className="post-title">{post.title}</div>
      

                                <div className="post-body">{post.body}</div>

         

                                <button className={"post-voteScore " + this.voted(post.id)} 
                                     onClick={ () => this.toggleVote(post.id) } >{post.voteScore} </button>
                                       
                                <FaArrowUp  style={{cursor:'pointer'}}   className="spacer" onClick={ () => this.props.upVotePost(post.id) } />
                                <FaArrowDown style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.props.downVotePost(post.id) } />
                           
                                <div className="grid-wrapper subSubHead">
                                  <div className="cone">Comments</div>
                                  <div className="ctwo">
                                    <FaPlus style={{cursor:'pointer'}}  className="empty"  onClick={ () => this.showCommentDialog( post.id ) } />
                                  </div> 
                                </div>
                                { ( comments && comments.filter( (comment) => (comment.parentId === post.id)).length > 0 ) 
           
                                ? // then
                                (
                                  <div>
   
                                    <div className="comments">
                                    { comments.filter( (comment) => (comment.parentId === post.id)).map( (comment) => {
                                      return (
                                        <div className="grid-wrapper" key={comment.id}>
                                          <div className="cone">
                                            <span className="comment-author">{comment.author}</span>
                                            <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.showCommentDialog( post.id , comment.body , comment.author, comment.voteScore ) } />
                                            <div className="timestamp">{displayableDate(comment.timestamp)}</div>

                                          </div>
                                          <div className="ctwo">

                                             <div className="comment-body">{comment.body}</div>

                                                <button className={"post-voteScore " + this.voted(comment.id)} 
                                               onClick={ () => this.toggleVote(comment.id) } >{comment.voteScore} </button>
                                                
                                                <FaArrowUp className="spacer" onClick={ () => this.props.upVoteComment(comment.id) } />
                                                <FaArrowDown className="spacer" onClick={ () => this.props.downVoteComment(comment.id) } />
                                                
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
                        )})
                    ) 
                    : null
                  }

              </div>
            )
          })}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>

        {this.state.isShowingDialog ?

          <form>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{this.state.modalFormTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                    <input className="inputField" type="text" placeholder="Author" autoFocus
                    value={this.state.modalAuthor}
                    onChange={ (event) => this.setState( { modalAuthor: event.target.value })} />

                    { this.state.isShowingTitle 
                      ?
                      <input className="inputField" type="text" placeholder="Title"
                      value={this.state.modalTitle}
                      onChange={ (event) => this.setState( { modalTitle: event.target.value })} />
                      : null }
                    <textarea className="textareaInput" rows={5} placeholder="Enter here" defaultValue={""}
                    defaultValue={this.state.modalBody}
                    onChange={ (event) => this.setState( {modalBody: event.target.value })}/>
          
              </Modal.Body>

              <Modal.Footer>
                <Button onClick={ () => this.hideDialog() }>Close</Button>
                <Button type="submit" bsStyle="primary" 
                onClick={ () => { 
                  this.state.postCallBack(this.state.post, this);
                  this.hideDialog()
                 } 
               }>Post</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </form>
          : null
        }
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    addPost: (data) => dispatch(addPost(data)),
    addCategory: (data) => dispatch(addCategory(data)),

    downVotePost: (data) => dispatch(downVotePost(data)),
    upVotePost: (data) => dispatch(upVotePost(data)),

    downVoteComment: (data) => dispatch(downVoteComment(data)),
    upVoteComment: (data) => dispatch(upVoteComment(data)),

  }
}

function mapStateToProps ({ categories, posts, comments }) {
  return { categories: categories.categories,
           posts:posts.posts, 
           comments: comments.comments }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Default);
