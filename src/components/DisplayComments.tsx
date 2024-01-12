import React, {useState, useRef} from 'react';
import Header from "./Header.tsx";
import ViewComment from "./ViewComment.tsx";
import AddComment from './AddComment.tsx';

interface DisplayCommentsProps{
    results: unknown;
}

const DisplayComments:React.FC<DisplayCommentsProps> = ({results, handleResults}) =>{
    const [currentIndex, setCurrentIndex] = useState<undefined|number>(1);
    const [data, setData] = useState(null);
    const [name, setName] = useState(null);
    const [body, setBody] = useState(null);
    const [isAddViewOpen, setIsAddViewOpen] = useState<boolean>(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const handleView = (index:number)=>{
        setIsViewOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
    }

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const closeViewModal = () => {
        setIsViewOpen(false);
    }

    
    const closeAddModal = () => {
        setIsAddViewOpen(false);
    }

    const sliceComment = (comment:string, size: number) => {
        if (comment.length> size){
            return comment.slice(0,size)+'...'
        }
        return comment;
    }

    const handleUpdate = (index:number)=>{
        setIsModalOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
        setName(results[index].name);
        setBody(results[index].body);
        // setUpdate(true)
    }

    const handleModification = () => {
        const slicedResultFront = results.slice(0,currentIndex);
        const slicedResultBack = results.slice(currentIndex+1);
        const updatedResults =[...slicedResultFront,{
            "postId": data.postId,
            "id": data.id,
            "name": name,
            "email": data.email,
            "body": body
        }, ...slicedResultBack];
        handleResults(updatedResults)
        closeModal();
    }


    const handleDelete = (index:number)=>{
        const userConfirmation = window.confirm(`Are you sure you want to delete this post?`)
        if (userConfirmation){
            const newResults = [...results.slice(0, index), ...results.slice(index+1)]
            handleResults(newResults)
        }
    }

    return  (
        <>

            <Header title='comments' />
            <hr />
            
            <button className='btn btn-dark' onClick={()=>setIsAddViewOpen(true)}>Add Comment</button>
            <table className='table'>
                <thead>
                <tr>
                    <th scope="col">Post Id</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Body</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>

                </tr>
                </thead>
                <tbody>
                {results.map(({postId, id, name, email, body}, index)=>{
                    return(
                        <tr key={index}>
                            <td>{postId}</td>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{email}</td>
                            <td>{sliceComment(body,50)}</td>
                            <td>  <button onClick={()=>handleView(index)} className="btn btn-primary">View</button></td>
                            <td>
                                <button onClick={()=>handleUpdate(index)} className="mx-2 btn btn-secondary">Update</button></td>
                            <td>
                                <button onClick={()=>handleDelete(index)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
                {isModalOpen && (
                <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Update Comment</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                        
                    <form className='mx-auto my-2 container' style={{ width: '100%', border: '1px solid gray', padding: '0.5em 0.5em' }}>
    <div className="form-group my-3">
        <label htmlFor="postId">Post Id</label>
        <input disabled={true} type="text" value={data.postId} className="form-control" id="postId" />
    </div>
    <div className="form-group my-3">
        <label htmlFor="userId">User Id</label>
        <input disabled={true} type="text" value={data.id} className="form-control" id="userId" />
    </div>
    <div className="form-group my-3">
        <label htmlFor="email">Email</label>
        <input disabled={true} type="text" value={data.email} className="form-control" id="email" />
    </div>
    <div className="form-group my-3">
        <label htmlFor="name">Name</label>
        <input type="text" value={name} className="form-control" onChange={(event) => setName(event.target.value)} id="name" placeholder="Name" />
    </div>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <textarea value={body} className="form-control" onChange={(event) => setBody(event.target.value)} id="title" placeholder="Title" />
    </div>
</form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleModification}>Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
      )}

        {isViewOpen && <ViewComment data={data} closeModal={closeViewModal} />}
        {isAddViewOpen && <AddComment results={results} handleResults={handleResults} closeModal={closeAddModal} />}
            </>

    )
}
export default DisplayComments;

