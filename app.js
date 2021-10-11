class Country {
    constructor(name, connected_countries, full_name){
        this.name = name;
        this.connected_countries = connected_countries;
        this.full_name = full_name;
    }

    getConnectedCountries(){
        return this.connected_countries;
    }

    setConnectedCountries(connected_countries){
        this.connected_countries = connected_countries;
    }
}

let CAN = new Country("CAN", "temp", "Canada");
let USA = new Country("USA", "temp", "United States");
let MEX = new Country("MEX", "temp", "Mexico");
let BLZ = new Country("BLZ", "temp", "Belize");
let GTM = new Country("GTM", "temp", "Guatamala");
let SLV = new Country("SLV", "temp", "El Salvador");
let HND = new Country("HND", "temp", "Honduras");
let NIC = new Country("NIC", "temp", "Nicaragua");
let CRI = new Country("CRI", "temp", "Costa Rica");
let PAN = new Country("PAN", "temp", "Panama");

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

let countryArray = [CAN, USA, MEX, BLZ, GTM, SLV, HND, NIC, CRI, PAN];

function visitedCountriesChecker(country, visitedCountries){
    for(let i = 0; i < visitedCountries.length; i++){
        if(visitedCountries[i] == country){
            return true
        }
    }
    return false;
}

function getPath(country){
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
            document.write(pathArray[pathArray.length-1].name);
        }
    }
    if(!correct_input){
        document.write("Incorrect input, please reload the page and try again. The correct inputs for available countries are as follows <br>");
        document.write("Canada: CAN<br>");
        document.write("United States: USA<br>");
        document.write("Mexico: MEX<br>");
        document.write("Belize: BLZ<br>");
        document.write("Guatamala: GTM<br>");
        document.write("El Salvador: SLV<br>");
        document.write("Honduras: HND<br>");
        document.write("Nicaragua: NIC<br>");
        document.write("Costa Rica: CRI<br>");
        document.write("Panama: PAN<br>");
    }
}



