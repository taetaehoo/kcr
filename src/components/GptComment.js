import React from 'react'
import styles from '../styles/GptComment.module.css';

function GptComment({gpt}) {

  return (
    <div className={styles.container}>
      {gpt}
    </div>
  )
}

export default GptComment
