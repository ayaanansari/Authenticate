btn = document.getElementById("registerBtn");
btn.addEventListener("click", sendData);

function sendData() {
  userData();
  if (username.value == "" || password.value == "") {
    alert("Every input field must be fill.");
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/auth/login");
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = function() {
      if (xhr.status == 200) {
        callBack(JSON.parse(xhr.response));
      } else if (xhr.status == 401) {
        callBack(JSON.parse(xhr.response));
      }
    };
    xhr.send(objSend);
  }
  // call back function
  function callBack(responseData) {
    if (!responseData.error) {
      message = document.getElementById("error");
      message.setAttribute(
        "style",
        "border:1px solid black; font-weight:bold; font-size:20px; background:green; color:white;"
      );
      message.textContent = "Showing.";
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8080/user/" + username.value);
      xhr.setRequestHeader("Authorization", "Bearer " + responseData.token);
      xhr.send();
      xhr.onload = function() {
        if (xhr.status == 200) {
          profileInfo = JSON.parse(xhr.response);
          profile = document.getElementById("showProfile");
          message.textContent = "Your profile";
          for (key in profileInfo) {
            profile.textContent += key + " : " + profileInfo[key] + "\n";
          }
        } else if (xhr.status == 401) {
          message.textContent = xhr.status;
        }
      };
    } else {
      message = document.getElementById("error");
      message.setAttribute(
        "style",
        "border:1px solid black; font-weight:bold; font-size:20px; background:red; color:white;"
      );
      message.textContent =
        "Either user is not registered or username or password is wrong.";
    }
  }
}

function userData() {
  var obj = {};
  var username = document.getElementById("username");
  var password = document.getElementById("password");

  obj["password"] = password.value;
  obj["username"] = username.value;
  objSend = JSON.stringify(obj);
}

//goto register page
document.getElementById("registerPage").addEventListener("click", function() {
  window.location.href = "/index.html";
});
