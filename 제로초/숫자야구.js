var 바디 = document.body;
var 틀린횟수 = 0;
var 숫자배열 = [];

문제();

var 결과 = document.createElement('h1');
바디.append(결과);
var 폼 = document.createElement('form');
바디.append(폼);
var 입력창 = document.createElement('input');
var 버튼 = document.createElement('button');
입력창.type = 'number';
입력창.maxLength = 4;
버튼.textContent='입력';
폼.append(입력창 , 버튼);

function 문제(){
    var 숫자후보 = [1,2,3,4,5,6,7,8,9];
    숫자배열 = [];
    for (var i = 0; i < 4 ; i += 1){
        var 뽑은것 = 숫자후보.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        숫자배열.push(뽑은것);
    }
    console.log(숫자배열);
}

function 초기화(){
    입력창.value = '';
    입력창.focus();
}

폼.addEventListener('submit' , function 콜백함수(이벤트){
    이벤트.preventDefault();
    var 답 = 입력창.value;
    console.log(답);
    if(답 === 숫자배열.join('')){ //답이 맞이면
        결과.textContent = '홈런';
        초기화();
        문제();
    } else{ //답이 틀리면
        var 답배열 = 답.split('');
        var 스트라이크 = 0;
        var 볼 = 0;
        틀린횟수 += 1;
        if(틀린횟수 > 5){
            결과.textContent ='5 틀림 답은' + 숫자배열.join(',') + '다음 답을 맞추세';
            초기화();
            문제();
            틀린횟수 = 0;
        }else{
            for (var i = 0; i < 3 ; i += 1){
                if(Number(답배열[i]) === 숫자배열[i]){// 숫자같음, 자리같음
                    스트라이크 += 1;
                }else if(숫자배열.indexOf(Number(답배열[i])) > -1){ // 같은 자리는 아니지만 숫자가 겹침
                    볼 += 1
                }
                결과.textContent = 스트라이크 + '스크라이트' + 볼 + '볼';
                초기화();
            }
        }

    }
});

