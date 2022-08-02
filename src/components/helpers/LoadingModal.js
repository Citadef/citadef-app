import {Modal} from 'react-bootstrap';

import fishLoadingGif from '../../images/loading/fish-loading.gif'

function LoadingModal(props) {
  
    const show = props.show;
  
    return (
<>
  
  <Modal show={show}  animation={false} keyboard={false}>
    
    <Modal.Body>
      <img src={fishLoadingGif} />
      <br />Loading...
    </Modal.Body>
    
  </Modal>
</>
    );
  }
  
export default LoadingModal;