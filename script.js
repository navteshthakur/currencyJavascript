/*Name: Navtesh Thakur
Student Id: 200554899
Email: thnavtesh@gmail.com*/
function convert(clicking) {
    clicking.preventDefault();
 //Accessing the values of html element s by getting their ids
    const API_KEY = '4653a5b17ef615f3069946f7';
    let fc = document.querySelector("#number").value;
    let fcs = document.querySelector("#currency").value;
    let tcs = document.querySelector("#currency1").value;
    let out = document.querySelector("#result");
    let out1 = document.querySelector("#result1");  
    let h3 = document.querySelector("#h3");  
    let usd = document.querySelector("#one");  
    let aud = document.querySelector("#two");  
    let cad = document.querySelector("#three"); 
    let inr = document.querySelector("#four");  
    let gbp = document.querySelector("#five");  
    let cny = document.querySelector("#six");  
    
//this is the url which will use the above variables to access the required information in order to perform conversion
    let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fcs}/${tcs}/${fc}`;
    let url1=`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fcs}`;
//just to test the output
    console.log(url);
    console.log(url1);
//the first fetch method is there to perfrom the pair conversion
    fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error Detected');//throws an error 
            }
            console.log(response.json);//prints the object to console
            return response.json();

        })
        .then(data => {
            console.log(data);
            let conversion_rate = data.conversion_rate;
            let conversion_result = data.conversion_result.toFixed(2);
            let htmlx = `${conversion_result}`;
            out.innerHTML = htmlx;
            out1.innerHTML=`<label>Conversion Rate:</label> ${conversion_rate}`;//this will display the value
        })
        .catch(error => {
            console.error('Error:', error);
        });
//the second fetch method will covert the currencies into other currencies
    fetch(url1, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network Error Detected');
            }
            console.log(response.json);
            return response.json();

        })
        .then(data => {
            console.log(data);
            let base_code = data.base_code;
            let cr_usd = data.conversion_rates['USD'].toFixed(2);
            let cr_aud = data.conversion_rates['AUD'].toFixed(2);
            let cr_cad = data.conversion_rates['CAD'].toFixed(2);
            let cr_inr = data.conversion_rates['INR'].toFixed(2);
            let cr_gbp = data.conversion_rates['GBP'].toFixed(2);
            let cr_cny = data.conversion_rates['CNY'].toFixed(2);
            //display the converted rates with the images of the flags
            h3.innerHTML=`1${fcs}=`;
            usd.innerHTML=`${cr_usd} USD <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/unitedstates.png"></p>`;
            aud.innerHTML=`${cr_aud} AUD <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/australia.png"></p>`;
            cad.innerHTML=`${cr_cad} CAD <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/canada.png"></p>`;
            inr.innerHTML=`${cr_inr} INR <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/india.png"></p>`;
            gbp.innerHTML=`${cr_gbp} GBP <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/unitedkingdom.png"></p>`;
            cny.innerHTML=`${cr_cny} CNY <p><img src="https://www.currencyremitapp.com/wp-content/themes/currencyremitapp/images/countryimages/china.png"></p>`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
}
//gets the values from form and when the button is submitted the convert method is triggered.
document.getElementById('currencyForm').addEventListener('submit', convert);