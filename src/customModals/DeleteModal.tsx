import React from "react";

interface DeleteModalProps {
    closeModal: () => void;
    handleResults : (results:object[]) => void;
    index: number;
    results: object[];
}

const DeleteModal: React.FC<DeleteModalProps> = ({ closeModal, index, results, handleResults }) => {

    const handleDelete = () => {
        const slicedResultFront = results.slice(0, index);
        const slicedResultBack = results.slice(index + 1);
        const updatedResults = [...slicedResultFront, ...slicedResultBack];
        handleResults(updatedResults)
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