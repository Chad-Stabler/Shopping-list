export function renderElement(listItem) {
    const newDiv = document.createElement('div');
    const content = document.createElement('p');

    content.textContent = `${listItem.qty}: ${listItem.item}`;

    newDiv.append(content);
    return newDiv;
}