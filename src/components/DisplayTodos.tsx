import React, {useState} from 'react';
import ViewTodo from './ViewTodo.tsx'
import Header from "./Header.tsx";
import AddTodo from './AddTodo.tsx';
import DeleteModal from '../customModals/DeleteModal.tsx';

interface DisplayTodoProps {
    results: unknown;
    handleResults: (results: unknown) => void;
}

const DisplayTodos: React.FC<DisplayTodoProps> = ({results, handleResults}) => {

    const [currentIndex, setCurrentIndex] = useState<undefined | number>(undefined);
    const [data, setData] = useState(null);
    const [completed, setCompleted] = useState<null | boolean>(null);
    const [title, setTitle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isAddViewOpen, setIsAddViewOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const closeAddModal = () => {
        setIsAddViewOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
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
        const slicedResultFront = results.slice(0, currentIndex);
        const slicedResultBack = results.slice(currentIndex + 1);
        if(title === '' || title.length < 5){
            alert('title must be at least 5 characters long!');
            return false;
        }
        const updatedResults = [...slicedResultFront, {
            "userId": data.userId,
            "id": data.id,
            "title": title,
            "completed": completed
        }, ...slicedResultBack];
        handleResults(updatedResults)
        closeModal();
    }

    const handleUpdate = (index: number) => {
        setIsModalOpen(true);
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
            <button className='btn btn-dark' onClick={() => setIsAddViewOpen(true)}>Add Todo</button>
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
            {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
                     aria-hidden="true" style={{display: 'block'}}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Update Todo</h5>
                                <button type="button" className="close" onClick={closeModal} aria-label="Close">
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
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleModification}>Save
                                    changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
             
        {isDeleteOpen && <DeleteModal index={currentIndex} results={results} handleResults={handleResults} closeModal={closeDeleteModal} />}   
            {isViewOpen && <ViewTodo data={data} closeModal={closeViewModal}/>}
            {isAddViewOpen && <AddTodo results={results} handleResults={handleResults} closeModal={closeAddModal}/>}

        </>

    )
}
export default DisplayTodos;