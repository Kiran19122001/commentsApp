import {Component} from 'react'

import './index.css'

import {formatDistanceToNow} from 'date-fns'

class CommentItem extends Component {
  render() {
    const {
      commentsBar,
      urls,
      likeButtonUpdate,
      deleteButtonUpdate,
      isEmpty,
      isFavorite,
      date,
    } = this.props
    const {id, name, comments} = commentsBar
    const imageUrl = isFavorite ? urls[3] : urls[2]
    const postedDate = formatDistanceToNow(date)
    const onLikeButton = () => {
      likeButtonUpdate(id)
    }

    const onDeleteButton = () => {
      deleteButtonUpdate(id)
    }
    return (
      <li className="items">
        {isEmpty ? (
          ''
        ) : (
          <div>
            <div className="name-container">
              <p className="first-char">{name[0]}</p>
              <p className="name-full">{name}</p>
              <p>{postedDate}</p>
            </div>
            <p className="cmt">{comments}</p>

            <div className="icons">
              <button
                type="button"
                onClick={onLikeButton}
                className="icon-buttons"
              >
                <img src={imageUrl} alt="Like" />
              </button>
              <button
                data-testid="delete"
                type="button"
                onClick={onDeleteButton}
                className="icon-buttons"
              >
                <img src={urls[1]} alt="delete" />
              </button>
            </div>
          </div>
        )}
      </li>
    )
  }
}

export default CommentItem
