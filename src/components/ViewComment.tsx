import React from 'react';

interface ViewCommentProps {
    closeModal: () => void;
    data: unknown;
}

const ViewComment: React.FC<ViewCommentProps> = ({closeModal, data}) => {

    return (
        <>

            <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">By {data.email}</h5>
                            <button type="button" className="close" onClick={closeModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className='container-fluid'>
                            <div style={{width: '100%', border: '1px solid gray'}} className='mx-auto my-3'>
                                <h4 className='bottom-border'>user: {data.postId}</h4>
                                <h6 className='bottom-border'>ID : {data.id}</h6>
                                <h4 className='bottom-border'>name:{data.name}</h4>
                                <h4 className='bottom-border' style={{fontWeight: '400'}}><b>body:</b>{data.body}</h4>
                                <button className="btn btn-primary my-2" onClick={closeModal}>close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ViewComment;