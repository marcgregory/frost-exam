// Toggle Advanced Settings Box
const iconArrowUp = document.querySelector(".icon_arrow_up");
const advancedSettingsBox = document.querySelector(".box");

// Check if elements exist
if (iconArrowUp && advancedSettingsBox) {
  // Initially hide the box
  advancedSettingsBox.style.display = "none";

  // Add click event listener
  iconArrowUp.addEventListener("click", function () {
    // Toggle box visibility
    if (advancedSettingsBox.style.display === "none") {
      advancedSettingsBox.style.display = "flex";
      // Change icon to up arrow (current state)
      iconArrowUp.classList.remove("collapsed");
    } else {
      advancedSettingsBox.style.display = "none";
      // Change icon to down arrow
      iconArrowUp.classList.add("collapsed");
    }
  });

  // Make icon clickable with cursor pointer
  iconArrowUp.style.cursor = "pointer";
}
// Show/Hide Password Functionality
const iconShowPassword = document.querySelector(".icon_show_password");
const passwordImg = document.querySelector(".icon_show_password img");
const wifiPasswordInput = document.getElementById("wifi_password");

if (iconShowPassword && wifiPasswordInput && passwordImg) {
  // Initially set to hide icon (since password is hidden)
  passwordImg.src =
    "https://res.cloudinary.com/dytmv00iq/image/upload/v1770301718/hide_fmdjck.png";

  // Toggle password visibility on click
  iconShowPassword.addEventListener("click", function () {
    const currentType = wifiPasswordInput.type;

    if (currentType === "password") {
      wifiPasswordInput.type = "text";
      passwordImg.src =
        "https://res.cloudinary.com/dytmv00iq/image/upload/v1770301718/view_wy8ykl.png";
      iconShowPassword.classList.add("visible");
    } else {
      wifiPasswordInput.type = "password";
      passwordImg.src =
        "https://res.cloudinary.com/dytmv00iq/image/upload/v1770301718/hide_fmdjck.png";
      iconShowPassword.classList.remove("visible");
    }
  });

  // Make icon clickable
  iconShowPassword.style.cursor = "pointer";
}
