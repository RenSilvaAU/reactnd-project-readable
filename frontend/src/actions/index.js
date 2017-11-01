export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const INIT_POSTS = 'INIT_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export function addComment ( comment ) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function addCategory ( category ) {
  return {
    type: ADD_CATEGORY,
    category
  }
}

export function initCategories ( categories ) {
  return {
    type: INIT_CATEGORIES,
    categories
  }
}

export function initPosts ( posts ) {
  return {
    type: INIT_POSTS,
    posts
  }
}

export function fetchComments ( comments ) {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}