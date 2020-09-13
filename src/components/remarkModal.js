import React, { useState } from 'react';
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    height: '100px',
    width: '200px'
  }
};

Modal.setAppElement('#root')
 
function RemarkModal(props){
    const [remarkValue, remarkValueChange] = useState("");

    const handleInputChange = e => {
        remarkValueChange(e.target.value);
    }
    
    const handleFocus = (event) => event.target.select();

    return (
        <Modal
          isOpen={props.open}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <label htmlFor="remark">Write Remark</label>   
            <textarea 
                type="text" 
                name="remark" 
                value={remarkValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
            ></textarea>
            <br/>
            <button onClick={props.closeModal.bind(this, null, false)}>Cancel</button>
            <button onClick={props.handleReject.bind(this, props.idx, remarkValue)}>Reject</button>
        </Modal>
    );
}

export default RemarkModal;