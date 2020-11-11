(() => {
    const addItems = document.querySelector(".add-items");
    const itemsList = document.querySelector(".plates");
    const items = JSON.parse(localStorage.getItem("tapas")) || [];

    const addItem = (e) => {
        e.preventDefault();
        const inputVal = e.target.querySelector('[name="item"]').value;
        const item = {
            inputVal,
            done: false,
        };
        items.push(item);
        loadList(items, itemsList);
        localStorage.setItem("tapas", JSON.stringify(items));
        e.target.reset();
    };

    const loadList = (items, itemsList) => {
        if (!(items instanceof Array)) return false;
        itemsList.innerHTML = items
            .map((item, i) => {
                return `<li>
                <input type = "checkbox" data-index = ${i} id = "item${i}" ${
          item.done ? "checked" : ""
        }/>
          <label for="item${i}">${item.inputVal}</label>
          </li>`;
            })
            .join("");
    };

    const toggleDone = (e) => {
        if (!e.target.matches("input")) return;
        const index = e.target.dataset.index;
        items[index].done = !items[index].done;
        localStorage.setItem("tapas", JSON.stringify(items));
    };

    addItems.addEventListener("submit", addItem);
    itemsList.addEventListener("click", toggleDone);

    document.onload = loadList(items, itemsList);
})();