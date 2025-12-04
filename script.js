// ========================================================================
// 1. 지도 초기화 및 기본 설정
// ========================================================================

var map = L.map('map').setView([35.9696, 126.6853], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// ========================================================================
// 2. 하드 코딩된 평가 데이터 (세부 항목 10가지 반영)
// ========================================================================
var riverData = [
    // details 객체 안에 10가지 세부 항목 점수를 모두 포함했습니다.
    { name: "미제천-1", latitude: 35.924375, longitude: 126.696781, score: 42, grade: "C", details: { 종횡사주: 10, 하도자연성: 15, 유속다양성: 5, 하천변폭: 3, 하안공: 25, 제방: 10, 저질: 3, 횡구조물: 0, 제외지: 10, 제내지: 3 } },
    { name: "미제천-2", latitude: 35.914164, longitude: 126.708761, score: 50.5, grade: "C", details: { 종횡사주: 0, 하도자연성: 10, 유속다양성: 5, 하천변폭: 5, 하안공: 25, 제방: 10, 저질: 3, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "미제천-3", latitude: 35.893806, longitude: 126.73005, score: 44.5, grade: "C", details: { 종횡사주: 0, 하도자연성: 10, 유속다양성: 5, 하천변폭: 10, 하안공: 25, 제방: 3, 저질: 3, 횡구조물: 20, 제외지: 10, 제내지: 3 } },
    { name: "경포천-1", latitude: 35.942286, longitude: 126.798553, score: 25.5, grade: "D", details: { 종횡사주: 0, 하도자연성: 0, 유속다양성: 5, 하천변폭: 0, 하안공: 0, 제방: 0, 저질: 3, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "경포천-2", latitude: 35.954969, longitude: 126.763675, score: 55.5, grade: "C", details: { 종횡사주: 5, 하도자연성: 0, 유속다양성: 15, 하천변폭: 3, 하안공: 25, 제방: 10, 저질: 10, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "경포천-3", latitude: 35.961722, longitude: 126.722731, score: 42.5, grade: "C", details: { 종횡사주: 0, 하도자연성: 5, 유속다양성: 5, 하천변폭: 10, 하안공: 5, 제방: 10, 저질: 10, 횡구조물: 30, 제외지: 10, 제내지: 0 } },
    { name: "경포천-4", latitude: 35.977581, longitude: 126.726258, score: 30.5, grade: "D", details: { 종횡사주: 0, 하도자연성: 10, 유속다양성: 5, 하천변폭: 1, 하안공: 5, 제방: 0, 저질: 10, 횡구조물: 20, 제외지: 10, 제내지: 0 } },
    { name: "구암천-1", latitude: 35.961825, longitude: 126.735447, score: 37.8, grade: "D", details: { 종횡사주: 0, 하도자연성: 15, 유속다양성: 5, 하천변폭: 10, 하안공: 0, 제방: 10, 저질: 0, 횡구조물: 30, 제외지: 5.5, 제내지: 0 } },
    { name: "구암천-2", latitude: 35.980039, longitude: 126.738719, score: 26, grade: "D", details: { 종횡사주: 0, 하도자연성: 0, 유속다양성: 5, 하천변폭: 1, 하안공: 3, 제방: 3, 저질: 0, 횡구조물: 30, 제외지: 10, 제내지: 0 } },
    { name: "둔덕천-1", latitude: 35.990247, longitude: 126.771864, score: 34.5, grade: "D", details: { 종횡사주: 0, 하도자연성: 15, 유속다양성: 5, 하천변폭: 0, 하안공: 0, 제방: 3, 저질: 3, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "둔덕천-2", latitude: 35.986628, longitude: 126.758464, score: 34, grade: "D", details: { 종횡사주: 0, 하도자연성: 15, 유속다양성: 5, 하천변폭: 1, 하안공: 3, 제방: 3, 저질: 3, 횡구조물: 30, 제외지: 5, 제내지: 3 } },
    { name: "고척천-1", latitude: 35.974478, longitude: 126.833983, score: 48, grade: "C", details: { 종횡사주: 5, 하도자연성: 15, 유속다양성: 5, 하천변폭: 3, 하안공: 5, 제방: 10, 저질: 10, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "고척천-2", latitude: 35.955342, longitude: 126.833242, score: 34.5, grade: "D", details: { 종횡사주: 0, 하도자연성: 0, 유속다양성: 5, 하천변폭: 10, 하안공: 3, 제방: 5, 저질: 3, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "고척천-3", latitude: 35.932539, longitude: 126.83625, score: 42, grade: "C", details: { 종횡사주: 0, 하도자연성: 5, 유속다양성: 5, 하천변폭: 10, 하안공: 3, 제방: 5, 저질: 20, 횡구조물: 30, 제외지: 3, 제내지: 3 } },
    { name: "탑천-1", latitude: 35.970128, longitude: 126.881411, score: 46.3, grade: "C", details: { 종횡사주: 0, 하도자연성: 0, 유속다양성: 5, 하천변폭: 3, 하안공: 25, 제방: 10, 저질: 10, 횡구조물: 30, 제외지: 6.5, 제내지: 3 } },
    { name: "탑천-2", latitude: 35.945306, longitude: 126.871925, score: 62, grade: "B", details: { 종횡사주: 3, 하도자연성: 15, 유속다양성: 5, 하천변폭: 3, 하안공: 25, 제방: 10, 저질: 20, 횡구조물: 30, 제외지: 10, 제내지: 3 } },
    { name: "탑천-3", latitude: 35.92515, longitude: 126.833983, score: 58, grade: "C", details: { 종횡사주: 0, 하도자연성: 15, 유속다양성: 5, 하천변폭: 3, 하안공: 25, 제방: 5, 저질: 20, 횡구조물: 30, 제외지: 10, 제내지: 3 } }
];

// 세부 항목의 이름과 최대 점수를 정의하는 객체 (팝업 및 테이블 생성에 사용)
const detailHeaders = {
    종횡사주: 10, 하도자연성: 25, 유속다양성: 30, 하천변폭: 10, 하안공: 25,
    제방: 20, 저질: 30, 횡구조물: 30, 제외지: 10, 제내지: 10
};


// ========================================================================
// 3. 헬퍼 함수: 등급에 따른 색상 및 CSS 클래스 결정
// ========================================================================

function getGradeColor(grade) {
    if (grade.includes("A")) { return 'green'; } 
    if (grade.includes("B")) { return 'blue'; } 
    if (grade.includes("C")) { return 'orange'; } 
    if (grade.includes("D")) { return 'red'; }
    return 'gray'; 
}

function getGradeClass(grade) {
    if (grade.includes("A")) { return 'grade-A'; } 
    if (grade.includes("B")) { return 'grade-B'; } 
    if (grade.includes("C")) { return 'grade-C'; } 
    if (grade.includes("D")) { return 'grade-D'; }
    return '';
}


// ========================================================================
// 4. 데이터 순회하며 지도에 마커 추가 (팝업에 세부 항목 반영)
// ========================================================================

riverData.forEach(function(item) {
    var color = getGradeColor(item.grade);

    var marker = L.circleMarker([item.latitude, item.longitude], {
        radius: 8,
        fillColor: color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);

    // 팝업 내용 동적 생성 (세부 항목 포함)
    let detailHtml = Object.keys(detailHeaders).map(key => 
        `<li><strong>${key}(${detailHeaders[key]}점):</strong> ${item.details[key]}점</li>`
    ).join('');

    var popupContent = `
        <h3>${item.name}</h3>
        <p><strong>평가 등급:</strong> <span style="font-weight: bold; color: ${color};">${item.grade}</span></p>
        <p><strong>총 점수:</strong> ${item.score}점</p>
    `;
    
    marker.bindPopup(popupContent);
    
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
});

// 데이터 로딩 후 지도의 시야를 데이터 범위에 맞춥니다.
try {
    var bounds = L.latLngBounds(riverData.map(item => [item.latitude, item.longitude]));
    if (bounds.isValid()) {
        map.fitBounds(bounds, {padding: [50, 50]}); 
    }
} catch (e) {
    console.warn("데이터가 유효하지 않아 지도의 중심을 조정할 수 없습니다.");
}


// ========================================================================
// 5. 범례(Legend) 추가
// ========================================================================

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["A", "B", "C", "D", "미정"];

    div.innerHTML += '<h4>평가 등급 범례</h4>';
    
    for (var i = 0; i < grades.length; i++) {
        var color = getGradeColor(grades[i]);
        div.innerHTML +=
            `<i style="background:${color};"></i> ` +
            grades[i] + '등급<br>'; 
    }

    return div;
};

legend.addTo(map);


// ========================================================================
// 6. 지도 아래에 지점별 정보 테이블 추가 (세부 항목 10가지 반영)
// ========================================================================

function createRiverDataTable(data) {
    // 테이블 헤더 (세부 항목 포함) 동적 생성
    let headerKeys = Object.keys(detailHeaders);
    let detailHeadersHtml = headerKeys.map(key => 
        `<th>${key}<br>(${detailHeaders[key]}점)</th>`
    ).join('');

    let html = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>지점</th>
                    <th>최종<br>점수</th>
                    <th>등급</th>
                    ${detailHeadersHtml} 
                </tr>
            </thead>
            <tbody>
    `;

    // 데이터 순회하며 테이블 행(<tr>) 생성
    data.forEach(item => {
        const gradeClass = getGradeClass(item.grade);
        
        // 세부 항목 점수 셀 동적 생성
        let detailCells = headerKeys.map(key => 
            `<td>${item.details[key]}</td>`
        ).join('');
        
        html += `
            <tr>
                <td style="text-align: left;">${item.name}</td>
                <td>${item.score}</td>
                <td class="${gradeClass}">${item.grade}</td>
                ${detailCells}
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    // HTML 컨테이너에 삽입
    document.getElementById('river-data-container').innerHTML += html;
}

// 함수 호출: 데이터 로딩 완료 후 테이블 생성
createRiverDataTable(riverData);