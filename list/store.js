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
    console.log("title render")
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
    console.log("content render")
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
  let state=store.getState();
  console.log(state);
}





let store=new createStore(combineReducers(titleReducer,contentReducer));

store.subscribe(render);

store.dispatch({type:"TITLE",titleName:"title2"});