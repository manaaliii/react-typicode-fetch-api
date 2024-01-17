import React, {useContext, useState} from 'react';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";

interface TodoFormProps {
    closeModal: () => void;
    idToUpdate?: number;
    method: string;
    handleAlert: (object: { message: string, alertType: string }) => unknown;
}

const TodoForm: React.FC<TodoFormProps> = ({closeModal, handleAlert, method, idToUpdate}) => {
    const display = method === 'PUT' ? 'Update' : 'Add'
    const results = useContext(ResultsContext);
    const index = idToUpdate ? results.findIndex(r => r.id === idToUpdate) : undefined;
    let todo = index !== undefined ? results[index] : undefined;
    const id = idToUpdate ?? results[results.length - 1].id + 1;
    const userId = todo?.userId ?? results[results.length - 1].userId + 1;
    const [title, setTitle] = useState<string>(todo?.title ?? '')
    const [completed, setCompleted] = useState<boolean>(todo?.completed ?? false);
    const dispatch = useContext(ResultsDispatchContext)
    const handleAddPost = async () => {
        const UserId = parseInt(userId);
        if (UserId < 1 || UserId > 100 || userId === '') {
            alert('Please enter user id between 1 and 100');
            return false;
        }
        if (title === '' || title.length < 5) {
            alert('title must have at least 5 characters');
            return false;
        }

        const newTodo = {
            "userId": userId,
            "id": id,
            "title": title,
            "completed": completed
        }
        const todoId = index !== undefined ? index + 1 : '';
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTodo)
            });

            if (response.ok) {
                if (method === 'POST') {
                    dispatch({
                        type: Actions.ADD,
                        payload: {
                            data: newTodo
                        }
                    });
                } else {
                    dispatch({
                        type: Actions.UPDATE,
                        payload: {
                            id: id,
                            data: newTodo
                        }
                    });
                }

                const keyWord = method === 'PUT' ? 'updated' : 'added';
                handleAlert({
                    message: `Todo ${keyWord} successfully!`,
                    alertType: 'success'
                });
            }
            else{
                const keyWord = method === 'PUT' ? 'update' : 'add';
                handleAlert({
                    message: `We couldn't ${keyWord} the todo. Please try again later.`,
                    alertType: 'danger'
                });
            }

        } catch (error) {
            const keyWord = method === 'PUT' ? 'update' : 'add';
            handleAlert({
                message: `We couldn't ${keyWord} the todo. Please try again later.`,
                alertType: 'danger'
            });
        }

        closeModal();
    }

    return (
        <div className="modal fade show blur-background-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle"
             aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{display} Todo</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>

                        <form className='mx-auto my-2'
                              style={{width: '100%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                            <div className="form-group">
                                <label htmlFor="userId">User Id</label>
                                <input min={1} max={100} type="number" value={userId} className="form-control"
                                       id="userId" disabled/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="todoId">Todo Id</label>
                                <input disabled={true} type="text" value={id} className="form-control" id="todoId"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" value={title} className="form-control"
                                       onChange={(event) => setTitle(event.target.value)} id="title"
                                       placeholder="Title"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <div id='status' onClick={() => setCompleted(!completed)} className="btn">
                                    {completed ? "✔" : '❌'}
                                </div>
                            </div>

                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddPost}>
                                {display}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default TodoForm;