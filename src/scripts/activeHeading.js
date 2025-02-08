document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(".right-sidebar-content a");
    const headers = document.querySelectorAll(".notes-content h2, .notes-content h3, .notes-content h4");
  
    /**
     * Updates the active link in the right sidebar based on scroll position and
     * updates the URL with the corresponding heading's hash.
     */
    function updateActiveHeading() {
      let currentActiveId = "";
  
      // Loop through each heading and update the current active heading ID.
      headers.forEach(header => {
        const rect = header.getBoundingClientRect();
        // If the top of the header is above 100px from the top, consider it "active".
        // (You can adjust this value if needed.)
        if (rect.top <= 100 && rect.bottom >= 100) {
          currentActiveId = header.id;
        }
      });
  
      // If a header is active, update the URL hash to its id and change the sidebar link.
      if (currentActiveId) {
        // Update the browser's URL hash
        window.history.replaceState(null, null, `#${currentActiveId}`);
  
        // Remove the 'active' class from all sidebar links
        sidebarLinks.forEach(link => link.classList.remove("active"));
  
        // Add the 'active' class to the sidebar link corresponding to the active header
        const activeLink = document.querySelector(`.right-sidebar-content a[href="#${currentActiveId}"]`);
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    }
  
    // Listen for scroll events and update the active heading accordingly.
    window.addEventListener("scroll", updateActiveHeading);
  
    // Run once on page load in case the page is already scrolled down.
    updateActiveHeading();
  });
  