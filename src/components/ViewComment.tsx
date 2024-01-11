import React from 'react';
import {useParams, useNavigate} from "react-router-dom";


const ViewComment = ({results}) =>{
    let {index} = useParams();
    let element = parseInt(index);
    const data = results[element];
    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/comments/');
    }
    return(
        <>

            <div style={{width:'60%', border: '1px solid gray'}} className='mx-auto my-3'>
                <h2>post Id: {data.postId}</h2>
                <h2>user: {data.id}</h2>
                <h3>{data.name}</h3>
                <h4 style={{fontWeight: '400'}}>By - {data.email}</h4>
                <h4 style={{fontWeight: '400'}}>{data.body}</h4>
                <button className="btn btn-primary my-2" onClick={handleBack}>back</button>
            </div>
        </>
    )

}

export default ViewComment;