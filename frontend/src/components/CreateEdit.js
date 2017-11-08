import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap';

import { withRouter } from 'react-router-dom';
import {
  ADD_COMMENT,
  ADD_POST,
} from '../actions'

import {  addPost,  
          addComment,
          updatePost,
          updateComment } from '../actions'

const uuidv1 = require('uuid/v1');



class CreateEdit extends Component {

	// should have a form to create new post or edit existing posts
	// when editing, existing data should be populated in the form

  state={

    modalForm :     this.props.modalForm,
    modalCategory:  this.props.modalCategory,
    modalPost :     this.props.modalPost,
    modalComment :  this.props.modalComment,

    modalVoteScore : 1,

    modalTitle :    this.getTitle() ,
    modalBody  :    this.getBody()  ,
    modalAuthor :   this.getAuthor(),

    isShowingTitle:  this.props.modalForm === ADD_POST


  }

  getTitle() {

    switch  (this.props.modalForm ) {

      case ADD_POST:
        return (this.props.modalPost === null ? '' : this.props.modalPost.title)

      case ADD_COMMENT:
        return (this.props.modalComment === null ? '' : this.props.modalComment.title)

      default:
        return ''

    } 
  }


  getBody() {

    switch  (this.props.modalForm ) {

      case ADD_POST:
        return (this.props.modalPost === null ? '' : this.props.modalPost.body)

      case ADD_COMMENT:
        return (this.props.modalComment === null ? '' : this.props.modalComment.body)

      default:
        return ''

    } 
  }


  getAuthor() {

    switch  (this.props.modalForm ) {

      case ADD_POST:
        return (this.props.modalPost === null ? '' : this.props.modalPost.author)

      case ADD_COMMENT:
        return (this.props.modalComment === null ? '' : this.props.modalComment.author)

      default:
        return ''

    } 
  }

  postComment() {
    // post  stuff

    let id = uuidv1();

    let dispAction = this.props.addComment;

    if (this.state.modalComment !== null && this.state.modalComment.id !== null ) {
       id = this.state.modalComment.id
       dispAction = this.props.updateComment
    }


    const newComment = {  author:   this.state.modalAuthor,
                          body:     this.state.modalBody,
                          deleted:  false,
                          id:       id,
                          parentDeleted: false,
                          parentId:  this.state.modalPost.id,
                          timestamp: Date.now() ,
                          voteScore: this.state.modalVoteScore 
                        }

    dispAction(  newComment );

  }

  postPost() {
    // post  stuff

    let id = uuidv1();
    let dispAction = this.props.addPost;

    if (this.state.modalPost !== null && this.state.modalPost.id !== null ) {
       id = this.state.modalPost.id;
       dispAction = this.props.updatePost;
    }


    // alert('will post a Post with text ' + text + ' and UID= ' +  id);


    const newPost = {     author:     this.state.modalAuthor,
                          body:       this.state.modalBody,
                          category:   this.state.modalCategory,
                          deleted:    false,
                          id:         id,
                          timestamp:  Date.now() ,
                          title:      this.state.modalTitle,
                          voteScore: this.state.modalVoteScore
                    }

    dispAction(  newPost  );

  }

  post() {

    if (this.props.modalForm === ADD_POST ) {
        this.postPost();
        this.props.parent.hideDialog()

    } else if (this.props.modalForm === ADD_COMMENT ) {
        this.postComment();
        this.props.parent.hideDialog()
    } 
  }

  goBack() {

        // accounting for potential router-based solution
        try {
            this.history.back()
        } catch (e) {
            //ok .. keep going 
        }
        this.props.parent.hideDialog()
  }

  render() {




    return (

            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{this.props.modalFormTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                    <input className="inputField" type="text" placeholder="Author" autoFocus
                    value={this.state.modalAuthor}
                    onChange={ (event) => this.setState( { modalAuthor: event.target.value })} />

                    { this.state.isShowingTitle 
                      ?
                      <input className="inputField" type="text" placeholder="Title"
                      value={this.state.modalTitle}
                      onChange={ (event) => this.setState( { modalTitle : event.target.value })} />
                      : null }
                    <textarea className="textareaInput" rows={5} placeholder="Enter here"
                    defaultValue={this.state.modalBody}
                    onChange={ (event) => this.setState( {modalBody: event.target.value })}/>

              </Modal.Body>

              <Modal.Footer>
                <Button onClick={ () => { this.props.parent.hideDialog() } }>Close</Button>
                <Button type="submit" bsStyle="primary" 
                onClick={ () => { this.post(this) } 
               }>Post</Button>
              </Modal.Footer>
            </Modal.Dialog>

    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    addPost: (data) => dispatch(addPost(data)),
    updateComment: (data) => dispatch(updateComment(data)),
    updatePost: (data) => dispatch(updatePost(data)),
  }
}

function mapStateToProps ({ posts, comments }) {
  return { posts:posts.posts, 
           comments: comments.comments }
}

export default  withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEdit));

