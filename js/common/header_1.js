function createHeader() {

    const profile = localStorage.getItem('profile');
    console.log(profile);

    const header = document.createElement('header');
    header.innerHTML = `
        <div class="head">
            <div class="title">
                <h4>아무 말 대잔치</h4>
            </div>
            <div class="profile-header">
                <img src="${profile}" alt="board">
            </div>
        </div>`;
    document.body.prepend(header);
}

// 호출
createHeader();