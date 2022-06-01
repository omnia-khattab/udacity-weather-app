/* Global Variables */
const button = document.getElementById('generate');
const apiKey = '&appid=fd657f94b0475be5812be16e3bc13fdb&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
//create Post Method
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

//create GET Method 
//Fetch API
const retrieveWeatherData = async (baseURL, zip, apiKey) => {
    const requestData = await fetch(baseURL + zip + apiKey);
    try {
        const newData = await requestData.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

//Chaining Promise
/*get the weather from the API & post data from the client*/
const generateWaether = async () => {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    //console.log(typeof(zipCode));
    let codeNum = Number(zipCode);
    if (zipCode !== '' && Number.isInteger(codeNum)) {
        retrieveWeatherData(baseURL, zipCode, apiKey).then((weatherdata) => {
            postData('/add', {
                date: newDate,
                weather: Math.round(weatherdata.main.temp),
                content: feelings
            });

        }).then(() => {
            updateUI();
        });
    } else {
        let error = document.getElementById('error');
        error.innerHTML = "Please Enter a valid zipCode";
        //remove the error after 5 seconds
        setTimeout(() => {
            error.innerHTML = "";
        }, 5000)
    }

};

//update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('UpdateUI Data', allData);
        
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = allData.weather + " " + "C";
            document.getElementById('content').innerHTML = allData.content;
        
    } catch (error) {
        console.log('error', error);
    }
}


//when click on the button get the weather
button.addEventListener('click', generateWaether);