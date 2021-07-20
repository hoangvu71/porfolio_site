import ReactModal from 'react-modal';
import Board from './Board';

function Checkers({ showModal, setShowModal}) {
  return (
    <>
        <div>{showModal ? <div className="modal_content">Modal</div> : null}</div>
        <div><Board /></div>
    </>
    
  );
}

export default Checkers;