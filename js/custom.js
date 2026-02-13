// Function to open the parent <details> of a targeted element
function openDetailsForHash() {
    const hash = window.location.hash;
    if (hash) {
      try {
        // Decode hash in case of special characters
        const id = decodeURIComponent(hash.substring(1));
        // Find the element targeted by the hash
        const targetElement = document.getElementById(id);
  
        if (targetElement) {
          // Find the closest ancestor <details> element
          const parentDetails = targetElement.closest('details');
  
          // If found and it's not already open, open it
          if (parentDetails && !parentDetails.open) {
            parentDetails.open = true;
          }
        }
      } catch (e) {
        console.error("Error processing hash for details opening:", e);
      }
    }
  }
  
  // Run the function when the page finishes loading
  window.addEventListener('DOMContentLoaded', openDetailsForHash);
  
  // Run the function if the hash changes while on the same page
  window.addEventListener('hashchange', openDetailsForHash);
  