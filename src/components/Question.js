import React from 'react'
import styles from '../styles/Question.module.css'
import { useHistory } from 'react-router-dom'

function Question(props) {
  const history = useHistory();
  const {id, pageId, title, writer, createDate, likes, views} = props;

  return (
    <li key={id} className={styles.li} onClick={() => history.push(pageId === 1 ? `/question/${id}` : `/codequestion/${id}`)}>
      <div className={styles.title}>{title} {likes !== 0 ? `[${likes}]` : ''}</div>
      <div className={styles.writer}>{writer}</div>
      <div className={styles.dated}>{createDate}</div>
      <div className={styles.hit}>{views}</div>
    </li>
  )
}

export default Question
