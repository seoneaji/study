
var 이미지좌표 = 0;
var 가위바위보 = { //딕셔너리 자료구조
    바위: '0',
    가위 : '-141px',
    보 : '-292px'
};

function 컴퓨터의선택(이미지좌표){
    return Object.entries(가위바위보).find(function(v){
        return v[1] === 이미지좌표;
    })[0];
}

var 인터벌;
인터벌메이커();
function 인터벌메이커(){
    인터벌= setInterval(function(){

        if(이미지좌표 === 가위바위보.바위){
            이미지좌표 = 가위바위보.가위
        }else if( 이미지좌표 ===  가위바위보.가위){
            이미지좌표 =  가위바위보.보
        }else{
            이미지좌표 = 가위바위보.바위
        }
        document.querySelector('#computer').style.background= 'url("customLogo.gif")' + 이미지좌표 + ' 0';
    }, 100);
}
인터벌 = 인터벌메이커();

var 점수표 = {
    가위: 1,
    바위: 0,
    보: -1
}
document.querySelectorAll(".btn").forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(인터벌);
        setTimeout(function(){
            인터벌메이커();
        },1000);
        var 나의선택 = this.textContent;
        if(점수표[나의선택] - 점수표[컴퓨터의선택(이미지좌료)] === 0 ){
        
        }
        if(나의선택 === '가위'){
            if(컴퓨터의선택(이미지좌표) === '가위'){
                console.log('비김.')
            } else if(컴퓨터의선택(이미지좌표) === '바위'){
                console.log('짐')
            }else{
                console.log('이김')
            }
        } else if(나의선택 === '바위'){
            if(컴퓨터의선택(이미지좌표) === '가위'){
                console.log('이김.')
            } else if(컴퓨터의선택(이미지좌표) === '바위'){
                console.log('비김')
            }else{
                console.log('짐')
            }

        }else if(나의선택 === '보'){
            if(컴퓨터의선택(이미지좌표) === '가위'){
                console.log('짐.')
            } else if(컴퓨터의선택(이미지좌표) === '바위'){
                console.log('이김')
            }else{
                console.log('비김')
            }

        }
    });
});

// 가위: 1, 바위: 0, 보: -1
//나\컴퓨터     가위  바위  보
//    가위     1 1  1 0 1 -1
//    바위     0 1  0 0 0 -1
//    보      -1 1 -1 0 -1 -1

// -1, 2 : 이김 , 0: 비김 1, -1 : 짐;
