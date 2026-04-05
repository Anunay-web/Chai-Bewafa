let bill = [];
let allBills = JSON.parse(localStorage.getItem("allBills")) || [];

const menu = {
    dilFenk: [
        { name: "Veg Loaded Cheese Grilled Sandwich", price: 159, image: "images/sandwich1.jpg" },
        { name: "Veg Grilled Sandwich", price: 139, image: "images/sandwich2.jpg" },
        { name: "Veg Sandwich", price: 129, image: "images/sandwich3.jpg" },
        { name: "Peri Peri Mayo Fries", price: 119, image: "images/fries1.jpg" },
        { name: "Teekhi Mirchi Peri Peri Fries", price: 99, image: "images/fries2.jpg" },
        { name: "Lonely Fresh Fries", price: 89, image: "images/fries3.jpg" },
        { name: "Bread Butter", price: 49, image: "images/bread.jpg" },
        { name: "Veg Burger", price: 59, image: "images/burger1.jpg" },
        { name: "Crispy Cheese Burger", price: 79, image: "images/burger2.jpg" }
    ],
    dhoka: [
        { name: "Bewafa Special Chai", price: 51, image: "images/chai1.jpg" },
        { name: "Kulhad Chai", price: 40, image: "images/chai2.jpg" },
        { name: "Coffee", price: 60, image: "images/coffee.jpg" },
        { name: "Espresso", price: 79, image: "images/espresso.jpg" },
        { name: "Cappuccino", price: 109, image: "images/cappuccino.jpg" },
        { name: "Black Coffee", price: 49, image: "images/blackcoffee.jpg" },
        { name: "Green Tea", price: 39, image: "images/tea.jpg" },
        { name: "Tulsi Green Tea", price: 49, image: "images/greentea.jpg" },
        { name: "Honey Lemon Tea", price: 49, image: "images/lemontea.jpg" }
    ],
    pyassa: [
        { name: "Mango Shake", price: 149, image: "images/mango.jpg" },
        { name: "Chocolate Shake", price: 129, image: "images/chocolate.jpg" },
        { name: "Strawberry Shake", price: 129, image: "images/strawberry.jpg" },
        { name: "Vanilla Shake", price: 129, image: "images/vanilla.jpg" },
        { name: "Oreo Breakup Shake", price: 109, image: "images/oreo.jpg" },
        { name: "Cold Coffee", price: 139, image: "images/coldcoffee.jpg" },
        { name: "Fresh Lemon Soda", price: 69, image: "images/lemonsoda.jpg" },
        { name: "Fresh Lemon Water", price: 59, image: "images/lemonwater.jpg" },
        { name: "Lassi Sweet", price: 79, image: "images/lassi1.jpg" },
        { name: "Lassi Salty", price: 69, image: "images/lassi2.jpg" },
        { name: "Kunwara Virgin Mojito", price: 99, image: "images/mojito1.jpg" },
        { name: "Green Apple Mojito", price: 109, image: "images/mojito2.jpg" },
        { name: "Blueberry Mojito", price: 119, image: "images/mojito3.jpg" }
    ],
    galiyon: [
        { name: "Chilli Paneer", price: 239, image: "images/paneer.jpg" },
        { name: "Chilli Potato", price: 209, image: "images/potato.jpg" },
        { name: "Pasta White Sauce", price: 199, image: "images/pasta1.jpg" },
        { name: "Pasta Red Sauce", price: 199, image: "images/pasta2.jpg" },
        { name: "Fried Rice", price: 199, image: "images/rice.jpg" },
        { name: "Chowmein", price: 159, image: "images/noodles.jpg" },
        { name: "Momos (8 pcs)", price: 99, image: "images/momos.jpg" },
        { name: "Jale Bhune Momos", price: 129, image: "images/friedmomos.jpg" }
    ],
    ghar: [
        { name: "Amiri Paneer Parantha", price: 189, image: "images/paratha1.jpg" },
        { name: "Aloo Pyaz Parantha", price: 69, image: "images/paratha2.jpg" },
        { name: "Parantha Combo", price: 119, image: "images/combo.jpg" }
    ],
    combos: [
        { name: "The First Date Combo", price: 499, image: "images/combo1.jpg" },
        { name: "The Breakup Therapy Combo", price: 249, image: "images/combo2.jpg" },
        { name: "The Spicy Revenge Combo", price: 199, image: "images/combo3.jpg" },
        { name: "The Student Special Combo", price: 99, image: "images/combo4.jpg" }
    ]
};

function updateCategory(cat) {
    document.querySelectorAll('.sidebar button').forEach(b => b.classList.remove('active-cat'));
    document.getElementById(`cat-${cat}`).classList.add('active-cat');
    document.getElementById('categoryTitle').innerText = document.getElementById(`cat-${cat}`).innerText;
    showCategory(cat);
}

function showCategory(cat) {
    const container = document.getElementById("menuItems");
    container.innerHTML = "";
    menu[cat].forEach(item => {
        container.innerHTML += `
            <div onclick="addItem('${item.name}', ${item.price})" class="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:border-orange-500 transition shadow-sm group">
                <div class="h-40 bg-gray-50 overflow-hidden">
                    <img src="./${item.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" onerror="this.src='https://via.placeholder.com/150?text=Food'">
                </div>
                <div class="p-4">
                    <h4 class="font-bold text-xs text-gray-800 leading-tight h-10 overflow-hidden uppercase">${item.name}</h4>
                    <p class="text-orange-600 font-black text-lg mt-1">₹${item.price}</p>
                </div>
            </div>
        `;
    });
}

function addItem(name, price) {
    let existing = bill.find(i => i.item === name);
    if (existing) {
        existing.qty++;
        existing.total = existing.qty * existing.price;
    } else {
        bill.push({ item: name, price, qty: 1, total: price });
    }
    renderBill();
}

function removeItem(name) {
    let existing = bill.find(i => i.item === name);
    if (existing) {
        existing.qty--;
        if (existing.qty <= 0) bill = bill.filter(i => i.item !== name);
        else existing.total = existing.qty * existing.price;
    }
    renderBill();
}

function addManualItem() {
    const name = document.getElementById("customName").value.trim();
    const price = parseFloat(document.getElementById("customPrice").value);
    if (name && price > 0) {
        addItem(name, price);
        document.getElementById("customName").value = "";
        document.getElementById("customPrice").value = "";
    }
}

function renderBill() {
    const container = document.getElementById("billItems");
    let total = 0;
    container.innerHTML = bill.length === 0 ? `<div class="text-center py-20 text-gray-300 font-bold uppercase tracking-widest text-[10px]">Empty</div>` : "";

    bill.forEach(item => {
        total += item.total;
        container.innerHTML += `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div class="flex-1 text-[10px] font-bold text-gray-700 pr-2 uppercase">${item.item}</div>
                <div class="flex items-center gap-2 mx-2">
                    <button onclick="removeItem('${item.item}')" class="w-6 h-6 border rounded font-bold text-gray-400 hover:bg-gray-50 transition">-</button>
                    <span class="text-xs font-bold">${item.qty}</span>
                    <button onclick="addItem('${item.item}', ${item.price})" class="w-6 h-6 border rounded font-bold text-gray-400 hover:bg-gray-50 transition">+</button>
                </div>
                <span class="font-black text-gray-800 text-xs">₹${item.total}</span>
            </div>
        `;
    });
    document.getElementById("total").innerText = total.toLocaleString();
}

function resetCurrentOrder() {
    if (bill.length > 0 && confirm("Clear current plate?")) {
        bill = [];
        renderBill();
    }
}

function handlePrint() {
    if (bill.length === 0) return alert("Select items first!");
    generateReceipt(); 
    saveOrder();       
    bill = [];         
    renderBill();      
}

function saveOnly() {
    if (bill.length === 0) return;
    saveOrder();
    bill = [];
    renderBill();
    alert("Saved!");
}

function saveOrder() {
    allBills.push({
        items: [...bill],
        total: bill.reduce((s,i) => s + i.total, 0),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });
    localStorage.setItem("allBills", JSON.stringify(allBills));
}

function generateReceipt() {
    let win = window.open('', '', 'width=350,height=600');
    let total = bill.reduce((s,i) => s + i.total, 0);
    let itemsHtml = bill.map(i => `
        <div style="display: flex; justify-between; margin-bottom: 5px; font-size: 12px;">
            <div style="flex: 1;">${i.item}</div>
            <div style="width: 30px; text-align: center;">${i.qty}</div>
            <div style="width: 50px; text-align: right;">₹${i.total}</div>
        </div>
    `).join("");
    
    win.document.write(`
        <html><body style="font-family: monospace; padding: 20px; width: 260px;">
            <center>
                <img src="images/logo.jpeg" style="width: 40px; border-radius: 50%;">
                <h2 style="margin: 5px 0;">CHAIBEWAFA</h2>
                <small>"Zahar se behtar, ishq se kadak"</small><br>
                <small>${new Date().toLocaleString()}</small>
            </center>
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <div style="display: flex; font-weight: bold; font-size: 12px;">
                <div style="flex: 1;">ITEM</div><div style="width: 30px; text-align: center;">QTY</div><div style="width: 50px; text-align: right;">AMT</div>
            </div>
            <hr style="border: none; border-top: 1px dashed #000; margin: 5px 0;">
            ${itemsHtml}
            <hr style="border: none; border-top: 1px dashed #000; margin: 10px 0;">
            <h3 align="right" style="margin: 0;">TOTAL: ₹${total}</h3>
            <center><p style="margin-top: 20px; font-size: 10px;">Visit Again ☕</p></center>
            <script>window.onload=()=>{window.print();window.close();}</script>
        </body></html>
    `);
    win.document.close();
}

function exportExcel() {
    if (allBills.length === 0) return alert("No sales history.");
    let data = [];
    allBills.forEach(b => b.items.forEach(i => data.push({ Date: b.date, Time: b.time, Item: i.item, Qty: i.qty, Amount: i.total })));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales");
    XLSX.writeFile(wb, "Chaibewafa_Sales.xlsx");
}

function logout() {
    localStorage.removeItem("terminal_auth");
    window.location.href = "index.html";
}

setInterval(() => { 
    const el = document.getElementById("time");
    if(el) el.innerText = new Date().toLocaleTimeString(); 
}, 1000);

updateCategory('dilFenk');