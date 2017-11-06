
import * as api from '../utils/api.js'

export const ADD_COMMENT = 'ADD_COMMENT'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const DEL_COMMENT = 'DEL_COMMENT'
export const DEL_POST = 'DEL_POST'

export const UPDATE_POST = 'UPDATE_POST'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const INIT_CATEGORIES = 'INIT_CATEGORIES'
export const INIT_POSTS = 'INIT_POSTS'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'


export function addComment ( comment ) {

  api.addComment(comment).then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: ADD_COMMENT,
    comment
  }
}

export function addPost ( post ) {

  api.addPost(post).then(
    (res) => { console.log('Result', res.status)}
  )

  // will add the post to the list anyway
  return {
    type: ADD_POST,
    post
  }
}

export function delComment ( delCommentId ) {

  api.delComment(delCommentId).then(
    (res) => { console.log('Result', res.status)}
  )
  return {
    type: DEL_COMMENT,
    delCommentId
  }
}

export function delPost ( delPostId ) {

  api.delPost(delPostId).then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: DEL_POST,
    delPostId
  }
}

export function updateComment ( updComment ) {

  api.updComment(updComment).then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: UPDATE_COMMENT,
    updComment
  }
}

export function updatePost ( updPost ) {

  api.updPost(updPost).then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: UPDATE_POST,
    updPost
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

  api.votePost(downPostId,"downVote").then(
    (res) => { console.log('Result', res.status)}
  )


  return {
    type: DOWNVOTE_POST,
    downPostId
  }
}


export function upVotePost ( upPostId ) {

  api.votePost(upPostId,"upVote").then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: UPVOTE_POST,
    upPostId
  }
}

export function downVoteComment ( downCommentId ) {

  api.voteComment(downCommentId,"downVote").then(
    (res) => { console.log('Result', res.status)}
  )

  return {
    type: DOWNVOTE_COMMENT,
    downCommentId
  }
}


export function upVoteComment ( upCommentId ) {

  api.voteComment(upCommentId,"upVote").then(
    (res) => { console.log('Result', res.status)}
  )


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

