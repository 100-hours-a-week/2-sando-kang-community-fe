import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';
import {getCurrentDate} from '../util/yyyymmdd.js';

const textarea = document.getElementById('text');
const likesCnt = document.getElementById('likesCount');

const commentModal = document.querySelector('.comment-modal');
const commentDeleteCancel = document.querySelector('#comment-cancel');
const commentDeleteOk = document.querySelector('#comment-ok');

const modal = document.querySelector('.modal');
const btnOpenModal=document.querySelector('.delete');
const deleteCancel = document.querySelector('#cancel');
const deleteOk = document.querySelector('#ok');
const authorName = document.querySelector('.author-name');

const modifyBtn = document.querySelector(".edit");
const commentContainer = document.querySelector('.comments-section');
const submitButton = document.querySelector('.comment-submit');

let selectedCommentId = null; 
let commentStatus = 0; 

window.addEventListener('DOMContentLoaded', function () {
    applyDataToPage(); 
});




async function applyDataToPage() {
    try {
        const postId = getLocalStorage("postId");
        console.log(`http://localhost:3000/api/post/${postId} 호출`)
        
        
        const response = await fetch(`http://localhost:3000/api/post/${postId}`);
        const responseData = await response.json();
        console.log('Fetched data:', responseData);

        if (!responseData || !responseData.data) {
            console.error('응답 데이터가 유효하지 않습니다:', responseData);
            return;
        }

        const postData = responseData.data.postData;
        if (!postData) {
            console.error('게시글 데이터가 없습니다.');
            return;
        }

        const fields = {
            title: { selector: 'h2', attribute: 'innerText' },
            content: { selector: '.post-article p', attribute: 'innerText' },
            updatePostDate: { selector: '.author-info span:nth-child(2)', attribute: 'innerText' },
            author: { selector: '.author-name', attribute: 'innerText' },
            likesCnt: { selector: '#likesCount', attribute: 'innerText', suffix: ' 좋아요' },
            viewsCnt: { selector: '#viewsCount', attribute: 'innerText', suffix: ' 조회수' },
            commentsCnt: { selector: '#commentsCount', attribute: 'innerText', suffix: ' 댓글' }
        };

        Object.keys(fields).forEach(key => {
            const value = postData[key];
            if (value == null) {
                console.log(`value 없음: ${key}`);
                value = 0;
            }

            const field = fields[key];
            const elements = Array.isArray(field) ? field : [field];

            elements.forEach(({ selector, attribute, suffix = '' }) => {
                const element = document.querySelector(selector);
                if (element) {
                    element[attribute] = value + suffix;
                }
            });
        });


        const imageElement = document.querySelector('.post-img img');
        if (postData.image ) {
            console.log("Received Image Data:", postData.image);
            imageElement.src = postData.image; 
        } else {
            console.error("Invalid image data or format.");
            imageElement.src = '/assets/images/logo/board-list-icon.png'; 
        }

        const commentsSection = document.querySelector('.comments-section');
        if (commentsSection && Array.isArray(postData.comment)) {
            postData.comment.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.className = 'comment';
                commentElement.setAttribute('data-id', comment.id);

                const formattedDate = getCurrentDate(comment.date);

                commentElement.innerHTML = `
                    <div class="comment-author">
                        <span>${comment.author}</span>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="comment-content">
                        <p>${comment.content}</p>
                    </div>
                    <div class="comment-actions">
                        <div class="comment-edit" id="btnbtn">수정</div>
                        <div class="comment-delete" id="btnbtn">삭제</div>
                    </div>
                `;
                commentElement.style.display = 'none';
                commentsSection.appendChild(commentElement);
                setTimeout(() => {
                    commentElement.style.display = '';
                }, 0);

                const deleteBtn = commentElement.querySelector('.comment-delete');
                
                deleteBtn.addEventListener('click', () => {
                    selectedCommentId = comment.id;  
                    console.log(`selectedCommentId : ${selectedCommentId}`);
                    commentModal.style.display = "flex";
                });

                const editBtn = commentElement.querySelector('.comment-edit');
                editBtn.addEventListener('click', () => {
                    selectedCommentId = comment.id;  
                    console.log(`selectedCommentId : ${selectedCommentId}`);
                });
            
            });
        } else {
            console.error('댓글 데이터가 유효하지 않습니다.');
        }

    } catch (error) {
        console.error('Error fetching post data:', error);
    }
}



//NOTE: 댓글 작성
async function addComment() {
    console.log('hello');
    const newComment = textarea.value.trim(); 
    const userId = getLocalStorage('userId');
    const postId = getLocalStorage('postId');
    const currentDate = getCurrentDate();

    console.log(userId);
    await fetch('http://localhost:3000/api/comment', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            post_id: postId,
            comment: newComment,
            date: currentDate
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('댓글 작성이 완료되었습니다!');
            location.reload(); 
        } else {
            console.error('댓글 작성 실패:', data.message);
            alert('댓글 작성에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
    });
}

async function modifyComment(event) {
    if (commentStatus == 1 && selectedCommentId) {
        const updatedContent = textarea.value.trim(); 

        try {
        
            const response =  await fetch(`http://localhost:3000/api/comment`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment_id: selectedCommentId,
                    content: updatedContent,
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('댓글 수정이 완료되었습니다!');
                location.reload(); 
            } else {
                console.error('댓글 수정 실패:', data.message);
                alert('댓글 수정에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        }
        
        commentStatus = 0;
        selectedCommentId = null;
        submitButton.innerText = '댓글 등록'; 
        textarea.value = ''; 
    } else {
        alert('수정 요청시 에러: 선택된 댓글이 없습니다.');
    } 
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

//NOTE: 게시글 삭제
async function deletePost(event) {
    try {
        const postId = getLocalStorage('postId');
        console.log(`postId  : ${postId}`);
        const response =  await fetch(`http://localhost:3000/api/post`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id: postId
            }),
        });

        const data = await response.json();
        if (data.success) {
            alert('게시글 삭제가 완료되었습니다!');
            return true;
        } else {
            console.error('게시글 삭제 실패:', data.message);
            alert('게시글 삭제에 실패했습니다.');
            return false;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
        return false;
    }
}

//TODO: 댓글 좋아요 누를 시
async function updatePostStats() {
    
    const postId = getLocalStorage("postId");
    try {
        
        const response =  await fetch(`http://localhost:3000/api/post`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_id : postId
            }),
        });

        const data = await response.json();
        if (data.success) {
            alert('댓글 수정이 완료되었습니다!');
            location.reload(); 
        } else {
            console.error('댓글 수정 실패:', data.message);
            alert('댓글 수정에 실패했습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
    }
    
}


textarea.addEventListener('input', function() {
    if (textarea.value.trim() !== '') {
        submitButton.disabled = true;
        submitButton.style.backgroundColor = '#7F6AEE'; 
        submitButton.style.color= '#fff';
    } else {
        submitButton.disabled = false;
        submitButton.style.backgroundColor = '#ACA0EB'; 
    }
});


//NOTE: 댓글 수정 버튼에 대한 이벤트 리스너 추가
commentContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.comment-edit');
    if (!button) return; 

    commentStatus = 1;

    console.log(`commentStatus : ${commentStatus}`)
    const commentDiv = button.closest('.comment'); 
    const commentContent = commentDiv.querySelector('.comment-content p').innerText; 
    
    textarea.value = commentContent;

    submitButton.innerText = '댓글 수정';
});

//NOTE: 댓글 삭제 확인 버튼 이벤트 리스너
commentDeleteOk.addEventListener("click", () => {
    const postId = getLocalStorage("postId");

    if (selectedCommentId) {
        fetch(`http://localhost:3000/api/comment`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                comment: selectedCommentId,
                post_id: postId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('댓글 삭제가 완료되었습니다!');
                selectedCommentId = null;
                location.reload();
            } else {
                console.error('댓글 삭제 실패:', data.message);
                alert('댓글 삭제에 실패했습니다.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('서버 오류가 발생했습니다.');
        });
    }
});



modifyBtn.addEventListener("click", modifyHandler);

submitButton.addEventListener("click", (event) =>{
    if(commentStatus == 0) {
        addComment(event);
    }else if(commentStatus == 1) {
        modifyComment(event);
    }

});

btnOpenModal.addEventListener("click", ()=>{
    modal.style.display="flex";
}); 

deleteCancel.addEventListener("click", ()=>{
    modal.style.display="none";
})

//NOTE: 게시글 삭제
deleteOk.addEventListener("click", ()=>{
    const status = deletePost();
    if(status) {
        alert(authorName.innerText+"의 글이 삭제 되었습니다.")
        modal.style.display="none";
        handleLocation('/html/Posts.html')
    }
})

commentDeleteCancel.addEventListener("click", () => {
    commentModal.style.display = "none";
    console.log(`remove selectedCommentId : ${selectedCommentId}`);

    selectedCommentId = null; // ID 초기화
});

//NOTE: 게시물 좋아요
likesCnt.addEventListener("click", updatePostStats);





