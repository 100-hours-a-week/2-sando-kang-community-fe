import { emailValidCheck, pwValidCheck, confirmPwValidCheck, nicknameValidCheck } from './util/validation.js';
import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';

const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const inputNickname = document.getElementById('nickname');
const submit = document.getElementById('submit-button');
let emailError = document.getElementById('emailError');
let pwError = document.getElementById('passwordError');
let cfPwError = document.getElementById('confirmPasswordError');
let nicknameError = document.getElementById('nicknameError');

//NOTE: 파일 입력 요소와 이미지 및 버튼 요소 선택
const fileInput = document.getElementById('fileInput');
const profileImage = document.getElementById('profileImage');
const uploadButton = document.getElementById('uploadButton');
const profileImageContainer = document.getElementById('profileImageContainer');
const backButton = document.querySelector('.back-button');
let imageCheck = false


function validateForm() {
    let emailCheck = false
    let pwCheck = false
    let cfPwCheck = false
    let nicknameCheck = false
    

    //NOTE: 이메일 유효성 검사
    if (!inputEmail.value.trim() || !emailValidCheck(inputEmail.value.trim())) {
      emailError.innerText = '  *올바른 이메일 주소 형식을 입력해주세요.'
      emailError.style.display = 'block'
    } else {
      emailCheck = true
      emailError.style.display = 'none'
    }

    //NOTE: 비밀번호 유효성 검사
    if (!inputPassword.value.trim()) {
        pwError.style.display = 'block'
        pwError.innerText = '  *비밀번호를 입력해주세요.'
    } else if (!pwValidCheck(inputPassword.value.trim())) {
        pwError.innerText = '  *비밀번호는 8자 이상, 20자 이하이며, \n 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.'
        pwError.style.display = 'block'
    } else {
        pwCheck = true
        pwError.style.display = 'none'
    }

    // 비밀번호 확인 유효성 검사
    if(!confirmPassword.value.trim()) {
        cfPwError.style.display = 'block'
        cfPwError.innerText = '  *비밀번호를 한번 더 입력해주세요.'
    } else if(!confirmPwValidCheck(confirmPassword.value.trim())) {
        cfPwError.style.display = 'block'
        cfPwError.innerText = '  *비밀번호가 다릅니다.';
    }else{
        cfPwCheck = true
        cfPwError.style.display = 'none'
    }

    // 닉네임 유효성 검사
    nicknameCheck = nicknameValidCheck(inputNickname.value.trim());

    if (emailCheck && pwCheck && cfPwCheck && nicknameCheck) {
        submit.style.backgroundColor = '#7f6aee'
        submit.style.cursor = 'pointer'
       
        saveLocalStorage('email', inputEmail.value.trim());
        saveLocalStorage('pw', inputPassword.value.trim());
        saveLocalStorage('nickname', inputNickname.value.trim());

        return true;
    }else{
        submit.style.backgroundColor = '#ACA0EB'
        return false;
    }
  }

// TODO: 회원가입 api 연동 추가
submit.addEventListener('click', (event) => {
    event.preventDefault();

    if (validateForm()) {
      
      const email = getLocalStorage('email');
      const pw = getLocalStorage('pw');
      const nickname = getLocalStorage('nickname');
      const url = getLocalStorage('imageUrl');

      fetch(`http://localhost:3000/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: pw,
          nickname : nickname,
          profile : url
        }),
      })
      .then(response => response.json())
      .then(data => {
        const success = data.success; 
        const message = data.message;
        if(success){
          alert('회원가입이 정상적으로 이루어졌습니다.')
          handleLocation('/html/Posts.html');
        }else alert(`회원가입 문제 발생: ${message}`);
      })
      .catch(error => console.error("Error:", error));
    }else{
      console.log('nah')
      alert('뭐지')
    }    
  });
  
  
  inputEmail.addEventListener('input', validateForm)
  inputPassword.addEventListener('input', validateForm)
  confirmPassword.addEventListener('input', validateForm);
  inputNickname.addEventListener('input', validateForm);

  uploadButton.addEventListener('click', () => {
    fileInput.click();
  });

 fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const url = e.target.result;
            profileImage.src = url;
            profileImage.style.display = 'block';
            uploadButton.style.display = 'none';
            
            imageCheck = true;
            console.log(`File name: ${file.name}`); // 파일 이름만 출력
            saveLocalStorage('imageUrl', file.name); // 로컬 스토리지에 파일 이름만 저장
        };
        reader.readAsDataURL(file); // 파일 읽기 시작
    }
});


backButton.addEventListener('click', ()=>{
    handleLocation("/html/Log in.html");
})


