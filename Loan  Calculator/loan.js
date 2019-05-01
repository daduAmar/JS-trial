//listen for form submit

document.querySelector('#loan-form').addEventListener('submit', function(e) {
  document.querySelector('#result').style.display = 'none';

  document.querySelector('#loading').style.display = 'block';
  setTimeout(calculateAmt, 2000);

  e.preventDefault();
});

function calculateAmt() {
  //console.log('calculatin.....');

  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const duration = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#m-payment');
  const totalPayment = document.querySelector('#tot-payment');
  const totalInterest = document.querySelector('#tot-inst');

  //formula for loan calculation

  // EMI = [P * R * X]/[X-1]
  // where
  // X = (1+R)^N
  // P = principal_amount
  // R = rate_of_interest/12
  // N = duration_of_the_loan * 12

  const P = parseFloat(amount.value);
  const R = parseFloat(interest.value) / 100 / 12;
  const N = parseFloat(duration.value) * 12;
  const X = Math.pow(1 + R, N);
  const monthlyEMI = (P * R * X) / (X - 1);

  if (isFinite(monthlyEMI)) {
    monthlyPayment.value = monthlyEMI.toFixed(2);
    totalPayment.value = (monthlyEMI * N).toFixed(2);
    totalInterest.value = (monthlyEMI * N - P).toFixed(2);

    document.querySelector('#result').style.display = 'block';

    document.querySelector('#loading').style.display = 'none';
  } else {
    showError('Please check your inputs...');
  }
}

function showError(error) {
  document.querySelector('#result').style.display = 'none';

  document.querySelector('#loading').style.display = 'none';

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));

  //inseting error above heading
  card.insertBefore(errorDiv, heading);

  //clearing error after some time
  setTimeout(clearError, 3000);
}
function clearError() {
  document.querySelector('.alert').remove();
}
