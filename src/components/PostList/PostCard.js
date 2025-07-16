import React, { useState } from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Based on the API documentation, we should be using a URL constructed from the post ID
  // The images should be available at the following URL pattern
  const imageUrl = `https://picsum.photos/id/${post.id}/300/200`;

  return (
    <div className="post-card">
      <div className="post-card__image-container">
        {!imageLoaded && !imageError && (
          <div className="post-card__image-placeholder">
            <div className="post-card__loader"></div>
          </div>
        )}
        {!imageError && (
          <img
            src={imageUrl}
            alt={post.title}
            className={`post-card__image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        {imageError && (
          <div className="post-card__image-error">
            <span>No image available</span>
          </div>
        )}
      </div>
      <div className="post-card__content">
        <div className="post-card__date">{formatDate(post.published_at)}</div>
        <h3 className="post-card__title">{post.title}</h3>
      </div>
    </div>
  );
};

export default PostCard;
