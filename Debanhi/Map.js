function navigateTo(islandId) {
    // Example function to navigate to a specific island or perform an action
    console.log(`Navigating to ${islandId}`);
    // Add your navigation logic here, e.g., redirect to another page
    // window.location.href = `island${islandId}.html`;
  }
  
  // Map.js
document.getElementById('openMapButton').addEventListener('click', function() {
    document.getElementById('mapPopup').style.display = 'block';
  });
  
  document.getElementById('closeMapButton').addEventListener('click', function() {
    document.getElementById('mapPopup').style.display = 'none';
  });

  document.getElementById('RawMaterialsland').addEventListener('click', function() {
    window.location.href = 'RawMaterialsland.html';
  });
  