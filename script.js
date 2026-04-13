const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "@#$%^&*()_+~|}{[]></-=";

function createPassword() {
  let length = document.getElementById("Passwordlength").value;
  let includeUpper = document.getElementById("Uppercase").checked;
  let includeLower = document.getElementById("Lowercase").checked;
  let includeNum = document.getElementById("Numbers").checked;
  let includeSym = document.getElementById("Symbols").checked;

  if (length < 8) {
    alert("Password length must be at least 8");
    return;
  }

  let allChars = "";
  if (includeUpper) allChars += uppercase;
  if (includeLower) allChars += lowercase;
  if (includeNum) allChars += numbers;
  if (includeSym) allChars += symbols;

  if (allChars === "") {
    alert("Select at least one option!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    let char = allChars[Math.floor(Math.random() * allChars.length)];
    password += char;
  }

  let passwordBox = document.getElementById("PasswordBox");
  passwordBox.value = password;

  // Strength meter
  updateStrength(password);
}

function copyPassword() {
  let passwordBox = document.getElementById("PasswordBox");
  if (passwordBox.value === "") return;
  navigator.clipboard.writeText(passwordBox.value);
  showToast("Password copied!");
}

function updateStrength(password) {
  let bar = document.getElementById("strength-bar");
  let text = document.getElementById("strength-text");
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@#$%^&*()_+~|}{[\]></-=]/.test(password)) strength++;

  switch (strength) {
    case 1:
    case 2:
      bar.style.width = "30%";
      bar.style.background = "red";
      text.textContent = "Strength: Weak";
      break;
    case 3:
      bar.style.width = "60%";
      bar.style.background = "orange";
      text.textContent = "Strength: Medium";
      break;
    case 4:
    case 5:
      bar.style.width = "100%";
      bar.style.background = "green";
      text.textContent = "Strength: Strong";
      break;
  }
}

// Show toast
function showToast(message) {
  let toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

// Toggle show/hide password
document.getElementById("toggleVisibility").addEventListener("click", () => {
  let passwordBox = document.getElementById("PasswordBox");
  passwordBox.type =
    passwordBox.type === "password" ? "text" : "password";
});

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
