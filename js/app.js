/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


/**
* @description get NavLink For Section Based on textContent on link and data-nav attribute on section
* @param {string} sectionDataNavValue
* @returns 
*/
function getNavLinkForSection(sectionDataNavValue){
    const navItemLinks = document.querySelectorAll('.menu__link');
    for(let link of navItemLinks){
        if (link.textContent === sectionDataNavValue) {
            return link;
        }
    }
}

/**
* @description add class to multiple items
* @param {string} className
* @param {elements} elements
* @returns 
*/
function setClass(className, ...elements){
    for(let element of elements){
        if(element) {
            element.classList.add(className);
        }
    }
}

/**
* @description delete class from multiple items
* @param {string} className
* @param {elements} elements
* @returns 
*/
function removeClass(className, ...elements){
    for(let element of elements){
        if(element) {
            element.classList.remove(className);
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/*==========================================================================*/

    // build the nav
function buildDynamicNavBar( ) {

// get the navbar item and all items with attribute data-nav
const navbarList = document.querySelector("#navbar__list");
const navbarItems = document.querySelectorAll("[data-nav]");

// create document fragment with links to all data nav and append it to navbar list
const fragmnet = document.createDocumentFragment();
for (let item of navbarItems) {
    const listItem = document.createElement('li');
    const link = document.createElement('a');

    link.textContent = item.getAttribute('data-nav');
    // link.setAttribute('href', '#'+item.getAttribute('id'));
    link.setAttribute('class','menu__link');

    listItem.appendChild(link);
    fragmnet.appendChild(listItem);
}
navbarList.appendChild(fragmnet);

}

/*==========================================================================*/

// Add class 'active' to section when near top of viewport

function observeSectionInViewPort(){
    const Observer= new IntersectionObserver( entries =>{
        let navlink = getNavLinkForSection(entries[0].target.getAttribute('data-nav'));  

        if(entries[0].isIntersecting){
            setClass("active" ,  entries[0].target , navlink );
        }else{
            removeClass("active" ,  entries[0].target , navlink );
        }
        
    } , { threshold: [1.0] } )
        
    
    for(let section of sections){
        Observer.observe(section);
    }
}

/*==========================================================================*/

// Scroll to anchor ID using scrollTO event
function scrollOnNavItemClick(){
    document.querySelectorAll('.menu__link').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            let section = document.querySelector(`[data-nav="${event.target.textContent}"]`);
            section.scrollIntoView({behavior: "smooth"});
        })
    })
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildDynamicNavBar()

// Scroll to section on link click
scrollOnNavItemClick()

// Set sections and navlink as active
observeSectionInViewPort()