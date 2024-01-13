
const Actions = {
    SET: 'set_user',
    REMOVE: 'remove_user'
}

const UserReducer = (user, action) =>{
    switch (action.type){
        case Actions.SET: {
            const email = action.payload.email
            const password = action.payload.password
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            return email
        }
        case Actions.REMOVE: {
            return null
        }
    }
}

export default UserReducer;