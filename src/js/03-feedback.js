// import throttle from 'lodash.throttle'

// const STORAGE_DATA = 'feedback-form-state';

// const formData = {};

// const refs = {
//     form: document.querySelector('.feedback-form'),
//     textarea: document.querySelector('.feedback-form textarea'),
//     input: document.querySelector('.feedback-form input'),
// };

// refs.textarea.addEventListener('input', throttle(event => {

//     const formData = { email: `${refs.form["email"].value}`, message: `${refs.form["message"].value}` };
//     const formDataJSON = JSON.stringify(formData);

//     localStorage.setItem(STORAGE_DATA, formDataJSON);

// }, 500));


// refs.form.addEventListener("submit", event => {
//     event.preventDefault();
    
//     const formData = { email: `${refs.form["email"].value}`, message: `${refs.form["message"].value}` };
//     console.log(formData);

//     localStorage.removeItem(STORAGE_DATA);
//     refs.form["email"].value = "";
//     refs.form["message"].value = "";

// });


import throttle from 'lodash.throttle';

const form = document.querySelector("form");

const FEEDBACK_STATE = 'feedback-form-state';

form.addEventListener("input", throttle(onFormInput, 500));
form.addEventListener("submit",  onFormSubmit)
filledForm();

function onFormInput(evt) {
    
    let formData = localStorage.getItem(FEEDBACK_STATE);
    formData = formData ? JSON.parse(formData) : {};
    formData[evt.target.name] = evt.target.value
    localStorage.setItem(FEEDBACK_STATE, JSON.stringify(formData))
}

function onFormSubmit(evt) {
    evt.preventDefault();

    const {
        elements: { email, message }
    } = evt.currentTarget;
    if (email.value === "" || message.value === "") {
    alert("Заполните пожалуйста все поля!")
    } else {
    console.log(JSON.parse(localStorage.getItem(FEEDBACK_STATE)))
        
    evt.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_STATE);
    }
}

function filledForm() {
    
    let savedData = localStorage.getItem(FEEDBACK_STATE);
    if(savedData) {
        savedData = JSON.parse(savedData);

        Object.entries(savedData).forEach(([name, value]) => {
            form.elements[name].value = value;
        });
    }
}