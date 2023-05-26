const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  // validate the form data
  const email = document.querySelector('#emailInput').value;
  const username = document.querySelector('#usernameInput').value;
  const password = document.querySelector('#passwordInput').value;
  const confirmPassword = document.querySelector('#confirmPasswordInput').value;

  if (!email || !username || !password || !confirmPassword) {
    alert('Please fill out all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // if the form data is valid, submit the form
  form.submit();
});
