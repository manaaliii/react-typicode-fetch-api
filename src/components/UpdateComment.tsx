import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useInput} from "../CustomHooks/useInput.tsx";

const UpdateComment:React.FC = ({results, handleResults, handleModify}) =>{
    const {index} = useParams();
    let element = parseInt(index);
    const data = results[element];
    const navigate = useNavigate();
    const handleCancel = () =>{
        navigate('/comments/');
    }

    const [name, setName] = useInput(data.name);
    const [body, setBody] = useInput(data.body);
    const handleUpdate = () => {
        const slicedResultFront = results.slice(0, index);
        const slicedResultBack = results.slice(index+1);
        const updatedResults =[...slicedResultFront,{
            "postId": data.postId,
            "id": data.id,
            "name": name,
            "email": data.email,
            "body": body
        }, ...slicedResultBack];
        handleResults(updatedResults)
        handleUpdate();
    }
    return(
        <>
            <div className="modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Comment</h5>
                            <button type="button" className="close" onClick={handleCancel} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Post Id</label>
                                    <input disabled={true} type="text" value={data.postId} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">User Id</label>
                                    <input disabled={true} type="text" value={data.id} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail">Email</label>
                                    <input disabled={true} type="text" value={data.email} className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inputEmail">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        className="form-control"
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Body</label>
                                    <textarea
                                        cols={50}
                                        rows={10}
                                        value={body}
                                        className="form-control"
                                        onChange={(event) => setBody(event.target.value)}
                                        placeholder="Password"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Update
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateComment;



