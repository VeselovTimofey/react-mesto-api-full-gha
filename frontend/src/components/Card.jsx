import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Card extends React.Component {

  static contextType = CurrentUserContext;

  handleClick() {
    this.props.onCardClick(this.props.cardInfo);
  }

  handleLikeClick() {
    this.props.onCardLike(this.props.cardInfo);
  }

  handleDeleteClick() {
    this.props.onCardDelete(this.props.cardInfo);
  }

  render() {
    const isOwn = this.props.cardInfo.owner === this.context._id;
    const isLiked = this.props.cardInfo.likes.some(i => i === this.context._id);
    const cardLikeButtonClassName = (`element__like ${isLiked && 'element__like_active'}`);

    return (
      <article className="element">
        {isOwn && <button className="element__delete" type="button" onClick={this.handleDeleteClick.bind(this)}></button>}
        <img className="element__image" src={this.props.cardInfo.link} alt={this.props.cardInfo.name} onClick={this.handleClick.bind(this)}/>
        <h2 className="element__name">{this.props.cardInfo.name}</h2>
        <div className="element__like-frame">
          <button className={cardLikeButtonClassName} type="button" onClick={this.handleLikeClick.bind(this)}></button>
          <p className="element__like-number">{this.props.cardInfo.likes.length}</p>
        </div>
      </article>
    )
  }
}

export default Card;