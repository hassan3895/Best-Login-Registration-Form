function showLogin(){
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}
function showRegister(){
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

function togglePassword(id, icon){
    let field = document.getElementById(id);
    if(field.type === "password"){
        field.type = "text";
        icon.textContent = "🙈";
    } else {
        field.type = "password";
        icon.textContent = "👁";
    }
}

function validateEmail(email){
    let gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailPattern.test(email);
}

function register(){
    let username = document.getElementById('regUsername').value.trim();
    let email = document.getElementById('regEmail').value.trim();
    let password = document.getElementById('regPassword').value;

    if(username === "" || email === "" || password === ""){
        document.getElementById('regMessage').textContent = "Please fill all fields!";
        document.getElementById('regMessage').style.color = "red";
        return;
    }

    if(password.length < 5){
        document.getElementById('regMessage').textContent = "Password must be at least 5 characters!";
        document.getElementById('regMessage').style.color = "red";
        return;
    }

    if(!validateEmail(email)){
        document.getElementById('regMessage').textContent = "Please enter a valid Gmail address!";
        document.getElementById('regMessage').style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let userExists = users.some(user => user.username === username || user.email === email);

    if(userExists){
        document.getElementById('regMessage').style.color = "red";
        document.getElementById('regMessage').textContent = "Username or Email already exists!";
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('regMessage').style.color = "green";
    document.getElementById('regMessage').textContent = "Registration successful!";
    setTimeout(showLogin, 1000);
}

function login(){
    let loginInput = document.getElementById('loginUsername').value.trim();
    let password = document.getElementById('loginPassword').value;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    if(loginInput.includes("@") && !validateEmail(loginInput)){
        document.getElementById('loginMessage').textContent = "Invalid Gmail address!";
        document.getElementById('loginMessage').style.color = "red";
        return;
    }

    let foundUser = users.find(user => 
        (user.username === loginInput || user.email === loginInput) && user.password === password
    );

    if(foundUser){
        localStorage.setItem('currentUser', foundUser.username);
        window.location.href = "welcome.html";
    } else {
        document.getElementById('loginMessage').style.color = "red";
        document.getElementById('loginMessage').textContent = "Invalid credentials!";
    }
}
