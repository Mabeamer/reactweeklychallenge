import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(){
    super();
    this.upComment = this.upComment.bind(this);
    this.downComment = this.downComment.bind(this);
    this.pageComment = this.pageComment.bind(this);
    this.saveUserComment = this.saveUserComment.bind(this);
    this.saveUserReply = this.saveUserReply.bind(this);
    this.displayComment = this.displayComment.bind(this);
    this.replyComment = this.replyComment.bind(this);
    this.state=   {
      newComment:"",
      replyComment:"",
      userReplyComment:[],
      userComment:[],              
      thumbsUp:[0],
      thumbsDown:[0],
      rThumbsUp: [0],
      rThumbsDown: [0],
    }
  }
  saveUserComment(e){
    let saveUserInput = e.target.value;
    this.setState({
      newComment: saveUserInput,
    })
  }
    saveUserReply(e){
    let saveUserInput = e.target.value;
    this.setState({
      replyComment: saveUserInput,
    })
  }
  pageComment(e){
    e.preventDefault();
    let stateCopy = Object.assign({}, this.state);
    let newUserComment = {};
    newUserComment.comment = stateCopy.newComment;
    newUserComment.numbThumbsUp = 0;
    newUserComment.numbsThumbsDown = 0;
    newUserComment.userReply = [];
    newUserComment.addThumbsUp = (function(){
      this.numbThumbsUp ++;
    })
    stateCopy.userComment.push(newUserComment);
    this.setState({
      stateCopy,
    });
  }
    replyComment(e){
    e.preventDefault();
    let stateReplyCopy = Object.assign({}, this.state);
    let newUserComment = new Object();
    newUserComment.replyComment = stateReplyCopy.replyComment;
    newUserComment.replyThumbsUp = 0;
    newUserComment.replyThumbsDown = 0;
    console.log("testing function execution");
    newUserComment.addThumbsUp = (function(){
      this.replyThumbsUp ++;
    })
    stateReplyCopy.userReplyComment.push(newUserComment);
    this.setState({
      stateReplyCopy,
    });
  }
  upComment(index){
    let currentComment = this.state.userComment[index]
    this.state.userComment[index].numbThumbsUp ++;
     this.state.userComment[index] = currentComment;
    this.setState({
      currentComment,
    });
  }
  // reply likes for individual stuff
    replyUpComment(index){
    let currentComment = this.state.userReplyComment[index]
    this.state.userComment[index].replyThumbsUp ++;
    this.state.userComment[index] = currentComment;
    this.setState({
      currentComment,
    });
  }
  downComment(index){
    let currentComment = this.state.userComment[index]
    this.state.userComment[index].numbsThumbsDown ++;
    this.state.userComment[index] = currentComment;
    this.setState({
      currentComment,
    });
  }
  displayComment(){
    this.state.userComment(function(object, i){
      return(
        <ul>
          <li key={i} onClick={()=>this.display[i]} />
          </ul>
        )
    },this)


  }
  render() {
    return (
      <div className="App">
        <input type="text" name="comment" onChange={this.saveUserComment}/> <input type="submit" name="submitComment" value="Submit" onClick={this.pageComment}/>
        <p>Comments</p>

            {this.state.userComment.map((item, index) => (
          <ul key={index}>
            <li className='indent' key={`top-${index}`}> {item.comment} 
            <button onClick={()=>{this.upComment(index)}} value={index}>&#128077;</button>{item.numbThumbsUp}
            <button onClick={()=>{this.downComment(index)}}>&#128078;</button>{item.numbsThumbsDown}
            <input type="text" name="reply" onChange={this.saveUserReply}/><input type="submit" name="replyComment" value="Reply" onClick={this.replyComment} />
            <p>Replies</p>
            </li>
              {this.state.userReplyComment.map((item, childindex) => (
            <li className='indent' key={childindex}> {item.replyComment} 
            <button onClick={()=>{this.upComment(index)}} value={childindex}>&#128077;</button>{item.replyThumbsUp}
            <button onClick={()=>{this.downComment(index)}}>&#128078;</button>{item.replyThumbsDown}
            </li>
            ))}
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
