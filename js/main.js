document.addEventListener('DOMContentLoaded', function () {

    // Google seach API key: AIzaSyDuAc0jjh-V2e92HjmQ_WurXSc1X6Ng_KQ
    // GoogleAPI URL = https://www.googleapis.com/customsearch/v1?key=AIzaSyDuAc0jjh-V2e92HjmQ_WurXSc1X6Ng_KQ&cx=0617040ac485cb48c
    // googleapis + API key + Programmable Search Engine ID (cx) + search query
    // DOCS: https://developers.google.com/custom-search/v1/using_rest
    // Test url: https://www.googleapis.com/customsearch/v1?key=AIzaSyDuAc0jjh-V2e92HjmQ_WurXSc1X6Ng_KQ&cx=0617040ac485cb48c&q=success&fileType=image&searchType=image&imgType=animated

    let apiURl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDuAc0jjh-V2e92HjmQ_WurXSc1X6Ng_KQ&cx=0617040ac485cb48c&q=lectures&callback=hndlr'
    let apiURl2 = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDuAc0jjh-V2e92HjmQ_WurXSc1X6Ng_KQ&cx=0617040ac485cb48c&q=success&SearchType=image&imgType=animated&callback=hndlr'

    // function hndlr(response) {
    //     for (var i = 0; i < response.items.length; i++) {
    //         var item = response.items[i];
    //         // in production code, item.htmlTitle should have the HTML entities escaped.
    //         console.log(item.htmlTitle);
    //     }
    // }



    let checklistContainer = document.querySelector('main.container');


    // MOBILE MENU start

    let burgerBtn = document.querySelector('.burger-menu');
    burgerBtn.addEventListener('click', function () {
        document.querySelector('.menu-items').classList.toggle('visible-menu');
    })

    // close menu when clicking on a menu item
    // max-width: 992px
    // set menu items array
    let menuItems = Array.from(document.querySelectorAll('.menu-items ul li'));

    const closeMenu = () => {

        if (window.innerWidth <= 992) {
            document.querySelector('.menu-items').classList.toggle('visible-menu');
        }

    }

    for (let i of menuItems) {
        i.addEventListener('click', closeMenu);
    }




    // MOBILE MENU end


    // DARK MODE or LIGHT MODE start
    let mode;

    // check if there isn't an object mode in the localStorage and create one if not, if there is one, read it out and save it in mode variable
    if (!localStorage.getItem('mode')) {
        mode = 'light';
        window.localStorage.setItem(`mode`, JSON.stringify(mode));
    } else {
        mode = JSON.parse(localStorage.getItem('mode'));
    }

    // check how the page is set and edit the object
    const setMode = () => {
        if (document.querySelector('body').classList.contains('dark')) {
            mode = 'dark'
            window.localStorage.setItem(`mode`, JSON.stringify(mode));
        } else {
            mode = 'light'
            window.localStorage.setItem(`mode`, JSON.stringify(mode));
        }
    }

    // change the style of the page to be dark or light depending on the information saved in the variable

    if (mode == 'dark') {
        document.querySelector('body').classList.add('dark');
        document.querySelector('#mode i').classList.remove('fa-moon');
        document.querySelector('#mode i').classList.add('fa-sun');
    } else if (mode == 'light') {
        document.querySelector('body').classList.remove('dark');
        document.querySelector('#mode i').classList.add('fa-moon');
        document.querySelector('#mode i').classList.remove('fa-sun');
    }

    // register the darkmode button
    let modeToggleBtn = document.querySelector('#mode');

    modeToggleBtn.addEventListener('click', function () {
        document.querySelector('body').classList.toggle('dark');
        document.querySelector('#mode i').classList.toggle('fa-moon');
        document.querySelector('#mode i').classList.toggle('fa-sun');
        setMode();
    })
    // DARK MODE or LIGHT MODE end


    // // // 
    let toDosAdformLocal;
    let toDosIABLocal;
    let toDosGrafikLocal;

    let adformLink = document.querySelector('li[data-link=adform]');
    let iabLink = document.querySelector('li[data-link=iab]');
    let grafikLink = document.querySelector('li[data-link=grafik]');
    let clearData = document.querySelector('li[data-link=clear-data]');
    let openPage = 'adform';

    // Event Listener for clearing the data
    clearData.addEventListener('click', function () {
        window.localStorage.clear();
        toDosAdformLocal = toDosAdform;
        toDosIABLocal = toDosIAB;
        toDosGrafikLocal = toDosGrafik;
        mode = mode;

        let allchecks = Array.from(document.querySelectorAll('.checked'));

        for (let i of allchecks) {

            i.classList.remove('checked');
        }
        setMode();
        choosePage();
    })

    // Navigation
    adformLink.addEventListener('click', function () {
        openPage = 'adform';
        choosePage();
    });

    iabLink.addEventListener('click', function () {
        openPage = 'iab';
        choosePage();
    });
    grafikLink.addEventListener('click', function () {
        openPage = 'grafik';
        choosePage();
    });

    // function to save the object to the local storage
    const saveToLocal = () => {
        window.localStorage.setItem(`adFormtodos`, JSON.stringify(toDosAdformLocal));
        window.localStorage.setItem(`iabtodos`, JSON.stringify(toDosIABLocal));
        window.localStorage.setItem(`grafiktodos`, JSON.stringify(toDosGrafikLocal));
    }

    // check if the localStorage has the objects. if they exist, save them in the variables, if not
    if (!localStorage.getItem(`adFormtodos`) && !localStorage.getItem(`iabtodos`)) {
        toDosAdformLocal = toDosAdform;
        toDosIABLocal = toDosIAB;
        toDosGrafikLocal = toDosGrafik;
        saveToLocal();
    } else {
        toDosAdformLocal = JSON.parse(localStorage.getItem(`adFormtodos`));
        toDosIABLocal = JSON.parse(localStorage.getItem(`iabtodos`));
        toDosGrafikLocal = JSON.parse(localStorage.getItem(`grafiktodos`));
    }

    // Loop the Array and print the html dynamically in case we need to add new checklist objects
    const buildPage = (array) => {
        let allCheckboxes = Array.from(document.querySelectorAll('.check-element'));
        for (let i of allCheckboxes) {
            document.querySelector('main.container').removeChild(i);
        }

        // start counter of checked boxes
        let checked = 0;

        for (let i of array) {

            // declare and assign variable to the progress bar
            let progressBar = document.querySelector('progress');

            // set the max of the progress bar to be the length of the items in the object
            progressBar.setAttribute('max', array.length)

            // assign an empty string which will be replaced by the checked class name if the objects property checked is true
            let check = '';

            // is the element already checked? if yes add the class to the div
            if (i.checked == true) {
                check = 'checked';
                checked++;
            }
            // set the progress value to the actual amount of checked elements
            progressBar.setAttribute('value', checked);

            // if else to print only the existing items
            if (i.imageURL != '' && i.code != '') {
                checklistContainer.innerHTML += `
                <div class="check-element">
                    <div class="checkbox">
                        <div class="check_btn" data-item="${i.index}">
                            <div class="checker ${check}"></div>
                        </div>
                    </div>
                    <div class="text">
                        <h4>${i.text}</h4>
                        <div class="code">${i.code}</div>
                        <img src="${i.imageURL}"> 
                    </div>
    
                </div>`
            } else if (i.imageURL == '' && i.code != '') {
                checklistContainer.innerHTML += `
                <div class="check-element">
                    <div class="checkbox">
                        <div class="check_btn" data-item="${i.index}">
                            <div class="checker ${check}"></div>
                        </div>
                    </div>
                    <div class="text">
                        <h4>${i.text}</h4>
                        <div class="code">${i.code}</div>
                    </div>
    
                </div>`
            } else if (i.imageURL != '' && i.code == '') {
                checklistContainer.innerHTML += `
                <div class="check-element">
                    <div class="checkbox">
                        <div class="check_btn" data-item="${i.index}">
                            <div class="checker ${check}"></div>
                        </div>
                    </div>
                    <div class="text">
                        <h4>${i.text}</h4>
                        <img src="${i.imageURL}"> 
                    </div>
    
                </div>`
            } else if (i.imageURL == '' && i.code == '') {
                checklistContainer.innerHTML += `
                <div class="check-element">
                    <div class="checkbox">
                        <div class="check_btn" data-item="${i.index}">
                            <div class="checker ${check}"></div>
                        </div>
                    </div>
                    <div class="text">
                        <h4>${i.text}</h4>
    
                    </div>
    
                </div>`
            }
        }

        let checkboxes = Array.from(document.querySelectorAll('.check_btn'));

        // counter changes whenever you check or uncheck the box and the progress bar updates accordingly
        for (let i in checkboxes) {
            // look into why i need to declare the variable for the progressbar again. line 99 doesnt work if i dont do this.
            let progressBar = document.querySelector('progress');
            checkboxes[i].addEventListener('click', function () {
                let checkbox = document.querySelector(`.check_btn[data-item="${i}"] .checker`);
                checkbox.classList.toggle('checked');
                if (checkbox.classList.contains('checked')) {
                    checked++;
                    array[i].checked = true;
                    saveToLocal();

                } else {
                    checked--;
                    array[i].checked = false;
                    saveToLocal();
                }



                progressBar.setAttribute('value', checked);

                if (progressBar.value == array.length) {
                    alert('The Banner should be correct');
                }
            })
        }
    }


    // make an array with all checkboxes


    const choosePage = () => {

        if (openPage == 'adform') {
            // do something

            buildPage(toDosAdformLocal);

        } else if (openPage == 'iab') {
            // do something else

            buildPage(toDosIABLocal);

        } else if (openPage == 'grafik') {
            // do something else

            buildPage(toDosGrafikLocal);

        }
    }

    choosePage();




});