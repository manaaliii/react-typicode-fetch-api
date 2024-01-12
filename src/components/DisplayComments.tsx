import React, {useState, useRef} from 'react';
import { useNavigate} from 'react-router-dom'
import Header from "./Header.tsx";
import UpdateComment from "./UpdateComment.tsx";

interface DisplayCommentsProps{
    results: unknown;
}

const DisplayComments:React.FC<DisplayCommentsProps> = ({results, handleResults}) =>{
    const ref = useRef(null);
    const refClose = useRef<HTMLButtonElement|null>(null);
    // const [currentIndex, setCurrentIndex] = useState<undefined|number>(1);
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
        ref.current.click();
        console.dir(
            ref.current.click())
        console.dir(ref);
        // setCurrentIndex(index)
        // setUpdate(true)
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
                <button type="button" ref={ref}  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" >
                  Launch demo modal
                </button>

      <div className='modal fade' id="exampleModal"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
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

          {/* <UpdateComment index={currentIndex} handleModify={handleUpdate} results={results} handleResults={handleResults} />} */}
            </>

    )
}
export default DisplayComments;

