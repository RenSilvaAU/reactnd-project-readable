// common packages
import React, { Component } from 'react';
import sortBy from 'sort-by'
import { FaArrowLeft } from 'react-icons/lib/fa'
import changeCase from 'change-case'
import { Link, Route, withRouter } from 'react-router-dom'
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { FaPlus, FaSort } from 'react-icons/lib/fa'


// redux
import { connect } from 'react-redux'
import { ADD_POST } from '../actions'


// custom
import CreateEdit from './CreateEdit'
import PostDetail from './PostDetail'



class Category extends Component {

  state={

    isShowingDialog : false,
    modalForm : ADD_POST,
    modalCategory : null,
    modalPost : null,
    modalComment : null,
    postOrder: '-voteScore',


    selectedPost : null


  }

  showDialog( modalForm, modalCategory, modalPost=null, modalComment=null  ) {
    this.setState( {modalForm : modalForm,
                    modalCategory : modalCategory,
                    modalPost : modalPost,
                    modalComment: modalComment,
                    isShowingDialog: true});

  }

  hideDialog() {
    this.setState( {isShowingDialog: false})
  }

  render() {

    const {  posts  } = this.props;

    const myFaSort =  <FaSort style={{cursor:'pointer'}} className="spacer" /> 

    return (
      <div>
 
        { this.props.backButton && 


            <div>          
              <Link to="/"><FaArrowLeft className="hotTag"  style={{cursor:'pointer'}} /></Link>
              <span className="spacer">Back to all Categories</span>
            </div>

        }

        <div >
          <div className="grid-wrapper divider">
            <div className="cone">
              <Link to={"/"+this.props.cat.name}>
               <div className="subheader hotTag"  style={{cursor:'pointer'}}>{changeCase.titleCase(this.props.cat.name)}</div>
              </Link>
            </div>

            <div className="ctwo">

              <span className="subheader"></span>
              
              <FaPlus style={{cursor:'pointer'}}  className="hotTag" onClick={ () => this.showDialog(ADD_POST, this.props.cat.name) } /> 
                  
              <DropdownButton className="simpleButton" bsStyle="default" title={myFaSort} noCaret id="dropdown-no-caret">

                <MenuItem eventKey="1" onSelect={ () => this.setState( { postsOrder: 'timestamp' } ) }>Timestamp</MenuItem>
                <MenuItem eventKey="2" onSelect={ () => this.setState( { postsOrder: '-voteScore' } ) }>Vote Score</MenuItem>

              </DropdownButton>

                
              { (posts && posts.filter( (post) => (post.category === this.props.cat.name)).length > 0 )

                  ? // then

                  posts.filter( (post) => (post.category === this.props.cat.name)).sort(sortBy(this.state.postsOrder)).filter( (post) => { return this.state.selectedPost ? post.id === this.state.selectedPost : post } ).map( (post) => (


                    <div key={post.id}>

                      <Route path={`/${this.props.cat.name}/${post.id}`}


                        render={ ({history}) => {
          
                          return (                        

                            <PostDetail 
                              
                              post = {post}
                              cat = {this.props.cat}
                              parentComponent = {this}
                              history = {history}
                              backButton = {true}

                            />
 

                          )

                      }} />

                       <Route exact path="/"

                          render={ ({history}) => ( 

                            <PostDetail 
                              
                              post = {post}
                              cat = {this.props.cat}
                              parentComponent = {this}
                              history = {history}
                              backButton = {false}

                            />

                       )} />                     

                       <Route exact path={`/${this.props.cat.name}`}
                       
                          render={ ({history}) => ( 

                            <PostDetail 
                              
                              post = {post}
                              cat = {this.props.cat}
                              parentComponent = {this}
                              history = {history}
                              backButton = {false}

                            />

                       )} />  
                      </div>

                      ))


                  : null
              }

            </div>

            {this.state.isShowingDialog ?


              <CreateEdit 

                modalForm = {this.state.modalForm}
                modalCategory = {this.state.modalCategory}
                modalPost = {this.state.modalPost}
                modalComment = {this.state.modalComment}
                parent = {this}

              />

            : null
            }  
    	     </div>
        </div>
      </div>
)}}


function mapStateToProps ({ posts }) {
  return { posts:posts.posts}
}

export default  withRouter(connect(
  mapStateToProps
)(Category));

