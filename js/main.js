// to change navigation style
window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
      document.getElementById('nav').classList.add('nav_change');
    } else {
      document.getElementById('nav').classList.remove('nav_change');
    }
});

// to change theme
function chooseTheme(themeName) {
    const theme = document.getElementsByTagName('link')[1];
    switch (themeName) {
        case '20th':
            theme.href = "theme/20th.css";
            localStorage.setItem('selectedTheme', '20th');
            break;
        case '1500-1800':
            theme.href = "theme/1500-1800.css";
            localStorage.setItem('selectedTheme', '1500-1800');
            break;
        case '21th':
            theme.href = "theme/21th.css";
            localStorage.setItem('selectedTheme', '21th');
            break;
        case '2030':
            theme.href = "theme/2030.css";
            localStorage.setItem('selectedTheme', '2030');
            break;
        case 'default':
        default:
            theme.href = "theme/default.css";
            localStorage.setItem('selectedTheme', 'default');
            break;
    }
}

if (localStorage.getItem('selectedTheme')) {
    chooseTheme(localStorage.getItem('selectedTheme'));
}
