// Encrypt each part of the user information.
function encryptUser(user, rsa) {
  const encryptedUser = {};

  for (const key in user) {
    encryptedUser[key] = rsa.encrypt(user[key]);
  }

  return encryptedUser;
}

// Decrypt each part of the encrypted user information.
function decryptUser(encryptedUser, rsa) {
  const decryptedUser = {};

  for (const key in encryptedUser) {
    decryptedUser[key] = rsa.decrypt(encryptedUser[key]);
  }

  return decryptedUser;
}

// Generate RSA keys and show the encrypted and decrypted result.
function runRSA(user, keySize, encryptedId, decryptedId) {
  // Create JSEncrypt using the required key size.
  const rsa = new JSEncrypt({ default_key_size: keySize });

  // Generate the public and private keys.
  rsa.getKey();

  const encryptedUser = encryptUser(user, rsa);
  const decryptedUser = decryptUser(encryptedUser, rsa);

  // Display the results as JSON.
  document.getElementById(encryptedId).textContent =
    JSON.stringify(encryptedUser, null, 2);

  document.getElementById(decryptedId).textContent =
    JSON.stringify(decryptedUser, null, 2);
}

// Run when the Sign Up button is clicked.
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const message = document.getElementById("message");
  const result = document.getElementById("result");

  // Get the information from the form.
  const user = {
    fullName: document.getElementById("fullName").value.trim(),
    birthDate: document.getElementById("birthDate").value,
    yearLevel: document.getElementById("yearLevel").value,
    gender: document.getElementById("gender").value,
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("password").value
  };

  if (
    !user.fullName ||
    !user.birthDate ||
    !user.yearLevel ||
    !user.gender ||
    !user.username ||
    !user.password
  ) {
    message.textContent = "Please complete all fields.";
    message.style.color = "red";
    return;
  }

  try {
    message.textContent = "Processing RSA encryption...";
    message.style.color = "#2563eb";

    // Save the original signup information as JSON.
    localStorage.setItem("rsaEnrollment", JSON.stringify(user));

    // Run the 1024-bit RSA example.
    runRSA(
      user,
      1024,
      "encrypted1024",
      "decrypted1024"
    );

    // Run the 3072-bit RSA example.
    runRSA(
      user,
      3072,
      "encrypted3072",
      "decrypted3072"
    );

    result.classList.remove("hidden");

    message.textContent = "Sign up successful.";
    message.style.color = "green";
  } catch (error) {
    console.log(error);
    message.textContent = "Sign up failed. Please try again.";
    message.style.color = "red";
  }
});
