import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styles from "../styles/main.module.css";
import axiosInstance from '../utils/apis.js';
import CodeContent from "./Codecontent.js";


function CodeHome() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
         const response = await axiosInstance.get('/codequestion/top/five');
         setBoardList(response.data.content);
          } catch (err) {
         console.error(err);
      }
   }
   fetchData();
    }, []);

  return(
      <div className={styles.Main_wapper}>
          <a className={styles.list}>Code</a>

          <div className={styles.list_wapper} style={{display: 'block'}}>
          {
         boardList && 
         boardList.map((board) => { 
          return (
             <CodeContent key={board.Id} contents={board} />
         )})}
            </div>
      </div>
  );
}

export default CodeHome;
