// Storage Controller
const StorageCtrl = (function() {

  // Public methods
  return {

    // A) Store item to LS
    storeItem: function(item) {

      // 1.1) Declare an empty array
      let items = [];

      // 1.2) Check local storage for existing items ---

        // a) if no data in LS
        if(localStorage.getItem('items') === null) {
          items = [];
          items.push(item);
          localStorage.setItem('items', JSON.stringify(items));
        }
        // b) if data exists in LS
        else {
          items = JSON.parse(localStorage.getItem('items'));
          items.push(item);
          localStorage.setItem('items', JSON.stringify(items));
        }

    },


    // B) Return items from LS
    getItemsFromLS: function () {

      // 2.1) Declare an empty array
      let items = [];

      // 2.2) Check local storage for existing items ---

        // a) if no data in LS
        if (localStorage.getItem('items') === null) {
          items = [];
        }
        // b) if data exists in LS
        else {
          items = JSON.parse(localStorage.getItem('items'));
        }
        return items;

    },


    // C) Update item to LS
    updateItem: function(item) {

      // 3.1) Get all items from LS
      let items = JSON.parse(localStorage.getItem('items'));

      // 3.2) Loop over all items to match the cur item
      items.forEach(function (cur, index) {
        if (cur.id === item.id) {
          items.splice(index, 1, item);
        }
      });

      // 3.3) Set LS again
      localStorage.setItem('items', JSON.stringify(items));

    },


    // D) Delete item from LS
    deleteItem: function (item) {

      // 4.1) Get all items from LS
      let items = JSON.parse(localStorage.getItem('items'));

      // 4.2) Loop over all items to match the cur item
      items.forEach(function (cur, index) {
        if (cur.id === item.id) {
          items.splice(index, 1);
        }
      });

      // 4.3) Set LS again
      localStorage.setItem('items', JSON.stringify(items));

    },


    // E) Clear all items from LS
    clearAllItems: function() {

      localStorage.removeItem('items');

    }

  } 

})();








// Item Controller
const ItemCtrl = (function() {

  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  
  // Data Structure
  const data = {
    items: StorageCtrl.getItemsFromLS(),
    currentItem: null,
    totalCalories: 0
  }


  // Public methods
  return {

    // A) get items from data structure
    getItems: function() {
      return data.items;
    },


    // B) add items to data structure
    addItem: function(name, calories) {
      
      // 2.1) Generate a unique ID(carefully to avoid repition on deletion of item)
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // 2.2) Convert calories to number
      calories = parseInt(calories);
      // 2.3) Create new item
      const newItem = new Item(ID, name, calories);
      // 2.4) Push new item to data structure
      data.items.push(newItem);
      // 2.5) Return new item to store it in LS
      return newItem;

    },


    // C) Get and calculate total calories
    getTotalCalories: function() {

      // 3.1) Define a variable 
      let total = 0;
      // 3.2) Loop over all items and calculate total calories
      data.items.forEach(function(item) {
        total += item.calories;
      });
      // 3.3) Update total calories
      data.totalCalories = total;
      // 3.4) Return total calories
      return data.totalCalories;

    },


    // D) Get item to update
    getItemToUpdate: function(id) {

      // 4.1) Define a variable 
      let found = null;
      // 4.2) Loop over all items and match the id of an item with id of clicked item
      data.items.forEach(function(item) {
        if(item.id === id) {
          found = item;
        }
      });
      // 4.3) Return the variable to later store
      return found;

    },


    // E) Set current item to update
    setItemToUpdate: function(item) {
      data.currentItem = item;
    },


    // F) Return current item for multiple use
    returnCurrentItem: function() {
      return data.currentItem;
    },


    // G) Update item to data structure
    updateItem: function(name, calories) {

      // 7.1) Parse calories to number
      calories = parseInt(calories);

      // 7.2) Define a variable 
      let found = null;
      // 7.3) Loop over all items and match the id and update item details
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      // 7.4) Return the variable to later store
      return found;
    },


    // H) Delete item from data structure
    deleteItem: function(item) {
      data.items.forEach(function(cur, index) {
        if(cur.id === item.id) {
          data.items.splice(index, 1);
        }
      });
    },


    // I) Clear all items from data structure
    clearAllItems: function() {
      data.items = [];
    },


    // J) get data structure
    logData: function() {
      return data;
    }
  }

})();








// UI Controller
const UICtrl = (function () {

  // Selecting UI components
  UISelectors = {
    itemList: document.getElementById('items'),
    addBtn: document.getElementById('add'),
    updateBtn: document.getElementById('update'),
    deleteBtn: document.getElementById('delete'),
    backBtn: document.getElementById('back'),
    clearBtn: document.getElementById('clear'),
    itemName: document.getElementById('name'),
    itemCalories: document.getElementById('calories'),
    modalOverlay: document.getElementById('modal-overlay-1'),
    modalOverlay2: document.getElementById('modal-overlay-2'),
    okayBtn: document.getElementById('okay'),
    noBtn: document.getElementById('no'),
    yesBtn: document.getElementById('yes'),
    totalCalories: document.getElementById('total-cal'),
    currentDate: document.getElementById('current-date'),
    currentYear: document.getElementById('year')
  }


  // Public methods
  return {

    // A) Display items
    displayItems: function(items) {
      // 1.1) Define a html variable
      let html = '';
      // 1.2) Loop over all items and display them
      items.forEach(function(item) {
        html += `
          <li class="collection-item " id="item-${item.id}">
          <strong>${item.name}:</strong> ${item.calories} cal
          <a href="#" class="secondary-content"><i class="edit lar la-edit"></i></a>
          </li>
        `;
      })
      // 1.3) Insert <li>'s into <ul>
      UISelectors.itemList.innerHTML = html;
    },


    // B) Get user input
    getInput: function() {
      return {
        name: UISelectors.itemName.value,
        calories: UISelectors.itemCalories.value
      }
    },


    // C) Clear input fields
    clearInput: function() {
      UISelectors.itemName.value = '';
      UISelectors.itemCalories.value = '';
    },


    // D) Display total calories
    displayCalories: function(totalCalories) {
      UISelectors.totalCalories.innerHTML = totalCalories;
    },


    // E) Set up clear state
    setupClearState: function() {
      UICtrl.clearInput();
      UISelectors.addBtn.style.display = 'inline';
      UISelectors.updateBtn.style.display = 'none';
      UISelectors.deleteBtn.style.display = 'none';
      UISelectors.backBtn.style.display = 'none';
      UISelectors.clearBtn.style.display = 'inline';
    },


    // F) Set up update/edit state
    setupEditState: function() {
      UISelectors.addBtn.style.display = 'none';
      UISelectors.updateBtn.style.display = 'inline';
      UISelectors.deleteBtn.style.display = 'inline';
      UISelectors.backBtn.style.display = 'inline';
      UISelectors.clearBtn.style.display = 'none';
    },


    // F) Put current item to input fields
    addItemToInput: function(item) {
      UISelectors.itemName.value = item.name;
      UISelectors.itemCalories.value = item.calories;
      UICtrl.setupEditState();
    },


    // G) Update item in UI
    updateItem: function(item) {

      // 1) select all the list items
      let allItems = document.querySelectorAll('#items li');
      // 2) conevert node list to array
      allItems = Array.from(allItems);

      // 3) loop over all list items 
      allItems.forEach(function(oneItem) {
        // 3.1) store id of each list item
        const itemID = oneItem.getAttribute('id');
          // 3.2) check if id matches the current item's id
          if(itemID === `item-${item.id}`) {
            // 3.2.1) replace the content with updated input fields
            document.getElementById(itemID).innerHTML = `
              <strong>${item.name}:</strong> ${item.calories} cal
              <a href="#" class="secondary-content"><i class="edit lar la-edit"></i></a>
            `;
          }
      })
  
    },


    // H) Delete item from UI
    deleteItem: function(item) {
      item = document.getElementById(`item-${item.id}`);
      item.remove();
    },


    // I) Clear all items from UI
    clearAllItems: function() {
      UISelectors.itemList.innerHTML = '';
    },


    // J) Return UISelectors
    getSelectors: function() {
      return UISelectors;
    }

  }

})();








// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl, StorageCtrl) {

  // FUNCTION - loading events
  const loadEventListeners = function() {

    // 1) Get UISelectors
    const UISelectors = UICtrl.getSelectors();

    // 2) When keys are pressed
    document.addEventListener('keydown', function(event) {

      // A) When enter is pressed
      if (event.keyCode === 13 || event.which === 13) {

        // a) if modal-1 exits
        if (UISelectors.modalOverlay.className === 'modal-overlay open-modal') {
          UISelectors.modalOverlay.classList.remove('open-modal');
        } else 
        // b) if modal-2 exits
        if (UISelectors.modalOverlay2.className === 'modal-overlay open-modal') {
          clearAllItems(); 
        } else 
        // c) if add btn exits and no modal
        if (UISelectors.addBtn.style.display === 'inline') {
          itemAddClick();
          UISelectors.itemName.focus();
        } else
        // d) if update btn exists and no modal
        if (UISelectors.updateBtn.style.display === 'inline') {
          itemUpdateClick();
        } 

      }

      // B) When arrow keys are pressed
      else if (event.keyCode === 39 || event.which === 39) {
        UISelectors.itemCalories.focus();
      } else if (event.keyCode === 37 || event.which === 37) {
        UISelectors.itemName.focus();
      } 

      // c) Any other keys are pressed
      else {
        const input = UICtrl.getInput();
        if(input.name === '' && input.calories === '') {
          UISelectors.itemName.focus();
        }
      }

    });

    // 3) When add btn clicked
    UISelectors.addBtn.addEventListener('click', itemAddClick);

    // 4) When edit btn clicked
    UISelectors.itemList.addEventListener('click', itemEditClick);

    // 5) When update btn clicked
    UISelectors.updateBtn.addEventListener('click', itemUpdateClick);

    // 6) When delete btn clicked
    UISelectors.deleteBtn.addEventListener('click', itemDeleteClick);

    // 7) When back btn clicked
    UISelectors.backBtn.addEventListener('click', UICtrl.setupClearState);

    // 8) When clear btn clicked
    UISelectors.clearBtn.addEventListener('click', () => {
      if(UISelectors.itemList.innerHTML !== '') {
        // a) open alert modal
        UISelectors.modalOverlay2.classList.add('open-modal');
      }
    });

    // 9) When okay is clicked in modal
    UISelectors.okayBtn.addEventListener('click', () => {
      // a) remove alert modal
      UISelectors.modalOverlay.classList.remove('open-modal');
      // b) change focus
      UISelectors.itemName.focus();
    });

    // 10) When no is clicked
    UISelectors.noBtn.addEventListener('click', () => {
      UISelectors.modalOverlay2.classList.remove('open-modal');
    });

    // 11) When yes is clicked
    UISelectors.yesBtn.addEventListener('click', clearAllItems);

  }



  // FUNCTION - add btn clicked
  const itemAddClick = function (e) {

    // 1) Get input details from UI
    const input = UICtrl.getInput();

    // 2) Check if input is not empty
    if(input.name !== '' && input.calories > 0) {
  
      // a) Add item to data structure
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // b) Get and display items to UI
      const items = ItemCtrl.getItems()
      UICtrl.displayItems(items);

      // c) Add item to LS
      StorageCtrl.storeItem(newItem)

      // d) Get and dispaly total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayCalories(totalCalories);

      // e) Clear input fields
      UICtrl.clearInput();

    } else {

      // a) Open alert modal
      UISelectors.modalOverlay.classList.add('open-modal');

    }

  };



  // FUNCTION - edit btn clicked
  const itemEditClick = function(e) {

    // 1) Specify the target element
    if(e.target.classList.contains('edit')) {

      // a) Get item text (item-0)
      const listID = e.target.parentNode.parentNode.id;

      // b) Split item text to array
      const listIDArr = listID.split('-');

      // c) Get id from the array
      const id = parseInt(listIDArr[1]);

      // d) Select item to update
      const itemToUpate = ItemCtrl.getItemToUpdate(id);

      // e) Setup current item to update
      ItemCtrl.setItemToUpdate(itemToUpate);

      // f) Get current item returned
      const currentItem = ItemCtrl.returnCurrentItem();

      // g) Put correct item into input fields
      UICtrl.addItemToInput(currentItem);

    }

  };



  // FUNCTION - update btn clicked 
  const itemUpdateClick = function() {

    // 1) Get input fields
    const input = UICtrl.getInput();

    // 2) Update item in data structure
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // 3) Update item in UI
    UICtrl.updateItem(updatedItem);

    // 4) Update item in LS
    StorageCtrl.updateItem(updatedItem);

    // 5) Get and dispaly total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayCalories(totalCalories);

    // 6) Set up clear state and organize btns
    UICtrl.setupClearState();

  };



  // FUNCTION - delete btn clicked
  const itemDeleteClick = function() {

    // 1) Get current item
    const currentItem = ItemCtrl.returnCurrentItem();

    // 2) Delete current item from data structure
    ItemCtrl.deleteItem(currentItem);

    // 3) Delete current item from UI
    UICtrl.deleteItem(currentItem);

    // 4) Delete current item from LS
    StorageCtrl.deleteItem(currentItem);

    // 5) Get and dispaly total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayCalories(totalCalories);

    // 6) Set up clear state and organize btns
    UICtrl.setupClearState();

  };



  // FUNCTION - clear btn clicked
  const clearAllItems = function() {

    // 1) Clear all items from data structure
    ItemCtrl.clearAllItems();

    // 2) Clear all items from UI
    UICtrl.clearAllItems();

    // 3) Clear all items from UI
    StorageCtrl.clearAllItems();

    // 4) Get and dispaly total calories
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.displayCalories(totalCalories);

    // 5) Remove confirm modal
    UISelectors.modalOverlay2.classList.remove('open-modal');

  };



  // FUNCTION - get current time
  const getTime = function() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let time = hours + ':' + minutes + ' ' + ampm;
    return time;
  }



  // Public methods
  return {

    init: function() {

      // 1) Check init in console
      console.log('Initializing app');

      // 2) Set up clear state and btns
      UICtrl.setupClearState();
      
      // 3) Load event listeners
      loadEventListeners();

      // 4) Get and display items to UI
      const items = ItemCtrl.getItems()
      UICtrl.displayItems(items);

      // 5) Get and display total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      UICtrl.displayCalories(totalCalories);

      // 6) Get and display current date
      const time = getTime();
      UISelectors.currentDate.innerHTML = time;

      // 7) Get and display current year
      const year = new Date().getFullYear();
      UISelectors.currentYear.innerHTML = year;

    }

  }

})(ItemCtrl, UICtrl, StorageCtrl);


// Initalize the init
AppCtrl.init();