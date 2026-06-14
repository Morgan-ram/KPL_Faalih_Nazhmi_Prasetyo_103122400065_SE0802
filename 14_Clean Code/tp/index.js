// 1. Fungsi Utama: Fokus hanya pada pengambilan data (Fetching)
function fetchOrderDetails(orderId, token) {
    fetch(`https://example.com/api/order/${orderId}`, {
        headers: { 'Authorization': token }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch order details');
        return response.json();
    })
    .then(order => {
        renderOrderModal(order, token);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 2. Fungsi Pendukung: Fokus mengatur dan menampilkan Modal
function renderOrderModal(order, token) {
    const modal = document.getElementById('orderModal');
    const detailsDiv = modal.querySelector('#orderDetails');
    
    detailsDiv.innerHTML = '';

    detailsDiv.appendChild(createOrderHeader(order.id));
    detailsDiv.appendChild(createOrderStatus(order.status));

    setupModalActionButtons(modal, order, token);

    modal.style.display = 'block';
}

// 3. Fungsi Pendukung: Membuat elemen Header
function createOrderHeader(orderId) {
    const header = document.createElement('h3');
    header.textContent = `Order ID: ${orderId}`;
    return header;
}

// 4. Fungsi Pendukung: Membuat elemen Status
function createOrderStatus(statusText) {
    const status = document.createElement('p');
    status.textContent = `Status: ${statusText}`;
    return status;
}

// 5. Fungsi Pendukung: Manajemen Event Listener Tombol
function setupModalActionButtons(modal, order, token) {
    const closeBtn = modal.querySelector('.close');
    const confirmBtn = modal.querySelector('#confirmOrderBtn');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    if (order.status === 'Delivered') {
        confirmBtn.style.display = 'none';
    } else {
        confirmBtn.style.display = 'block'; 
        confirmBtn.addEventListener('click', () => {
            confirmOrder(order.id, token);
        });
    }
}