import { checkAuth, fetchList, logout } from '../fetch-utils.js';
import { renderElement } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const shoppingList = document.getElementById('shopping-list');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayList() {
    const data = await fetchList();
    for (let item of data) {
        const newLi = renderElement(item);
        if (item.purchased) {
            newLi.classList.add('bought');
        }
        newLi.addEventListener('click', () => {
            newLi.classList.toggle('purchased');

        });
        shoppingList.append(newLi);
    }

}
displayList();
