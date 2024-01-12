import React, {useState} from 'react';


const AddTodo:React.FC = ({results, handleResults, closeModal}) =>{
    const id = results.length + 1;
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState<boolean>(false);
    const handleAddPost = () =>{
        const UserId = parseInt(userId);
        if(UserId<1 || UserId>100  || userId===''){
            alert('Please enter user id between 1 and 100');
            return false;
        }
        if(title=='' || title.length< 5){
            alert('title must have at least 5 characters');
            return false;
        }
        
        handleResults([{
            "userId": userId,
            "id": id,
            "title": title,
            "completed": completed
        }, ...results])
        closeModal();
    }
    
return (
        <div className="modal fade show" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Add Todo</h5>
                        <button type="button" className="close" onClick={closeModal} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className='container-fluid'>
                                
                    <form className='mx-auto my-2' style={{ width: '100%', border: '1px solid gray', padding: '0.5em 0.5em' }}>
    <div className="form-group">
        <label htmlFor="userId">User Id</label>
        <input min={1} max={100} type="number" value={userId} className="form-control" id="userId" onChange={(event)=>setUserId(event.target.value)} />
    </div>
    <div className="form-group">
        <label htmlFor="todoId">Todo Id</label>
        <input disabled={true} type="text" value={id} className="form-control" id="todoId" />
    </div>
    <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" value={title} className="form-control" onChange={(event) => setTitle(event.target.value)} id="title" placeholder="Title" />
    </div>
    <div className="form-group">
        <label htmlFor="status">Status</label>
        <div id='status' onClick={() => setCompleted(!completed)} className="btn">
            {completed ? "✔" : '❌'}
        </div>
                    </div>
                    
        </form>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleAddPost}>Add</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default AddTodo;