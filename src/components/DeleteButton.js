import React, {useState} from 'react'
import styles from '../styles/DeleteButton.module.css'
import axiosInstance from '../utils/apis';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function DeleteButton({id, pageId}) {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const clickConfirm = event => {
    axiosInstance.delete(pageId === 1 ? `/api/question/${id}` : `/api/codequestion/${id}`)
    .then(resp => {
      console.log(resp)
      history.push('/question')
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <button onClick={toggleModal}>게시물 삭제</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            정말 삭제하시겠습니까?
            <button onClick={clickConfirm}>삭제</button>
            <button onClick={toggleModal}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteButton
