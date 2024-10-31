const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const inputNickname = document.getElementById('nickname');
const submit = document.getElementById('submit-button');
let emailError = document.getElementById('emailError');
let pwError = document.getElementById('passwordError');
let cfPwError = document.getElementById('confirmPasswordError');
let nicknameError = document.getElementById('nicknameError');

// 파일 입력 요소와 이미지 및 버튼 요소 선택
const fileInput = document.getElementById('fileInput');
const profileImage = document.getElementById('profileImage');

const uploadButton = document.getElementById('uploadButton');
const profileImageContainer = document.getElementById('profileImageContainer');
const backButton = document.querySelector('.back-button');

function validateForm() {
    let emailCheck = false
    let pwCheck = false
    let cfPwCheck = false
    let nicknameCheck = false

    // 이메일 유효성 검사
    if (!inputEmail.value.trim() || !emailValidCheck(inputEmail.value.trim())) {
      emailError.innerText = '  *올바른 이메일 주소 형식을 입력해주세요.'
      emailError.style.display = 'block'
    } else {
      emailCheck = true
      emailError.style.display = 'none'
    }

    // 비밀번호 유효성 검사
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
        return true
    }else{
        submit.style.backgroundColor = '#ACA0EB'
    }
  }

  // TODO: 회원가입 api 연동 추가
  if (submit) {
    submit.addEventListener('click', (event) => {
      event.preventDefault()
      if (validateForm()) {
        alert('TODO: 서버 구축 후 회원가입 api 호출 예정');
        handleLocation('')
      }
    })
  }

  function emailValidCheck(email) {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+$/
    return pattern.test(email)
  }

  function pwValidCheck(value) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
      value,
    )
  }

  function confirmPwValidCheck(value) {
    return value === inputPassword.value.trim();
  }

  function nicknameValidCheck(value) {
    if (!value) {
        nicknameError.innerText = '  *닉네임을 입력해주세요.';
        nicknameError.style.display = 'block';
        return false;
    } else if (/\s/.test(value)) {
        nicknameError.innerText = '  *띄어쓰기를 없애주세요.';
        nicknameError.style.display = 'block';
        return false;
    } else if (value.length > 10) { 
        nicknameError.innerText = '  *닉네임은 최대 10자까지 작성 가능합니다.';
        nicknameError.style.display = 'block';
        return false;
    } else {
        nicknameError.style.display = 'none';
        return true;
    }
  }
  
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
              profileImage.src = e.target.result;
              profileImage.style.display = 'block';
              uploadButton.style.display = 'none';
          };
          reader.readAsDataURL(file);
      }
  });

  backButton.addEventListener('click', ()=>{
      handleLocation("/html/Log in.html");
  })


  function handleLocation(url) {
      window.location.href = url
  }


