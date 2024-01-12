import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useInput} from "../CustomHooks/useInput.tsx";

const UpdatePost:React.FC = ({results, handleResults}) =>{
    const {index} = useParams();
    let element = parseInt(index);
    const data = results[element];
    const navigate = useNavigate();
    const handleCancel = () =>{
        navigate('/todos/');
    }

    const [title, setTitle] = useInput(data.title);
    const [completed, setCompleted] = useInput(data.completed);
    const handleUpdate = () => {
        const slicedResultFront = results.slice(0, index);
        const slicedResultBack = results.slice(index+1);
        const updatedResults =[...slicedResultFront, {
            "userId": data.userId,
            "id": data.id,
            "title": title,
            "completed": completed
        }, ...slicedResultBack];
        handleResults(updatedResults)

        navigate('/todos/');
    }
    return(
        <>
           <form className='mx-auto my-2' style={{ width: '30%', border: '1px solid gray', padding: '0.5em 0.5em' }}>
    <div className="form-group">
        <label htmlFor="userId">User Id</label>
        <input disabled={true} type="text" value={data.userId} className="form-control" id="userId" />
    </div>
    <div className="form-group">
        <label htmlFor="commentId">Comment Id</label>
        <input disabled={true} type="text" value={data.id} className="form-control" id="commentId" />
    </div>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" value={title} className="form-control" onChange={(event) => setTitle(event.target.value)} id="title" placeholder="Title" />
    </div>
    <div className="form-group">
        <label htmlFor="status">Status</label>
        <div onClick={() => setCompleted(!completed)} className="btn">
            {completed ? "✔" : '❌'}
        </div>
    </div>
    <button type="submit" className="my-3 btn btn-primary" onClick={handleUpdate}>Update</button>
</form>
L̥
            <button className="btn btn-danger my-2" onClick={handleCancel}>cancel</button>
        </>
    )
}

export default UpdatePost;



