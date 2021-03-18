import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class VisitorModal extends Component {
  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>이 글을 본 사람</Modal.Header>
        <Modal.Content image>
          <Image
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            wrapped
          />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            {this.props.visitorsList.map(name => (
              <p>{`${name}님`}</p>
            ))}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="방문해주셔서 감사합니다."
            labelPosition="right"
            icon="checkmark"
            onClick={() => this.props.closeModal()}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default VisitorModal;
