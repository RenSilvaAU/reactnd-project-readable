import React, { Component } from 'react';
class Default extends Component {

	// identical to the default view, but filtered to only include posts with the selected category


  render() {
    return (

    	<div>
    	
          <h2>Default</h2>
            <p>list all available categories, which should link to a category view for that category</p>
            <p>list all of the posts ordered by voteScore (highest score first)</p>
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>


      </div>
    );
  }
}

export default Default;