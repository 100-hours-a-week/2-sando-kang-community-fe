// 프로필 드롭다운
const profileImg = document.getElementById('profileImg');
const dropdownMenu = document.getElementById('dropdownMenu');
const updateButton = document.getElementById('updateButton');
const deleteButton = document.getElementById('deleteButton');
const toastMessage = document.getElementById('toastMessage');
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
const inputNickname = document.getElementById('nickname');
const nicknameError = document.getElementById('nicknameError');


// 파일 입력 요소와 이미지 및 버튼 요소 선택
const fileInput = document.getElementById('fileInput');
const profileImage = document.getElementById('profileImage');
const uploadButton = document.getElementById('uploadButton');
const profileImageContainer = document.getElementById('profileImageContainer');
const backButton = document.querySelector('.back-button');



// 드롭다운 메뉴 표시
profileImg.addEventListener('click', () => {
    dropdownMenu.style.maxHeight = 100;
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// 닉네임 유효성 검사 함수
function validateNickname(nickname) {
    if (!nickname) {
        nicknameError.innerText = '  *닉네임을 입력해주세요.';
        nicknameError.style.display = 'block';
        return false;
    } else if (/\s/.test(nickname)) {
        nicknameError.innerText = '  *띄어쓰기를 없애주세요.';
        nicknameError.style.display = 'block';
        return false;
    } else if (nickname.length > 10) {
        nicknameError.innerText = '  *닉네임 최대 10자까지 가능합니다.';
        nicknameError.style.display = 'block';
        return false;
    }else if (nickname == document.getElementById('nickname').placeholder) {
        nicknameError.innerText = '  *중복된 닉네임 입니다';
        nicknameError.style.display = 'block';
        return false;
    } 
    else {
        nicknameError.style.display = 'none';
        return true;
    }
}

// 수정하기 버튼 클릭
updateButton.addEventListener('click', () => {
    if (validateNickname(inputNickname.value.trim())) {
        toastMessage.style.display = 'block';
        setTimeout(() => {
            toastMessage.style.display = 'none';
        }, 2000);
    }
});

// 회원 탈퇴 모달 표시
deleteButton.addEventListener('click', () => {
    deleteModal.style.display = 'flex';
});

// 회원 탈퇴 모달 확인 클릭
confirmDelete.addEventListener('click', () => {
    // 서버와 연동하여 회원 탈퇴 처리 필요
    // 로그인 페이지로 이동 처리
    alert("회원 탈퇴가 완료되었습니다.");
    deleteModal.style.display = 'none';
});

// 회원 탈퇴 모달 취소 클릭
cancelDelete.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});



uploadButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
            profileImage.style.display = 'block';
            uploadButton.style.visibility = 'hidden'
        };
        reader.readAsDataURL(file);
    }
});

function handleLocation(url) {
    window.location.href = url
}