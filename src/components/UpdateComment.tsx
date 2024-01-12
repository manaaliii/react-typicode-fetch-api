import React from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {useInput} from "../CustomHooks/useInput.tsx";

const UpdateComment:React.FC = ({index,results, handleResults, handleModify}) =>{
 
    const data = results[index];
    const navigate = useNavigate();
    const handleCancel = () =>{
        navigate('/comments/');
    }

    const [name, setName] = useInput(data.name);
    const [body, setBody] = useInput(data.body);
    const handleUpdate = () => {
        const slicedResultFront = results.slice(0, index);
        const slicedResultBack = results.slice(index+1);
        const updatedResults =[...slicedResultFront,{
            "postId": data.postId,
            "id": data.id,
            "name": name,
            "email": data.email,
            "body": body
        }, ...slicedResultBack];
        handleResults(updatedResults)
        handleUpdate();
    }
    return(
        <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}

export default UpdateComment;



