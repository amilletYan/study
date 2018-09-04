import React from 'react'
import PropTypes from 'prop-types'
    class Comment extends React.Component{
        constructor(){
            super()
            this.state={timeString:""}
            this.setTimeString=this.setTimeString.bind(this)
            this.onHandleClick=this.onHandleClick.bind(this);
        }

        setTimeString(){
                if(this.props.comment){
                    let beg=Date.now();
                    let end=new Date(this.props.comment.time);
                    let duration=(beg-end)/1000;
                    let timeString=Math.round(Math.max(duration,1))+"秒前";
                    if(duration>60) timeString=Math.round(duration/60)+"分前";
                    else if(duration>60*60) timeString=Math.round(duration/3600)+"小时前";
                    else if(duration>60*60*24) timeString=Math.round(duration/(3600*24))+"天前";
                    this.setState({timeString})
                }  
        }

        onHandleClick(){
            this.props.onHandleClick(this.props.index)
        }
       //设置时间更新定时器
        componentWillMount(){
       //先设置一遍时间差
        this.setTimeString();
         this.timer=setInterval(this.setTimeString,5000)
        }
        
        componentWillUnmount(){
            clearInterval(this.timer);
        }
        render(){
            return (
        
                <div className="comment">  
                  <span className="comment-user">{this.props.comment.user}</span>：
                  <span>{this.props.comment.content}</span>
                  <span onClick={this.onHandleClick}>删除</span>
                  <div className="comment-time">{this.state.timeString}</div>
                </div>
                
             
            )
        }
    }

    Comment.propTypes={
        //给props的属性指定类型，不同时会给warning
        comment:PropTypes.object.isRequired
    }

export default Comment

