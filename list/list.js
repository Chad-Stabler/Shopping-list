import { checkAuth, deleteList, fetchList, logout, togglePurchased } from '../fetch-utils.js';
import { renderElement } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const shoppingList = document.getElementById('shopping-list');
const deleteButton = document.getElementById('delete');
const createButton = document.getElementById('create-button');

logoutButton.addEventListener('click', () => {
    logout();
});

createButton.addEventListener('click', () => {
    location.replace('../create');
});

deleteButton.addEventListener('click', async () => {
    const list = await fetchList();
    for (let item of list) {
        await deleteList(item);
    }
    displayList();
});


async function displayList() {
    shoppingList.textContent = '';
    const data = await fetchList();
    for (let newItem of data) {
        const newLi = renderElement(newItem);
        if (newItem.purchased) {
            newLi.classList.add('bought');
        }
        newLi.addEventListener('click', async () => {
            await togglePurchased(newItem);
            displayList();
        });
        shoppingList.append(newLi);
    }

}
displayList();
