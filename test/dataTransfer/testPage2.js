
// Retrieve the serialized JSON string from local storage and parse it back into an object
const storedUserJSON = localStorage.getItem('user');
const storedUser = JSON.parse(storedUserJSON);

document.addEventListener('DOMContentLoaded', function() {

  const retrieveData = document.querySelector('#retrieveData');

  retrieveData.addEventListener("click", (e) => {
    retrieveTheData();
  });
  

  function retrieveTheData() {
    // Display the retrieved user object
    document.write('<h2>User Information</h2>');
    document.write('<p>Name: ' + storedUser.name + '</p>');
    document.write('<p>Age: ' + storedUser.age + '</p>');
    document.write('<p>Email: ' + storedUser.email + '</p>');
  }

});