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

/************************************************************************** */


const addComment = (commentId, userId, movieId, commentText) => {
  set(ref(db, 'comments/' + commentId), {
    userId: userId,
    movieId: movieId,
    commentText: commentText
  });
};

/******************************************************************* */

function openForm() {
  document.getElementById("popup").style.display = "block";
}
function closeForm() {
  document.getElementById("popup").style.display = "none";
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); 

  let comment = document.getElementById("comment").value;

  // معرف المستخدم ومعرف الفيلم (يجب استبدالهم بقيم مناسبة)
  let userId = sessionStorage.getItem('userID');
  let movieId = sessionStorage.getItem('animeId');

  // حفظ التعليق في Firestore
  let commentId = Date.now().toString(); // مثال على توليد معرف تعليق بشكل عشوائي
  addComment(commentId, userId, movieId, comment);

  // عرض التعليق في Popup (اختياري)
  document.getElementById("content-containar").innerHTML = `
    <span style="
      color: #9ca4ab;
      text-align: left;
      font-size: small;
      padding-bottom: 0.25rem;
      font-weight: 400;
      margin-right: 1rem;
    ">
      ${comment}
    </span>
  `;

  // إعادة ضبط النموذج وإغلاق ال Popup
  document.getElementById("form").reset();
  document.getElementById("popup").style.display = "none";
});
/////////////////////****************************************************************************************************************************** */

/* <h6 id="userText" style=" color: #ffffff; text-align: left; padding-bottom: 0.25rem; font-weight: 600;">
Story Line
</h6>
<span
id="userComment"
style="color: #9ca4ab; text-align: left;
  font-size: small;
  padding-bottom: 0.25rem;
  font-weight: 400;
  margin-right: 1rem;
"
>Originally a story from Archie Comics which started in
1941, Riverdale centres around a group of high school
students who are shocked by the death of classmate, Jason
Blossom. Together theyunravel the secrets of Riverdale and
who
<span style="color: #b43feb"> ... More</span>
</span> */



// MoComment
function commentM(){
let outputDiv = document.getElementById("MoComment");
if(sessionStorage.getItem('animeId')){
  const movieIdCom = sessionStorage.getItem('animeId');

    // Function to fetch and display all data from Firebase
    function fetchAndDisplayAllData() {
      const dbRef = ref(db, 'comments');
  
      onValue(dbRef, (snapshot) => {
        outputDiv.innerHTML = ''; // Clear existing data
        snapshot.forEach((childSnapshot) => {
          if(movieIdCom == data.movieId){
          const data = childSnapshot.val();
          displayData( data.comment);}
        });
      }, {
        onlyOnce: true
      });
    }}
}

   function displayData(comment){

document.getElementById("MoComment").innerHTML = `
<span style="
  color: #9ca4ab;
  text-align: left;
  font-size: small;
  padding-bottom: 0.25rem;
  font-weight: 400;
  margin-right: 1rem;
">
  ${comment}
</span>
`;

}