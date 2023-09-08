const BS = require("bikram-sambat-js");

export const englishToNepali =(number) => {
    let englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', "-",  "/", ":","+"];
    let nepaliNumbers = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९',  "-", "/", ":","+ "];
    const numberToConvert = number.toString().split('');
    var result = "";
    for (var i = 0; i < numberToConvert.length; i++) {
        for (var j = 0; j < englishNumbers.length; j++) {
            if (numberToConvert[i] === englishNumbers[j]) {
                result += nepaliNumbers[j];
            }
        }
    }
    return result;
}

export const daysWeakToNepaliDaysWeak = (weekDays) => {
  let englishWeekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let nepaliWeekDays = ["आ", "सो", "मं", "बु", "बि", "शु", "श"];
  const indexValue = englishWeekDays.indexOf(weekDays);
  return nepaliWeekDays[indexValue];
};

export const TimeSpanTimeOnly =(data) =>{
if(!data){
  return "";
}
  const splitData = data.split(".");
  const timeSpanOnly = splitData[0];
  const finalSplitData = timeSpanOnly.split(":");
  const finalData = `${finalSplitData[0]}:${finalSplitData[1]}`
  return finalData;
}

export const BsDate=(englishDate) =>{
  
const aa = BS.ADToBS(englishDate);
return aa;
}
