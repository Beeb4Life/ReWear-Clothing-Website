window.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.getElementById('autoScroll');

  if (!scrollContainer) return; // Safe guard

  let scrollAmount = 0;
  const scrollStep = 1;
  const scrollInterval = 20;

  function autoScroll() {
    scrollAmount += scrollStep;
    scrollContainer.scrollLeft += scrollStep;

    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
      scrollAmount = 0;
      scrollContainer.scrollLeft = 0;
    }
  }

  setInterval(autoScroll, scrollInterval);
});


  function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('translate-x-full');
  }

  
