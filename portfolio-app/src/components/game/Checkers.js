import ReactModal from 'react-modal';
import Board from './Board';

function Checkers({ showModal, setShowModal}) {
  return (
    <>
        <div>{showModal ? <div><Board /></div> : null}</div>
        
    </>
    
  );
}

export default Checkers;