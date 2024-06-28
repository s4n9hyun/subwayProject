import React, { useState } from "react";
import areas from "./areas.json"; // areas.json 파일 import
import styles from "./WeatherSearch.module.css"; // styles import

const WeatherSearch = () => {
    const [category, setCategory] = useState(Object.keys(areas)[0]); // 카테고리 초기값 설정
    const [selectedArea, setSelectedArea] = useState(areas[Object.keys(areas)[0]][0]); // 세부 지역 초기값 설정
    const [arrivals, setArrivals] = useState([]); // 도착 정보 상태 설정

    const handleSearch = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        console.log(apiKey);
        const url = `http://swopenAPI.seoul.go.kr/api/subway/${apiKey}/xml/realtimeStationArrival/0/5/${selectedArea}`;
        const response = await fetch(url);
        const textData = await response.text(); // XML 데이터를 텍스트로 가져옴
        console.log(textData); // XML 데이터 출력

        // DOMParser를 사용하여 XML 데이터를 파싱
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(textData, "application/xml");

        // XML 데이터에서 필요한 정보 추출
        const rows = xmlDoc.getElementsByTagName("row");
        const arrivalData = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const station = row.getElementsByTagName("statnNm")[0].textContent;
            const trainLineNm = row.getElementsByTagName("trainLineNm")[0].textContent;
            const arrivalTime = row.getElementsByTagName("arvlMsg2")[0].textContent;
            arrivalData.push({ station, trainLineNm, arrivalTime });
        }

        console.log(arrivalData); // 추출된 데이터 출력
        setArrivals(arrivalData);
    };

    return (
        <div className={styles["weather-container"]}>
            <h1>지하철 도착 정보</h1>
            <div className={styles["category-buttons"]}>
                {Object.keys(areas).map((key) => (
                    <button key={key} onClick={() => setCategory(key)}>
                        {key}
                    </button>
                ))}
            </div>
            <div className={styles["search-box"]}>
                <select value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                    {areas[category].map((area, index) => (
                        <option key={index} value={area}>
                            {area}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch}>검색</button>
            </div>
            {arrivals.length > 0 && (
                <div className={styles["arrival-info"]}>
                    {arrivals.map((arrival, index) => (
                        <div key={index} className={styles["arrival-item"]}>
                            <p>역 이름: {arrival.station}</p>
                            <p>열차 행선지: {arrival.trainLineNm}</p>
                            <p>도착 정보: {arrival.arrivalTime}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherSearch;
