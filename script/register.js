btn = document.getElementById("registerBtn");
btn.addEventListener("click", sendData);

function sendData() {
  userData();
  if (
    name.value == "" ||
    email.value == "" ||
    mobile.value == "" ||
    username.value == "" ||
    password.value == "" ||
    desc.value == ""
  ) {
    alert("Every input field must be fill.");
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/auth/register");
    xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    xhr.onload = function() {
      if (xhr.status == 200) {
        callBack(JSON.parse(xhr.response));
        window.location.href = "/login.html";
      }
    };
    xhr.send(objSend);
  }
  //  call back function
  function callBack(responseData) {
    if (!responseData.error) {
      message = document.getElementById("error");
      message.setAttribute(
        "style",
        "border:1px solid black; font-weight:bold; font-size:20px; background:green; color:white;"
      );
      message.textContent = "User have been registered in database.";
    } else {
      message = document.getElementById("error");
      message.setAttribute(
        "style",
        "border:1px solid black; font-weight:bold; font-size:20px; background:red; color:white;"
      );
      message.textContent = "User is already registered.";
    }
  }
}

// input value
function userData() {
  var obj = {};
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var mobile = document.getElementById("mobile");
  var username = document.getElementById("username");
  var password = document.getElementById("password");
  var desc = document.getElementById("desc");

  obj["name"] = name.value;
  obj["email"] = email.value;
  obj["password"] = password.value;
  obj["username"] = username.value;
  obj["mobile"] = mobile.value;
  obj["description"] = desc.value;
  objSend = JSON.stringify(obj);
}

//goto login page

document.getElementById("loginpage").addEventListener("click", function() {
  window.location.href = "/login.html";
});
