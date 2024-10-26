import readlineSyncModule from 'readline-sync';

console.log( "메뉴: 1.치킨 2.피자 3.막국수")

const userSelect = parseInt(readlineSyncModule.question('메뉴 번호를 골라주세요: '),10);
const memoTitle = readlineSyncModule.question('메모 제목을 적어주세요: ');
const memoContent = readlineSyncModule.question('메모 내용 적어주세요: ');

switch (userSelect){
    case 1:
        console.log("치킨")
        break;
    case 2:
        console.log("피자")
        break;
    case 3:
        console.log("막국수")
        break;
    default:
        console.log("메뉴가 없습니다")   
}
console.log(`메모 제목 : ${memoTitle}`)
console.log(`메모 내용 : ${memoContent}`)
