var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab


function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    var waiver = document.querySelector('input[name="Waiver?"]:checked').value;
    if(waiver == "No"){
        document.getElementById("waiver-intro-text").innerHTML = `<b>You have chosen to not request an interview waiver.
         If you would like to submit a waiver, please go back to the previous step and select "Yes"
        in the last question. Otherwise, please click on the submit button.</b>`;
        document.getElementById("waiver-details").style.display = "none";
    }
    else{
        document.getElementById("waiver-intro-text").innerHTML = `<b>You have requested an interview waiver.
         Please provide the following information about your prior interview.</b>`;
         document.getElementById("waiver-details").style.display = "block";
    }
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:*/
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    var waiverNo = document.getElementById("waiver-no");
    // ... the form gets submitted:
    if(!waiverNo.checked){
    submitFile();
    }
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid_blanks= true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  var waiverNo = document.getElementById("waiver-no");
  if ((currentTab == 2) && (waiverNo.checked)){
      document.getElementById("org-name").value = "N/A";
      document.getElementById("job-title").value = "N/A";
      document.getElementById("date-interview").value = "N/A";
      document.getElementById("job-desc").value = "N/A";
      document.getElementsByClassName("step")[currentTab].className += " finish";
      return true;
  }
  else{
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid_blanks = false;
    }
    else{
      if (y[i].type != "radio"){
      y[i].className ="normalInput";
    }
  }
  }
  if(valid_blanks == false){
    document.getElementById("field-error").innerHTML = "Please fill out all fields!";
  }
  else{
    document.getElementById("field-error").innerHTML = "";
  }
   
  if(currentTab == 0){
    valid_email = emailValidaion();
  }

  if(currentTab == 1){
    valid_date = dateValidation();
    valid_time = timeValidation();
    valid_radio = radioValidation();
  }


  if(currentTab == 1){
    if (valid_blanks && valid_email && valid_date) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return (valid_blanks && valid_email && valid_date && valid_time && valid_radio);
  }
  else{
  // If the valid status is true, mark the step as finished and valid:
  if (valid_blanks && valid_email) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return (valid_blanks && valid_email); // return the valid status
}
  }
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function dateValidation() {
    //This function validates the date and time
    var valid = true;
    var startDateString = "2022-10-31";
    var endDateString = "2022-11-13";

    var date1 = document.getElementById('slot1date').value;
    var date2 = document.getElementById('slot2date').value;
    var date3 = document.getElementById('slot3date').value;
    
    if((date1 < startDateString) || (date1 > endDateString)){
      document.getElementById("date1-error").innerHTML = 
      "Please enter a date between October 31st and November 13th";
      valid = false;
    }

    else{
      document.getElementById("date1-error").innerHTML = "";
    }
    
    if((date2 < startDateString) || (date2 > endDateString)){
      document.getElementById("date2-error").innerHTML = 
      "Please enter a date between October 31st and November 13th";
      valid = false;
    }
    else{
      document.getElementById("date2-error").innerHTML = "";
    }
    if((date3 < startDateString) || (date3 > endDateString)){
      document.getElementById("date3-error").innerHTML = 
      ("Please enter a date between October 31st and November 13th");
      valid = false;
    }
    else{
      document.getElementById("date3-error").innerHTML = "";
    }
   
    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status*/
}

function timeValidation(){
    var valid = true;
    var startTime = "09:00";
    var endTime = "20:30";

    var time1 = document.getElementById('slot1time').value;
    var time2 = document.getElementById('slot2time').value;
    var time3 = document.getElementById('slot3time').value;
    
    if((time1 < startTime) || (time1 > endTime)){
      document.getElementById("time1-error").innerHTML = 
      "Please enter a time between 9 AM and 8:30 PM";
      valid = false;
    }

    else{
      document.getElementById("time1-error").innerHTML = "";
    }
    
    if((time2 < startTime) || (time2 > endTime)){
      document.getElementById("time2-error").innerHTML = 
      "Please enter a time between 9 AM and 8:30 PM";
      valid = false;
    }
    else{
      document.getElementById("time2-error").innerHTML = "";
    }
    if((time3 < startTime) || (time3 > endTime)){
      document.getElementById("time3-error").innerHTML = 
      ("Please enter a time between 9 AM and 8:30 PM");
      valid = false;
    }
    else{
      document.getElementById("time3-error").innerHTML = "";
    }
   
    return valid; // return the valid status*/

}

function radioValidation() {
  var valid = true;
  var acknowledgement = document.getElementById("acknowledgement");
  var waiverYes = document.getElementById("waiver-yes");
  var waiverNo = document.getElementById("waiver-no");
  if((!acknowledgement.checked) || ((!waiverYes.checked) && (!waiverNo.checked))){
    valid = false;
    document.getElementById('radio-error').innerHTML = "Please select an option for waiver and/or acknowledge"
  }
  else{
    document.getElementById('radio-error').innerHTML = "";
  }
  return valid; // return the valid status*/
}

function emailValidaion(){
var email = document.getElementById("email");
var emailText = document.getElementById("email-error");
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
  { email.className = "normalInput";
    emailText.innerHTML = ""
    return (true)
  }
    email.className += " invalid";
    emailText.innerHTML = "<p> Please enter a valid email address"
    return (false)
}
}

function submitFile(){
const form = document.getElementById('regForm');
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var fileName = firstName + "_" + lastName + "_" + "Waiver_Evidence";
    const file = form.waiverFile.files[0];
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = f => {
      
      const url = "https://script.google.com/macros/s/AKfycbwvF-pDxllSz99uwJepJz15gqhk_oXSC_a0An08qaX9IWrRhl7esVNggoYCUBjI6tQ/exec"; 
      
      const qs = new URLSearchParams({filename: fileName || file.name, mimeType: file.type});
      fetch(`${url}?${qs}`, {method: "POST", body: JSON.stringify([...new Int8Array(f.target.result)])})
      .then(res => res.json())
      .then(e => console.log(e))  // <--- You can retrieve the returned value here.
      .catch(err => console.log(err));
    }
  ;
}
/*function postSubmit(){
  const form = document.getElementById('regForm');
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      alert("Success!");
    })
  };


*/