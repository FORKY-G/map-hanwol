// js/ui-control.js

const compassIcon = L.icon({
    iconUrl: 'images/compass.png',
    iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -10]
});

const transparentIcon = L.icon({
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 
    iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -15]
});

// 동선 스타일 (노란 점선)
const animalPathPoints = animals.map(ani => mcToPx(ani.mcX, ani.mcZ));
const polyline = L.polyline(animalPathPoints, {
    color: '#FFD700', weight: 2, opacity: 0, dashArray: '5, 8'
}).addTo(map);

// 복사 함수 (숫자만 복사 + 하단 알림)
window.copyCoords = (x, y, z) => {
    const text = `${x} ${y} ${z}`; // 딱 숫자만!
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copy-toast');
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 1500); // 1.5초 후 사라짐
    });
};

animals.forEach((ani) => {
    const pos = mcToPx(ani.mcX, ani.mcZ);
    const marker = L.marker(pos, { icon: transparentIcon }).addTo(map);

    // 정보창 디자인 (가독성 최우선, 크기 축소)
    const popupContent = `
        <div style="text-align:center; min-width:150px;">
            <div style="font-size:14px; margin-bottom:5px;">${ani.order}. ${ani.name}</div>
            
            <div style="background:#444; padding:5px; margin-bottom:5px; cursor:pointer;" onclick="copyCoords(${ani.mcX}, ${ani.mcY}, ${ani.mcZ})">
                <span style="color:#FFD700; font-size:12px;">${ani.mcX}, ${ani.mcY}, ${ani.mcZ}</span>
            </div>

            <div style="color:#A335EE; font-weight:bold; font-size:12px; margin-bottom:3px;">*[히든]십이지신</div>
            
            <div style="font-size:9px; color:#ddd; line-height:1.2;">
                쥐>소>호랑이><span style="color:red;">도사</span>>토끼>용>뱀><span style="color:red;">도사</span><br>
                말>양>원숭이><span style="color:red;">도사</span>>닭>개>돼지><span style="color:red;">도사</span>
            </div>
        </div>
    `;

    marker.bindPopup(popupContent);

    marker.on('mouseover', () => polyline.setStyle({ opacity: 0.7 }));
    marker.on('mouseout', () => polyline.setStyle({ opacity: 0 }));
});

L.marker(mcToPx(spawnData.mcX, spawnData.mcZ), { icon: compassIcon })
    .addTo(map).bindPopup("스폰 지점");
