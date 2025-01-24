<template>
  <!-- <p>{{ searchValue }}</p>
  <GoogleMap
    id="map"
    :api-key="GOOGLE_MAP_API_KEY"
    style="width: 100%; height: 500px; position: relative"
    :center="center"
    :zoom="15"
  >
    <el-input
      v-model="searchValue"
      style="
        width: 240px;
        position: absolute;
        top: 6%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
      size="large"
      placeholder="어디로 갈까요?"
      :suffix-icon="Search"
    />
    <Marker :options="{ position: center }" />
  </GoogleMap> -->

  <el-input
    v-model="searchValue"
    style="
      width: 240px;
      position: absolute;
      top: 6%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
    @keyup.enter="searchLocation"
    size="large"
    placeholder="어디로 갈까요?"
    :suffix-icon="Search"
  />
  <div id="map" style="width: 100%; height: 500px; position: relative"></div>
</template>

<script setup lang="ts">
// import { Loader } from "@googlemaps/js-api-loader";
import { GoogleMap, Marker } from "vue3-google-map";
const GOOGLE_MAP_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
// const center = { lat: 37.5665, lng: 126.978 };

import { Search } from "@element-plus/icons-vue";
// import { ref } from "vue";
const searchValue = ref("");

// // const geocoder = new GoogleMap.Geocoder();
// const geocoder = new google.maps.Geocoder();
// geocoder.geocode({ address: "서울" }, (results, status) => {
//   if (status === "OK") {
//     console.log(results[0].geometry.location); // 검색된 좌표 출력
//   } else {
//     console.error("Geocode 실패: " + status);
//   }
// });

// const loader = new Loader({
//   apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
//   version: "weekly",
// });

// loader
//   .importLibrary("maps")
//   .then(({ Map }) => {
//     map = new Map(document.getElementById("map"), mapOptions);
//   })
//   .catch((e) => {
//     // do something
//   });

import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const searchQuery = ref("마곡"); // 검색어
const mapCenter = ref({ lat: 37.5665, lng: 126.978 }); // 서울 기본 좌표
let map; // 지도 객체
let marker; // 마커 객체

let google; // `google` 객체를 전역에서 사용할 수 있도록 선언
let geocoder;

onMounted(async () => {
  console.log("mounted");

  const loader = new Loader({
    apiKey: GOOGLE_MAP_API_KEY,
    version: "weekly",
  });
  console.log("2");

  // 라이브러리 로드
  google = await loader.importLibrary("maps"); // 전역 변수 `google`에 할당
  console.log(google);

  map = new google.Map(document.getElementById("map"), {
    center: mapCenter.value,
    zoom: 15,
  });
  console.log("3");

  google = await loader.importLibrary("geocoding"); // Geocoding 라이브러리 추가 로드
  console.log(google);
  // Geocoder 사용
  geocoder = new google.Geocoder();
  console.log("4");
  console.log("google", google);
  console.log("map", map);
  console.log("geocoder", geocoder);
  console.log("mounted 끝");
});
console.log("스크립트 로딩");

// 위치 검색 함수
function searchLocation() {
  console.log("검색진입");

  if (!google) {
    console.error("Google Maps 라이브러리가 아직 로드되지 않았습니다.");
    return;
  }

  geocoder.geocode({ address: searchQuery.value }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;

      // 지도 중심 이동
      map.setCenter(location);

      // 마커 설정
      if (marker) marker.setMap(null); // 기존 마커 제거
      marker = new google.Marker({
        position: location,
        map: map,
      });
    } else {
      alert("검색 결과를 찾을 수 없습니다: " + status);
    }
  });
}

const fetchPlaceData = async () => {
  const url = "https://places.googleapis.com/v1/places:searchText";
  const apiKey = GOOGLE_MAP_API_KEY; // 여기에 API 키를 입력하세요.

  const requestBody = {
    textQuery: "마곡역 주변 중국집",
  };

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask":
      "places.displayName,places.formattedAddress,places.priceLevel",
    languageCode: "ko",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 함수 호출
fetchPlaceData();
</script>

<style scoped>
/* 스타일 추가 */
</style>
