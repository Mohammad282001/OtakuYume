 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 import { getDatabase, ref, set, get, child, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyDilZ4OoUQVNemEfgW3s7VivjrDEWey-Ps",
   authDomain: "creative-tutorial-3e3fe.firebaseapp.com",
   databaseURL: "https://creative-tutorial-3e3fe-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "creative-tutorial-3e3fe",
   storageBucket: "creative-tutorial-3e3fe.appspot.com",
   messagingSenderId: "372442580127",
   appId: "1:372442580127:web:ce3087c0f71fdb2f59ceaa"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getDatabase(app);

/***********************************add Comment and delete Comment*************************************** */


const addComment = (commentId, userId, movieId, commentText, userName) => {
  set(ref(db, 'comments/' + commentId), {
    userId: userId,
    movieId: movieId,
    commentText: commentText,
    userName: userName
  });

  alert("done successfully");
};


function deleteComment(commentId, commentElement) {
  const dbRef = ref(db, `comments/${commentId}`);
  remove(dbRef)
      .then(() => {
          alert('Comment deleted successfully');
          commentElement.remove();
          // Optionally, remove the comment from the UI
          // Depending on your implementation, you may want to remove it from DOM here
      })
      .catch((error) => {
          console.error('Error deleting comment:', error);
      });
}

/*********************************end add Comment and delete Comment********************************** */

document.getElementById("formCancel").addEventListener("submit", function (event) {


  event.preventDefault();

  document.getElementById("textAreaExample").value = "";



});

let count = 1070;

document.getElementById("formSubmit").addEventListener("submit", function (event) {

  event.preventDefault();

  
  let comment = document.getElementById("textAreaExample").value;
  

  document.getElementById("textAreaExample").value = "";
  // معرف المستخدم ومعرف الفيلم (يجب استبدالهم بقيم مناسبة)
  let userId = sessionStorage.getItem('userID');
  let movieId = sessionStorage.getItem('animeId');
  let userName = sessionStorage.getItem('userName');
  // حفظ التعليق في Firestore
  let commentId = Date.now().toString(); // مثال على توليد معرف تعليق بشكل عشوائي


  // إضافة التعليق إلى DOM
  displayData(commentId, userId, comment, userName);

  addComment(commentId, userId, movieId, comment, userName);

  count++;

  window.scrollTo(0,count);


});
/////////////////////****************************************************************************************************************************** */

///////////*******************playAllData from Firebase***************************** */
commentM();
function commentM() {
  
  
  let outputDiv = document.getElementById("MoComment");
  const movieIdCom = sessionStorage.getItem('animeId');

  if (movieIdCom) {
    fetchAndDisplayAllData(movieIdCom);
  }

  // Function to fetch and display all data from Firebase
  function fetchAndDisplayAllData(movieId) {
    const dbRef = ref(db, 'comments');

    onValue(dbRef, (snapshot) => {
      outputDiv.innerHTML = ''; // Clear existing data

      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        const commentId = childSnapshot.key;

        if (movieId == data.movieId) {
          displayData(commentId, data.userId, data.commentText, data.userName);
         
        }
     }
    );
    }, {
      onlyOnce: true
    });
  }
}
////////////////************************display Data in html page**************************** */


function displayData(commentId, userId, commentText, userName) {
  event.preventDefault();



  const father = document.getElementById('MoComment');
  father.style.backgroundColor = '#1A161F';
  father.style.color = "white";
  const commentContainer = document.createElement('div');
  commentContainer.className = 'card-body';
  father.insertBefore(commentContainer, father.firstChild);
  const hrComm = document.createElement("hr");
  commentContainer.appendChild(hrComm)
  
  const div2 = document.createElement('div');
  div2.className = 'd-flex flex-start ';
  commentContainer.appendChild(div2);

  const imageUser = document.createElement("img");
  imageUser.className = "rounded-circle shadow-1-strong me-3";
  imageUser.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp";
  imageUser.setAttribute("alt","avatar");
  imageUser.style.width = "40px";
  imageUser.style.height = "40px";
  div2.appendChild(imageUser);

  const divName = document.createElement('div');
  div2.appendChild(divName);

  const h6Name = document.createElement("h6");
  h6Name.setAttribute("class","fw-bold  mb-1");
  h6Name.style.textShadow = "1px 1px #B43FEB";
  divName.appendChild(h6Name);
  let sessionName = sessionStorage.getItem("userName")
  h6Name.innerHTML = userName;///// user name

  const descriptionP = document.createElement("p");
  descriptionP.setAttribute("class","mt-3 mb-4 pb-2");
  descriptionP.innerHTML = commentText;
  commentContainer.appendChild(descriptionP);
  
  
  
  // إضافة زر التعديل إذا كان التعليق يخص المستخدم الحالي
  if (userId === sessionStorage.getItem('userID')) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'small d-flex justify-content-start';
    commentContainer.appendChild(buttonsContainer);

    const editButton = document.createElement('i');
    editButton.className = 'fa-solid fa-pen-to-square';
    editButton.style.marginRight = "2rem";
    editButton.style.cursor = "pointer"; // يجعل المؤشر يتغير عند التمرير فوق العنصر

    editButton.addEventListener('click', function() {

      editData(commentId, commentText, descriptionP);

    });


    const deleteButton = document.createElement('i');
    deleteButton.className = 'fa-solid fa-trash';
    deleteButton.style.cursor = "pointer"; // Change cursor on hover

    deleteButton.addEventListener('click', function() {

      deleteComment(commentId, commentContainer);

    });
 

    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    
  }

 

  
}

/////////////////************* Function to edit data in Firebase *************//
function editData(commentId, oldDescription, postDescriptionElement) {

  const newDescription = prompt("Edit description:", oldDescription);

  if (newDescription !== null && newDescription !== oldDescription) {

    const dbRef = ref(db, `comments/${commentId}`);
    update(dbRef, {
      commentText: newDescription
    }).then(() => {
      console.log(`Comment has been updated successfully`);
      postDescriptionElement.innerText = newDescription;
    }).catch((error) => {
      console.error(`Error updating comment:`, error);
    });
  }

}