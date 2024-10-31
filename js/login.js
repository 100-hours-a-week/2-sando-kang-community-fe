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
      return true
    }else{
      submit.style.backgroundColor = '#ACA0EB'
    }
  }

  // TODO: 로그인 api 연동 추가
  if (submit) {
    submit.addEventListener('click', (event) => {
      event.preventDefault()
      if (validateForm()) {
        
        handleLocation('')
      }
    })
  }

  // TODO: 회원가입 api 연동 추가
  if (signInTxt) {
    signInTxt.addEventListener('click', () =>
    handleLocation('/html/signin.html'),
    )
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

  inputEmail.addEventListener('input', validateForm)
  inputPassword.addEventListener('input', validateForm)

  function handleLocation(url) {
    window.location.href = url
  }