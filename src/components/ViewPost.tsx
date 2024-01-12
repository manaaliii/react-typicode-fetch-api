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
                    <div style={{width:'100%', border: '1px solid gray'}} className='mx-auto my-3'>
            
                <h6>post id : {data.id}</h6>
                <h4>title:{data.title}</h4>
                <h4 style={{fontWeight: '400'}}><b>body:</b>{data.body}</h4>
                <button className="btn btn-primary my-2" onClick={closeModal}>close</button>
            </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ViewPost;