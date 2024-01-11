import React from 'react';
import { useNavigate} from 'react-router-dom'
import Header from "./Header.tsx";

interface DisplayPostsProps{
    results: unknown;
}

const DisplayPosts:React.FC<DisplayPostsProps> = ({results, handleResults}) =>{
    // console.log(results);

    const navigate = useNavigate()
    const handleView = (index:number)=>{
        navigate(`/viewpost/${index}`)
    }
    const slicePost = (post:string, size: number) => {
        if (post.length> size){
            return post.slice(0,size)+'...'
        }
        return post;
    }
    const handleUpdate = (index:number)=>{
        navigate(`/updatepost/${index}`)
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
        </>

    )
}
export default DisplayPosts;