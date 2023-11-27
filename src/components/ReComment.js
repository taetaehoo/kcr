import React, { useState } from 'react'
import styles from '../styles/ReComment.module.css'
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import WriteReComment from './WriteReComment';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axiosInstance from '../utils/apis';


function ReComment({question_comment_id}) {
  const [content, setContent] = useState('');
  const {Id} = useParams();


  const clickBtn = event => {
    axiosInstance.post(`/codequestion/${Id}/codecomment/${question_comment_id}/child`, {
      content: content,
      codeContent: ''
    })
    .then(resp => {
      console.log(resp)
    })
    .catch(err => {
      console.error(err);
    })
  }

  const handleContentChange = newText => {
    setContent(newText);
  }

  return (
    <div className={styles.flexBox}>
    <MdOutlineSubdirectoryArrowRight />
      <WriteReComment onTextChange={handleContentChange}/>

      <button onClick={clickBtn}>대댓글 등록</button>
    </div>
    
  )
}

export default ReComment
