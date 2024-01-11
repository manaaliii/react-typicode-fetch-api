import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useInput} from "../CustomHooks/useInput.tsx";

const UpdatePost:React.FC = ({results, handleResults}) =>{
    const {index} = useParams();
    let element = parseInt(index);
    const data = results[element];
    const navigate = useNavigate();
    const handleCanel = () =>{
        navigate('/posts/');
    }

    const [title, setTitle] = useInput(data.title);
    const [body, setBody] = useInput(data.body);
    const handleUpdate = () => {
        const slicedResultFront = results.slice(0, index);
        const slicedResultBack = results.slice(index+1);
        const updatedResults =[...slicedResultFront,{
            "userId": data.userId,
            "id": data.id,
            "title": title,
            "body": body
        }, ...slicedResultBack];
        handleResults(pdatedResults)

        navigate('/posts/');
    }
    return(
        <>
            <form className='mx-auto my-2' style={{width: '30%', border: '1px solid gray', padding: '0.5em 0.5em'}}>
                <div className="form-group">
                    <label htmlFor="inputEmail">Post Id</label>
                    <input disabled={true} type="text" value={data.postId} className="form-control"  />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">User Id</label>
                    <input disabled={true} type="text" value={data.id} className="form-control"  />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Email</label>
                    <input disabled={true} type="text" value={data.email} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputEmail">Title</label>
                    <input type="text" value={title} className="form-control" onChange={(event)=>setTitle(event.target.value)} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="inputPassword">Body</label>
                    <textarea value={body} className="form-control" onChange={(event)=>setBody(event.target.value)} placeholder="Password" />
                </div>
                <button type="submit" className="my-3 btn btn-primary" onClick={handleUpdate}>Update</button>
            </form>
            <button className="btn btn-danger my-2" onClick={handleCanel}>cancel</button>
        </>
    )
}

export default UpdatePost;



