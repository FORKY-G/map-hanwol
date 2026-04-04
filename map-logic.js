// 1. Leaflet 지도 설정 
const map = L.map('map', {
    crs: L.CRS.Simple,
    maxZoom: 3   // 확대 한도
});

// 2. 픽셀크기
const imgWidth = 4560;  // 가로
const imgHeight = 4560; // 세로

// 3. 지도의 경계 설정
const imageBounds = [[0, 0], [imgHeight, imgWidth]];

// 4. 지도 이미지 띄우기
L.imageOverlay('hanwol-map.jpg', imageBounds).addTo(map);

// 5. 반응형 화면 맞춤 로직 (어느 창 크기에서든 맵 전체가 보이게 설정)
function setResponsiveBounds() {
    // 줌 계산을 위해 일시적으로 최소 줌 제한을 풉니다.
    map.setMinZoom(-10);
    
    // 현재 브라우저 창 크기에 지도가 완벽히 다 들어오는 줌 레벨을 자동 계산합니다.
    const fitZoom = map.getBoundsZoom(imageBounds);
    
    // 계산된 줌 레벨을 최소 줌으로 고정합니다. (더 축소되어 배경 여백이 보이지 않도록 방지)
    map.setMinZoom(fitZoom);
}

// 6. 처음 로드될 때 지도를 화면에 맞추고 최소 줌 고정
map.fitBounds(imageBounds);
setResponsiveBounds();

// 7. 지도를 드래그할 때 이미지가 화면 밖으로 나가지 않게 영역 제한
map.setMaxBounds(imageBounds);

// 8. 사용자가 브라우저 창 크기를 조절할 때마다 즉시 다시 계산하여 적용
window.addEventListener('resize', () => {
    setResponsiveBounds();
});
