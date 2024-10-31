// 게시글 작성 버튼 클릭 시 게시글 작성 페이지로 이동
const backBtn = document.querySelector(".back-button");
const modifyBtn = document.querySelector('.submit-button');
const fileInput = document.getElementById('image');


window.addEventListener('DOMContentLoaded', function () {
    const titleInput = document.getElementById('title');
    const contentTextarea = document.getElementById('content');

    // localStorage에서 기존 제목과 내용 가져오기
    const editTitle = localStorage.getItem('editTitle');
    const editContent = localStorage.getItem('editContent');

    // 가져온 데이터를 폼에 채움
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


function handleLocation(url) {
    window.location.href = url
}

function modifyData(e) {
    e.preventDefault();

    const updatedTitle = document.getElementById('title').value;
    const updatedContent = document.getElementById('content').value;
    const fileInput = document.getElementById('image');

    const now = new Date();
    const formattedDate = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const updatedImg = event.target.result; 

            // 로컬 스토리지에 데이터 저장
            localStorage.setItem('updatedTitle', updatedTitle);
            localStorage.setItem('updatedContent', updatedContent);
            localStorage.setItem('updatedDate', formattedDate);
            localStorage.setItem('updatedImage', updatedImg);

            // 페이지 이동
            handleLocation("/html/post.html");
        };

        reader.readAsDataURL(file); 
    } else {
        alert("이미지를 선택해주세요.");
    }
}

modifyBtn.addEventListener("click", modifyData);
backBtn.addEventListener("click", clickHandler);

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