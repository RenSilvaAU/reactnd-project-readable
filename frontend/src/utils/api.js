export const REACT_APP_BACKEND="http://localhost:3001"

export function addPost (post) {

const url = `${REACT_APP_BACKEND}/posts`;
console.log('saving post', url);

  return fetch(url, 
  				{ method: 'POST',
  				  headers: { 'Authorization': 'whatever-you-want', "Content-Type" : "application/json" },
                  body: JSON.stringify(post)
 			  },
   )

}

export function updPost (post) {

	const url = `${REACT_APP_BACKEND}/posts/${post.id}`;
	console.log('updating post', url);

  	return fetch(url, 
  				{ method: 'PUT',
  				  headers: { 'Authorization': 'whatever-you-want',
  				   			 "Content-Type" : "application/json" },
                  body: JSON.stringify( {title : post.title,
              			 				 body  : post.body,
              			 				 author : post.author} )
 			  },
   )

}


export function delPost (delPostId) {

	const url = `${REACT_APP_BACKEND}/posts/${delPostId}`;
	console.log('deleting post', url);

  	return fetch(url, 
  				{ method: 'DELETE',
  				  headers: { 'Authorization': 'whatever-you-want' }
 			  },
  	)

}



// comments



export function addComment (comment) {

const url = `${REACT_APP_BACKEND}/comments`;
console.log('saving comment', url);

  return fetch(url, 
  				{ method: 'POST',
  				  headers: { 'Authorization': 'whatever-you-want',
  				  			 "Content-Type" : "application/json" },
                  body : JSON.stringify(comment)
 			  },
   )

}

export function updComment (comment) {

	const url = `${REACT_APP_BACKEND}/comments/${comment.id}`;
	console.log('updating comment', url);

  	return fetch(url, 
  				{ method: 'PUT',
  				  headers: { 'Authorization': 'whatever-you-want',
  				  			 "Content-Type" : "application/json" },
                  body: JSON.stringify( {title : comment.title,
              			 				body  : comment.body,
              			 				author : comment.author})
 			  },
   )

}


export function delComment (delCommentId) {

	const url = `${REACT_APP_BACKEND}/comments/${delCommentId}`;
	console.log('deleting comment', url);

  	return fetch(url, 
  				{ method: 'DELETE',
  				  headers: { 'Authorization': 'whatever-you-want',
  				   			"Content-Type" : "application/json" }
 			  },
  	)

}


export function voteComment (commentId, option ) {

	const url = `${REACT_APP_BACKEND}/comments/${commentId}`;
	console.log('updating comment', url);

  	return fetch(url, 
  				{ method: 'POST',
  				  headers: { 'Authorization': 'whatever-you-want',
  				   			 "Content-Type" : "application/json" },
                  body: JSON.stringify( {option : option} )
   			  },
   )
 }


export function votePost (postId, option ) {

	const url = `${REACT_APP_BACKEND}/posts/${postId}`;
	console.log('updating comment', url);

  	return fetch(url, 
  				{ method: 'POST',
  				  headers: { 'Authorization': 'whatever-you-want' ,
  				 			 "Content-Type" : "application/json"},
                  body: JSON.stringify( {option : option} )
 			  },
   )
 }
