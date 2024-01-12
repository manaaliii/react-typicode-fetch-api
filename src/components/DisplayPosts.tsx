import React, {useState} from 'react';
import Header from "./Header.tsx";
import ViewPost from "./ViewPost.tsx";
import AddPost from './AddPost.tsx';

interface DisplayPostsProps{
    results: unknown;
    handleResults: (results: unknown) => void;
}

const DisplayPosts:React.FC<DisplayPostsProps> = ({results, handleResults}) =>{
    
    const [currentIndex, setCurrentIndex] = useState<undefined|number>(undefined);
    const [data, setData] = useState(null);
    const [body, setBody] = useState(null);
    const [title, setTitle] = useState(null);
    const [isAddViewOpen, setIsAddViewOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isViewOpen, setIsViewOpen] = useState<boolean>(false);

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const closeViewModal = () => {
        setIsViewOpen(false);
    }

    const closeAddModal = () => {
        setIsAddViewOpen(false);
    }

    const handleView = (index:number)=>{
        setIsViewOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
    }

    const slicePost = (post:string, size: number) => {
        if (post.length> size){
            return post.slice(0,size)+'...'
        }
        return post;
    }

    const handleModification = () => {
        const slicedResultFront = results.slice(0,currentIndex);
        const slicedResultBack = results.slice(currentIndex+1);
        const updatedResults =[...slicedResultFront, 
        {"userId": data.userId,
        "id": data.id,
        "title": title,
        "body": body
    }    , ...slicedResultBack];
        handleResults(updatedResults)
        closeModal();
    }


    const handleUpdate = (index:number)=>{
        setIsModalOpen(true);
        setCurrentIndex(index);
        setData(results[index]);
        setTitle(results[index].title);
        setBody(results[index].body);
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
            <Header title='Posts' />
            <hr />
            <button className='btn btn-dark' onClick={()=>setIsAddViewOpen(true)}>Add Post</button>
            <table className='table'>
                <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>

                </tr>
                </thead>
                <tbody>
                {results.map(({userId, id, title, body}, index)=>{
                    return(
                        <tr key={index}>
                            <td>{userId}</td>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{slicePost(body,50)}</td>
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
        <label htmlFor="commentId">Comment Id</label>
        <input disabled={true} type="text" value={data.id} className="form-control" id="commentId" />
    </div>
    <div className="form-group my-3">
        <label htmlFor="userId">User Id</label>
        <input disabled={true} type="text" value={data.userId} className="form-control" id="userId" />
    </div>
    <div className="form-group my-3">
        <label htmlFor="title">Title</label>
        <input type="text" value={title} className="form-control" onChange={(event) => setTitle(event.target.value)} id="title" placeholder="Title" />
    </div>
    <div className="form-group">
        <label htmlFor="body">Body</label>
        <textarea value={body} className="form-control" onChange={(event) => setBody(event.target.value)} id="body" placeholder="Body" />
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

        {isViewOpen && <ViewPost data={data} closeModal={closeViewModal} />}
        {isAddViewOpen && <AddPost results={results} handleResults={handleResults} closeModal={closeAddModal} />}
        </>

    )
}
export default DisplayPosts;