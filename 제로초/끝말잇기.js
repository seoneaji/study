var 바디 = document.body;
var 단어 = document.createElement('div');
단어.textContent = '제로초';
바디.append(단어);
var 폼 = document.createElement('form');
var 입력창 = document.createElement('input');
var 버튼 = document.createElement('button');
버튼.textContent = '입력';
바디.append(폼);
폼.append(입력창 , 버튼);
var 결과창 = document.createElement('div');
바디.append(결과창);

버튼.addEventListener('click', function 콜백함수(이벤트){
    이벤트.preventDefault();
   if(단어.textContent[단어.textContent.length - 1] === 입력창.value[0]){
       결과창.textContent = '딩동댕';
       단어.textContent = 입력창.value;
   }else{
       결과창.textContent = '땡';
   }
    입력창.value = '';
    입력창.focus();
});





var 바디 =