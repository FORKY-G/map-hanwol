// 눈에 잘 띄는 빨간색 기본 마커 아이콘 설정
const spawnIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// data.js의 스폰 좌표를 화면 픽셀로 변환
const spawnCoords = mcToPx(spawnData.mcX, spawnData.mcZ);

// 지도에 마커를 올리고 클릭 시 말풍선(Popup) 띄우기
L.marker(spawnCoords, { icon: spawnIcon })
    .addTo(map)
    .bindPopup(`<b>${spawnData.name}</b><br>${spawnData.description}<br><small>X: ${spawnData.mcX}, Z: ${spawnData.mcZ}</small>`);
