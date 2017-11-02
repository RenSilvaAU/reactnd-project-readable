import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment, addCategory, addPost, upVote, downVote} from '../actions'

import changeCase from 'change-case'

import { FaArrowUp, FaArrowDown } from 'react-icons/lib/fa'


import { Modal, Button, Row, Grid } from 'react-bootstrap';

const uuidv1 = require('uuid/v1');
  


class Default extends Component {


  state={

    myvotes : { },

    isShowingDialog : false,

    modalTitle : "Comment",

    postCallBack : null,

    post: ""

  }

  showDialog( title,  postCallBack ) {
    this.setState( {modalTitle : title,
                    isShowingDialog : true,
                    postCallBack : postCallBack});


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

    const newComment = {  author:   "thingtwo" ,
                          body:     text,
                          category: "react",
                          deleted:  false,
                          id:       id,
                          timestamp: Date.now() ,
                          title:     text,
                          voteScore: 0 
                        }

    parent.props.addComment(  newComment );

  }

  postPost(text, parent) {
    // post  stuff

    const id = uuidv1();

    alert('will post a Post with text ' + text + ' and UID= ' +  id);


    const newPost = {  author:   "thingtwo" ,
                          body:     text,
                          category: "react",
                          deleted:  false,
                          id:       id,
                          timestamp: Date.now() ,
                          title:     text,
                          voteScore: 0 
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

    // posts.filter( (post) => (post.category == cat.name) )

    const { categories, posts, comments, addComment, addPost, addCategory, downVote, upVote } = this.props

    return (

    	<div className="container">
    	
          <div className="subheader">Category</div>
                    
          {categories && categories.map( (cat) => {
            return (
              <div key={cat.name}>
                <h3 className="Category" >{changeCase.titleCase(cat.name)}</h3>

                  { (posts && posts.filter( (post) => (post.category === cat.name)).length > 0 )

                    ? // then

                    ( posts.filter( (post) => (post.category === cat.name)).map( (post) => {
                        return (
                          <div key={post.id}>
                            <div className="grid-wrapper">
                              <div className="cone post-author">{post.author}</div>
                              <div className="ctwo">

                                <div className="post-title">{post.title}</div>
                                <div className="post-body">{post.body}</div>

                                <div className="grid-wrapper">
                                  <div className="cone">

                                    <div className="grid-sm">

                                    <button className={"one-sm post-voteScore " + this.voted(post.id)} 
                                   onClick={ () => this.toggleVote(post.id) } >{post.voteScore} </button>
                                    </div> 
                                    <FaArrowUp className="two-sm" onClick={ () => this.upvote(post.id) } />
                                    <FaArrowDown className="three-sm" onClick={ () => this.downvote(post.id) } />
                                    </div>


                                </div>

                                { ( comments && comments.filter( (comment) => (comment.parentId === post.id)).length > 0 ) 
           
                                ? // then
                                (
                                  <div>

                                    <h4>Comments</h4>

                                    <div className="comments">
                                    { comments.filter( (comment) => (comment.parentId === post.id)).map( (comment) => {
                                      return (
                                        <div className="grid-wrapper" key={comment.id}>
                                            <div className="cone comment-author">{comment.author}</div>
                                            <div className="ctwo comment-body">{comment.body}</div>
                                        </div>
                                        )
                                      })
                                    }
                                    </div>
                                  </div>
                                  )
                                : null
                              }
                              <div style={{cursor:'pointer'}}  className="empty"  onClick={ () => this.showDialog("Your Comment", this.postComment ) } >Comment + </div> 

                              </div>
                            </div>
                          </div>
                        )})
                    ) 
                    : null
                  }
                  <div style={{cursor:'pointer'}}  className="empty" onClick={ () => this.showDialog("Your Post",  this.postPost ) } >Post +</div> 

              </div>
            )
          })}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>

        {this.state.isShowingDialog ?

          <form>
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{this.state.modalTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Grid>

                  <Row>  
                    <input width={'100%'} type="text" placeholder="Author" authoFocus />
                  </Row>
                  <Row>  
                    <input width={'100%'} type="text" placeholder="Title" authoFocus />
                  </Row>
                  <Row>  
                    <textarea className="textareaInput" rows={5} placeholder="Enter here" defaultValue={""} autoFocus
                     onChange={ (event) => this.setState( { post: event.target.value })}/>
                  </Row>
                </Grid>
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
