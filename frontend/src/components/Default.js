
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'

import Category from './Category'





class Default extends Component {


  state={

    selectedCategory : null

  }


  render() {

    const { categories  } = this.props;

    return (

    	<div className="container">
    	
          <div className="padding-top"></div>

                    
          {categories && categories.filter( (cat) => { return this.state.selectedCategory ? cat.name === this.state.selectedCategory : cat } ).map( (cat) => (

            <div key={cat.name}>
              <Route path={`/${cat.name}`}

                  render={ ({history}) => ( 

                     <Category 
                      cat = {cat}
                      backButton = {true}
                    />

               )} />

              <Route exact path="/"

                  render={ ({history}) => ( 

                     <Category 
                      cat = {cat}
                      backButton = {false}
                    />

               )} />

            </div>

          ))}

      </div>
    )
  }
}



function mapStateToProps ({ categories, posts }) {
  return { categories: categories.categories,
           posts:posts.posts}
}

export default  withRouter(connect(
  mapStateToProps
)(Default));
