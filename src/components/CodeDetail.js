import React from 'react'
import styles from '../styles/Content.module.css'
import QnAContentHeader from './QnAContentHeader'
import QnAContentBox from './QnAContentBox'
import WriteContent from './WriteContent'
import Comments from './Comments'
import WriteButton from './WriteButton'
import { useEffect, useState } from 'react'
import axiosInstance from '../utils/apis'
import { useParams } from 'react-router-dom'
import CodeWriteBoard from './CodeWriteBoard'
import UpdateButton from './UpdateButton'
import DeleteButton from './DeleteButton'
import CodeComments from './CodeComment'

function CodeDetail({comment}) {
  const {Id} = useParams();
  console.log()
  const [data, setData] = useState('');
    const [contents, setContents] = useState({});
    const [comms, setComments] = useState({});
    const [codeVal, setCodeVal] = useState('');
    const [code, setCode] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    const onClickAddi = event => {
      setCurrentPage += 1;
    }

    const handleCodeChange = newCode => {
      setCode(newCode);
    }

    const handlePostRequest = () => {
    
      axiosInstance.post(`/codequestion/${Id}/codecomment`, {
        content: data,
        codeContent: code,
        writer: "ddag"
      }).then(resp => console.log(resp))
      .catch(err => console.log(err));
    }

  useEffect(() => {
    axiosInstance.get(`/codequestion/${Id}`)
      .then(resp => {
        setContents(resp.data);
        setComments(resp.data.codeQuestionComment);
        setCodeVal(resp.data.codeContent);
      })
      
      .catch(error => {
        console.error('데이터를 불러오는 중 오류 발생 : ', error);
      });
  }, [Id]);

  const handleContent = newVal => {
    setData(newVal);
  }

  return (
    <div className={styles.contentBox}>
      <QnAContentHeader title={contents.title} author={contents.writer} dated={contents.createDate} hit={contents.views}/>

      <hr className={styles.hr}/>
        <QnAContentBox content={contents.content} liked={contents.likes} hashtags={[]}/>

        <code>{codeVal}</code>
        <hr></hr>

        <UpdateButton id={Id} pageId={2}/> <DeleteButton id={Id} pageId={2}/>

        <hr className={styles.hr}></hr>

        <WriteContent id={2} onTextChange={handleContent}/>
        <CodeWriteBoard handleCodeChange={handleCodeChange}/>
        <WriteButton id={1} sendDataToParent={handlePostRequest}/>

        <hr className={styles.hr}></hr>
        
        <div>
      {/* 댓글 렌더링 */}
      <CodeComments comments={comms} />

      {/* 페이지 이동 버튼 */}
      <button onClick={onClickAddi}>더 보기</button>
    </div>
    </div>
  )
}

export default CodeDetail
