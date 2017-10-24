import { combineReducers } from 'redux'

import {
  ADD_COMMENT,
  ADD_CATEGORY,
  INIT_CATEGORIES
} from '../actions'

function comments (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :

      const { comment } = action

      return {
        ...state,
        [comment]: comment,
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
        categories: categories,
      }
    default :
      return state
  }
}

export default combineReducers({
  comments,
  categories,
})