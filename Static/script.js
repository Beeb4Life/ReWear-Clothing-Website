const scrollContainer = document.getElementById('autoScroll');

  let scrollAmount = 0;
  const scrollStep = 1;       // Speed of scroll
  const scrollInterval = 20;  // Time between steps (ms)

  function autoScroll() {
    scrollAmount += scrollStep;
    scrollContainer.scrollLeft += scrollStep;

    if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
      scrollAmount = 0;
      scrollContainer.scrollLeft = 0;
    }
  }

  setInterval(autoScroll, scrollInterval);

  function toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    sideMenu.classList.toggle('translate-x-full');
  }


