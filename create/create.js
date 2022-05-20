import { createNewItem } from '../fetch-utils.js';


const createForm = document.getElementById('create-form');
const errorMsg = document.getElementById('error-message');
const backButton = document.getElementById('back-button');

createForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(createForm);
    const itemData = await createNewItem(data.get('item'), data.get('qty'));

    if (itemData) {
        window.location.href = '/list';
    } else errorMsg.textContent = 'Error in adding list item';
});

backButton.addEventListener('click', () => {
    location.replace('../list');
});