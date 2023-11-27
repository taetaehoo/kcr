import React from 'react'
import styles from '../styles/UpdateButton.module.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function UpdateButton({id, pageId}) {
  
  return (
    <button>
      <Link to={pageId === 1 ? `/question/update/${id}` : `/codequestion/update/${id}`}>게시글 수정</Link>
    </button>
  )
}

export default UpdateButton
