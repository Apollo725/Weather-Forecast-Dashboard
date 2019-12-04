import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';

class NotificationModal extends Component {
  render() {
    const { content, onHide } = this.props;
    return (
      <Modal {...this.props} bsSize="sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title">Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomP>{content}</CustomP>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const CustomP = styled.p`
  text-align: center;
  color: green;
`;
export default NotificationModal;
