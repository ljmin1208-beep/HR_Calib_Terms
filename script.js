


document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const mainContainer = document.getElementById('main-container');

    // JSON 데이터 로드
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tabKey = button.getAttribute('data-tab');

                    // 탭 활성화 상태 업데이트 (간단한 로직으로 복구)
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // 테이블 생성 (테이블 개수에 관계없이 동일 함수 사용)
                    generateMultiTables(data[tabKey], mainContainer);
                });
            });

            // 페이지 로드 시 Theme 1 자동 클릭
            document.querySelector('[data-tab="theme1"]').click();
        })
        .catch(error => {
            mainContainer.innerHTML = `<p style="color: red;">데이터 로드 오류: data.json 파일이 올바른 위치에 있거나 JSON 구조에 오류가 있는지 확인하세요.</p>`;
            console.error('Error loading data:', error);
        });
});

/**
 * 다중 테이블을 생성하여 컨테이너에 상하로 표시하는 함수
 */
function generateMultiTables(themeData, container) {
    container.innerHTML = '';

    // titles 객체를 분리합니다. (제목을 가져오기 위함)
    const titles = themeData.titles || {};

    // themeData의 키를 순회하되, 'titles' 키는 건너뛰고 테이블 생성
    for (const key in themeData) {
        if (key !== "titles" && themeData.hasOwnProperty(key)) {
            const tableData = themeData[key];

            // 제목 설정: titles 객체에서 한국어 제목을 가져오고, 없으면 key를 대문자로 표시
            const title = titles[key] || key.replace(/_/g, ' ').toUpperCase();

            let tableHTML = `<div class="table-group">`;
            tableHTML += `<h4>${title}</h4>`;

            // 테이블 시작
            tableHTML += '<table><thead><tr><th>English</th><th>Korean</th></tr></thead><tbody>';

            // 데이터 행 삽입: item.EN / item.KR 사용
            tableData.forEach(item => {
                tableHTML += `<tr><td>${item.EN}</td><td>${item.KR}</td></tr>`;
            });

            tableHTML += '</tbody></table>';
            tableHTML += '</div>';

            container.innerHTML += tableHTML;
        }
    }
}