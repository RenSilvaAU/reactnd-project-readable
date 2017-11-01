import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment, addCategory} from '../actions'

import changeCase from 'change-case'

import { FaArrowUp, FaArrowDown } from 'react-icons/lib/fa'

class Default extends Component {


  state={
    myvotes : { 'test': false}
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

  voted(id)  {

    if  ( typeof(this.state.myvotes[id]) !== 'undefined' && this.state.myvotes[id] ) {
      return "my-vote"
    } else {
      return "" 
    }

  }
  render() {

    // posts.filter( (post) => (post.category == cat.name) )

    const { categories, posts, comments, addComment, addCategory } = this.props

    console.log('Props', this.props)

    return (

    	<div className="container">
    	
          <div className="subheader">Post by Category</div>
          <div className="purpose">{changeCase.sentenceCase("list all available categories, which should link to a category view for that category")}</div>
                    
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
                                    <FaArrowUp className="two-sm"/>
                                    <FaArrowDown className="three-sm"/>
                                    </div>

                                  <div className="ctwo">Comments</div>
                                </div>

                                <div className="comments">
                                { 
                                  comments && comments.filter( (comment) => (comment.parentId === post.id)).map( (comment) => {
           
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
                            </div>
                          </div>
                        )})
                    ) 
                    : // else
                    <div className="empty">... Empty Category </div> 

                  }
              </div>
            )
          })}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>


      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addComment: (data) => dispatch(addComment(data)),
    addCategory: (data) => dispatch(addCategory(data))
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
