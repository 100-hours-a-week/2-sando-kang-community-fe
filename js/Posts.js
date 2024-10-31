// 게시글 작성 버튼 클릭 시 게시글 작성 페이지로 이동
const modifyBtn = document.querySelector(".write-post");

// 게시글 컨테이너와 로딩 표시 요소
const postContainer = document.getElementById('posts');
const loading = document.getElementById('loading');

// 현재 페이지 번호 (초기값 1)
let page = 1;
let isLoading = false; // 중복 요청 방지

modifyBtn.addEventListener("click",  clickHandler);


function clickHandler(){
    handleLocation("/html/make post.html");
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

//  인피니티 스크롤링
function infinityScrolling() {
    if (isLoading) return;
    isLoading = true;

    // 로딩 표시
    loading.style.display = 'block';
    
      for(i = 5 ; i < 100 ; i ++){
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
  
        postDiv.innerHTML = `
          <div class="post-header">
              <h2>제목${i}</h2>
              <span class="date">2024-01-01</span>
          </div>
          <div class="post-info">
              <span>좋아요 ${formatNumber(i*100+1000)}</span>
              <span>댓글 ${formatNumber(i*100+10000)}</span>
              <span>조회수 ${formatNumber(i*100+100000)}</span>
          </div>
          <div class="author">
              <div class="avatar">
                  <img src="/assets/images/logo/board-list-icon.png" alt="">
              </div>
              <span>작성자${i}</span>
          </div>
        `;
        postContainer.appendChild(postDiv);
      }
      // 페이지 증가
      page++;
      
      // 데이터 길이에 따라 stop
      if(page >= 2) return;

      // 로딩 표시 숨김
      loading.style.display = 'none';
      isLoading = false;
  }

  // 스크롤 이벤트 리스너
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
        infinityScrolling();
    }
  });

function handleLocation(url) {
    window.location.href = url
}