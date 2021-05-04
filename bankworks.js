var currentUser = "";

//login form section
 async function loginToAccount() {
   submitLogin.onsubmit = async function(event) {
     currentUser = existingUser.value;
     let potentialUser = await getUserList(currentUser);

    if("User does not exist" == potentialUser.error) {
      currentUser = ""
      existingUserWarning.classList.remove('hide');
      event.preventDefault();
      return;
    }

    document.querySelector(".loginSection").classList.add('hide');
    registerForm.classList.add('hide');
    document.querySelector('h4').classList.add('hide');
    document.querySelector(".newTransaction").classList.remove('hide');
   }
 }

async function getUserList(user) {
  user = user;
  try {
    const response = await fetch(`//localhost:5000/api/accounts/${user}`);
    return await response.json();
  } catch (error) { return { error: error.message};
  }
}

existingUser.onblur = function () { 
    checkExistingUser = existingUser.value;
    if (checkExistingUser.trim() == "") {
      existingUser.classList.add('invalid');
      existingUserWarning2.classList.remove('hide');
    }
  }
  
existingUser.onfocus = function() {
  if (existingUser.classList.contains('invalid')) {
    existingUser.classList.remove('invalid');
    existingUserWarning2.classList.add('hide');
  }
  existingUserWarning.classList.add('hide');
}
//END OF SECTION



















//form submission for creating new account
async function register() {
  if(user.classList.contains(".invalid")) {
    event.preventDefault();
  }
  if(description.classList.contains(".invalid")) {
    event.preventDefault();
  }
  if(balance.classList.contains(".invalid")) {
    event.preventDefault();
  }
  let testUser = await getUserList(`${user.value}`)
  if(user.value == testUser.user) {
    userWarning.classList.remove('hide');
    console.log("I think it should be working...")
    return;
  }

    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
    const result = await createAccount(jsonData);

    if (result.error) {
        return console.log('An error occured:', result.error);
      }
    currentUser = user.value;
    document.querySelector(".loginSection").classList.add('hide');
    registerForm.classList.add('hide');
    document.querySelector('h4').classList.add('hide');
    document.querySelector(".newTransaction").classList.remove('hide');
    
    console.log('Account created!', result);
  }


async function createAccount(account) {
  try {
    const response = await fetch('http://localhost:5000/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: account
    });
    return await response.json();
  } catch (error) {
    return { error: error.message};
  }
}
//END OF SECTION


//validation for #description input
description.onblur = function() {
  checkDescription = description.value;
  if (checkDescription.trim() == "") {
    description.classList.add('invalid');
    descriptionWarning.classList.remove('hide');
  }
}

description.onfocus = function() {
  if (description.classList.contains('invalid')) {
    description.classList.remove('invalid');
    descriptionWarning.classList.add('hide');
  }
}
//END OF SECTION

//validation for #user input
user.onblur = function() {
  checkUser = user.value;
  if (checkUser.trim() == "") {
    user.classList.add('invalid');
    userWarning2.classList.remove('hide');
  }
}

user.onfocus = function() {
  if (user.classList.contains('invalid')) {
    user.classList.remove('invalid');
    userWarning2.classList.add('hide');
  }
  userWarning.classList.add('hide');
}
//END OF SECTION


//validation for #balance input
balance.onblur = function() {
  if (balance.value == 0) {
    balance.classList.add('invalid');
    balanceWarning.classList.remove('hide');
  }
}

balance.onfocus = function() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    balanceWarning.classList.add('hide');
  }
};
//END OF SECTION

























//form submission for submitting a new transaction
async function transact() {
  if(date.classList.contains(".invalid")) {
    event.preventDefault();
  }
  if(object.classList.contains(".invalid")) {
    event.preventDefault();
  }
  if(amount.classList.contains(".invalid")) {
    event.preventDefault();
  }


  const username1 = currentUser;
  const transactionForm = document.getElementById('submitTransaction');
  const transactionData = new FormData(transactionForm);
  const data = Object.fromEntries(transactionData);
  const jsonData = JSON.stringify(data);
  const result = await computeTransaction(jsonData, username1);

  if (result.error) {
    return console.log('An error occured:', result.error);
  }

  console.log("Transaction logged!", result);
}

async function computeTransaction(details, username) {
  let username2 = username;
  try {
    const response = await fetch(`http://localhost:5000/api/accounts/${username2}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: details
    });
    return await response.json();
  }
  catch (error) {
    return {error: error.message};
  }
}
//END OF SECTION



//validation for #date input
date.onblur = function() {
  if (date.value == 0) {
    date.classList.add('invalid');
    dateWarning.classList.remove('hide');
  }
}

date.onfocus = function() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    dateWarning.classList.add('hide');
  }
};

//validation for  #amount input
amount.onblur = function() {
  if (amount.value == 0) {
    amount.classList.add('invalid');
    amountWarning.classList.remove('hide');
  }
}

amount.onfocus = function() {
  if (this.classList.contains('invalid')) {
    this.classList.remove('invalid');
    amountWarning.classList.add('hide');
  }
};

submitTransaction.onsubmit = function() {
  if (amount.value == 0) {
    event.preventDefault();
  }
}
//END OF SECTION


//validation for #object input
object.onblur = function () {
  let checkObject = object.value
  if (checkObject.trim() == "") {
    object.classList.add('invalid');
    objectWarning.classList.remove('hide');
  }
}

object.onfocus = function () {
  if (object.classList.contains('invalid')) {
    object.classList.remove('invalid');
    objectWarning.classList.add('hide');
  }
}
//END OF SECTION










//logout section/returning to main page
let logoutBtn = document.querySelector('#logout');
logoutBtn.addEventListener('click', function(event) {
  currentUser = "";
  document.querySelector(".loginSection").classList.remove('hide');
  registerForm.classList.remove('hide');
  document.querySelector('h4').classList.remove('hide');


  //The next six lines are intended to remove any error messages when you arrive back at the main page,
  //but for some reason it is not working as intended. That is, if you generate an error message in the
  //create account section, and then proceed to login to a different account, when your go back to the main
  //page the error message from earlier will still be there waiting for you.
  existingUserWarning.classList.add('hide');
  existingUserWarning2.classList.add('hide');
  userWarning.classList.add('hide');
  userWarning2.classList.add('hide');
  descriptionWarning.classList.add('hide');
  balanceWarning.classList.add('hide');

  document.querySelector(".newTransaction").classList.add('hide');
})
//END OF SECTION