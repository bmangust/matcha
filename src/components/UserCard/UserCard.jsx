import React from "react";
import { Card } from "@material-ui/core";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRight";
import css from "./UserCard.module.css";

const UserCard = (props) => {
  const { username, age, images, tags } = props;
  const [displayedImage, setDisplayedImage] = React.useState(0);
  const imageRow = React.useRef(null);
  const swipeLeft = (e) => {
    if (displayedImage !== 0)
      setDisplayedImage((prevDisplayedImage) => prevDisplayedImage - 1);
  };

  const swipeRight = (e) => {
    if (displayedImage < images.length - 1)
      setDisplayedImage((prevDisplayedImage) => prevDisplayedImage + 1);
  };

  const buttons = (
    <>
      <button className={css.UserCard__left} onClick={(e) => swipeLeft(e)}>
        <ChevronLeftRoundedIcon color="primary" />
      </button>
      <button className={css.UserCard__right} onClick={(e) => swipeRight(e)}>
        <ChevronRightRoundedIcon color="primary" />
      </button>
    </>
  );

  const offset = displayedImage * -500;
  return (
    <Card className={css.UserCard}>
      <div className={css.UserCard__imageWrapper}>
        {images.length > 1 ? buttons : null}
        <div
          ref={imageRow}
          className={css.UserCard__imageRow}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {images.map((el) => (
            <img
              className={css.UserCard__image}
              src={el}
              key={el.split("/").pop()}
            />
          ))}
        </div>
      </div>
      <div className={css.UserCard__info}>
        <div className={css.UserCard__header}>
          <h3 className={css.UserCard__username}>{username}</h3>
          <h4 className={css.UserCard__age}>{age}</h4>
        </div>
        <div className={css.UserCard__tags}>
          {tags.map((el) => (
            <span key={el}>{el}</span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
