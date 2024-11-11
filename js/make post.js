import { getLocalStorage, saveLocalStorage } from '../util/session.js';

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
        
        saveLocalStorage('title', title.value.trim());
        saveLocalStorage('content', content.value.trim());

    }else{
        submit.style.backgroundColor = '#ACA0EB'
    }
}

function makePost(event) {
    event.preventDefault();

    const userId = 1;
    const title = getLocalStorage('title');
    const content = getLocalStorage('content');
    const image = getLocalStorage('imageUrl');

    fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id : userId,
            title: title,
            content: content,
            image : image
          }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('게시글 작성이 완료되었습니다!');
            window.location.href = '/html/Posts.html';
        } else {
            console.error('게시글 작성 실패:', data.message);
            alert('게시글 작성에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
    });
    
}

title.addEventListener('input', validateForm)
content.addEventListener('input', validateForm);
submit.addEventListener('click', makePost);

backBtn.addEventListener('click', () => {
    history.go(-1);
})

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const updatedImg = URL.createObjectURL(file);
        const fileName = updatedImg.split('/').pop();
        saveLocalStorage('imageUrl', fileName);
        document.querySelector('.file-name').innerText = fileName;
    }else {
        console.log("파일이 선택되지 않았습니다.");
      }
});

