**Nama:** Faalih Nazhmi Prasetyo
**NIM:** 103122400065
**Kelas:** SE-08-02

## Soal
```
Sebagai konteks, fungsi di bawah ini menampilkan rincian pesanan di modal dan jika klik konfirmasi, sistem apa menyimpannya.

function fetchOrderDetails(orderId, token) {
    fetch(`https://example.com/api/order/${orderId}`, {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }
        return response.json();
    })
    .then(order => {
        // Display order info
        const modal = document.getElementById('orderModal');
        const detailsDiv = modal.querySelector('#orderDetails');
        detailsDiv.innerHTML = '';

        const header = document.createElement('h3');
        header.textContent = `Order ID: ${order.id}`;
        detailsDiv.appendChild(header);

        const status = document.createElement('p');
        status.textContent = `Status: ${order.status}`;
        detailsDiv.appendChild(status);

        // Show modal
        modal.style.display = 'block';

        // Setup close button
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Setup confirm button
        const confirmBtn = modal.querySelector('#confirmOrderBtn');
        if (order.status === 'Delivered') {
            confirmBtn.style.display = 'none';
        } else {
            confirmBtn.addEventListener('click', () => {
                confirmOrder(order.id, token);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
```

## Deskripsi

1. Fungsi fetchOrderDetails (Fokus pada Pengambilan Data)

Tugas: Mengambil data pesanan dari API menggunakan fetch(). Fungsi ini bertanggung jawab melakukan komunikasi dengan server, menangani respons yang diterima, serta meneruskan data yang berhasil diperoleh ke fungsi renderOrderModal(). Dengan demikian, logika pengambilan data dipisahkan dari logika tampilan.

2. Fungsi renderOrderModal (Fokus pada Tampilan Modal)

Tugas: Mengatur dan menampilkan isi modal. Fungsi ini mengosongkan konten lama, memanggil fungsi-fungsi pembuat komponen, mengatur tombol aksi, lalu menampilkan modal kepada pengguna. Fungsi ini berperan sebagai koordinator tampilan.

3. Fungsi createOrderHeader (Fokus pada Header Pesanan)

Tugas: Membuat elemen <h3> yang berisi informasi ID pesanan. Pemisahan ini memudahkan perubahan tampilan header tanpa memengaruhi bagian kode lainnya.

4. Fungsi createOrderStatus (Fokus pada Status Pesanan)

Tugas: Membuat elemen <p> yang menampilkan status pesanan. Dengan memisahkan fungsi ini, format atau gaya tampilan status dapat diubah secara terpusat.

5. Fungsi setupModalActionButtons (Fokus pada Event dan Interaksi)

Tugas: Mengatur seluruh interaksi pengguna pada modal, termasuk tombol Close dan Confirm. Fungsi ini juga mengelola visibilitas tombol Confirm berdasarkan status pesanan sehingga perilaku antarmuka tetap konsisten.
