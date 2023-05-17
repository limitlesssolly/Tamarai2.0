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
  function ValidateMail(field) {
    if (field == '') {
      document.getElementById('Eerror').innerHTML = 'Enter a valid email';
      document.getElementById('Eerror').style.display = 'block';
      return false;
    }
    else {
      document.getElementById('Eerror').innerHTML = '';
      document.getElementById('Eerror').style.display = 'none';
      return true;
    }
  }
  function ValidateCode(field) {
    if (field == '') {
      document.getElementById('Aerror').innerHTML = 'Enter a valid code';
      document.getElementById('Aerror').style.display = 'block';
      return false;
    }
    else {
      document.getElementById('Aerror').innerHTML = '';
      document.getElementById('Aerror').style.display = 'none';
      return true;
    }
  }
  function Validation(form) 
  {
    if (ValidateName(form.username.value.trim()) && ValidatePass(form.password.value.trim()) && ValidateMail(form.email.value.trim())) 
    {
      document.getElementById('Success').style.display = 'block';
    }
    else {
      return false;
    }
  }
  
  function USValidation(form) 
  {
    if (ValidateName(form.username.value.trim()) && ValidatePass(form.password.value.trim()) ) 
    {
      return true;
    }
    else {
      return false;
    }
  }
  function ASValidation(form) 
  {
    if (ValidateCode(form.admincode.value.trim()) && ValidateName(form.username.value.trim()) && ValidatePass(form.password.value.trim()) ) 
    {
      return true;
    }
    else {
      return false;
    }
  }
  
  