import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';

const backBtn = document.querySelector(".page-back");
const title = document.getElementById('title');
const content = document.getElementById('content');
const submit = document.getElementById('submit-button');
const fileInput = document.getElementById('image');

const profile = document.querySelector('.user-icon');


window.addEventListener('DOMContentLoaded', function () {

        const editProfile = getLocalStorage('profile');
        if(editProfile){
            profile.src = editProfile;

        }
})


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

//NOTE: 게시물 작성
function makePost(event) {
    event.preventDefault();

    const userId = getLocalStorage('userId');
    const title = getLocalStorage('title');
    const content = getLocalStorage('content');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", file);

    fetch('/api/post', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('게시글 작성이 완료되었습니다!');
            handleLocation('/html/Posts.html')
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
            document.querySelector('.file-name').innerText = file.name;
    } else {
        console.log("파일이 선택되지 않았습니다.");
    }
});




