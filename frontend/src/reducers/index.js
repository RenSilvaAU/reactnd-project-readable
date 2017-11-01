import { combineReducers } from 'redux'

import {
  ADD_COMMENT,
  ADD_CATEGORY,
  ADD_POST,
  INIT_CATEGORIES,
  INIT_POSTS,
  FETCH_COMMENTS,  
} from '../actions'

function comments (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :

      const { comment } = action

      return {
        ...state,
        [comment]: comment,
      }
    case FETCH_COMMENTS:
      const { comments } = action;

      if (typeof(state.comments) === 'undefined') {
        return {
          ...state,
          comments: comments ,
        }
      } else { 

        return {
          ...state,
          comments: state.comments.concat(comments) ,
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
        [categories]: category,
      }
    case INIT_CATEGORIES:
      const { categories } = action
      return {
        ...state,
        categories: categories ,
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
        [posts]: post,
      }
    case INIT_POSTS:
      const { posts } = action
      return {
        ...state,
        posts: posts ,
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