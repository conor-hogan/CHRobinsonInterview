class Country {
    constructor(name, connected_countries, full_name){
        this.name = name; //String representing 3 letter abbreviation of country
        this.connected_countries = connected_countries; //array of country objects representing the countries one can travel to from the country object
        this.full_name = full_name; //String representing full name of country used for printing country name
    }

    getConnectedCountries(){
        return this.connected_countries;
    }

    setConnectedCountries(connected_countries){
        this.connected_countries = connected_countries;
    }
}

//Initializing country variables. temp put in for connected countries so all country objects can be initialized before use
let CAN = new Country("CAN", "temp", "Canada");
let USA = new Country("USA", "temp", "United States");
let MEX = new Country("MEX", "temp", "Mexico");
let BLZ = new Country("BLZ", "temp", "Belize");
let GTM = new Country("GTM", "temp", "Guatemala");
let SLV = new Country("SLV", "temp", "El Salvador");
let HND = new Country("HND", "temp", "Honduras");
let NIC = new Country("NIC", "temp", "Nicaragua");
let CRI = new Country("CRI", "temp", "Costa Rica");
let PAN = new Country("PAN", "temp", "Panama");

//Setting connected_country attribute for all countries
CAN.setConnectedCountries([USA]);
USA.setConnectedCountries([CAN, MEX]);
MEX.setConnectedCountries([USA, GTM, BLZ]);
BLZ.setConnectedCountries([MEX, GTM]);
GTM.setConnectedCountries([MEX, BLZ, SLV, HND]);
SLV.setConnectedCountries([GTM, HND]);
HND.setConnectedCountries([GTM, SLV, NIC]);
NIC.setConnectedCountries([HND, CRI]);
CRI.setConnectedCountries([NIC, PAN]);
PAN.setConnectedCountries([CRI]);

//An array of all countries created to check user input
let countryArray = [CAN, USA, MEX, BLZ, GTM, SLV, HND, NIC, CRI, PAN];

//Checks if a given country has already been visited. visitedCountries is an array assumed to be all countries reached by search algorithm.
function visitedCountriesChecker(country, visitedCountries){
    for(let i = 0; i < visitedCountries.length; i++){
        if(visitedCountries[i] == country){
            return true
        }
    }
    return false;
}

//Function to get the path from the USA to a given country
function getPath(country){
    //Base case, returns singular array signifying that USA's path is just USA
    if(country == USA){ 
        return [USA];
    }
    let visitedCountries = [USA]
    let paths = [[USA]]
    while(!visitedCountriesChecker(country, visitedCountries)){
        for(let i = 0; i < paths.length; i++){
            let possibleCountries = [];
            let lastCountry = paths[i][paths[i].length-1];
            possibleCountries = lastCountry.getConnectedCountries()
            for(let j = 0; j < possibleCountries.length; j++){
                if(possibleCountries[j] == country){
                    paths[i].push(possibleCountries[j]);
                    return paths[i];
                }
                else{
                    if(!visitedCountriesChecker(possibleCountries[j], visitedCountries)){
                        let newPath = []
                        for(let k = 0; k<paths[i].length; k++){
                            newPath.push(paths[i][k]);
                        }
                        newPath.push(possibleCountries[j]);
                        paths.push(newPath);
                        visitedCountries.push(possibleCountries[j]);
                    }
                }
            }
            paths.splice(i,1);
        }
    }
}
function master(){
    let input = document.getElementById("userInput").value;
    let correct_input = false;
    for(let i = 0; i < countryArray.length; i++){
        if(input == countryArray[i].name){
            correct_input = true;
            document.write("The path for " + countryArray[i].full_name + " is:<br>");
            let pathArray = getPath(countryArray[i]);
            for(let j = 0; j < pathArray.length - 1; j++){
                document.write(pathArray[j].name + " --> ");
            }
            document.write(pathArray[pathArray.length-1].name + "<br><br>");
            document.write("If you would like to view the path for another country, please refresh the page and enter that country's code.")
        }
    }
    if(!correct_input){
        document.write("Incorrect input, please reload the page and try again. The correct inputs for available countries are as follows: <br>");
        document.write("Canada: CAN<br>");
        document.write("United States: USA<br>");
        document.write("Mexico: MEX<br>");
        document.write("Belize: BLZ<br>");
        document.write("Guatemala: GTM<br>");
        document.write("El Salvador: SLV<br>");
        document.write("Honduras: HND<br>");
        document.write("Nicaragua: NIC<br>");
        document.write("Costa Rica: CRI<br>");
        document.write("Panama: PAN<br>");
    }
}



