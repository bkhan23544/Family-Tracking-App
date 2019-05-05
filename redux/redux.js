import {createStore,applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

const initialState={
circlename:"",
circlekey:"",
memberDetails:[],
members:[],
circles:[]
}

const reducer=(state=initialState,action)=>{
    switch(action.type) {
        

        case "setcirclename":
            return { ...state, circlename: action.value };

            case "setcirclekey":
            return { ...state,circlekey:action.value}

            case "setMemberDetails":
            return { ...state,memberDetails:action.value}

            case "setMembers":
            return { ...state,members:action.value}

            case "setcircles":
            return { ...state,circles:action.value}


        default: 
            return state;
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))
export{store};

const setcirclename = (circlename) => {
    return {
        type: "setcirclename",
        value: circlename,
    };
}

const setcirclekey = (circlekey) => {
    return {
        type: "setcirclekey",
        value: circlekey,
    };
}

const setMemberDetails = (memberDetails) => {
    return {
        type: "setMemberDetails",
        value: memberDetails,
    };
}

const setMembers = (members) => {
    return {
        type: "setMembers",
        value: members,
    };
}

const setcircles = (circles) => {
    return {
        type: "setcircles",
        value: circles,
    };
}

export {setcirclename,setcirclekey,setMemberDetails,setMembers,setcircles};