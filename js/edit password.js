const inputPassword = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
let pwError = document.getElementById('passwordError');
let cfPwError = document.getElementById('confirmPasswordError');
const submit = document.getElementById('modify-button');



function validateForm() {

    let pwCheck = false
    let cfPwCheck = false

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

    if (pwCheck && cfPwCheck) {
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
        
        handleLocation('')
      }
    })
  }

  inputPassword.addEventListener('input', validateForm)
  confirmPassword.addEventListener('input', validateForm);

  function pwValidCheck(value) {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
      value,
    )
  }

  function confirmPwValidCheck(value) {
    return value === inputPassword.value.trim();
  }

  function handleLocation(url) {
    window.location.href = url
}