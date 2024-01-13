import React, {useContext, useState} from 'react';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";


const AddPost:React.FC = ({closeModal}) =>{
    const results = useContext(ResultsContext);
    const id = results.length + 1;
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useContext(ResultsDispatchContext);

    const handleAddPost = () =>{
        const UserId = parseInt(userId);
        if(UserId<1 || UserId>100  || userId===''){
            alert('Please enter user id between 1 and 100');
            return false;
        }
        if(title==='' || title.length< 5){
            alert('title must have at least 5 characters');
            return false;
        }
        if(body==='' || body.length< 10){
            alert('body must have at least 10 characters');
            return false;
        }

        console.log(userId);
        dispatch({
            type: Actions.ADD,
            payload: {
                data:{
                    userId: UserId,
                    id: id,
                    title: title,
                    body: body,}
            }
        })
        closeModal();
    }
    
return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Post</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                        <form className='mx-auto my-2 container' style={{ width: '100%', border: '1px solid gray', padding: '0.5em 0.5em' }}>
                            <div className="form-group my-3">
                                <label htmlFor="postId">post Id</label>
                                <input type="text" value={id} className="form-control" id="postId" disabled />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="userId">User Id</label>
                                <input type="number" min={1} max={100} value={userId} className="form-control" id="userId" onChange={(e) => setUserId(e.target.value)} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <textarea value={body} className="form-control" onChange={(e) => setBody(e.target.value)} id="body" placeholder="Body" />
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

export default AddPost;