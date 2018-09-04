function createStore(reducers){
    let state=null;
    let listeners=[];
    let subscribe=(listener)=>{listeners.push(listener)};
    let dispatch=(action)=>{
        if(reducers.length!=0){
            reducers.forEach((reducer)=>{state=reducer(state,action)})
            listeners.forEach((listener)=>{listener()})
        } 
    }
    let getState=()=>state;
   
    if(typeof reducer!="undefined")
    reducers.push(reducer);
    dispatch({});
    return {getState,subscribe,dispatch}
}

function combineReducers(...allReducers){
    reducers=[];
    reducers.push(...allReducers);
    return reducers;
};

function titleReducer(state,action){
    if(!state) return {
        title:{name:"title1",color:"red"},
        content:{author:"men1",about:"love"}
    };
    switch(action.type){
        case 'TITLE':return{
            ...state,
            title:{
                ...state.title,
                name:action.titleName
            }
        }
        default:
          return state;
    }
}

function contentReducer(state,action){
    if(!state) return {
        title:{name:"title1",color:"red"},
        content:{author:"men1",about:"love"}
    };
    switch(action.type){
        case 'CONTENT':return{
            ...state,
            content:{
                ...state.content,
               author:action.contentAuthor
            }
        }
        default:
          return state;
    }
}

function render(){
  let newState=store.getState();
  if(oldState!=newState){
    if(oldState.title!=newState.title){
        console.log("render title");
    }
    if(oldState.content!=newState.content){
        console.log("render content");
    }
    oldState=newState;
  }
}





let store=new createStore(combineReducers(titleReducer,contentReducer));

let oldState=store.getState();

store.subscribe(render);

store.dispatch({type:"TITLE",titleName:"title2"});

store.dispatch({type:"TITLE",titleName:"title3"});

store.dispatch({type:"CONTENT",contentAuthor:"men2"});