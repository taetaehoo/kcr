import React, { useContext, useState } from "react";
import styles from "../styles/Login.module.css";
import "../styles/MainCSS.css";
import axios from "axios";
import instance from '../utils/apis'
import { useHistory } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Login() {
    const {isLogin, setIsLogin} = useContext(AuthContext);
    const [loginId, setLoginId] = useState("");
    const [loginPw, setLoginPw] = useState("");
    const [ msg, setMsg ] = useState("");
    const history = useHistory(); 

   
        function handleClick() {
            const data = {
                loginId : loginId,
                loginPw : loginPw
        };
    
        
        instance.post('/api/signin', data)
        .then(resp => {
            setIsLogin(true)
            history.push('/')
        })
        .catch(error => {
            console.error('Error:', error);
            console.log("로그인 실패"); // 실패 메시지 설정
        });
        
      };
     

    return (
        <div className="Login_wapper">
        <div className={styles.Login_title} style={{ display: "flex", alignItems: "center" }}>
        <h2>로그인</h2>
        </div>
        <div className={styles.login_contents}>
          <form className={styles.id_wapper} style={{ display: "flex" }}>
            <div style={{color:'red'}}>인증메일을 확인해주세요!</div>
            <div className="input_id">아이디</div>
            <input type="id_email" placeholder="       @kumoh.ac.kr" id="id_email" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          </form>
          <div className={styles.pwd_wapper} style={{ display: "flex" }}>
            <div className="input_pwd"> 비밀번호</div>
            <input type="password" id="pwd" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} />
          </div>
  
          <div className={styles.login_button_wapper}>
            <div className="button-wapper_login">
              <button type="submit" onClick={handleClick}>로그인</button>
            </div>
            <div className="button-wapper_register">
              <button>회원가입</button>
            </div>
          </div>
          {msg}
        </div>
      </div>
    );
}


export default Login;