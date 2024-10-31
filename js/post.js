// 글 작성 시 버튼 색상 변경
const textarea = document.getElementById('text');
const commentSubmitDiv = document.querySelector('.comment-submit');
// 댓글 삭제 모달
const commentModal = document.querySelector('.comment-modal');
const commentBtnOpenModal=document.querySelector('.comment-delete');
const commentDeleteCancel = document.querySelector('#comment-cancel');
const commentDeleteOk = document.querySelector('#comment-ok');
// 글 삭제 모달
const modal = document.querySelector('.modal');
const btnOpenModal=document.querySelector('.delete');
const deleteCancel = document.querySelector('#cancel');
const deleteOk = document.querySelector('#ok');
const authorName = document.querySelector('.author-name');
// 수정 버튼 클릭 시 수정 페이지 이동
const modifyBtn = document.querySelector(".edit");
//댓글 등록 시 서버 요청 후 데이터 저장 
const commentSubmit = document.querySelector('.comment-submit');
// 댓글 수정
const editButtons = document.querySelectorAll('.comment-edit');
const submitButton = document.querySelector('.comment-submit');
const commentField = document.getElementById('text');


function modifyHandler(){
    const title = document.querySelector('h2').innerText;
    const content = document.querySelector('.post-article p').innerText;
    localStorage.setItem('editTitle', title);
    localStorage.setItem('editContent', content);
    handleLocation("/html/edit post.html");
}

function formatNumber(num) {
    if (num >= 100000) {
        return Math.floor(num / 1000) + 'k'; 
    } else if (num >= 10000) {
        return (num / 1000).toFixed(0) + 'k'; 
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return num.toString(); 
    }
}

// 좋아요, 조회수, 댓글 업데이트 함수
function updatePostStats() {
    
    fetch('')  //  엔드포인트
        .then(response => response.json())
        .then(data => {
            document.getElementById('likesCount').innerText = `${formatNumber(data.likes)} 좋아요수`;
            document.getElementById('viewsCount').innerText = `${formatNumber(data.views)} 조회수`;
            document.getElementById('commentsCount').innerText = `${formatNumber(data.comments)} 댓글`;
        })
        .catch(error => console.error('Error fetching post stats:', error));
}


// 페이지 로드 시 수정된 데이터 적용
window.addEventListener('DOMContentLoaded', function () {
    
    const updatedTitle      = localStorage.getItem('updatedTitle');
    const updatedContent    = localStorage.getItem('updatedContent');
    const updatedDate       = localStorage.getItem('updatedDate');
    const updatedImage      = localStorage.getItem('updatedImage'); 

    let currentEditComment = null;

    // 수정된 데이터가 있는 경우 페이지에 반영
    if (updatedTitle) {
        document.querySelector('h2').innerText = updatedTitle;
    }
    if (updatedContent) {
        document.querySelector('.post-article p').innerText = updatedContent;
    }

    if (updatedDate) {
        this.document.querySelector('.author-info span:nth-child(2)').innerText = updatedDate;
    }

    if (updatedImage) {
        this.document.querySelector('.post-img img').src = updatedImage;
    }

    // 수정 버튼 클릭 이벤트
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const commentDiv = event.target.closest('.comment'); 
            const commentContent = commentDiv.querySelector('.comment-content p').innerText; 
            
            commentField.value = commentContent;
            currentEditComment = commentDiv; 

            submitButton.innerText = '댓글 수정';
        });
    });
 
     // 댓글 수정 버튼 클릭 이벤트
     submitButton.addEventListener('click', () => {
         if (currentEditComment) { 
             const newContent = commentField.value.trim(); 
 
             if (newContent) { // 내용이 비어있지 않은 경우에만 수정
                 currentEditComment.querySelector('.comment-content p').innerText = newContent;
                 
                 
                 const now = new Date();
                 const formattedDate = now.getFullYear() + '-' +
                                    String(now.getMonth() + 1).padStart(2, '0') + '-' +
                                    String(now.getDate()).padStart(2, '0') + ' ' +
                                    String(now.getHours()).padStart(2, '0') + ':' +
                                    String(now.getMinutes()).padStart(2, '0') + ':' +
                                    String(now.getSeconds()).padStart(2, '0');

                 currentEditComment.querySelector('.comment-author span:nth-child(2)').innerText = formattedDate;

                
                 commentField.value = '';
                 submitButton.innerText = '댓글 등록';
                 currentEditComment = null;
             } else {
                 alert('댓글 내용을 입력해주세요.');
             }
         }
     });
});

textarea.addEventListener('input', function() {
    if (textarea.value.trim() !== '') {
        commentSubmitDiv.disabled = true;
        commentSubmitDiv.style.backgroundColor = '#7F6AEE'; // 글자가 있을 때 색상 변경
        commentSubmitDiv.style.color= '#fff';
    } else {
        commentSubmitDiv.disabled = false;
        commentSubmitDiv.style.backgroundColor = '#ACA0EB'; // 글자가 없을 때 원래 색상으로
    }
});

modifyBtn.addEventListener("click", modifyHandler);

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
}); 

deleteCancel.addEventListener("click", ()=>{
    modal.style.display="none";
})

deleteOk.addEventListener("click", ()=>{
    alert(authorName.innerText+"의 글이 삭제 되었습니다.")
    modal.style.display="none";
})

commentBtnOpenModal.addEventListener("click", ()=>{
    commentModal.style.display="flex";
}); 

commentDeleteCancel.addEventListener("click", ()=>{
    commentModal.style.display="none";
})

// TODO: 댓글 삭제 시 서버 요청 후 데이터 삭제
commentDeleteOk.addEventListener("click", ()=>{
    ///
})
// TODO: 댓글 등록 시 서버 요청 후 데이터 저장
commentSubmit.addEventListener('click',()=>{
    ///
})

function handleLocation(url) {
    window.location.href = url
}
