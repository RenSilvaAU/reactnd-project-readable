import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment, addCategory} from '../actions'

class Default extends Component {

	// identical to the default view, but filtered to only include posts with the selected category


  render() {

    const { categories, posts, comments, addComment, addCategory } = this.props

    console.log('Props', this.props)

    return (

    	<div>
    	
          <h2>Default</h2>
          <div>list all available categories, which should link to a category view for that category</div>
                    
          {categories && categories.map( (cat) => {
            return (
              <div>
                <h3 className="Category" key={cat.name}>{cat.name}</h3>
                <div>list all of the posts ordered by voteScore (highest score first)</div>
              </div>
            )
          })}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>


      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {

    addComment: (data) => dispatch(addComment(data)),
    addCategory: (data) => dispatch(addCategory(data))
  }
}
function mapStateToProps ({ categories, posts, comments }) {
  return { categories: categories.categories,
           posts:posts.posts,
           comments: comments }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Default);
