import { handleLocation } from '../util/handleLocation.js';
import { getLocalStorage, saveLocalStorage } from '../util/session.js';

const modifyBtn = document.querySelector(".write-post");
const postContainer = document.getElementById('posts');
const loading = document.getElementById('loading');

let page = 1;
let isLoading = false; 


window.addEventListener('load', () => {
    fetchPosts();
});


function fetchPosts() {
    if (isLoading) return; 
    isLoading = true;
    loading.style.display = 'block'; 

    fetch(`http://localhost:3000/api/post?page=${page}`)
        .then(response => response.json())
        .then(data => {
            if (data.success && data.data.posts) {
                renderPosts(data.data.posts); 
                page++; 
            } else {
                console.error('Failed to load posts');
            }
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        })
        .finally(() => {
            loading.style.display = 'none'; 
            isLoading = false; 
        });
}


function renderPosts(posts) {
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.dataset.postId = post.id; // 게시글 ID를 dataset에 저장

        postDiv.innerHTML = `
          <div class="post-header">
              <h2>${post.title}</h2>
              <span class="date">${post.date}</span>
          </div>
          <div class="post-info">
              <span>좋아요 ${formatNumber(post.likes)}</span>
              <span>댓글 ${formatNumber(post.comments)}</span>
              <span>조회수 ${formatNumber(post.views)}</span>
          </div>
          <div class="author">
              <div class="avatar">
                  <img src="${post.profileImg}" alt="">
              </div>
              <span>${post.author}</span>
          </div>
        `;

        // NOTE: 게시글 클릭 시 수정화면으로
        postDiv.addEventListener('click', () => {
            
            saveLocalStorage('postId', post.id);
            saveLocalStorage('title', post.title);
            saveLocalStorage('content', post.content);
            saveLocalStorage('author', post.author);
            saveLocalStorage('likes', formatNumber(post.likes));
            saveLocalStorage('comments',formatNumber(post.comments));
            saveLocalStorage('views', formatNumber(post.views))
            saveLocalStorage('date', post.date);
            saveLocalStorage('profile', post.profileImg);

            handleLocation("/html/post.html"); 
        });

        postContainer.appendChild(postDiv);
    });
}

modifyBtn.addEventListener("click", () => {
    handleLocation("/html/make post.html");
});

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

// NOTE: Infinity scrolling
function infinityScrolling() {
    if (isLoading) return; 
    isLoading = true;
    
    loading.style.display = 'block';
    
    fetchPosts();
}


window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        infinityScrolling();
    }
});

