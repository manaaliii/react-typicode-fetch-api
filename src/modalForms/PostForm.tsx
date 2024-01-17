import React, {useContext, useState} from 'react';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";


interface PostFormProps {
    closeModal: () => void;
    idToUpdate?: number;
    method: string;
    handleAlert: (object: { message: string, alertType: string }) => unknown;
}

const PostForm: React.FC<PostFormProps> = ({closeModal, handleAlert, idToUpdate, method}) => {
    const display = method === 'PUT' ? 'Update' : 'Add';
    const results = useContext(ResultsContext);
    const index = results.findIndex(result => result.id === idToUpdate);
    let post = index !== undefined ? results[index] : undefined;
    const id = idToUpdate ?? results[results.length - 1].id + 1;
    const userId = post?.userId ?? results[results.length - 1].userId + 1;
    const [title, setTitle] = useState(post?.title ?? '');
    const [body, setBody] = useState(post?.body ?? '');
    const dispatch = useContext(ResultsDispatchContext);

    const handleAddPost = async () => {

        if (title === '' || title.length < 5) {
            alert('title must have at least 5 characters');
            return false;
        }
        if (body === '' || body.length < 10) {
            alert('body must have at least 10 characters');
            return false;
        }
        const newPost = {
            userId: userId,
            id: id,
            title: title,
            body: body
        }

        const postId = index !== undefined ? id : '';

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost)
            });
            if (response.ok) {
                if (method === 'POST') {
                    dispatch({
                        type: Actions.ADD,
                        payload: {
                            data: newPost
                        }
                    });
                } else {
                    dispatch({
                        type: Actions.UPDATE,
                        payload: {
                            id: id,
                            data: newPost
                        }
                    });
                }
                const keyWord = method === 'PUT' ? 'updated' : 'added';
                handleAlert({
                    message: `Post ${keyWord} successfully`,
                    alertType: 'success'
                });
            }else{
                const keyWord = method === 'PUT' ? 'update' : 'add';
                handleAlert({
                    message: `We couldn't ${keyWord} the todo. Please try again later.`,
                    alertType: 'danger'
                });
            }

        } catch (error) {
            const keyWord = method === 'PUT' ? 'update' : 'add';
            handleAlert({
                message: `We couldn't ${keyWord} the post. Please try again later.`,
                alertType: 'danger'
            });
        }

        closeModal();
    }

    return (
        <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true" style={{display: 'block'}}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{display} Post</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                        <form className='mx-auto my-2 container'
                              style={{width: '100%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                            <div className="form-group my-3">
                                <label htmlFor="postId">post Id</label>
                                <input type="text" value={id} className="form-control" id="postId" disabled/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="userId">User Id</label>
                                <input type="number" min={1} max={100} value={userId} className="form-control"
                                       id="userId" disabled/>
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={title} className="form-control"
                                       onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="body">Body</label>
                                <textarea value={body} className="form-control"
                                          onChange={(e) => setBody(e.target.value)} id="body" placeholder="Body"/>
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

export default PostForm;