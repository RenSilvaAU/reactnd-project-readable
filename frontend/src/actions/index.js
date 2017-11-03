export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const INIT_POSTS = 'INIT_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'

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

export function downVotePost ( downPostId ) {
  return {
    type: DOWNVOTE_POST,
    downPostId
  }
}


export function upVotePost ( upPostId ) {
  return {
    type: UPVOTE_POST,
    upPostId
  }
}

export function downVoteComment ( downCommentId ) {
  return {
    type: DOWNVOTE_COMMENT,
    downCommentId
  }
}


export function upVoteComment ( upCommentId ) {
  return {
    type: UPVOTE_COMMENT,
    upCommentId
  }
}

export function fetchComments ( comments ) {
  return {
    type: FETCH_COMMENTS,
    comments
  }
}