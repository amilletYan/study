import React,{Component} from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'

//..............................redux.............................
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
    let reducers=[];
    reducers.push(...allReducers);
    return reducers;
};

//...........................react-redux................................
class Provider extends Component{
    getChildContext(){
        return {
            store:this.props.store
        }
    }

    render(){
        return (
            <div>{this.props.children}</div>
        )
    }
}

Provider.childContextTypes={
    store:PropTypes.object
}

let connect=(mapStateToProps,mapDispathchToProps)=>(WrappedComponent)=>{
    class Connect extends Component{
        constructor(){
            super()
            this.state={
                allProps:{}
            }
            this.updateAllProps=this.updateAllProps.bind(this)
        }
        
        updateAllProps(){
            const {store}=this.context;
            let stateProps=mapStateToProps(store.getState(),this.props);
            let dispatchProps=mapDispathchToProps(store.dispatch,this.props);
            this.setState({
                allProps:{
                    ...stateProps,
                    ...dispatchProps,
                    ...this.props
                }
            })
        }
        componentWillMount(){
           const {store}=this.context;    
           this.updateAllProps();
           store.subscribe(this.updateAllProps);
        }

        render(){
            return (
                <WrappedComponent {...this.state.allProps}/>
            )
        }
    }
    Connect.contextTypes={
        store:PropTypes.object
    }   

    return Connect;
}


//........................test....................................

function titleReducer(state,action){
    if(!state) return {
        title:{name:"title1",color:"red"},
        content:{author:"men1",about:"love"}
    };
    switch(action.type){
        case 'TITLE':
        if(state.title.color=="green") action.titleColor="red"
        return{
            ...state,
            title:{
                ...state.title,
                color:action.titleColor
            }
        }
        default:
          return state;
    }
}

function contentReducer(state,action){
    if(!state) return {
        title:{name:"title",color:"red"},
        content:{author:"men",about:"love"}
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

let unsubscribe=store.subscribe(render);

function mapStateToProps(state,props){
    return {
        name:state.title.name,
        color:state.title.color,
        author:state.content.author,
        about:state.content.about,
        words:props.words
    }
}

function mapDispathchToProps(dispatch,props){
   return{
       onHandleColor:()=>{dispatch({type:"TITLE",titleColor:"green"});},
       onHandleAuthor:()=>{dispatch({type:"CONTENT",contentAuthor:"women"});}
   }
}

class Book extends Component{
      render(){
          return (
              <div>
              <h1 style={{color:this.props.color}}>{this.props.name}</h1>
              <h2><span>{this.props.author+`  `}</span> <span>{this.props.about}</span></h2>
              <h3>{this.props.words}</h3>
              <button onClick={this.props.onHandleColor}>color</button>
              <button onClick={this.props.onHandleAuthor}>author</button>
              </div>
          )
      }
}

let WrapBook=connect(mapStateToProps,mapDispathchToProps)(Book);

let rootElement=document.getElementById("root");

ReactDom.render(
    <Provider store={store}>
          <WrapBook words="另外，我们稍微调整了一下，在调用 mapStateToProps 和 mapDispatchToProps 之前做判断，让这两个参数都是可以缺省的，这样即使不传这两个参数程序也不会报错"/>
    </Provider>,
    rootElement
)

