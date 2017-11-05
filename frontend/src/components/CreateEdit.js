import React, { Component } from 'react';
import { Modal, Button, DropdownButton, MenuItem } from 'react-bootstrap';

class CreateEdit extends Component {

	// should have a form to create new post or edit existing posts
	// when editing, existing data should be populated in the form

  state={

    modalTitle : this.props.modalTitle,
    modalBody  : this.props.modalBody,
    modalAuthor : this.props.modelAuthor,
    modalCategory : this.props.modalCategory,
    modalPostId : this.props.modalPostId

  }

  render() {
    return (
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{this.props.modalFormTitle}</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                    <input className="inputField" type="text" placeholder="Author" autoFocus
                    value={this.props.modalAuthor}
                    onChange={ (event) => this.setState( { modalAuthor: event.target.value })} />

                    { this.props.isShowingTitle 
                      ?
                      <input className="inputField" type="text" placeholder="Title"
                      value={this.props.modalTitle}
                      onChange={ (event) => this.setState( { modalTitle : event.target.value })} />
                      : null }
                    <textarea className="textareaInput" rows={5} placeholder="Enter here"
                    defaultValue={this.props.modalBody}
                    onChange={ (event) => this.setState( {modalBody: event.target.value })}/>

                    <p>should have a form to create new post or edit existing posts</p>
                    <p>when editing, existing data should be populated in the form</p>

              </Modal.Body>

              <Modal.Footer>
                <Button onClick={ () => this.props.hideDialog() }>Close</Button>
                <Button type="submit" bsStyle="primary" 
                onClick={ () => { 
                  this.props.postCallBack(this.props.post, this);
                  this.hideDialog()
                 } 
               }>Post</Button>
              </Modal.Footer>
            </Modal.Dialog>

    );
  }
}

export default CreateEdit;