// clicking on submit
document.getElementById('submit').addEventListener('click', function(e) {

  // hide results
  document.querySelector('.output').style.display = 'none';

  // show loader
  document.querySelector('.loader').style.display = 'block'

  // timeout
  setTimeout(calculateLoan, 1000);

  // prevent default
  e.preventDefault();
});


// CALCULATE LOAN - Function
function calculateLoan() {
  console.log('running');

  // UI Variables

  // input
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  // output
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');



  // STORING DATA

  // storing loan amount (p)
  const principalAmount = parseFloat(amount.value);
  // calculating interest rate for a month (r)
  const calcInterest = parseFloat(interest.value) / 100 / 12;
  // calculation no. of months for loan taken (n)
  const calcMonths = parseFloat(years.value) * 12;



  // CALCULATION   Monthly payment = P * [{r*(1+r)^n}/{(1+r)^n-1}]

  // calculating x
  const x = Math.pow(1 + calcInterest, calcMonths);
  // calculating monthly payment
  const payment = ((principalAmount * calcInterest * x) / (x - 1)).toFixed(2);
  // calculating total payment paid
  const finalPayment = (payment * calcMonths).toFixed(2);



  // DISPLAYING INFO

  // checking if payment is defined(entered values are correct)
  if(isFinite(payment)) {

    // 1 - show monthly payment
    monthlyPayment.value = `Rs. ${payment}`;

    // 2 - show total payment to be paid (monthly pay * no. of months)
    totalPayment.value = `Rs. ${finalPayment}`;

    // 3 - show total interest paid (total paid - principal amount)
    totalInterest.value = `Rs. ${(finalPayment - principalAmount).toFixed(2)}`;

    // 4 - show results
    document.querySelector('.output').style.display = 'block';

    // 5 - hide loader
    document.querySelector('.loader').style.display = 'none';

    // 6 - clear input fields
    amount.value = '';
    interest.value = '';
    years.value = '';

  } else {
    console.log('Wrong');
    showError('Please check the numbers!! ');
  }

}



// SHOW ERROR - Function
function showError(error) {

  //hide results
  document.querySelector('.output').style.display = 'none';

  //hide loader
  document.querySelector('.loader').style.display = 'none';

  // create a new div 
  const errorDiv = document.createElement('div');

  // assign a class
  errorDiv.className = 'error';

  // insert text
  errorDiv.appendChild(document.createTextNode(error));

  // insert the div between submit btn
  document.querySelector('.input').insertBefore(errorDiv, document.getElementById('submit'));

  // clear error msg
  setTimeout(function() {
    document.querySelector('.error').remove();
  }, 3000);

}