<template>
  <div style="position: relative">
    <button
      class="btn btn-light"
      style="position: absolute; bottom: 5%; left: 4%; z-index: 99"
      title="현재 위치로 이동"
      @click="goToCurrentLocation"
    >
      <i class="bi bi-geo-alt-fill"></i>
    </button>
    <el-input
      v-model="searchValue"
      style="
        width: 240px;
        position: absolute;
        top: 6%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
      "
      @keyup.enter="searchLocation"
      size="large"
      placeholder="어디로 갈까요?"
      :suffix-icon="Search"
    />
    <div id="map" style="width: 100%; height: 500px"></div>
    <!-- 장소 정보 카드 -->
    <div v-if="selectedPlace" class="info-card">
      <h3>{{ selectedPlace.name }}</h3>
      <p>⭐ {{ selectedPlace.rating || "평점 없음" }}</p>
      <img
        :src="selectedPlace.photo"
        alt="장소 이미지"
        v-if="selectedPlace.photo"
      />
      <p>{{ selectedPlace.address }}</p>
      <button @click="selectedPlace = null">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { Search } from "@element-plus/icons-vue";

const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const searchValue = ref(""); // 검색어
let map;
let service;
let google;

onMounted(async () => {
  const loader = new Loader({
    apiKey: GOOGLE_MAP_API_KEY,
    version: "weekly",
    libraries: ["places", "marker"],
  });

  google = await loader.load(); // 라이브러리 로드
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.5665, lng: 126.978 },
    zoom: 15,
    mapId: import.meta.env.VITE_GOOGLE_MAP_ID, // ✅ mapId 추가
  });

  // PlacesService 생성 (프론트에서 직접 검색 가능!)
  service = new google.maps.places.PlacesService(map);
});

const markers = ref([]); // 마커들을 저장할 배열
const selectedPlace = ref(null); // 선택된 장소 정보

// 위치 검색 함수
function searchLocation() {
  // 마커들을 지우기 전에 기존 마커들을 모두 제거
  markers.value.forEach((marker) => {
    marker.map = null; // 지도에서 제거
  });
  markers.value = []; // 이전 마커들 초기화
  if (!service)
    return console.error("Google PlacesService가 초기화되지 않았습니다.");

  service.textSearch({ query: searchValue.value }, (results, status) => {
    if (status === "OK") {
      console.log("검색 결과:", results);

      // 새로운 LatLngBounds 객체 생성 (마커들을 포함할 범위 정의)
      const bounds = new google.maps.LatLngBounds();

      // 검색 결과의 모든 위치에 마커를 추가
      results.forEach((result) => {
        const location = result.geometry.location;
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: location,
          title: result.name, // 마커에 장소 이름을 제목으로 설정
        });

        // 마커 클릭 이벤트 추가 (장소 정보 가져오기)
        marker.addListener("click", () => {
          getPlaceDetails(result.place_id);
        });

        // 마커를 배열에 추가
        markers.value = [...markers.value, marker]; // 새로운 배열로 갱신 (반응형)
        // 마커를 범위에 추가
        bounds.extend(location);
      });

      // 모든 마커가 포함된 범위로 지도의 중심과 줌을 설정
      map.fitBounds(bounds);

      // 줌이 너무 클 경우 최대 줌 제한
      const maxZoom = 17; // 원하는 줌 레벨 설정
      google.maps.event.addListenerOnce(map, "bounds_changed", function () {
        if (map.getZoom() > maxZoom) {
          map.setZoom(maxZoom);
        }
      });
    } else {
      console.error("검색 실패:", status);
    }
  });
}

// 장소 정보 가져오기 (상세 정보 API 호출)
function getPlaceDetails(placeId) {
  service.getDetails({ placeId }, (place, status) => {
    if (status === "OK") {
      selectedPlace.value = {
        name: place.name,
        rating: place.rating,
        address: place.formatted_address,
        photo: place.photos ? place.photos[0].getUrl() : null,
      };
    } else {
      console.error("장소 정보를 가져올 수 없습니다.");
    }
  });
}

// 현재 위치로 이동하는 함수
function goToCurrentLocation() {
  markers.value.forEach((marker) => {
    marker.map = null; // 지도에서 제거
  });
  markers.value = []; // 이전 마커들 초기화

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = new google.maps.LatLng(latitude, longitude);
        map.setCenter(currentLocation); // 현재 위치로 지도 이동
        const marker = new google.maps.marker.AdvancedMarkerElement({
          position: currentLocation,
          map: map,
          title: "현재 위치",
        });
        // 마커를 배열에 추가
        markers.value.push(marker);
      },
      (error) => {
        console.error("현재 위치를 가져올 수 없습니다.", error);
      },
      {
        enableHighAccuracy: true, // 더 정확한 위치 정보 사용
        timeout: 10000, // 위치 정보 요청 대기 시간 (10초)
        maximumAge: 0, // 캐시된 위치 사용 안 함
      }
    );
  } else {
    alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
  }
}
</script>

<style scoped>
/* 장소 정보 카드 스타일 */
.info-card {
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 100;
  width: 300px;
  text-align: center;
}
.info-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}
.info-card button {
  margin-top: 10px;
  padding: 5px 10px;
  border: none;
  background: #ff5252;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}
</style>
