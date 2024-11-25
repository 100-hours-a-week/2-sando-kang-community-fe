import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';

const backBtn = document.querySelector(".back-button");
const modifyBtn = document.querySelector('.submit-button');
const fileInput = document.getElementById('image');


window.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');

    const editTitle = getLocalStorage('title');
    const editContent = getLocalStorage('content');

    if (editTitle) {
        titleInput.value = editTitle;
    }
    if (editContent) {
        contentTextarea.value = editContent;
    }
});

function clickHandler(){
    handleLocation("/html/post.html"); 
}

function modifyData(event) {
    event.preventDefault();

    const userId = getLocalStorage('userId');
    const postId = getLocalStorage('postId');
    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;
    const fileInput = document.getElementById('image');
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(`userId:  ${userId}`);
    console.log(`postId:  ${postId}`);
    console.log(`updatedTitle:  ${updatedTitle}`);
    console.log(`updatedContent:  ${updatedContent}`);
    console.log(`fileInput:  ${fileInput.files[0]}`);
    console.log(`date:  ${date}`);

    const arr = [userId,postId,updatedTitle,updatedContent,fileInput.files[0],date];
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('post_id', postId);
    formData.append('title', updatedTitle);
    formData.append('content', updatedContent);
    formData.append('date', date);
    formData.append('image', fileInput.files[0]);

    fetch(`/api/post`, {
        method: "PUT",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.success){
            alert('게시글 수정이 완료되었습니다.');
            saveLocalStorage('title', updatedTitle);
            saveLocalStorage('content', updatedContent);
            saveLocalStorage('updatePostDate' , date);

            handleLocation("/html/post.html");
        } else {
            alert(`게시글 수정 중 문제가 발생하였습니다. ${data.message}`);
        }
    })
    .catch(error => console.error("Error:", error));
}



modifyBtn.addEventListener("click", modifyData);
backBtn.addEventListener("click", clickHandler);

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
            document.querySelector('.file-name').innerText = file.name;
    } else {
        console.log("파일이 선택되지 않았습니다.");
    }
});



