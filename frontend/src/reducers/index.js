import { combineReducers } from 'redux'


import {
  ADD_COMMENT,
  UPDATE_COMMENT,
  ADD_CATEGORY,
  ADD_POST,
  DEL_POST,
  UPDATE_POST,
  INIT_CATEGORIES,
  INIT_POSTS,
  FETCH_COMMENTS,
  DEL_COMMENT,  
  DOWNVOTE_POST,
  UPVOTE_POST,
  DOWNVOTE_COMMENT,
  UPVOTE_COMMENT

} from '../actions'

function comments (state = {}, action) {
  switch (action.type) {

    case ADD_COMMENT :

      const { comment } = action

      return {
        ...state,
        comments: state.comments.concat(comment).filter( (comment) => comment.deleted !== true ),
      }


    case UPDATE_COMMENT:
    
      const { updComment } = action

      return {
        ...state,
       comments: state.comments.map(
           (comment) => { 
                          return (
                          comment.id === updComment.id
                        ? {...comment, author: updComment.author,
                                       body: updComment.body }
                        : comment
                        )}).filter( (comment) => comment.deleted !== true )

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
                        )}).filter( (comment) => comment.deleted !== true )

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
                        )}).filter( (comment) => comment.deleted !== true )

        }

    case DEL_COMMENT:
    
      const { delCommentId } = action

      return {
        ...state,
       comments: state.comments.map(
           (comment) => { 
                          return (
                          comment.id === delCommentId
                        ? {...comment, deleted: true }
                        : comment
                        )}).filter( (comment) => comment.deleted !== true )

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
          comments: state.comments.concat(comments).filter( (comment) => comment.deleted !== true ),
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
        posts: state.posts.concat(post).filter( (post) => post.deleted !== true ),
      }

    case UPDATE_POST:
    
      const { updPost } = action

      return {
        ...state,
       posts: state.posts.map(
           (post) => { 
                          return (
                          post.id === updPost.id
                        ? {...post, title: updPost.title,
                                    author: updPost.author,
                                    body: updPost.body }
                        : post
                        )}).filter( (post) => post.deleted !== true )

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
                        )}).filter( (post) => post.deleted !== true )

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
                        )}).filter( (post) => post.deleted !== true )

        }

    case DEL_POST:
    
      const { delPostId } = action

      return {
        ...state,
       posts: state.posts.map(
           (post) => { 
                          return (
                          post.id === delPostId
                        ? {...post, deleted: true }
                        : post
                        )}).filter( (post) => post.deleted !== true )

        }
    case INIT_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts.filter( (post) => post.deleted !== true ),
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