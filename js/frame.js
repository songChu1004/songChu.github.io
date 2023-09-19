// script.js

// 검색 버튼 클릭 시
document.getElementById('searchButton').addEventListener('click', function () {
    // URL 입력 필드에서 URL 가져오기
    const url = document.getElementById('urlInput').value;

    // iframe의 src 속성 설정하여 웹 페이지 로드
    document.getElementById('webView').src = url;
});
