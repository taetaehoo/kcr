import React, { useEffect, useState } from "react";
import styles from '../styles/WriteBoard.module.css'
import WriteTitle from "./WriteTitle";
import WriteContent from "./WriteContent";
import WriteButton from "./WriteButton";
import axiosInstance from '../utils/apis';
import CodeWriteBoard from "./CodeWriteBoard";
import { useLocation } from "react-router-dom";

function WriteBoard() {
  const location = useLocation();
  const path = location.pathname;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [codeVal, setCodeVal] = useState('');
  
  const handlePostRequest = () => {
    
    axiosInstance.post(path !== '/codequestion/add' ? '/api/question' : '/api/codequestion', {
      title: title,
      content: content,
      codeContent: codeVal,
      
    }).then(resp => console.log(resp))
    .catch(err => console.log(err));
  }

  const handleTitleChange = newText => {
    setTitle(newText);
  }

  const handleContentChange = newText => {
    setContent(newText);
  }

  const handleCodeChange = newCode => {
    setCodeVal(newCode);
  }

  useEffect(() => {
    console.log(codeVal)
  }, [codeVal])


  return(
    <div className={styles.container}>
    <div className={styles.WriteBoard}>
      <WriteTitle onTextChange={handleTitleChange}/>
      <div className={styles.Line}></div>
      <div className={styles.Line2}></div>
      <WriteContent id={1} onTextChange={handleContentChange}/>
    </div>
    {path === '/codequestion/add' ? <CodeWriteBoard handleCodeChange={handleCodeChange}/> : < ></>}
    <div>
      <div className={styles.didiv}></div>
      <WriteButton id={path === '/codequestion/add' ? 5 : 3} sendDataToParent={handlePostRequest}/>
    </div>
    </div>
  )
}

export default WriteBoard