import React, {useContext, useState} from 'react';
import Header from "./Header.tsx";
import ViewPost from "./ViewPost.tsx";
import PostForm from '../modalForms/PostForm.tsx';
import DeleteModal from '../customModals/DeleteModal.tsx';
import {ResultsContext} from "../contexts/ResultsContext.tsx";
import Alert from "./Alert.tsx";
import DisplayTable from "./DisplayTable.tsx";

const DisplayPosts: React.FC = () => {
    const [currentId, setCurrentId] = useState<undefined | number>(undefined);
    const [data, setData] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(() => {
        return {message: '', alertType: ''}
    });

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
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            render: (body, record)=>(
                slicePost(body, 120)
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


    const results = useContext(ResultsContext);

    const removeAlert = () => {
        setTimeout(() => {
            setAlertMessage({message: '', alertType: ''});
        }, 3000);

    }

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

    const handleView = (id: number) => {
        setIsViewOpen(true);
        setCurrentId(id);
        const viewPost = results.find(r => r.id === id);
        setData(viewPost);
    }

    const slicePost = (post: string, size: number) => {
        if (post.length > size) {
            return post.slice(0, size) + '...'
        }
        return post;
    }


    const handleUpdate = (index: number) => {
        setIsFormOpen(true);
        setCurrentId(index);
    }

    const handleDelete = (index: number) => {
        setCurrentId(index);
        setIsDeleteOpen(true);
    }

    return (
        <>
            <Header title='Posts'/>
            <hr/>
            <Alert alertMessage={alertMessage}/>
            <button className='btn btn-dark' onClick={() => setIsFormOpen(true)}>Add Post</button>
            <DisplayTable dataSource={results} columns={columns}/>

            {isFormOpen && currentId !== undefined &&
                <PostForm method='PUT' idToUpdate={currentId} handleAlert={setAlertMessage} closeModal={closeFormModal}/>}
            {isDeleteOpen &&
                <DeleteModal id={currentId} dataType='posts' handleAlert={setAlertMessage}
                             closeModal={closeDeleteModal}/>}
            {isViewOpen && <ViewPost data={data} closeModal={closeViewModal}/>}
            {isFormOpen && currentId === undefined &&
                <PostForm method='POST' handleAlert={setAlertMessage} closeModal={closeFormModal}/>}
        </>

    )
}

export default DisplayPosts;