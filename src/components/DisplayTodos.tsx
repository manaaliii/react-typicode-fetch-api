import React from 'react';
import {useNavigate} from "react-router-dom";
import Header from "./Header.tsx";

const DisplayTodos:React.FC = ({results, handleResults}) =>{

    const navigate = useNavigate()
    const handleView = (index:number)=>{
        navigate(`/viewtodo/${index}`)
    }
    const sliceTodo = (todo:string, size: number) => {
        if (todo.length> size){
            return todo.slice(0,size)+'...'
        }
        return todo;
    }
    const handleUpdate = (index:number)=>{
        navigate(`/updatetodo/${index}`)
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
            <Header title='Todos' />
            <hr />
            <table className='table'>
                <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">completed</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>

                </tr>
                </thead>
                <tbody>
                {results.map(({userId, id, title, completed}, index)=>{
                    return(
                        <tr key={index}>
                            <td>{userId}</td>
                            <td>{id}</td>
                            <td>{title}</td>
                            <td>{completed ? "✔":'❌'}</td>
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
export default DisplayTodos;