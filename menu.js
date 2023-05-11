document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#menu');
    const side_menu = document.querySelector('#side_menu');
  
    menu.addEventListener('click', () => {
      side_menu.classList.toggle('open');
    });
    console.log('Menu script loaded.');
  });
  