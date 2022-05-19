import { checkAuth, fetchList, logout, togglePurchased } from '../fetch-utils.js';
import { renderElement } from '../render-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const shoppingList = document.getElementById('shopping-list');
const deleteButton = document.getElementById('delete');

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    //finish this function last
});


async function displayList() {
    shoppingList.textContent = '';
    const data = await fetchList();
    for (let item of data) {
        const newLi = renderElement(item);
        if (item.purchased) {
            newLi.classList.add('bought');
        }
        newLi.addEventListener('click', async () => {
            newLi.classList.toggle('bought');
            await togglePurchased(item);
            displayList();
        });
        shoppingList.append(newLi);
    }

}
displayList();
