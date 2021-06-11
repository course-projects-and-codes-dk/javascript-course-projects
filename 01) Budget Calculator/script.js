// BUDGET CONTROLLER
var budgetController = (function () {

  // func constructor for expenses
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  // prototype to calculate single expense percentage
  Expense.prototype.calcPercentage = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    }
  };

  // prototype to return calculated percentage
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  // func constructor for incomes
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  }

  // func to calculate total exp or income
  var calculateTotal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (current) {
      sum += current.value;
    })

    data.total[type] = sum;

  }

  // data structure to store expenses and incomes
  var data = {
    allItems: {
      exp: [],
      inc: []
    },

    total: {
      exp: 0,
      inc: 0
    },

    budget: 0,
    percentage: -1
  }


  return {

    addItem: function (type, des, val) {

      var newItem, ID;

      if (data.allItems[type].length > 0) {
        // ID = data.allItems.(exp or inc)[last index value(last array item)].id
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item/object based on argument(type)
      if (type === 'exp') {
        newItem = new Expense(ID, des, val)
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val)
      }

      // push the item to data structure
      data.allItems[type].push(newItem);

      // return the item for public use
      return newItem;

    },


    deleteItem: function (type, id) {
      var ids, index;

      // loop over all the current[present elements] of the given type and store the id of each element left
      ids = data.allItems[type].map(function (current) {
        return current.id;
      })

      // find the index of the element in the new array above to be deleted [1,3,4,7,9] to delete 7 index = 3
      index = ids.indexOf(id);

      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },


    calculateBudget: function () {

      // calculate total inc and exp
      calculateTotal('exp');
      calculateTotal('inc');

      // calculate the differnce bw them = BUDGET
      data.budget = data.total.inc - data.total.exp;

      // calculate the percentage of income spent
      if (data.total.inc > 0) {
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },


    calculatePercentages: function () {
      // loop over each item in exp array and calculate their percentages (calling the calcPercentage method here)
      data.allItems.exp.forEach(function (current) {
        current.calcPercentage(data.total.inc);
      });
    },


    getPercentages: function () {
      // returning percentages of every single exp one by one and saving them in an array(map loop does that) and then also return that array to  main method
      var allPerc = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPerc;
    },


    getBudget: function () {
      return {
        // create an object and store the data calculated above for further use
        budget: data.budget,
        totalExp: data.total.exp,
        totalInc: data.total.inc,
        percentage: data.percentage
      };
    },

    testing: function () {
      console.log(data);
    }

  };


})();













// UI CONTROLLER
var UIController = (function () {

  var formatNumber = function (num, type) {
    var numSplit, int, dec, type;

    num = Math.abs(num); // method to convert number to absolute(removing negative sign if it has any)
    num = num.toFixed(2); // sets the number of digits after decimal (prototype of number) and makes the no. as string

    numSplit = num.split('.'); // split the number into 2 parts and put them in array

    int = numSplit[0]; // store the first element as integer 

    if (int.length > 3) {
      // break the number into parts 23512 -> '23' + ',' + '512'  (int.length = 5)
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1]; // store the second element as decimal

    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
  };



  // create a function to loop over all the node list items
  var nodeListForEach = function (list, callback) { // here the callback function is passed and what it does will be written while calling nodeListForEach function
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i) // here it is called
    }
  };



  return {

    getInput: function () {
      return {
        // read and store values entered in properties of the getInput method
        type: document.querySelector('.input-type').value, //either exp or inc possible
        description: document.querySelector('.input-description').value,
        value: parseFloat(document.querySelector('.input-value').value) // converted into number from string
      };
    },



    addListItem: function (obj, type) {
      var html, newHtml, element;

      // 1 - Create html string with placeholder text
      if (type === 'inc') {
        element = '.income-list';
        html = '<div class="item" id="inc-%id%"><p class="item-description">%description%</p><div class="item-num"><p class="item-value">%value%</p><div class="item-delete"><button class="item-delete-btn"><i class="fas fa-times-circle"></i></button></div></div></div>';


      } else if (type === 'exp') {
        element = '.expense-list';
        html = '<div class="item" id="exp-%id%"><p class="item-description">%description%</p><div class="item-num"><p class="item-value">%value%</p><p class="item-percent">39%</p><div class="item-delete"><button class="item-delete-btn"><i class="fas fa-times-circle"></i></button></div></div></div>';

      }

      // 2 - Replace placeholder with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

      // 3 - Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

    },



    deleteListItem: function (selectorID) {
      var item = document.getElementById(selectorID);
      // select the id of element to be removed and then use removeChild method
      item.parentNode.removeChild(item);
    },



    clearFields: function () {
      var fields, fieldsArr;

      // 1 - Create an array of the input fields
      fields = document.querySelectorAll('.input-description, .input-value');

      // 2 - Use default slice property of array to make sure querselectorall returns an array instead of list and store it nre array
      fieldsArr = Array.prototype.slice.call(fields);

      // 3 - Set the input value of input fields nothing by looping over them one by one
      fieldsArr.forEach(function (current) {
        current.value = '';
      });

      // 4 - Set the focus to the first element of the input fields array
      fieldsArr[0].focus();

    },



    displayBudget: function (obj) {
      var type;

      obj.budget >= 0 ? type = 'inc' : type = 'exp';

      // changing the value of everything to the new value calculated
      document.querySelector('.hero-budget').textContent = formatNumber(obj.budget, type);
      document.querySelector('.total-income-number').textContent = formatNumber(obj.totalInc, 'inc');
      document.querySelector('.total-expense-number').textContent = formatNumber(obj.totalExp, 'exp');

      if (obj.percentage > 0) {
        document.querySelector('.total-expense-percent').textContent = obj.percentage + '%';
      } else {
        document.querySelector('.total-expense-percent').textContent = '--';
      }

    },



    displayPercentages: function (percentages) {

      // store all the percentages of expenses in a node list(array)
      var fields = document.querySelectorAll('.item-percent');

      nodeListForEach(fields, function (current, index) { // here just the function is written and not called
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + '%';
        } else {
          current.textContent = '--'; // if array storing percentages has % = 0 for any index value of node list
        }
      });

    },



    displayDate: function () {
      var now, months, month, year;

      now = new Date(); // get current date using date func constructor
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = now.getMonth();
      year = now.getFullYear();

      // display the month and year
      document.querySelector('.hero-title-month').textContent = months[month] + ' ' + year;
    },



    changedType: function () {

      // selecting the classes of input fields
      var fields = document.querySelectorAll('.input-type, .input-description, .input-value');

      // looping over all input fields 
      nodeListForEach(fields, function (current) {
        current.classList.toggle('red-focus');
      });

      // doing same for ok btn
      document.querySelector('.input-btn').classList.toggle('red');

    }


  };

})();












// CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {


  var setupEventListeners = function () {

    // focus initially
    document.querySelector('.input-description').focus();

    // when input type is changed(+/-)
    document.querySelector('.input-type').addEventListener('change', UICtrl.changedType);

    // when check btn is clicked
    document.querySelector('.input-btn').addEventListener('click', ctrlAddItem);

    // when enter is pressed
    document.addEventListener('keydown', function (event) {

      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      } else if (event.keyCode === 39 || event.which === 39) {
        document.querySelector('.input-value').focus();
      } else if (event.keyCode === 37 || event.which === 37) {
        document.querySelector('.input-description').focus();
      }

    });

    // when cross is clicked on inc/exp item
    document.querySelector('.input-center').addEventListener('click', ctrlDeleteItem);

  };



  // func to update the budget
  var updateBudget = function () {

    // 1. Calculate the budget
    budgetCtrl.calculateBudget();

    // 2. Return the budget
    var budget = budgetCtrl.getBudget();

    // 3. Display the budget
    UICtrl.displayBudget(budget);
  }



  // func to update the each percentages
  var updatePercentages = function () {

    // 1. Calculate the percentages
    budgetCtrl.calculatePercentages();

    // 2. Read the percentages from budget controller
    var percentages = budgetCtrl.getPercentages();

    // 3. Display the newly calculated percentages to the UI 
    UICtrl.displayPercentages(percentages);
  }



  // func when enter or check btn is clicked
  function ctrlAddItem() {

    var input, newItem;

    // 1 - Get input value from the user
    input = UICtrl.getInput(); // input object has stored the prop entered by user 


    // 2 - Check if description is empty or value is NaN
    if (input.description !== '' && input.value > 0 && !isNaN(input.value)) { // if value was a no. isNaN returns false that is why used !NaN

      // 3 - Add input to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value); // calling the addItem method to create new objects of expenses/incomes using the prop of input method above as arguments


      // 4 - Show input to UI
      UICtrl.addListItem(newItem, input.type); // display the html income/expense list using addlistitem method and take values from object created above which is newItem and do it acc to type passed as argument


      // 5 - Clear input values
      UICtrl.clearFields(); // use the method to first create an array of input items that is the items entered by user and loop over them one by one to clear the input fields 


      // 6 - Calculate and update the budget
      updateBudget();

      // 7 - Calculate and update the percentages of each expense item
      updatePercentages();
    }

  };



  // when cross is clicked on inc/exp item
  function ctrlDeleteItem(event) {
    var itemID, splitID, type, ID;

    // find the target element clicked and move to the parent element to store its id so that the element can be removed
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    // when found the id split into type[inc/exp] and
    if (itemID) {

      splitID = itemID.split('-');
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // 1 - Delete the item from data structure
      budgetCtrl.deleteItem(type, ID);

      // 2 - Delete the item from UI
      UICtrl.deleteListItem(itemID);

      // 3 - Update the budget again
      updateBudget();

      // 4 - Calculate and update the percentages of each expense item
      updatePercentages();
    }

  };



  return {
    init: function () {
      console.log('Started');
      setupEventListeners();
      UICtrl.displayDate();
      UICtrl.displayBudget({
        budget: 0,
        totalExp: 0,
        totalInc: 0,
        percentage: 0
      });
    }
  };


})(budgetController, UIController);



controller.init();