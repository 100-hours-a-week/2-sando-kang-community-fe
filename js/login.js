import { emailValidCheck, pwValidCheck } from '../util/validation.js';
import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';
  
  const signInTxt = document.querySelector('.signin-button')
  const inputEmail = document.getElementById('email')
  const inputPassword = document.getElementById('password')
  const submit = document.querySelector('.login-button')
  let emailError = document.getElementById('emailError')
  let pwError = document.getElementById('passwordError')

  function validateForm() {
    let emailCheck = false
    let pwCheck = false

    if (!inputEmail.value.trim() || !emailValidCheck(inputEmail.value.trim())) {
      emailError.innerText = '  *올바른 이메일 주소 형식을 입력해주세요.'
      emailError.style.visibility = 'visible'
    } else {
      emailCheck = true
      emailError.style.visibility = 'hidden'
    }

    if (!inputPassword.value.trim()) {
      pwError.style.visibility = 'visible'
      pwError.innerText = '* 비밀번호를 입력해주세요.'
    } else if (!pwValidCheck(inputPassword.value.trim())) {
      pwError.innerText =
        '  *비밀번호는 8자 이상, 20자 이하이며, \n 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
        pwError.style.visibility = 'visible'
    } else {
      pwCheck = true
      pwError.style.visibility = 'hidden'
    }

    if (emailCheck && pwCheck) {
      submit.style.backgroundColor = '#7f6aee'
      submit.style.cursor = 'pointer'
      
      saveLocalStorage('email', inputEmail.value.trim());
      saveLocalStorage('pw', inputPassword.value.trim());
     
      return true
    }else{
      submit.style.backgroundColor = '#ACA0EB'
    }
  }

//NOTE: 로그인
submit.addEventListener('click', (event) => {
    event.preventDefault()
    if (validateForm()) {
      
      const email = getLocalStorage('email');
      const pw = getLocalStorage('pw');
     
      fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pw,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const success = data.success;
        if(success){
          alert('로그인이 정상적으로 이루어졌습니다.')
          const userId = data.data.user_id; 
          saveLocalStorage("userId", userId); 
          handleLocation("/html/Posts.html");
        }else{
          alert(`로그인이 되지 않았습니다. : ${data.message.code}`);
        }
      })
      .catch(error => console.error("Error:", error));
    }    
  });


  if (signInTxt) {
    signInTxt.addEventListener('click', () =>
    handleLocation('/html/signin.html'),
    )
  }

inputEmail.addEventListener('input', validateForm)
inputPassword.addEventListener('input', validateForm)
