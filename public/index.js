var app = function(){
  var url = "https://restcountries.eu/rest/v2";
    makeRequest(url, requestComplete);

    var jsonString = localStorage.getItem('selectCountry');
    var savedCountry = JSON.parse(jsonString);

    if (!savedCountry) return;

    setLastCountry("#country-details", "Name: " + savedCountry.name + "<br>" + "Population: " + savedCountry.population + "<br>" + "Capital: " + savedCountry.capital + "<img src=" + savedCountry.flag + " />")
}

var requestComplete = function(){
  if(this.status !== 200) return;
  
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);

  populateList(countries);
}

var populateList = function(countries){
  var select = document.getElementById("dropdown");

  select.addEventListener("change", function(event){
  
    var ul = document.getElementById("country-details")
    ul.innerHTML = "";
    var liName = document.createElement("liName")
    var liPop = document.createElement("liPop")
    var liCap = document.createElement("liCap")
    var liFlag = document.createElement("liFlag")

    var selectedCountryName = event.target.value;

    var selectCountry = countries.find(function(country) {
      return country.name === selectedCountryName;
    });

    liName.innerText = "Name: " + selectCountry.name 
    liPop.innerText = "\nPopulation: " + selectCountry.population
    liCap.innerText = "\nCapital: " + selectCountry.capital
    liFlag.innerHTML = "<img src=" + selectCountry.flag + " />";

    ul.appendChild(liName);
    ul.appendChild(liPop);
    ul.appendChild(liCap);
    ul.appendChild(liFlag);

    var jsonString = JSON.stringify(selectCountry);
    localStorage.setItem('selectCountry', jsonString);
  });

  countries.forEach(function(country){
    var option = document.createElement("option");
    option.innerText = country.name;
    select.appendChild(option);
  });
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var setLastCountry = function(id, details){
  var ul = document.querySelector(id);
  var li = document.createElement("li")
  li.innerHTML = details;
  ul.appendChild(li); 
}



window.addEventListener('load', app);