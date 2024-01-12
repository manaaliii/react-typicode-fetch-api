import React, {useState} from 'react';


const AddComment:React.FC = ({results, handleResults, closeModal}) =>{
    const [postId, setPostId] = useState('');
    const id = results.length + 1;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [body, setBody] = useState('');
    const handleAddPost = () =>{
        const PostId = parseInt(postId);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(!emailRegex.test(email)){
            alert('Please enter valid email');
            return false;
        }
        if(PostId<1 || PostId>100  || postId===''){
            alert('Please enter post id between 1 and 100');
            return false;
        }
        
        if(name=='' || name.length< 5){
            alert('title must have at least 5 characters');
            return false;
        }
        if(body=='' || body.length< 10){
            alert('body must have at least 10 characters');
            return false;
        }
        handleResults([{
            postId: postId,
            id: id,
            email: email,
            name: name,
            body: body,
        }, ...results])
        closeModal();
    }
    
return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Comment</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                        <form className='mx-auto my-2 container' style={{ width: '100%', border: '1px solid gray', padding: '0.5em 0.5em' }}>
                        <div className="form-group my-3">
                <label htmlFor="postId">Post Id</label>
                <input type="number" value={postId} min={1} max={100} className="form-control" id="postId" onChange={(event)=>setPostId(event.target.value)} />
            </div>
            <div className="form-group my-3">
                <label htmlFor="userId">Id</label>
                <input type="text" value={id} className="form-control" id="userId" disabled />
            </div>
            <div className="form-group my-3">
                <label htmlFor="email">Email</label>
                <input type="text" value={email} className="form-control" id="email" onChange={(event)=>setEmail(event.target.value)} placeholder="Email" />
            </div>
            <div className="form-group my-3">
                <label htmlFor="name">Name</label>
                <input type="text" value={name} className="form-control" onChange={(event)=>setName(event.target.value)}  id="name" placeholder="Name" />
            </div>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <textarea value={body} className="form-control" onChange={(event)=>setBody(event.target.value)} id="title" placeholder="Title" />
            </div>
        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddPost}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AddComment;