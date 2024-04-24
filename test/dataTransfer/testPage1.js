
// Define an object
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com'
};

document.addEventListener('DOMContentLoaded', function() {

  const storeData = document.querySelector('#storeData');
  const goToPage2 = document.querySelector('#goToPage2');
  const output = document.querySelector('#output');

  storeData.addEventListener("click", (e) => {
    storeTheData();
  });
  goToPage2.addEventListener("click", (e) => {
    goToThePage2();
    // console.log("page2");
  });


  function storeTheData() {
    // Serialize the object into JSON and store it in local storage
    localStorage.setItem('user', JSON.stringify(user));
    output.innerHTML = "Data Stored";
  }
  function goToThePage2() {
    // Redirect to retrieve.html
    window.location.href = 'testPage2.html';
  }

});