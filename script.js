let btn = document.getElementById("btn");

        btn.addEventListener("click",()=>{
        let text = document.getElementById("getText").value;
        document.getElementById("btn").innerHTML = "<button id="btn">Loading <i class="fa fa-search" aria-hidden="true"></i></button>";
        //Credits to the API
            fetch('https://api.covid19api.com/summary')
            .then((covidData)=>{
                return covidData.json();
            })
           //Fetches the Information from the API in JSON format
            .then((getData)=>{
                document.getElementById("btn").innerHTML = "<button id="btn">Search <i class="fa fa-search" aria-hidden="true"></i></button>";
                console.log(getData);
                var content = document.querySelector(".data");

                var box = content.lastElementChild;
                while (box) {
                    content.removeChild(box);
                    box = content.lastElementChild;
                }

                var index = 0;
                var totalCountries = getData.Countries.length;
              //Loop for testing purposes.
                for(var i=0;i<totalCountries ;i++){
                    if(getData.Countries[i].Country.toLowerCase() == text.toLowerCase()){
                        index = i;
                        break;
                    } else {
                        index = -1;
                    }
                }
                
                    //HTML starts here
                if(index !== -1){
                    let countryData = getData.Countries[index];
                let data = document.querySelector(".data");
                data.innerHTML = `<div class="box">
                                <div class="head">
                                    <span>COVID-19 Cases in ${countryData.Country}</span>
                                </div>
                                <div class="total">
                                    <div><b>Total Confirmed</b> <p>${countryData.TotalConfirmed}</p></div>
                                    <div><b>Total Deaths</b> <p>${countryData.TotalDeaths}</p></div>
                                    <div><b>Total Recovered</b> <p>${countryData.TotalRecovered}</p></div>
                                </div>
                                <div class="new">
                                    <div><b>New Confirmed</b> <p>${countryData.NewConfirmed}</p></div>
                                    <div><b>New Deaths</b> <p>${countryData.NewDeaths}</p></div>
                                    <div><b>New Recovered</b> <p>${countryData.NewRecovered}</p></div>
                                    </div>
                                </div>`;
                } else {
                    let data = document.querySelector(".data");
                    data.innerHTML = `<div class="box">
                                    <div class="head">
                                        <span>Data not found</span>
                                    </div>
                                    <div class="total">
                                        <div>-</div>
                                        <div>-</div>
                                        <div>-</div>
                                    </div>
                                    <div class="new">
                                        <div>-</div>
                                        <div>-</div>
                                        <div>-</div>
                                        </div>
                                    </div>`
                }
            })
        })
