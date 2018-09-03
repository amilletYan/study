import React,{Component} from 'react'
import Comment from './Comment.jsx'

class CommentList extends Component{
    constructor(){
        super();
        this.onHandleClick=this.onHandleClick.bind(this);
    }
    
    onHandleClick(index){
       this.props.onHandleClick(index);
    }

    render(){
        return (
            <div className='comment-list'>
              {this.props.comments.map((comment, i) =>{
                  return(
                      <div  key={i}>
                    <Comment comment={comment} index={i} onHandleClick={this.onHandleClick}/>
                    {/* 外层花括号用于写jsx代码，内层花括号将style属性包装成一个对象  */}
                    <hr style={{width:'430px',color:'black'}}/>
                       </div> 
                  )}  
              )}
            </div>
          )
    }
}
//目前静态属性唯一写法，静态方法可以用static写在类里
// CommentList.defaultProps={
//     comments:[{user:"jack",content:"hello"},{user:"jack",content:"hello"},{user:"jack",content:"hello"},{user:"jack",content:"hello"}]
// } 
export default CommentList