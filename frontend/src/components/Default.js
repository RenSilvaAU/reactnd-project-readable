import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addComment, addCategory} from '../actions'

import changeCase from 'change-case'

class Default extends Component {

	// identical to the default view, but filtered to only include posts with the selected category


  render() {

    // posts.filter( (post) => (post.category == cat.name) )

    const { categories, posts, comments, addComment, addCategory } = this.props

    console.log('Props', this.props)

    return (

    	<div>
    	
          <h2>Post by Category</h2>
          <div>list all available categories, which should link to a category view for that category</div>
                    
          {categories && categories.map( (cat) => {
            return (
              <div>
                <h3 className="Category" key={cat.name}>{changeCase.titleCase(cat.name)}</h3>

                  { (posts && posts.filter( (post) => (post.category == cat.name)).length > 0 )

                    ? // then

                    ( posts.filter( (post) => (post.category == cat.name)).map( (post) => {
                        return (
                          <div>{post.body}</div>
                        )})
                    ) 
                    : // else
                    <div style={{color: '#d3d3d3'}}>... Empty Category </div> 

                  }
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
           posts:posts.posts, // love consistency!
           comments: comments }
}

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(Default);
