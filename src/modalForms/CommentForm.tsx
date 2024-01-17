import React, {useContext, useState} from 'react';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";
import {UserContext} from "../contexts/UserContext.tsx";

interface CommentFormProps {
    closeModal: () => void;
    idToUpdate?: number;
    method: string;
    handleAlert: (object: { message: string, alertType: string }) => unknown;
}

const CommentForm: React.FC<CommentFormProps> = ({closeModal, idToUpdate, method, handleAlert}) => {
    const display = method === 'PUT' ? 'Update' : 'Add';
    const results = useContext(ResultsContext);
    const index = idToUpdate !== undefined ? results.findIndex(result => result.id === idToUpdate) : undefined;
    let comment = index !== undefined ? results[index] : undefined;
    const id = comment?.id ?? results[results.length - 1].id + 1;
    const postId = comment?.postId ?? results[results.length - 1].postId + 1;
    const userEmail = useContext(UserContext)
    const email = comment?.email ?? userEmail;
    const [name, setName] = useState(comment?.name ?? '');
    const [body, setBody] = useState(comment?.body ?? '');
    const dispatch = useContext(ResultsDispatchContext);
    const handleAddPost = async () => {


        if (name === '' || name.length < 5) {
            alert('title must have at least 5 characters');
            return false;
        }
        if (body === '' || body.length < 10) {
            alert('body must have at least 10 characters');
            return false;
        }

        const newComment = {
            postId: postId,
            id: id,
            email: email,
            name: name,
            body: body,
        }
        const commentId = index !== undefined ? id : '';

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment)
            });

            if (response.ok) {
                if (method === 'POST') {
                    dispatch({
                        type: Actions.ADD,
                        payload: {
                            data: newComment
                        }
                    });
                } else {
                    dispatch({
                        type: Actions.UPDATE,
                        payload: {
                            id: id,
                            data: newComment
                        }
                    });
                }

                const keyWord = method === 'PUT' ? 'updated' : 'added';
                handleAlert({
                    message: `Comment ${keyWord} successfully`,
                    alertType: 'success'
                });
            } else {
                const keyWord = method === 'PUT' ? 'update' : 'add';
                handleAlert({
                    message: `We couldn't ${keyWord} the todo. Please try again later.`,
                    alertType: 'danger'
                });
            }

        } catch (error) {
            const keyWord = method === 'PUT' ? 'update' : 'add';
            handleAlert({
                message: `We couldn't ${keyWord} comment. Please try again later.`,
                alertType: 'danger'
            });
        }

        closeModal();
    }

    return (
        <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{display: 'block'}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{display} Comment</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                        <form className='mx-auto my-2 container'
                              style={{width: '100%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                            <div className="form-group my-3">
                                <label htmlFor="postId">Post Id</label>
                                <input type="number" value={postId} min={1} max={100} className="form-control"
                                       id="postId" disabled/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="userId">Id</label>
                                <input type="text" value={id} className="form-control" id="userId" disabled/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="email">Email</label>
                                <input type="text" value={email} className="form-control" id="email" placeholder="Email"
                                       disabled/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" value={name} className="form-control"
                                       onChange={(event) => setName(event.target.value)} id="name" placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <textarea value={body} className="form-control"
                                          onChange={(event) => setBody(event.target.value)} id="title"
                                          placeholder="Title"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddPost}>{display}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentForm;

