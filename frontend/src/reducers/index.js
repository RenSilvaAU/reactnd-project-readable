import { combineReducers } from 'redux'

import {
  ADD_COMMENT,
  ADD_CATEGORY,
  ADD_POST,
  INIT_CATEGORIES,
  INIT_POSTS,
  FETCH_COMMENTS,  
  DOWNVOTE_POST,
  UPVOTE_POST,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT,

} from '../actions'

function comments (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :

      const { comment } = action

      return {
        ...state,
        comments: state.comments.concat(comment),
      }

    case UPVOTE_COMMENT:
    
      const { upCommentId } = action

      return {
        ...state,

       comments: state.comments.map(
           (comment) => { 
                          return (
                          comment.id === upCommentId
                        ? {...comment, voteScore: comment.voteScore  + 1 }
                        : comment
                        )})

        }
      
    case DOWNVOTE_COMMENT:
    
      const { downCommentId } = action

      return {
        ...state,
       comments: state.comments.map(
           (comment) => { 
                          return (
                          comment.id === downCommentId
                        ? {...comment, voteScore: comment.voteScore  - 1 }
                        : comment
                        )})

        }

    case FETCH_COMMENTS:

      const { comments } = action;

      if (typeof(state.comments) === 'undefined') {
        return {
          ...state,
          comments: comments,
        }
      } else { 

        return {
          ...state,
          comments: state.comments.concat(comments),
        }

      }
    default :
      return state
  }
}

function categories (state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      const { category } = action
      return {
        ...state,
        categories: state.categories.concat(category),
      }
    case INIT_CATEGORIES:
      const { categories } = action
      return {
        ...state,
        categories: categories,
      }
    default :
      return state
  }
}

function posts (state = {}, action) {
  switch (action.type) {
    case ADD_POST:
      const { post } = action
      return {
        ...state,
        posts: state.posts.concat(post),
      }

    case UPVOTE_POST:
    
      const { upPostId } = action

      return {
        ...state,

       posts: state.posts.map(
           (post) => { 
                          return (
                          post.id === upPostId
                        ? {...post, voteScore: post.voteScore  + 1 }
                                   : post
                        )})

        }
      
    case DOWNVOTE_POST:
    
      const { downPostId } = action

      return {
        ...state,

       posts: state.posts.map(
           (post) => { 
                          return (
                          post.id === downPostId
                        ? {...post, voteScore: post.voteScore  - 1 }
                                   : post
                        )})

        }


    case INIT_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts,
      }
    default :
      return state
  }
}

export default combineReducers({
  comments,
  categories,
  posts
})