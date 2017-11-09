
export function displayableDate(timestamp) {

  var newDate = new Date();
  newDate.setTime(timestamp);
  
  return newDate.toUTCString();

}