import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment, addCategory, addPost, upVote, downVote} from '../actions'

import changeCase from 'change-case'

import { FaArrowUp, FaArrowDown, FaPencil } from 'react-icons/lib/fa'


import { Modal, Button, Row, Grid, Clearfix } from 'react-bootstrap';

const uuidv1 = require('uuid/v1');
  


class Default extends Component {


  state={

    myvotes : { },

    isShowingDialog : false,

    modalFormTitle : "Comment",

    postCallBack : null,

    modalTitle : "",
    modalBody  : "",
    modalAuthor : "",
    modalCategory : "",
    modalPostId : null

  }

  showDialog( formTitle,  postCallBack ) {
    this.setState( {modalFormTitle : formTitle,
                    isShowingDialog : true,
                    postCallBack : postCallBack});


  }

  showPostDialog( category="" , title="",body="",author="",voteScore=0 ) {

    this.setState( {  modalTitle : title,
                      modalBody  : body,
                      modalAuthor : author,
                      modalCategory : category,
                      modalVoteScore : voteScore} );

    this.showDialog("Your Post", this.postPost );

  }

  showCommentDialog( postId=null , body="",author="", voteScore=0) {

    this.setState( {  modalBody  : body,
                      modalAuthor : author,
                      modalPostId : postId,
                      modalVoteScore : voteScore} );   

    this.showDialog("Your Comment", this.postComment );


  }

  hideDialog() {
    this.setState( {isShowingDialog: false})
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

    const { categories, posts, comments, addComment, addPost, addCategory, downVote, upVote } = this.props

    return (

    	<div className="container">
    	
          <div className="padding-top"></div>
                    
          {categories && categories.map( (cat) => {
            return (
              <div key={cat.name}>
                <div className="grid-wrapper">
                <div className="cone subheader"></div>
                <div className="ctwo subheader" >{changeCase.titleCase(cat.name)}</div>
                </div>
                  { (posts && posts.filter( (post) => (post.category === cat.name)).length > 0 )

                    ? // then

                    ( posts.filter( (post) => (post.category === cat.name)).map( (post) => {
                        return (
                          <div key={post.id}>
                            <div className="grid-wrapper">
                              <div className="cone post-author">{post.author}</div>
                              <div className="ctwo">

                                <div className="post-title">{post.title}</div>
                                <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.showPostDialog( cat.name, post.title, post.body, post.author, post.voteScore ) } />
 
                                <div className="post-body">{post.body}</div>

                                <div className="grid-wrapper">
                                  <div className="cone">

                                      <button className={"post-voteScore " + this.voted(post.id)} 
                                     onClick={ () => this.toggleVote(post.id) } >{post.voteScore} </button>
                                       
                                      <FaArrowUp  style={{cursor:'pointer'}}   className="spacer" onClick={ () => this.upvote(post.id) } />
                                      <FaArrowDown style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.downvote(post.id) } />
                           
                                  </div>

                                </div>

                                { ( comments && comments.filter( (comment) => (comment.parentId === post.id)).length > 0 ) 
           
                                ? // then
                                (
                                  <div>
                                    <br />
                                    <div className="subSubHead">Comments</div>

                                    <div className="comments">
                                    { comments.filter( (comment) => (comment.parentId === post.id)).map( (comment) => {
                                      return (
                                        <div className="grid-wrapper" key={comment.id}>
                                          <div className="cone comment-author">{comment.author}</div>
                                          <div className="ctwo">

                                            <FaPencil  style={{cursor:'pointer'}}  className="spacer" onClick={ () => this.showCommentDialog( post.id , comment.body , comment.author, comment.voteScore ) } />
                                             <div className="comment-body">{comment.body}</div>

                                                <button className={"post-voteScore " + this.voted(comment.id)} 
                                               onClick={ () => this.toggleVote(comment.id) } >{comment.voteScore} </button>
                                                
                                                <FaArrowUp className="spacer" onClick={ () => this.upvote(comment.id) } />
                                                <FaArrowDown className="spacer" onClick={ () => this.downvote(comment.id) } />
                                                
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
                              <div style={{cursor:'pointer'}}  className="empty"  onClick={ () => this.showCommentDialog( post.id ) } >Comment + </div> 

                              </div>
                            </div>
                          </div>
                        )})
                    ) 
                    : null
                  }
                  <div style={{cursor:'pointer'}}  className="empty" onClick={ () => this.showPostDialog( cat.name  ) } >Post +</div> 

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
                    <input className="inputField" type="text" placeholder="Title"
                    value={this.state.modalTitle}
                    onChange={ (event) => this.setState( { modalTitle: event.target.value })} />
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

    downVote: (data) => dispatch(downVote(data)),
    upVote: (data) => dispatch(upVote(data)),

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
