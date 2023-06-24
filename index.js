
const firebaseConfig = {
    apiKey: "AIzaSyCvaXtwCVXUkyyRXT9QC5Pg2dVC9Pmq2Jg",
    authDomain: "contactform-84b5e.firebaseapp.com",
    databaseURL: "https://contactform-84b5e-default-rtdb.firebaseio.com",
    projectId: "contactform-84b5e",
    storageBucket: "contactform-84b5e.appspot.com",
    messagingSenderId: "1898747805",
    appId: "1:1898747805:web:23d1034ce3c0afbbaac174"
  };

firebase.initializeApp(firebaseConfig);



function insertUser(name, email, message){
    
    firebase.database().ref("userData/").push().set({
        name, email, message
    });
    
    document.getElementsByClassName("popop")[0].style.top = '20px';
    document.getElementsByClassName("popop")[0].style.transition = 'transition: top .3s;';
    setTimeout(()=>{
      document.getElementsByClassName("popop")[0].style.top = '-200px';
    },2000);
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

function addUser(event){
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    if(!name ){
      document.getElementById("name").focus();
      // document.getElementById("name").style.border = '2px solid red';
      return ;
    }
    if(!email){
      // document.getElementById("email").style.border = '2px solid red';
      // document.getElementById("name").style.border = 'none';
      document.getElementById("email").focus();
      return ;
    }
    if(!message){
      // document.getElementById("email").style.border = 'none';
      // document.getElementById("name").style.border = 'none';
      // document.getElementById("message").style.border = '2px solid red';
      // document.getElementById("message").focus();
      // document.getElementById("email").style.border = 'none';
      // document.getElementById("name").style.border = 'none';
      // document.getElementById("message").style.border = '2px solid red';
      document.getElementById("message").focus();
      return ;
    }else{
      // document.getElementById("email").style.border = 'none';
      // document.getElementById("name").style.border = 'none';
      // document.getElementById("message").style.border = 'none';
    }
    insertUser(name, email, message);

}

function updatedUser(event){
  event.preventDefault();
  var name1 = document.getElementById("name1").value;
  var email1 = document.getElementById("email1").value;
  var message1 = document.getElementById("message1").value;
  var id = document.getElementById("id").value;

  firebase.database().ref("userData/").child(id).update({name: name1, email: email1, message: message1})
    .then(function() {
      return alert("Updated Successfully!")
    })
    .catch(function(error) {
      console.log("User data update failed: " + error.message);
    });

}

function updateUser(userId){
  let userData = {};
  firebase.database().ref("userData").on('value', function(snapshot) {
    var userDatas = snapshot.val();
    userData = userDatas[userId];
  })
  document.getElementById("name1").value = userData.name;
  document.getElementById("email1").value = userData.email;
  document.getElementById("message1").value = userData.message;
  document.getElementById("id").value = userId;

  document.getElementsByClassName("register-form1")[0].style.display = 'block'; 
  document.getElementsByClassName("register-form")[0].style.backgroundColor = 'rgba(19, 15, 15, 0.863)'; 
  document.getElementsByClassName("register-form")[0].style.filter = 'blur(10px)'; 

  
}

function deleteUser(userId) {
  firebase.database().ref("userData/").child(userId).remove()
    .then(function() {
      return alert("Deleted Successfully!")
    })
    .catch(function(error) {
      console.log("User data deletion failed: " + error.message);
    });
}
  
function getUsers(){
  firebase.database().ref("userData").on('value', function(snapshot) {
    var userData = snapshot.val();
    var tableRows = `<tr>
    <th>Name</th> 
    <th>Email</th> 
    <th>message</th> 
    <th>Update</th> 
    <th>Delete</th> 
 </tr>`;
    for (var userId in userData) {
      var user = userData[userId];
      var row = `
        <tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.message}</td>
          <td><button onclick="updateUser('${userId}')">Update</button></td>
          <td><button onclick="deleteUser('${userId}')">Delete</button></td>
        </tr>
      `;
      tableRows += row;
    }
     document.getElementById("table").innerHTML = tableRows;
  })
      
}
 

getUsers();




  function display(){
    
  }

  function crossfun(){
    document.getElementsByClassName("register-form1")[0].style.display = 'none'; 
    document.getElementsByClassName("register-form")[0].style.backgroundColor = '#fff'; 
    document.getElementsByClassName("register-form")[0].style.filter = 'blur(0px)';
  }