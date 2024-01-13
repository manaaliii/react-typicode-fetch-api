import React from 'react';

const ViewPost:React.FC = ({data, closeModal}) =>{

    
    return(
        <>
          
          <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">By {data.userId}</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                    <h2 className='bottom-border'>user: {data.userId}</h2>
                    <h5 className='bottom-border'>{data.title}</h5>
                    <h4 className='bottom-border' style={{fontWeight: '400'}}>Status : {data.completed?"✔":'❌'}</h4>
                <button className="btn btn-primary my-2" onClick={closeModal}>close</button>
            </div>
                    </div>
                    </div>
                </div>
            
        </>
    )

}

export default ViewPost;

