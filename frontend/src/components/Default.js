
import React, { Component } from 'react';
import { connect } from 'react-redux'


import Category from './Category'


 import { FaArrowLeft } from 'react-icons/lib/fa'

import changeCase from 'change-case'




class Default extends Component {


  state={

    selectedCategory : null

  }


  render() {

    const { categories  } = this.props;

    return (

    	<div className="container">
    	
          <div className="padding-top"></div>

          { this.state.selectedCategory && 
            <div><FaArrowLeft className="hotTag"  style={{cursor:'pointer'}} onClick={ () => this.setState({selectedCategory : null})} />
              <span className="spacer">Back to all Categories</span>
            </div>
          }

                    
          {categories && categories.filter( (cat) => { return this.state.selectedCategory ? cat.name === this.state.selectedCategory : cat } ).map( (cat) => (

              <div key={cat.name}>
                <div className="grid-wrapper divider">
                <div className="cone">
                  <div className="subheader hotTag"  style={{cursor:'pointer'}} 
                        onClick={ () => this.setState( {selectedCategory : cat.name })}>{changeCase.titleCase(cat.name)}</div>
                </div>

              <Category 
                cat = {cat}
              />

            </div>
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

export default  connect(
  mapStateToProps
)(Default);
