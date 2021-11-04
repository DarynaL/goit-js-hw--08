import throttle from 'lodash.throttle'

const STORAGE_DATA = 'feedback-form-state';

const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
    console.log(formData);
})

populateTextarea();

function onFormSubmit(evt) {
    evt.preventDefault();
    console.log('Форма отправлена');
    const email = evt.currentTarget.email.value;
    const message = evt.currentTarget.message.value;

    if (email === '' || message === '') {
    return;
  }

    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_DATA);
}


function onTextareaInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem(STORAGE_DATA, JSON.stringify(formData));
}

function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_DATA);
    const parsedSavedMessage = JSON.parse(savedMessage);
    if (parsedSavedMessage) {
        refs.input.value = parsedSavedMessage.email;
        refs.textarea.value = parsedSavedMessage.message;
    }
}

