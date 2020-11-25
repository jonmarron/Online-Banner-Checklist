document.addEventListener('DOMContentLoaded', function () {

    let checklistContainer = document.querySelector('main.container');
    console.log(checklistContainer);

    // start counter of checked boxes
    let checked = 0;

    let toDosAdformLocal;

    const saveToLocal = () => {
        window.localStorage.setItem(`adFormtodos`, JSON.stringify(toDosAdformLocal));
    }
    if (!localStorage.getItem(`adFormtodos`)) {
        toDosAdformLocal = toDosAdform;
        saveToLocal();
    } else {
        toDosAdformLocal = JSON.parse(localStorage.getItem(`adFormtodos`));
    }

    // Loop the Array and print the html dynamically in case we need to add new checklist objects

    for (let i of toDosAdformLocal) {

        // declare and assign variable to the progress bar
        let progressBar = document.querySelector('progress');

        // set the max of the progress bar to be the length of the items in the object
        progressBar.setAttribute('max', toDosAdform.length)

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
                    <h3>${i.text}</h3>
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
                    <h3>${i.text}</h3>
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
                    <h3>${i.text}</h3>
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
                    <h3>${i.text}</h3>

                </div>

            </div>`
        }
    }



    // make an array with all checkboxes
    let checkboxes = Array.from(document.querySelectorAll('.check_btn'));
    console.log(checkboxes);



    // counter changes whenever you check or uncheck the box and the progress bar updates accordingly
    for (let i in checkboxes) {
        // look into why i need to declare the variable for the progressbar again. line 99 doesnt work if i dont do this.
        let progressBar = document.querySelector('progress');
        checkboxes[i].addEventListener('click', function () {
            let checkbox = document.querySelector(`.check_btn[data-item="${i}"] .checker`);
            checkbox.classList.toggle('checked');
            if (checkbox.classList.contains('checked')) {
                checked++;
                toDosAdformLocal[i].checked = true;
                saveToLocal();
                console.log(toDosAdformLocal);
            } else {
                checked--;
                toDosAdformLocal[i].checked = false;
                saveToLocal();
            }

            console.log('checked elements:' + checked);

            progressBar.setAttribute('value', checked);
            if (progressBar.value == toDosAdform.length) {
                alert('The Banner should be correct');
            }
        })
    }


});