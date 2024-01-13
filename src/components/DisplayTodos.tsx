import React, {useContext, useState} from 'react';
import ViewTodo from './ViewTodo.tsx'
import Header from "./Header.tsx";
import AddTodo from './AddTodo.tsx';
import DeleteModal from '../customModals/DeleteModal.tsx';
import {ResultsContext, ResultsDispatchContext} from "../contexts/ResultsContext.tsx";
import {Actions} from "../reducers/ResultsReducer.tsx";

const DisplayTodos: React.FC = () => {

    const [currentIndex, setCurrentIndex] = useState<undefined | number>(undefined);
    const [data, setData] = useState(null);
    const [completed, setCompleted] = useState<null | boolean>(null);
    const [title, setTitle] = useState(null);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const results = useContext(ResultsContext);
    const dispatch = useContext(ResultsDispatchContext);

    const closeAddModal = () => {
        setIsAddOpen(false);
    }

    const closeUpdateModal = () => {
        setIsUpdateOpen(false);
    };
    const closeViewModal = () => {
        setIsViewOpen(false);
    }
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
    }

    const handleView = (index: number) => {
        setIsViewOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
    }

    const handleModification = () => {
        if(title === '' || title.length < 5){
            alert('title must be at least 5 characters long!');
            return false;
        }
        const updatedResults ={
            "userId": data.userId,
            "id": data.id,
            "title": title,
            "completed": completed
        }

        dispatch(
            {
                action: Actions.UPDATE,
                payload:{
                    data: updatedResults
                }
            }
        )

        closeUpdateModal();
    }

    const handleUpdate = (index: number) => {
        setIsUpdateOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
        setTitle(results[index].title);
        setCompleted(results[index].completed);
    }

    const handleDelete = (index: number) => {
        setCurrentIndex(index);
        setIsDeleteOpen(true);
    }
    return (
        <>
            <Header title='Todos'/>
            <hr/>
            <button className='btn btn-dark' onClick={() => setIsAddOpen(true)}>Add Todo</button>
            <table className='table'>
                <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">completed</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>

                </tr>
                </thead>
                <tbody>
                {results.map(({userId, id, title, completed}, index) => {
                    return (
                        <tr key={index}>
                            <td>{userId}</td>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{completed ? "✔" : '❌'}</td>
                            <td>
                                <button onClick={() => handleView(index)} className="btn btn-primary">View</button>
                            </td>
                            <td>
                                <button onClick={() => handleUpdate(index)} className="mx-2 btn btn-secondary">Update
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            {isUpdateOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                     aria-hidden="true" style={{display: 'block'}}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Todo</h5>
                                <button type="button" className="close" onClick={closeUpdateModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='container-fluid'>

                                <form className='mx-auto my-2'
                                      style={{width: '100%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                                    <div className="form-group">
                                        <label htmlFor="userId">User Id</label>
                                        <input disabled={true} type="text" value={data.userId} className="form-control"
                                               id="userId"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="commentId">Comment Id</label>
                                        <input disabled={true} type="text" value={data.id} className="form-control"
                                               id="commentId"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input type="text" value={title} className="form-control"
                                               onChange={(event) => setTitle(event.target.value)} id="title"
                                               placeholder="Title"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <div onClick={() => setCompleted(!completed)} className="btn">
                                            {completed ? "✔" : '❌'}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeUpdateModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleModification}>Save
                                    changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
             
        {isDeleteOpen && <DeleteModal index={currentIndex} closeModal={closeDeleteModal} />}
            {isViewOpen && <ViewTodo data={data} closeModal={closeViewModal}/>}
            {isAddOpen && <AddTodo results={results}  closeModal={closeAddModal}/>}

        </>

    )
}
export default DisplayTodos;