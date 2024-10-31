// common.js
function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="head">
            <div class="title">
                <h4>아무 말 대잔치</h4>
            </div>
            <div class="avatar">
                <img src="/assets/images/logo/board-list-icon.png" alt="board">
            </div>
        </div>`;
    document.body.prepend(header);
}

// 호출
createHeader();
