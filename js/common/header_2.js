function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="head">
            <div class="back-button">&lt;</div>
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


const back = document.querySelector('.back-button');

back.addEventListener('click' , () => {
    history.go(-1);
})

function handleLocation(value) {
    return window.location.href = value;
}