import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom'
import Header from "./Header.tsx";
import UpdateComponent from "./UpdateComponent.tsx";

interface DisplayCommentsProps{
    results: unknown;
}

const DisplayComments:React.FC<DisplayCommentsProps> = ({results, handleResults}) =>{
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate()
    const handleView = (index:number)=>{
        navigate(`/viewcomment/${index}`)
    }

    const sliceComment = (comment:string, size: number) => {
        if (comment.length> size){
            return comment.slice(0,size)+'...'
        }
        return comment;
    }

    const handleUpdate = (index:number)=>{
        setUpdate(true)
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
            {update && <UpdateComponent handleModify={handleUpdate} results={results} handleResults={handleResults} />}
            </>

    )
}
export default DisplayComments;

