// 1. 나침반(스폰) 아이콘
const compassIcon = L.icon({
    iconUrl: 'images/compass.png',
    iconSize: [24, 24], 
    iconAnchor: [12, 12], 
    popupAnchor: [0, -10]
});

// 2. 투명 아이콘 - 맵의 동물 그림 위에 얹어질 '투명 클릭 영역'
const transparentIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 
    iconSize: [40, 40], // 동물 도트를 충분히 덮을 수 있는 크기
    iconAnchor: [20, 20], 
    popupAnchor: [0, -20]
});

// 3. 십이지신 동선(Polyline) 설정
const animalPathPoints = animals.map(ani => mcToPx(ani.mcX, ani.mcZ));
const polyline = L.polyline(animalPathPoints, {
    color: '#FFD700', // 황금색
    weight: 2,
    opacity: 0, // 기본 상태는 투명
    dashArray: '5, 8' // 점선
}).addTo(map);

// 4. 좌표 복사 함수
window.copyCoords = (x, y, z) => {
    const text = `/tp @s ${x} ${y} ${z}`; // 마크에서 바로 쓸 수 있게 tp 명령어로 구성해봤어요!
    navigator.clipboard.writeText(text).then(() => {
        alert(`좌표가 복사되었습니다: ${text}`);
    });
};

// 5. 동물 마커 (투명) 생성
animals.forEach((ani) => {
    const pos = mcToPx(ani.mcX, ani.mcZ);
    const marker = L.marker(pos, { icon: transparentIcon }).addTo(map);

    // 다겸님이 요청하신 디자인 정보창
    const popupContent = `
        <div style="line-height:1.5; text-align:center;">
            <div style="font-size:15px; margin-bottom:4px;">${ani.order}. ${ani.name}</div>
            <div style="color:#FFD700; cursor:pointer; text-decoration:underline; font-size:12px; margin-bottom:4px;" 
                 onclick="copyCoords(${ani.mcX}, ${ani.mcY}, ${ani.mcZ})">
                X: ${ani.mcX}, Y: ${ani.mcY}, Z: ${ani.mcZ}
            </div>
            <div style="color:#A335EE; font-weight:bold; font-size:13px; margin-bottom:2px;">*[히든]십이지신</div>
            <div style="font-size:10px; word-break:keep-all;">
                동선: 쥐>소>호랑이><span style="color:red;">도사</span>>토끼>용>뱀><span style="color:red;">도사</span>>말>양>원숭이><span style="color:red;">도사</span>>닭>개>돼지><span style="color:red;">도사</span>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);

    // 마우스 오버 시 동선 ON/OFF
    marker.on('mouseover', () => polyline.setStyle({ opacity: 0.7 }));
    marker.on('mouseout', () => polyline.setStyle({ opacity: 0 }));
});

// 6. 스폰 위치 마커
L.marker(mcToPx(spawnData.mcX, spawnData.mcZ), { icon: compassIcon })
    .addTo(map)
    .bindPopup("스폰 지점");
