import React, {useContext, useRef, useState} from 'react';
import ViewComment from "./ViewComment.tsx";
import CommentForm from '../modalForms/CommentForm.tsx';
import Header from "./Header.tsx";
import DeleteModal from '../customModals/DeleteModal.tsx';
import {ResultsContext} from "../contexts/ResultsContext.tsx";
import Alert from "./Alert.tsx";
import DisplayTable from "./DisplayTable.tsx";


const DisplayComments: React.FC = () => {
    const [currentId, setCurrentId] = useState<undefined | number>(undefined);
    const [data, setData] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(() => {
        return {message: '', alertType: ''}
    });
    const commentListRef = useRef(null);

    const results = useContext(ResultsContext);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Post ID',
            dataIndex: 'postId',
            key: 'postId',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            render: (body, record)=>(sliceComment(body, 100))
        },
        {
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
    ];

    const removeAlert = () => {
        setTimeout(() => {
            setAlertMessage({message: '', alertType: ''});
        }, 3000);

    }

    const handleView = (id: number) => {
        setIsViewOpen(true);
        setCurrentId(id);
        const viewData = results.find(record => record.id === id);
        setData(viewData);
    }


    const closeViewModal = () => {
        setIsViewOpen(false);
        setCurrentId(undefined);
    }

    const closeFormModal = () => {
        setIsFormOpen(false);
        removeAlert();
        setCurrentId(undefined);
    }

    const closeDeleteModal = () => {
        setIsDeleteOpen(false);
        setCurrentId(undefined);
        removeAlert();
    }

    const sliceComment = (comment: string, size: number) => {
        if (comment.length > size) {
            return comment.slice(0, size) + '...'
        }
        return comment;
    }

    const handleUpdate = (index: number) => {
        setIsFormOpen(true);
        setCurrentId(index);
        setData(results[index]);
    }


    const handleDelete = (index: number) => {
        console.log(index)
        setCurrentId(index);
        setIsDeleteOpen(true);
    }

    return (
        <div ref={commentListRef}>

            <Header title='comments'/>
            <hr/>

            <Alert alertMessage={alertMessage}/>
            <button className='btn btn-dark' onClick={() => setIsFormOpen(true)}>Add Comment</button>
            <DisplayTable dataSource={results} columns={columns}/>
            {isFormOpen && currentId !== undefined &&
                <CommentForm method='PUT' idToUpdate={currentId} handleAlert={setAlertMessage}
                             closeModal={closeFormModal}/>}
            {isDeleteOpen &&
                <DeleteModal id={currentId} handleAlert={setAlertMessage} dataType='comments' index={currentId}
                             closeModal={closeDeleteModal}/>}
            {isViewOpen && <ViewComment data={data} closeModal={closeViewModal}/>}
            {isFormOpen && currentId === undefined &&
                <CommentForm method='POST' handleAlert={setAlertMessage} closeModal={closeFormModal}/>}
        </div>

    )
}
//
//
// const DisplayComments: React.FC = () => {
//     const [currentIndex, setCurrentIndex] = useState<undefined | number>(undefined);
//     const [data, setData] = useState(null);
//     const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
//     const [isViewOpen, setIsViewOpen] = useState(false);
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//     const [alertMessage, setAlertMessage] = useState(() => {
//         return {message: '', alertType: ''}
//     });
//     const commentListRef = useRef(null);
//
//     const results = useContext(ResultsContext);
//
//     const removeAlert = () => {
//         setTimeout(() => {
//             setAlertMessage({message: '', alertType: ''});
//         }, 3000);
//
//     }
//
//     const handleView = (index: number) => {
//
//         setIsViewOpen(true);
//         setCurrentIndex(index);
//         setData(results[index]);
//     }
//
//
//     const closeViewModal = () => {
//         setIsViewOpen(false);
//         setCurrentIndex(undefined);
//     }
//
//     const closeFormModal = () => {
//         setIsFormOpen(false);
//         removeAlert();
//         setCurrentIndex(undefined);
//     }
//
//     const closeDeleteModal = () => {
//         setIsDeleteOpen(false);
//         setCurrentIndex(undefined);
//         removeAlert();
//         // commentListRef.current.scrollIntoView();
//     }
//
//     const sliceComment = (comment: string, size: number) => {
//         if (comment.length > size) {
//             return comment.slice(0, size) + '...'
//         }
//         return comment;
//     }
//
//     const handleUpdate = (index: number) => {
//         setIsFormOpen(true);
//         setCurrentIndex(index);
//         setData(results[index]);
//     }
//
//
//     const handleDelete = (index: number) => {
//         setCurrentIndex(index);
//         setIsDeleteOpen(true);
//     }
//
//     return (
//         <div ref={commentListRef}>
//
//             <Header title='comments'/>
//             <hr/>
//
//             <Alert alertMessage={alertMessage}/>
//             <button className='btn btn-dark' onClick={() => setIsFormOpen(true)}>Add Comment</button>
//             <table className='table' ref={commentListRef}>
//                 <thead>
//                 <tr>
//                     <th scope="col">Post Id</th>
//                     <th scope="col">Id</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Body</th>
//                     <th scope="col">View</th>
//                     <th scope="col">Update</th>
//                     <th scope="col">Delete</th>
//
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {results.map(({postId, id, name, email, body}, index) => {
//                     return (
//                         <tr key={index}>
//                             <td>{postId}</td>
//                             <td>{id}</td>
//                             <td>{name}</td>
//                             <td>{email}</td>
//                             <td>{sliceComment(body, 50)}</td>
//                             <td>
//                                 <button onClick={() => handleView(index)} className="btn btn-primary">View</button>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleUpdate(index)} className="mx-2 btn btn-secondary">Update
//                                 </button>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDelete(index)} className="btn btn-danger">Delete</button>
//                             </td>
//                         </tr>
//                     )
//                 })}
//                 </tbody>
//             </table>
//             {isFormOpen && currentIndex !== undefined &&
//                 <CommentForm method='PUT' index={currentIndex} handleAlert={setAlertMessage}
//                              closeModal={closeFormModal}/>}
//             {isDeleteOpen && <DeleteModal handleAlert={setAlertMessage} dataType='comments' index={currentIndex}
//                                           closeModal={closeDeleteModal}/>}
//             {isViewOpen && <ViewComment data={data} closeModal={closeViewModal}/>}
//             {isFormOpen && currentIndex === undefined &&
//                 <CommentForm method='POST' handleAlert={setAlertMessage} closeModal={closeFormModal}/>}
//         </div>
//
//     )
// }
export default DisplayComments;