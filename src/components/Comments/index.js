import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem/index'

import './index.css'



const urls = [
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png',
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png',
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png',
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png',
]

class Comments extends Component {
  state = {
    name: '',
    comments: '',
    commentsList: [],
    count: 0,
    content: '',
    isEmpty: true,
    isFavorite: false,
    date: new Date(),
  }

  handleChangeName = event => {
    this.setState({name: event.target.value})
  }

  handleChangeComments = event => {
    this.setState({comments: event.target.value})
  }

  addComments = event => {
    event.preventDefault()
    this.setState({content: ''})
    const {name, comments} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comments,
    }
    this.setState(prev => ({
      commentsList: [...prev.commentsList, newComment],
    }))
    if (name && comments !== '') {
      this.setState(prev => ({
        count: prev.count + 1,
      }))
      this.setState({isEmpty: false})
    } else {
      this.setState({content: '*Please provide some comments and a name'})
    }
    this.setState({name: '', comments: ''})
  }

  deleteButtonUpdate = id => {
    const {commentsList} = this.state
    const result = commentsList.filter(each => id !== each.id)
    console.log(result)
    this.setState({commentsList: result})
    this.setState(prev => ({count: prev.count - 1}))
  }

  likeButtonUpdate = id => {
    
    this.setState(prevState => ({
      isFavorite: !prevState.isFavorite,
    }))
  }

  render() {
    const {
      comments,
      name,
      commentsList,
      count,
      content,
      isEmpty,
      isFavorite,
      date,
    } = this.state
    return (
      <div className="main-container">
        <div className="comments-container">
          <h1 className="head">Comments</h1>
          <p className="para">Say something about 4.0 Technologies</p>
          <form className="submit-comment">
            <input
              type="text"
              className="input-name"
              placeholder="Your name"
              value={name}
              onChange={this.handleChangeName}
              required
            />
            <textarea
              className="comments"
              placeholder="Your Comment"
              rows="8"
              cols="35.5"
              value={comments}
              onChange={this.handleChangeComments}
            />

            <button
              type="button"
              className="add-button"
              onClick={this.addComments}
            >
              Add comment
            </button>
            <p className="error">{content}</p>
          </form>
          <div className="people-container">
            <img src={urls[0]} alt="comments" className="people-image" />
          </div>
          <div className="line" />
          <div className="count-comt">
            <p className="count">{count}</p>
            <p>comments</p>
          </div>
          <div className="comment-lists">
            <ul>
              {commentsList.map(eachComment => (
                <CommentItem
                  commentsBar={eachComment}
                  key={eachComment.id}
                  urls={urls}
                  isEmpty={isEmpty}
                  isFavorite={isFavorite}
                  date={date}
                  likeButtonUpdate={this.likeButtonUpdate}
                  deleteButtonUpdate={this.deleteButtonUpdate}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
