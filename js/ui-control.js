// js/ui-control.js

// 1. 나침반(스폰) 아이콘 (이건 유지합니다)
const compassIcon = L.icon({
    iconUrl: 'images/compass.png',
    iconSize: [24, 24], 
    iconAnchor: [12, 12], 
    popupAnchor: [0, -10]
});

// 2. [핵심] 투명 아이콘 설정 (크기만 가지고 있고 이미지는 없습니다)
const transparentIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', // 1x1 투명 PNG 데이터
    iconSize: [40, 40], // 클릭 영역 크기 (맵의 동물 그림을 덮을 만큼 적당히 크게)
    iconAnchor: [20, 20], // 중앙 정렬
    popupAnchor: [0, -20] // 말풍선 위치 조정
});

// 3. 동선(Polyline) 설정
// 동물들의 좌표를 mcToPx로 변환하여 점 세트 생성
const animalPathPoints = animals.map(ani => mcToPx(ani.mcX, ani.mcZ));

// 황금색 점선 동선 생성
const polyline = L.polyline(animalPathPoints, {
    color: '#FFD700', // 황금색
    weight: 3,
    opacity: 0, // 처음엔 안보임
    dashArray: '5, 10' // 점선 효과
}).addTo(map);

// 4. 좌표 복사 함수 (window 객체에 등록하여 HTML에서 호출 가능하게 함)
window.copyCoords = (x, y, z) => {
    const text = `${x}, ${y}, ${z}`;
    // 최신 브라우저의 클립보드 API 사용
    navigator.clipboard.writeText(text).then(() => {
        // 복사 성공 시 사용자에게 알림 (나중에 디자인된 알림창으로 변경 가능)
        alert(`좌표가 복사되었습니다: ${text}`);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
};

// 5. [핵심] 동물 위치에 투명 마커 생성 및 이벤트 연결
animals.forEach((ani) => {
    // 마크 좌표를 맵 픽셀 좌표로 변환
    const pos = mcToPx(ani.mcX, ani.mcZ);
    
    // 투명 아이콘을 사용하는 마커 생성 및 지도에 추가
    const marker = L.marker(pos, { 
        icon: transparentIcon,
        title: ani.name // 마우스를 올렸을 때 뜨는 브라우저 기본 툴팁 (선택 사항)
    }).addTo(map);

    // 정보창(Popup) 내용 구성 (요청하신 보라색, 빨간색 스타일 적용)
    const popupContent = `
        <div style="line-height:1.6; min-width:200px; text-align:center;">
            <strong>${ani.order}. ${ani.name}</strong><br>
            <span style="cursor:pointer; color:#FFD700; text-decoration: underline;" onclick="copyCoords(${ani.mcX}, ${ani.mcY}, ${ani.mcZ})">
                X: ${ani.mcX}, Y: ${ani.mcY}, Z: ${ani.mcZ}
            </span><br>
            <span style="color:#A335EE; font-weight:bold;">*[히든]십이지신</span><br>
            <span style="font-size:11px;">동선: 쥐>소>호랑이><span style="color:red;">도사</span>>토끼>용>뱀><span style="color:red;">도사</span>>말>양>원숭이><span style="color:red;">도사</span>>닭>개>돼지><span style="color:red;">도사</span></span>
        </div>
    `;

    // 마커에 정보창 연결 (클릭 시 나타남)
    marker.bindPopup(popupContent);

    // --- 이벤트 연결 ---
    // 1. 마우스를 올렸을 때 (mouseover): 동선 보이게 함
    marker.on('mouseover', () => {
        polyline.setStyle({ opacity: 0.8 });
    });

    // 2. 마우스가 벗어났을 때 (mouseout): 동선 숨김
    marker.on('mouseout', () => {
        polyline.setStyle({ opacity: 0 });
    });
});

// 6. 스폰 마커 (나침반 유지)
L.marker(mcToPx(spawnData.mcX, spawnData.mcZ), { icon: compassIcon })
    .addTo(map)
    .bindPopup("스폰 지점 (한월성 중앙)");
