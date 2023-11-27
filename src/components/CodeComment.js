import React, { useState } from 'react'
import styles from '../styles/Comments.module.css'
import { IoIosHeartEmpty } from "react-icons/io";
import { TfiComment } from "react-icons/tfi";
import { IoHeart } from "react-icons/io5";
import ReComment from './ReComment';
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

function CodeComments({ comments }) {
    console.log(comments)
  const [clickedComments, setClickedComments] = useState({});
  const [clickedReComms, setClickedReComms] = useState({});

  const toggleLike = (commentId) => {
    setClickedComments((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],

    }));
    console.log(clickedComments[commentId])
  };

  const toggleReComment = commentId => {
    setClickedReComms(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const renderComments = (commentList) => {
    if (!Array.isArray(commentList)) {
      // commentList가 배열이 아니면 빈 배열로 처리하여 렌더링 에러를 방지합니다.
      return [];
    }
    return commentList.map(comment => (
      <div key={comment.code_question_comment_id} className={comment.parent_id === null ? styles.commentBox : styles.commentBox2}>
        <div className={styles.commentBoxContent}>
          <p className={styles.pTag1}>{comment.writer}</p>
          <p className={styles.pTag2}>{comment.createdate}</p>
          <p className={styles.commentIcon} onClick={() => toggleReComment(comment.code_question_comment_id)}>
            <TfiComment />
          </p>
          <p className={styles.likeIcon} onClick={() => toggleLike(comment.code_question_comment_id)}>
            {clickedComments[comment.code_question_comment_id] ? <IoHeart /> : <IoIosHeartEmpty />}
          </p>
          <p className={styles.liked}>{comment.likes}</p>
        </div>
        <p className={styles.pTag3}>{comment.content}</p>
        {comment.codeContent ? (
  <code>{comment.codeContent}</code>
) : null}
        {clickedReComms[comment.code_question_comment_id] ? <ReComment question_comment_id={comment.code_question_comment_id}/> : <></>}
        {comment.childComments && comment.childComments.length > 0 && (
          <div className={styles.childComments}>
            <MdOutlineSubdirectoryArrowRight />
            {renderComments(comment.childComments)}
          </div>
        )}
      </div>
    ));
        }

  return (
    <div>
      <p className={styles.lenTag}>댓글 [{comments.length}]</p>
      {renderComments(comments)}
    </div>
  );
}

export default CodeComments;