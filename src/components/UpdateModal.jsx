import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function UpdateModal({ show, handleClose, modalData }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' disabled value={modalData.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control type='text' disabled value={modalData.role} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='text' disabled value={modalData.email} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' disabled>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateModal
