import config from './config.js';

let searchButton = document.querySelector(".search-button");
let searchInput = document.querySelector(".search-input");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let location = await getLocation();
        dataprocess(location);
        searchInput.value = location;
    } catch (error) {
        console.log(error);
    }
});

searchButton.addEventListener("click", () => {
    dataprocess(searchInput.value);
})


function createDate(i) {
    let day = new Date();
    let currentDay = day.getDate() + i;
    let currentMonth;
    let currentYear = day.getFullYear();

    switch (day.getMonth() + 1) {
        case 1:
            currentMonth = "January";
            break;
        case 2:
            currentMonth = "February";
            break;
        case 3:
            currentMonth = "March";
            break;
        case 4:
            currentMonth = "April";
            break;
        case 5:
            currentMonth = "May";
            break;
        case 6:
            currentMonth = "Jun";
            break;
        case 7:
            currentMonth = "July";
            break;
        case 8:
            currentMonth = "August";
            break;
        case 9:
            currentMonth = "September";
            break;
        case 10:
            currentMonth = "October";
            break;
        case 11:
            currentMonth = "November";
            break;
        case 12:
            currentMonth = "December";
            break;
    }

    let currentDate = (currentDay + " " + currentMonth + " " + currentYear);
    return currentDate;
}

async function getLocation() {
    try {
        const key = config.ipKey;

        const fetchip = await fetch(`https://ipinfo.io/json?token=${key}`);
        const ipdata = await fetchip.json();
    
        const fetchcity = await fetch(`https://ipinfo.io/${ipdata.ip}/json?token=${key}`);
        const citydata = await fetchcity.json();
        
        return citydata.city;

    } catch (error) {
        console.error(error);
    }

}

async function getWeatherData(URL) {
    try {
        const key = config.weatherKey;
        const data = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `${key}`
            }
        });

        if (!data.ok) {
            console.log("The request failed.");
        }

        const response = await data.json();
        return response;
    } catch (error) {
        console.error("Error: ", error);
        return null;
    }
}

async function dataprocess(city) {
    const key = config.weatherKey;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`;
    console.log(city);
    let weatherData = await getWeatherData(url);
    console.log(weatherData);
    for(let i=0; i<5; i++)
    {
    let currentElement = document.getElementById(`${i}`);

    while(currentElement.firstChild)
    {
        currentElement.removeChild(currentElement.firstChild);
    }

    let img = document.createElement("img");
    let h1 = document.createElement("h1");
    let h2 = document.createElement("h2");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");

            switch (weatherData.data[i].weather.code) {
                case 200:
                case 201:
                case 202:
                    img.src = "photos/t01d.png";
                    break;
                case 230:
                case 231:
                case 232:
                case 233:
                    img.src = "photos/t04d.png";
                    break;
                case 300:
                case 301:
                case 302:
                    img.src = "photos/d01d.png";
                    break;
                case 500:
                case 501:
                case 511:
                case 520:
                case 522:
                case 900:
                    img.src = "photos/r01d.png";
                    break;
                case 502:
                    img.src = "photos/r03d.png";
                    break;
                case 521:
                    img.src = "photos/r05d.png";
                    break;
                case 600:
                case 601:
                case 602:
                case 610:
                case 621:
                case 622:
                case 623:
                    img.src = "photos/s02d.png";
                    break;
                case 611:
                case 612:
                    img.src = "photos/s05d.png";
                    break;
                case 700:
                case 711:
                case 721:
                case 731:
                case 741:
                case 751:
                    img.src = "photos/a01d.png";
                    break;
                case 800:
                    img.src = "photos/c01d.png";
                    break;
                case 801:
                case 802:
                    img.src = "photos/c02d.png";
                    break;
                case 803:
                    img.src = "photos/c03d.png";
                    break;
                case 804:
                    img.src = "photos/c04d.png";
                    break;
            }

            h1.innerHTML = weatherData.data[i].weather.description;
            h2.innerHTML = createDate(i);
            h3.innerHTML = weatherData.data[i].app_max_temp + "°";
            h4.innerHTML = weatherData.data[i].app_min_temp + "°";

            currentElement.appendChild(img);
            currentElement.appendChild(h1);
            currentElement.appendChild(h2);
            currentElement.appendChild(h3);
            currentElement.appendChild(h4);

    }
}