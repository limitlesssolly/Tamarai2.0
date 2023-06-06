function ValidateName(field) {
  if (field == '') {
    document.getElementById('Uerror').innerHTML = 'Enter a valid username';
    document.getElementById('Uerror').style.display = 'block';
    return false;
  }
  else {
    document.getElementById('Uerror').innerHTML = '';
    document.getElementById('Uerror').style.display = 'none';
    return true;
  }
}
function ValidatePass(field) {
  if (field == '') {
    document.getElementById('Perror').innerHTML = 'Enter a valid password';
    document.getElementById('Perror').style.display = 'block';
    return false;
  }
  else {
    document.getElementById('Perror').innerHTML = '';
    document.getElementById('Perror').style.display = 'none';
    return true;
  }
}
function Validation(form) {
  if (ValidateName(form.username.value.trim()) && ValidatePass(form.password.value.trim())) {
    return true;
  }
  else {
    return false;
  }
}

class FormClass {
  constructor(form) {
    this.form = form;
    this.noErr = true;
  }

  initialize() {
    this.form.addEventListener("submit", (event) => {
      console.log("Registering in user JS");
      this.validateFields();
      if (!this.noErr) {
        event.preventDefault();
      } else {
        // Call the jQuery AJAX function
        this.submitFormWithAjax(event);
      }
    });
  }

  resetErrors() {
    let errors = document.getElementById("form").getElementsByClassName("errorMsg");
    for (let i = 0; i < errors.length; i++) {
      errors[i].innerHTML = "<br>";
    }
    this.noErr = true;
  }
  validateFields() {
    this.resetErrors();
    let fields = document.querySelectorAll("#form div input");

    for (let i = 0; i < fields.length; i++) {
      fields[i].value = fields[i].value.trim();
      let error = document.querySelectorAll("#form.errorMsg")[i];
      if (fields[i].value === "") {
        switch (fields[i].id) {
          case "username":
            error.innerHTML = "Username name is required";
            break;
          case "email":
            error.innerHTML = "Email is required";
            break;
          case "password":
            error.innerHTML = "Password is required";
            break;
          case "confirmPassword":
            error.innerHTML = "Confirm password is required";
            break;
        }
        this.noErr = false;
      }
      else {
        switch (fields[i].id) {
          case "password":
            console.log(fields[i].value.length);
            if (fields[i].value.length < 8) {
              error.innerHTML = fields[i].id + " must be more than 8 characters";
              error.style.visibility = "visible";
              this.noErr = false;
            }
            break;
          case "confirmPassword":
            let pass = document.getElementById("password");
            if (pass.value != fields[i].value) {
              error.innerHTML = "Passwords do not match!";
              error.style.visibility = "visible";
              this.noErr = false;
            }
            break;
          case "Email":
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!fields[i].value.match(mailformat)) {
              error.innerHTML = "Invalid Email";
              error.style.visibility = "visible";
              this.noErr = false;
            }
            break;
        }
      }
    }

  }

  submitFormWithAjax(event) {
    event.preventDefault();
    const formData = $(this.form).serialize();
    $.ajax({
      url: "/register?ajax=true",
      method: "POST",
      data: formData,
      success: function (response) {
        if (Object.keys(response.errors).length === 0)
          window.location.href = "/account";
        else {
          $("#usernameErrorMsg").html(response.errors.username);
          $("#emailErrorMsg").html(response.errors.email);
          $("#passwordErrorMsg").html(response.errors.password);
          $("#confirmPassErrorMsg").html(response.errors.confirmPassword);
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
}

const validator = new FormClass(document.getElementById("form"));
validator.initialize();