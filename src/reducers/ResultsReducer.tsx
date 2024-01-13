const Actions = {
    SET: 'set_result',
    REMOVE: 'remove_result',
    UPDATE: 'update_results',
    ADD: 'add_result'
}

const ResultsReducer = (results, action) => {
    console.log(action);
    switch (action.type) {
        case Actions.SET:{
            return action.payload.results
        }
        case Actions.REMOVE:{
            const index = action.payload.index
            const frontSlice = results.slice(0, index);
            const backSlice = results.slice(index + 1);
            return [...frontSlice, ...backSlice]
        }
        case Actions.UPDATE:{
            const index = action.payload.index
            console.log(index);
            const frontSlice = results.slice(0, index);
            const backSlice = results.slice(index + 1);
            const newResult = action.payload.data;
        
            return [...frontSlice, newResult,...backSlice]
        }
        case Actions.ADD:{
            return [...results, action.payload.data]
        }
    }
}

export default ResultsReducer;
export {Actions};