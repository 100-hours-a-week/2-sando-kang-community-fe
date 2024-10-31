// TODO: 요구사항에 맞춘 추가 작업 필요
// 게시글 작성 버튼 클릭 시 게시글 작성 페이지로 이동
const backBtn = document.querySelector(".page-back");
const title = document.getElementById('title');
const content = document.getElementById('content');
const submit = document.getElementById('submit-button');
const fileInput = document.getElementById('image');


function validateForm() {
    let titleCheck = false
    let contentCheck = false

    if(title.value.trim()){
        titleCheck = true;
    }else titleCheck = false;

    if(content.value.trim()){
        contentCheck = true;
    }else contentCheck = false;

    if (titleCheck && contentCheck ) {
        submit.style.backgroundColor = '#7f6aee'
        submit.style.cursor = 'pointer'
        return true
    }else{
        submit.style.backgroundColor = '#ACA0EB'
    }
}

title.addEventListener('input', validateForm)
content.addEventListener('input', validateForm);

backBtn.addEventListener('click', () => {
    history.go(-1);
})

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const updatedImg = URL.createObjectURL(file);
        const fileName = updatedImg.split('/').pop();
        document.querySelector('.file-name').innerText = fileName;
    }else {
        console.log("파일이 선택되지 않았습니다.");
      }
});

function handleLocation(url) {
    window.location.href = url
}
