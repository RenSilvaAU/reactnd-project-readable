import React, { Component } from 'react';
class PostDetail extends Component {



  render() {
    return (
    <div>
    	<h2>Post Detail</h2>
	     <div>
				<p> should show the details of a post, including: Title, Body, Author, timestamp (in user readable format), and vote score</p>
				<p> should list all of the comments for that post, ordered by voteScore (highest first)</p>
				<p> should have controls to edit or delete the post</p>
				<p> should have a control to add a new comment.</p>
				<p> implement comment form however you want (inline, modal, etc.)</p>
				<p> comments should also have controls for editing or deleting</p>
	     </div>
    </div>
    );
  }
}

export default PostDetail;