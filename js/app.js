const navigationItems = [];
const navbarList = document.getElementById('navbar__list');

const isElementInViewPort = (el) => {
    const rect = el.getBoundingClientRect();
    const buffer = 200;
    return (rect.top < window.innerHeight - buffer) && rect.bottom >= 0;
};

// also highlight current nav item
const setNavItemActive = (section) => {
    navigationItems.forEach(navItem => {
        if (navItem.innerText === section.dataset.nav) {
            navItem.classList.add('active-nav-item');
        } else {
            navItem.classList.remove('active-nav-item');
        }
    })
};

// scroll listener to check, whether a nav item should be highlighted as active item
const scrollListener = () => {
    sections.forEach(section => {
        if (isElementInViewPort(section)) {
            section.classList.add('your-active-class');
            setNavItemActive(section);
        } else {
            section.classList.remove('your-active-class');
        }
    })
};

// build the nav
const sections = [...document.getElementsByTagName('section')];
navigationItemNames = sections.map(element => element.dataset.nav)

navigationItemNames.forEach((navigationItemName, index) => {
    let navigationItem = document.createElement('li');
    navigationItem.innerText = navigationItemName;
    navigationItem.classList.add('menu__link');

    if (index === 0) {
        navigationItem.classList.add('active-nav-item');
    }

    navbarList.appendChild(navigationItem);
    navigationItems.push(navigationItem);
})

// Add scroll listeners (touchmove for some mobile browsers)
document.addEventListener('touchmove', scrollListener);
document.addEventListener('scroll', scrollListener);

// Scroll to anchor ID using scrollTO event
navigationItems.forEach(navigationItem => {
    navigationItem.addEventListener('click', e => {
        const clickedNavItem = e.target;
        const sectionId = clickedNavItem.innerText.toLowerCase().replace(" ", "");
        const sectionToScrollTo = document.getElementById(sectionId);
        sectionToScrollTo.scrollIntoView({block: 'center', behavior: 'smooth'});
        setNavItemActive(sectionToScrollTo);
    })
})
