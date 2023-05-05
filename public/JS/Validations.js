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