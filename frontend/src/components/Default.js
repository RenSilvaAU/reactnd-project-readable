
import React, { Component } from 'react';
import { connect } from 'react-redux'


import Category from './Category'


 

import changeCase from 'change-case'




class Default extends Component {


  state={



  }


  render() {

    const { categories  } = this.props;

    return (

    	<div className="container">
    	
          <div className="padding-top"></div>
                    
          {categories && categories.map( (cat) => (

              <div key={cat.name}>
                <div className="grid-wrapper divider">
                <div className="cone">
                  <div className="subheader" >{changeCase.titleCase(cat.name)}</div>
                </div>

              <Category 
                cat = {cat}
              />

            </div>
            </div>

          ))}
            
            <p>a control for changing the sort method for the list, including at minimum, order by voteScore and order by timestamp</p>
            <p>should have a control for adding a new post</p>


      </div>
    )
  }
}



function mapStateToProps ({ categories, posts }) {
  return { categories: categories.categories,
           posts:posts.posts}
}

export default  connect(
  mapStateToProps
)(Default);
