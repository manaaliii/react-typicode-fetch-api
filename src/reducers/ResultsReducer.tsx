const Actions = {
    SET: 'set_result',
    REMOVE: 'remove_result',
    UPDATE: 'update_results',
    ADD: 'add_result'
}

const ResultsReducer = (results, action) => {
    switch (action.type) {
        case Actions.SET:{
            return action.payload.results
        }
        case Actions.REMOVE:{
            const id = action.payload.id;
            return  results.filter(result => result.id !== id);
        }
        case Actions.UPDATE:{
            const id = action.payload.id;
            const data = action.payload.data;
            console.log(data)
            return results.map((result) =>
                result.id === id ? data : result
            );
        }
        case Actions.ADD:{
            return [...results, action.payload.data]
        }
    }
}

export default ResultsReducer;
export {Actions};