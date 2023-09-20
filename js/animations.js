// animations.js

document.addEventListener("DOMContentLoaded", function () {
    var invitation = document.querySelector(".invitation");

    

    // 1초 후에 초대장을 열기 위해 클래스 추가
    setTimeout(function () {
        invitation.classList.add("open");
    }, 1000); // 1초 후에 애니메이션 효과 적용
});
