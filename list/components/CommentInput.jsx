import React,{Component} from 'react'

class CommentInput extends Component
{
   constructor(){
     super();
     this.state={
       user:"",
       content:"",
       time:new Date()
     };
     this.onHandleChange=this.onHandleChange.bind(this);
     this.onHandleClick=this.onHandleClick.bind(this);
     this.onHandleUserBlur=this.onHandleUserBlur.bind(this);
   }
   onHandleChange(event){
      let obj=event.target;
      switch (obj.type){
        case "text": this.setState({user:obj.value});break;
        case "textarea" :this.setState({content:obj.value});break;
      } 
    } 
    
    onHandleClick(){
      if(this.state.user!=""&&this.state.content!=""){
        this.state.time=new Date();
        this.props.onClick(this.state);
        //提交后清空content，只更改content，其他属性不变
        this.setState({content:""});
      }
    }
   
    onHandleUserBlur(event){
        localStorage.setItem("user",event.target.value) 
    }

    componentDidMount(){
      this.textarea.focus();
    }
    
    componentWillMount(){
      let user=localStorage.getItem("user");
      if(user){
        this.state.user=user;
      //这里调用setState，组件会更新state(貌似不是实时更新，state并没改变)，但是只渲染一次，与在componentDidMount中调用不一样
       //this.setState({user:user});
        //console.log(this.state)
       
      }
    }
    render(){
        return (
        <div className="comment-input">

            <div className="comment-field-user">
              <span className="comment-field-username">用户名：</span>
              <input className="comment-field-userinput"  value={this.state.user} onChange={ this.onHandleChange} onBlur={this.onHandleUserBlur}/> 
            </div>

            <div className="comment-field-content">
              <span className="comment-field-contentname">评论内容：</span>
              <textarea className="comment-field-contentinput" value={this.state.content} onChange={this.onHandleChange} ref={(textarea)=>this.textarea=textarea}/>
            </div>

            <div>
              <button className="comment-field-button" onClick={this.onHandleClick} >提交</button>
            </div>

        </div>
        );
    }
}

export default CommentInput