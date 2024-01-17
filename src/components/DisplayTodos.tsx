import React, {useContext, useState} from 'react';
import ViewTodo from './ViewTodo.tsx'
import Header from "./Header.tsx";
import TodoForm from '../modalForms/TodoForm.tsx';
import DeleteModal from '../customModals/DeleteModal.tsx';
import {ResultsContext} from "../contexts/ResultsContext.tsx";
import Alert from "./Alert.tsx";
import DisplayTable from "./DisplayTable.tsx";

const DisplayTodos: React.FC = () => {

    const [currentId, setCurrentId] = useState<undefined | number>(undefined);

    const [data, setData] = useState(null);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(() => {
        return {message: '', alertType: ''}
    });

    const removeAlert = () => {
        setTimeout(() => {
            setAlertMessage({message: '', alertType: ''});
        }, 3000);

    }

    const results = useContext(ResultsContext);

    const closeFormModal = () => {
        setIsFormOpen(false);
        setCurrentId(undefined);
        removeAlert();
    }

    const closeViewModal = () => {
        setIsViewOpen(false);
        setCurrentId(undefined);
    }
    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setCurrentId(undefined);
        removeAlert();
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'User Id',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            render: (text, record) => (
                record.completed ? "✔" : '❌'
            )
        },{
            title: 'View',
            key: 'view',
            render: (text, record) => (
                <button onClick={() => handleView(record.id)} className="btn btn-primary">
                    View
                </button>
            ),
        },
        {
            title: 'Update',
            key: 'update',
            render: (text, record) => (
                <button onClick={() => handleUpdate(record.id)} className="mx-2 btn btn-secondary">
                    Update
                </button>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (text, record) => (
                <button onClick={() => handleDelete(record.id)} className="btn btn-danger">
                    Delete
                </button>
            ),
        },
    ]

    const handleView = (id: number) => {
        setIsViewOpen(true);
        setCurrentId(id);
        const viewTodo = results.find(record => record.id === id);
        setData(viewTodo);
    }


    const handleUpdate = (index: number) => {
        setIsFormOpen(true);
        setCurrentId(index);
        setData(results[index]);
    }

    const handleDelete = (index: number) => {
        setCurrentId(index);
        setIsDeleteOpen(true);
    }
    return (
        <>
            <Header title='Todos'/>
            <hr/>
            <Alert alertMessage={alertMessage}/>
            <button className='btn btn-dark' onClick={() => setIsFormOpen(true)}>Add Todo</button>
            <DisplayTable dataSource={results} columns={columns} />
            {isFormOpen && currentId !== undefined &&
                <TodoForm handleAlert={setAlertMessage} idToUpdate={currentId} method='PUT' closeModal={closeFormModal}/>}
            {isDeleteOpen && <DeleteModal id={currentId} dataType='todos' handleAlert={setAlertMessage} index={currentId}
                                          closeModal={closeDeleteModal}/>}
            {isViewOpen && <ViewTodo data={data} closeModal={closeViewModal}/>}
            {isFormOpen && currentId === undefined &&
                <TodoForm handleAlert={setAlertMessage} method='POST' closeModal={closeFormModal}/>}

        </>

    )
}

export default DisplayTodos;