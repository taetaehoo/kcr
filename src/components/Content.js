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
import GptComment from './GptComment'
import UpdateButton from './UpdateButton'
import DeleteButton from './DeleteButton'

function Content() {

  const {Id} = useParams();
  const [data, setData] = useState('');
    const [contents, setContents] = useState({});
    const [comms, setComments] = useState({});
    const [gpt, setGpt] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    const onClickAddi = event => {
      setCurrentPage += 1;
    }

    const handlePostRequest = () => {
    
      axiosInstance.post(`/question/${Id}/comment`, {
        content: data
      }).then(resp => console.log(resp))
      .catch(err => console.log(err));
    }

  useEffect(() => {
    axiosInstance.get(`/question/${Id}`)
      .then(resp => {
        setContents(resp.data);
        setComments(resp.data.questionComments);
        setGpt(resp.data.chatGPT.content);
      })
      
      .catch(error => {
        console.error('데이터를 불러오는 중 오류 발생 : ', error);
      });
  }, [Id]);

  useEffect(()=> {
    console.log(comms)
  }, [comms])

  const handleContent = newVal => {
    setData(newVal);
  }

  return (
    <div className={styles.contentBox}>
      <QnAContentHeader title={contents.title} author={contents.writer} dated={contents.createDate} hit={contents.views}/>

      <hr className={styles.hr}/>
        <QnAContentBox content={contents.content} liked={contents.likes} hashtags={[]}/>

        <UpdateButton id={Id} pageId={1}/> <DeleteButton id={Id} pageId={1}/>

        <hr className={styles.hr}></hr>

        <WriteContent id={2} onTextChange={handleContent}/> <WriteButton id={1} sendDataToParent={handlePostRequest}/>

        <hr className={styles.hr}></hr>
        <GptComment gpt={gpt}/>
        <div>
      {/* 댓글 렌더링 */}
      <Comments comments={comms} />

      {/* 페이지 이동 버튼 */}
      <button onClick={onClickAddi}>더 보기</button>
    </div>
    </div>
  )
}

export default Content