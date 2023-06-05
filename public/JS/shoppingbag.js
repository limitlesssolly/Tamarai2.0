// function noi() {
//     let items1 = Number(document.querySelector('.count').innerText);
//     let items2 = Number(document.querySelector('.count2').innerText);
//     let total_items = Number(items1 + items2);
//     document.querySelector('.items').innerText = total_items;
// }

// function counting() {

//     let counter = document.querySelector('.count').innerText;
//     let price = document.querySelector('.amount').innerText;
//     let pfor_one_product = price / counter;
//     // {const button = document.querySelector(".btn"); 
//     //  const division = document.querySelector(".count"); 

//     // let counter =document.querySelector('.count').innerText;
//     // let price= document.querySelector('.amount').innerText;

//     if (document.querySelector('.count').innerText == 0) {
//         document.querySelector('.count').innerText = '1';
//         document.querySelector('.amount').innerText = '175';

//     } else if (counter > 0) {
//         counter++;

//         document.querySelector('.count').innerText = counter
//         document.querySelector('.amount ').innerText = counter * pfor_one_product;
//         //  count.innerText = counter;
//     } else(document.querySelector('.Cart-Items2').innerText == " ") {
//         document.querySelector('.total-amount').innerText = document.querySelector('.amount ').innerText;
//         document.querySelector('.items').innerText = counter;
//     }

//     let Sub_Total = Number(document.querySelector('.amount').innerText);
//     let Sub_Total2 = Number(document.querySelector('.amount2').innerText);
//     let Total = Sub_Total + Sub_Total2;
//     document.querySelector('.total-amount').innerHTML = Total;

//     //# of items
//     let items1 = Number(document.querySelector('.count').innerText);
//     let items2 = Number(document.querySelector('.count2').innerText);
//     let total_items = Number(items1 + items2);
//     document.querySelector('.items').innerText = total_items;
// }

// function decreasing() {

//     let counter = document.querySelector('.count').innerText;
//     let price = document.querySelector('.amount').innerText;
//     if (counter > 0 || counter == 0) {

//         if (counter > 0) {
//             let price = document.querySelector('.amount').innerText;
//             let pfor_one_product = price / counter;
//             counter--;


//             document.querySelector('.count').innerText = counter;
//             document.querySelector('.amount').innerText = counter * pfor_one_product
//         } else if (counter == 0) {
//             price = 0;
//             document.querySelector('.amounst').innerText = 0;
//         } else(document.querySelector('.Cart-Items2').innerText == " ") {
//             document.querySelector('.total-amount').innerText = document.querySelector('.amount ').innerText;
//             document.querySelector('.items').innerText = counter;
//         }

//     }
//     var Sub_Total = Number(document.querySelector('.amount').innerText);
//     var Sub_Total2 = Number(document.querySelector('.amount2').innerText);
//     var Total = Sub_Total + Sub_Total2;
//     document.querySelector('.total-amount').innerHTML = Total;

//     //# of items
//     let items1 = Number(document.querySelector('.count').innerText);
//     let items2 = Number(document.querySelector('.count2').innerText);
//     let total_items = Number(items1 + items2);
//     document.querySelector('.items').innerText = total_items;
// }

// function counting2() {
//     let counter2 = document.querySelector('.count2').innerText;
//     let price2 = document.querySelector('.amount2').innerText;
//     let pfor_one_product2 = price2 / counter2;
//     // {const button = document.querySelector(".btn"); 
//     //  const division = document.querySelector(".count"); 

//     // let counter =document.querySelector('.count').innerText;
//     // let price= document.querySelector('.amount').innerText;

//     if (document.querySelector('.count2').innerText == 0) {
//         document.querySelector('.count2').innerText = '1';
//         document.querySelector('.amount2').innerText = '100';

//     } else if (counter2 > 0) {
//         counter2++;

//         document.querySelector('.count2').innerText = counter2;
//         document.querySelector('.amount2').innerText = counter2 * pfor_one_product2;
//         //  count.innerText = counter;
//     } else(document.querySelector('.Cart-Items').innerText == " ") {
//         document.querySelector('.total-amount').innerText = document.querySelector('.amount2 ').innerText;
//         document.querySelector('.items').innerText = counter2;
//     }

//     var Sub_Total = Number(document.querySelector('.amount').innerText);
//     var Sub_Total2 = Number(document.querySelector('.amount2').innerText);
//     var Total = Sub_Total + Sub_Total2;
//     document.querySelector('.total-amount').innerHTML = Total;


//     let items1 = Number(document.querySelector('.count').innerText);
//     let items2 = Number(document.querySelector('.count2').innerText);
//     let total_items = Number(items1 + items2);
//     document.querySelector('.items').innerText = total_items;
// }

// function decreasing2() {
//     let counter = document.querySelector('.count2').innerText;
//     let price = document.querySelector('.amount2').innerText;
//     if (counter > 0 || counter == 0) {

//         if (counter > 0) {
//             let price = document.querySelector('.amount2').innerText;
//             let pfor_one_product = price / counter;
//             counter--;


//             document.querySelector('.count2').innerText = counter;
//             document.querySelector('.amount2').innerText = counter * pfor_one_product
//         } else if (counter == 0) {
//             price = 0;
//             document.querySelector('.amount2').innerText = 0;
//         } else(document.querySelector('.Cart-Items').innerText == " ") {
//             document.querySelector('.total-amount').innerText = document.querySelector('.amount2 ').innerText;
//             document.querySelector('.items').innerText = counter;
//         }

//     }
//     var Sub_Total = Number(document.querySelector('.amount').innerText);
//     var Sub_Total2 = Number(document.querySelector('.amount2').innerText);
//     var Total = Sub_Total + Sub_Total2;
//     document.querySelector('.total-amount').innerHTML = Total;

//     //# of items
//     let items1 = Number(document.querySelector('.count').innerText);
//     let items2 = Number(document.querySelector('.count2').innerText);
//     let total_items = Number(items1 + items2);
//     document.querySelector('.items').innerText = total_items;
// }

// function remove_all() {
//     let empty = " ";
//     document.querySelector('.Cart-Items').innerHTML = " ";
//     document.querySelector('.Cart-Items2').innerHTML = " ";
//     document.querySelector('.checkout').innerHTML = " ";

// }

// function remove_element() {
//     if (document.querySelector('.Cart-Items2').innerHTML !== " ") {
//         document.querySelector('.total-amount').innerText = Number(document.querySelector('.amount2').innerText);
//         // document.querySelector('.Cart-Items').innerHTML=document.querySelector('.Cart-Items2').innerHTML;
//         document.querySelector('.Cart-Items').innerHTML = " ";
//         document.querySelector('.items').innerText = Number(document.querySelector('.count2').innerText);

//     }
//     //  if(document.querySelector('.Cart-Items2').innerHTML==" ")
//     //  {
//     //     document.querySelector('.Cart-Items').innerHTML=" ";
//     //  }
//     else if (document.querySelector('.Cart-Items2').innerHTML == " ") {
//         document.querySelector('.Cart-Items').innerHTML = " ";
//         document.querySelector('.checkout').innerHTML = " "

//     } else if (document.querySelector('.Cart-Items2').innerHTML == " " && document.querySelector('.Cart-Items').innerHTML == " ") {
//         remove_all();
//     }
// }

// function remove_element2() {
//     if (document.querySelector('.Cart-Items').innerHTML !== document.querySelector('.Cart-Items2').innerHTML) {
//         document.querySelector('.Cart-Items2').innerHTML = " ";
//         document.querySelector('.checkout').innerHTML = " ";

//     }

//     // if(document.querySelector('.Cart-Items').innerHTML==" ")
//     //  {
//     //     document.querySelector('.Cart-Items2').innerHTML=" ";
//     //  }
//     else if (document.querySelector('.Cart-Items2').innerHTML == " ") {
//         document.querySelector('.Cart-Items').innerHTML = " ";
//         document.querySelector('.checkout').innerHTML = " "
//         document.querySelector('.Cart-Items').innerHTML = document.querySelector('.Cart-Items2').innerHTML;
//         document.querySelector('.Cart-Items2').innerHTML = " "; //  document.querySelector('.Cart-Items').innerHTML=document.querySelector('.Cart-Items2').innerHTML
//     }

// }

// function myFunction() {
//     var element = document.body;
//     element.classList.toggle("dark-mode");
// }
// Select all the buttons, counters, and prices
// Select all the buttons, counters, and prices
document.addEventListener('DOMContentLoaded', () => {
        const increaseBtns = document.querySelectorAll('.counter .btn:first-of-type');
        const decreaseBtns = document.querySelectorAll('.counter .btn:last-of-type');
        const countValues = document.querySelectorAll('.counter .count');
        const prices = document.querySelectorAll('.prices .amount');
        const removeBtns = document.querySelectorAll('.remove');

        // Function to increase the count value and update the price
        function counting() {
            // Get the current count value and price
            let countValue = parseInt(this.parentNode.querySelector('.count').textContent);
            let price = parseFloat(this.parentNode.nextElementSibling.querySelector('.amount').textContent);

            // Increase the count value and update the price
            countValue++;
            this.parentNode.querySelector('.count').textContent = countValue;
            this.parentNode.nextElementSibling.querySelector('.amount').textContent = (price * countValue).toFixed(2);
        }

        // Function to decrease the count value and update the price
        function decreasing() {
            // Get the current count value and price
            let countValue = parseInt(this.parentNode.querySelector('.count').textContent);
            let price = parseFloat(this.parentNode.nextElementSibling.querySelector('.amount').textContent);

            // Decrease the count value and update the price
            if (countValue > 1) {
                countValue--;
                this.parentNode.querySelector('.count').textContent = countValue;
                this.parentNode.nextElementSibling.querySelector('.amount').textContent = (price * countValue).toFixed(2);
            }
        }

        // Function to remove an item from the cart
        function remove_element() {
            this.parentNode.parentNode.remove();
        }

        // Function to remove all items from the cart
        function remove_all() {
            const cartItems = document.querySelector('.Cart-Items');
            while (cartItems.firstChild) {
                cartItems.removeChild(cartItems.firstChild);
            }
        }

        // Add event listeners to all the buttons
        increaseBtns.forEach(btn => {
            btn.addEventListener('click', counting);
        });

        decreaseBtns.forEach(btn => {
            btn.addEventListener('click', decreasing);
        });

        removeBtns.forEach(btn => {
            btn.addEventListener('click', remove_element);
        });

        const removeAllBtn = document.querySelector('.Action');
        removeAllBtn.addEventListener('click', remove_all);
    })
    // function myFunction() {