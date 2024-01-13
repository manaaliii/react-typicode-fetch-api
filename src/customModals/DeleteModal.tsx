import React, {useContext} from "react";
import {ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";

interface DeleteModalProps {
    closeModal: () => void;
    index: number;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal, index }) => {
    const dispatch = useContext(ResultsDispatchContext)
    const handleDelete = () => {
        dispatch({
            action: Actions.REMOVE,
            payload: {
                index: index,
            }
        })
        closeModal();
    }
    return (
        <>

<div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete record?</h5>
            </div>
            <div className='container-fluid'>
                <button className="btn btn-danger mx-2 my-2 mr-2" onClick={handleDelete}>Yes</button>
                <button className="btn btn-secondary my-2" onClick={closeModal}>No</button>
            </div>
        </div>
    </div>
</div>

            

        </>
    )
}

export default DeleteModal;