import React, {useContext} from "react";
import  {ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";

interface DeleteModalProps {
    closeModal: () => void;
    id: number;
    dataType: string;
    handleAlert: (object: { message: String, alertMessage: String }) => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({closeModal, dataType, id, handleAlert}) => {
    const dispatch = useContext(ResultsDispatchContext);

    const handleDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/${dataType}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (response.ok) {
                handleAlert({
                    message: `${dataType.slice(0,dataType.length-1)} deleted Successfully!`,
                    alertType: 'success'
                })
                dispatch({
                    type: Actions.REMOVE,
                    payload: {
                        id:id,
                    }
                })
            } else {

                handleAlert({
                    message: `We couldn't delete the ${dataType.slice(0,dataType.length-1)}!`,
                    alertType: 'danger'
                });
            }
        }).catch((error) => {
            handleAlert({
                message: 'Error occured while deleting the the record!',
                alertType: 'danger'
            });
        });
        closeModal();
    }


    return (
        <>
            <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Are you sure you want to delete
                                record?</h5>
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