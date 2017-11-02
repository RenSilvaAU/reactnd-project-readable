export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const INIT_POSTS = 'INIT_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const DOWNVOTE = 'DOWNVOTE'
export const UPVOTE = 'UPVOTE'

export function addComment ( comment ) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function addPost ( post ) {
  return {
    type: ADD_POST,
    post
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

export function downVote ( postId ) {
  return {
    type: DOWNVOTE,
    postId
  }
}


export function upVote ( postId ) {
  return {
    type: UPVOTE,
    postId
  }
}

export function fetchComments ( comments ) {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}