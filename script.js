const itemInput = document.getElementById('itemInput');
const itemBtn = document.getElementById('itemBtn');
const itemList = document.getElementById('itemList');
const filter = document.getElementById('filter');

let items = JSON.parse(localStorage.getItem('todoItems')) || []; // دریافت آیتم‌ها از localStorage

function saveItems() {
    localStorage.setItem('todoItems', JSON.stringify(items));
}

function addItem() {
    console.log("آیتم ورودی:", itemInput);
    console.log("مقدار ورودی:", itemInput?.value);
    

    if (itemInput.value.trim() === "") return;

    items.push({
        text: itemInput.value.trim(),
        completed: false,
        deleted: false
    });

    saveItems(); // ذخیره در localStorage
    itemInput.value = "";
    applyFilter(); // به‌روزرسانی لیست
}

function deleteItem(index) {
    items[index].deleted = true;
    saveItems();
    applyFilter();
}

function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    saveItems();
    applyFilter();
}

function applyFilter() {
    itemList.innerHTML = '';
    const selectedFilter = filter.value;

    items.forEach((item, index) => {
        const shouldDisplay =
            (selectedFilter === 'all' && !item.deleted) ||
            (selectedFilter === 'checked' && item.completed && !item.deleted) ||
            (selectedFilter === 'deleted' && item.deleted);

        if (!shouldDisplay) return;

        const li = document.createElement("li");
        li.textContent = item.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.addEventListener('click', () => deleteItem(index));

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));

        li.appendChild(deleteBtn);
        li.appendChild(checkbox);
        itemList.appendChild(li);
    });

    itemList.style.display = itemList.children.length > 0 ? 'block' : 'none';
}

// وقتی صفحه لود می‌شود، لیست را از localStorage بازیابی کند
document.addEventListener("DOMContentLoaded", applyFilter);

itemBtn.addEventListener("click", addItem);
itemInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") addItem();
});
filter.addEventListener("change", applyFilter);
