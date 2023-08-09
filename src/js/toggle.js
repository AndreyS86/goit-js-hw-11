export const searchBtn = document.getElementById('search-form');
const toggleBtn = document.getElementById('search-btn');

console.log(toggleBtn);

function toggleClass() {
  searchBtn.classList.toggle('search-form-active');
}

toggleBtn.addEventListener('click', toggleClass);

// const boxElement = document.getElementById('myBox');
// const toggleButton = document.getElementById('toggleButton');

// // Функція для переключення класу
// function toggleClass() {
//   boxElement.classList.toggle('active');
// }

// // Додавання обробника події на кнопку
// toggleButton.addEventListener('click', toggleClass);

// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Class Toggle Example</title>
//   <link rel="stylesheet" href="styles.css">
// </head>
// <body>
//   <div class="box" id="myBox">This is a box</div>
//   <button id="toggleButton">Toggle Class</button>
//   <script src="script.js"></script>
// </body>
//             </html>

// css
// Copy code
// .box {
//   width: 200px;
//   height: 200px;
//   background-color: lightblue;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 18px;
//   color: white;
// }

// .box.active {
//   background-color: lightgreen;
// }
