fetch("../HTML/Navbar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Navbar could not be loaded.");
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("navbar").innerHTML = data;
    })
    .catch(error => {
        console.error("Error loading navbar:", error);
    });