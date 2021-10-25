import axios from "axios";
import React, { useEffect, useState } from "react";
import { COMMENT_URL } from "./constant";

// const CommentList = ({ comments }) => {
//   const renderedComments = comments.map((comment) => {
//     let content;

//     if (comment.status === "approved") {
//       content = comment.content;
//     }

//     if (comment.status === "pending") {
//       content = "This comment is awaiting moderation";
//     }

//     if (comment.status === "rejected") {
//       content = "This comment has been rejected";
//     }

//     return <li key={comment.id}>{content}</li>;
//   });

//   return <ul>{renderedComments}</ul>;
// };

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    const comments = await axios.get(`${COMMENT_URL}/posts/${postId}/comments`);
    setComments(comments.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ul>
      {comments.length > 0 &&
        comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
    </ul>
  );
};

export default CommentList;
