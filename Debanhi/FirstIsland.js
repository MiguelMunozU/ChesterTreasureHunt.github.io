// modalService.js
const modalService = (() => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModalBtn = document.getElementById('closeModalBtn');
  
    const openModal = () => {
      const htmlFilePath = 'Map.html'; // File path to Map.html
  
      // Fetch HTML content using AJAX
      fetch(htmlFilePath)
        .then(response => response.text())
        .then(html => {
          modalContent.innerHTML = html;
          modal.style.display = 'block';
        })
        .catch(error => console.error('Error fetching modal content:', error));
    };
  
    const closeModal = () => {
      modal.style.display = 'none';
      modalContent.innerHTML = ''; // Clear modal content
    };
  
    // Close modal when clicking outside modal content
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  
    // Close modal when clicking the close button
    closeModalBtn.addEventListener('click', closeModal);
  
    // Return public methods
    return {
      openModal,
      closeModal
    };
  })();
  