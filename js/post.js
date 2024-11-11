import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';

const textarea = document.getElementById('text');
const commentSubmitDiv = document.querySelector('.comment-submit');

const commentModal = document.querySelector('.comment-modal');
const commentBtnOpenModal=document.querySelector('.comment-delete');
const commentDeleteCancel = document.querySelector('#comment-cancel');
const commentDeleteOk = document.querySelector('#comment-ok');

const modal = document.querySelector('.modal');
const btnOpenModal=document.querySelector('.delete');
const deleteCancel = document.querySelector('#cancel');
const deleteOk = document.querySelector('#ok');
const authorName = document.querySelector('.author-name');

const modifyBtn = document.querySelector(".edit");

const commentSubmit = document.querySelector('.comment-submit');

const editButtons = document.querySelectorAll('.comment-edit');
const submitButton = document.querySelector('.comment-submit');
const commentField = document.getElementById('text');

window.addEventListener('DOMContentLoaded', function () {
    
    applyPostDataToPage();
    
    // NOTE: 댓글 불러오는 로직 필요
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const commentDiv = event.target.closest('.comment'); 
            const commentContent = commentDiv.querySelector('.comment-content p').innerText; 
            
            commentField.value = commentContent;
            currentEditComment = commentDiv; 

            submitButton.innerText = '댓글 수정';
        });
    });
 
     submitButton.addEventListener('click', () => {
         if (currentEditComment) { 
             const newContent = commentField.value.trim(); 
 
             if (newContent) { 
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

function applyPostDataToPage() {
    const fields = {
        title: { selector: 'h2', attribute: 'innerText' },
        content: { selector: '.post-article p', attribute: 'innerText' },
        date: [
            { selector: '.author-info span:nth-child(2)', attribute: 'innerText' },
            { selector: '.date', attribute: 'innerText' }
        ],
        profile: { selector: '.post-img img', attribute: 'src' },
        author: { selector: '.author-name', attribute: 'innerText' },
        likes: { selector: '#likesCount', attribute: 'innerText', suffix: ' 좋아요' },
        views: { selector: '#viewsCount', attribute: 'innerText', suffix: ' 조회수' },
        comments: { selector: '#commentsCount', attribute: 'innerText', suffix: ' 댓글' }
    };

    Object.keys(fields).forEach(key => {
        const value = getLocalStorage(key);
        if (!value) return;

        const field = fields[key];
        const elements = Array.isArray(field) ? field : [field];

        elements.forEach(({ selector, attribute, suffix = '' }) => {
            const element = document.querySelector(selector);
            if (element) element[attribute] = value + suffix;
        });
    });
}

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


function updatePostStats() {
    
    fetch('') 
        .then(response => response.json())
        .then(data => {
            document.getElementById('likesCount').innerText = `${formatNumber(data.likes)} 좋아요수`;
            document.getElementById('viewsCount').innerText = `${formatNumber(data.views)} 조회수`;
            document.getElementById('commentsCount').innerText = `${formatNumber(data.comments)} 댓글`;
        })
        .catch(error => console.error('Error fetching post stats:', error));
}


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


