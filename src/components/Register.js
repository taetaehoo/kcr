import React, { useState, useCallback } from 'react';
import axiosInstance from '../utils/apis'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {
  const [stuNum, setStuNum] = useState('');
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [nickname, setNickname] = useState('');
  const history = useHistory();
  //const [isValidateId, setISValidateId] = useState(false);
  //const [isValidatePw, setISValidatePw] = useState(false);


  const handleStuNumChange = (e) => {
    setStuNum(e.target.value);
  };
  const handleLoginIdChange = (e) => {
    setLoginId(e.target.value);
  };
  const handleLoginPwChange = (e) => {
    setLoginPw(e.target.value);
  };
  const handleConfirmPwdChange = (e) => {
    setConfirmPwd(e.target.value);
  };
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  
/*

//id : 특수문자 X, 8자리 이상 12자리 이하
const validateId = (id) => {
  if(id.match(/(?=.*[!@#$%^&*])/)||id.match(//)) alert("잘못된 아이디 :("); 
  return false;
  else
};

   //이메일
   const onChangeId = useCallback(async (e) => {
    const currEmail = e.target.value;
    setLoginId(currEmail);
    if (validateId(currEmail)) alert("올바른 이메일 형식입니다.");
    //else alert("올바른 이메일 형식입니다.");
});



//pw : 특수문자 상관X, 8자리 이상 15자리 이하
const validatePwd = (pw) => {
  return pw
      .toLowerCase()
      .match(/(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,12}/);
};

//비밀번호
  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    setLoginPw(currPwd);
    if (!validatePwd(currPwd)) alert("영문, 숫자,  조합으로 8자리 이상 입력해주세요.");
    //else alert("안전한 비밀번호입니다.");
}, []);



const isAllValid = stuNum && validateId(loginId) && validatePwd(loginPw) && nickname;
*/

  // 회원가입 처리 함수
  const authRegister = () => {
        const data = {
          stuNum : stuNum,
          loginId : loginId,
          loginPw : loginPw,
          nickname : nickname
        }

      axiosInstance.post('/api/signup', data)
      .then(resp => {
        const cookies = document.cookie;
        console.log(cookies)
        alert('회원가입이 완료되었습니다');
        history.push('/signin')
      })
      .catch(err => {
          console.log(err)
      })
  };


  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <input type="text" placeholder="학번" value={stuNum} onChange={handleStuNumChange} />
        <input type="email" placeholder="웹메일" value={loginId} onChange={handleLoginIdChange} />
        <input type="password" placeholder="비밀번호" value={loginPw} onChange={handleLoginPwChange} />
        <input type="password" placeholder="비밀번호를 다시 입력하세요" value={confirmPwd} onChange={handleConfirmPwdChange} />
        <input type="text" placeholder="닉네임" value={nickname} onChange={handleNicknameChange} />
        <button type="submit" onClick={authRegister} >가입하기</button>


      </div>
      <div className="register_btn">
      </div>
    </div>
  );
}

export default Register
