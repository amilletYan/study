import React,{Component} from 'react'
import CommentInput from './CommentInput.jsx'
import CommentList from './CommentList.jsx'

class CommentApp extends Component{
    constructor(){
        super();
        this.onAddClick=this.onAddClick.bind(this);
        this.onDeleteClick=this.onDeleteClick.bind(this);
        this.state={comments:[]}
    }
    onAddClick(comment){
    this.state.comments.push(comment);
    //对象=>JSON
    localStorage.setItem("comments",JSON.stringify(this.state.comments));
    this.setState({
      comments: this.state.comments
    })
    }
    
    onDeleteClick(index){
        let comments=this.state.comments;
        comments.splice(index,1);
        this.setState({comments});
        localStorage.setItem("comments",JSON.stringify(comments));

    }

    componentWillMount(){
      let comments=localStorage.getItem("comments");
      if(comments){
          //JSON=>对象
        comments=JSON.parse(comments);
        this.setState({comments});
      }
    }

    render(){
        return (
            <div className="comment-app">
                <CommentInput onClick={this.onAddClick}/>
                <CommentList comments={this.state.comments} onHandleClick={this.onDeleteClick}/>
            </div>
        )
    }
}

export default CommentApp