// Navigation with Submenu
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Handle submenu toggle
        if (item.parentElement.classList.contains('nav-group')) {
            item.parentElement.classList.toggle('active');
            return;
        }
        
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all content pages
        document.querySelectorAll('.content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show selected content page
        const page = item.getAttribute('data-page');
        document.getElementById(`${page}-page`)?.classList.remove('hidden');
    });
});

// Submenu Navigation
document.querySelectorAll('.nav-subitem').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hide all content pages
        document.querySelectorAll('.content').forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show selected content page
        const page = item.getAttribute('data-page');
        document.getElementById(`${page}-page`)?.classList.remove('hidden');
    });
});

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Product Modal Functions
window.showAddProductModal = () => showModal('addProductModal');
window.closeAddProductModal = () => closeModal('addProductModal');

// Category Modal Functions
window.showAddCategoryModal = () => showModal('addCategoryModal');
window.closeAddCategoryModal = () => closeModal('addCategoryModal');

// Order Modal Functions
window.showOrderEditModal = (orderId) => {
    document.getElementById('orderNumber').textContent = orderId;
    showModal('orderEditModal');
};
window.closeOrderEditModal = () => closeModal('orderEditModal');

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// Sample Data
const sampleProducts = [
    {
        id: 1,
        name: 'T-Shirt',
        category: 'Men\'s Clothing',
        price: 29.99,
        stock: 100,
        status: 'active',
        image: 'https://placehold.co/200x200'
    },
    {
        id: 2,
        name: 'Dress',
        category: 'Women\'s Clothing',
        price: 89.99,
        stock: 50,
        status: 'active',
        image: 'https://placehold.co/200x200'
    }
];

const sampleCategories = [
    {
        id: 1,
        name: 'Men\'s Clothing',
        productCount: 150,
        activeProducts: 120
    },
    {
        id: 2,
        name: 'Women\'s Clothing',
        productCount: 200,
        activeProducts: 180
    }
];

const sampleOrders = [
    {
        id: 'ORD-001',
        customer: 'John Doe',
        products: [
            { name: 'T-Shirt', quantity: 2, price: 29.99 }
        ],
        total: 59.98,
        date: '2024-02-20',
        status: 'pending'
    }
];

// Render Functions
function renderProducts() {
    const tbody = document.getElementById('productTableBody');
    if (!tbody) return;

    tbody.innerHTML = sampleProducts.map(product => `
        <tr>
            <td><input type="checkbox"></td>
            <td>
                <div class="product-cell">
                    <img src="${product.image}" alt="${product.name}" width="40" height="40">
                    <span>${product.name}</span>
                </div>
            </td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><span class="status-badge ${product.status}">${product.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="showAddProductModal()">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;

    grid.innerHTML = sampleCategories.map(category => `
        <div class="category-card">
            <h3>${category.name}</h3>
            <div class="category-stats">
                <div class="category-stat">
                    <span>Total Products</span>
                    <strong>${category.productCount}</strong>
                </div>
                <div class="category-stat">
                    <span>Active</span>
                    <strong>${category.activeProducts}</strong>
                </div>
            </div>
            <div class="product-actions">
                <button class="action-btn edit-btn">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="action-btn delete-btn">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderOrders() {
    const tbody = document.getElementById('orderTableBody');
    if (!tbody) return;

    tbody.innerHTML = sampleOrders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products.map(p => `${p.name} (${p.quantity})`).join(', ')}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
            <td><span class="status-badge ${order.status}">${order.status}</span></td>
            <td>
                <button class="action-btn edit-btn" onclick="showOrderEditModal('${order.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderCategories();
    renderOrders();
});

// Form Handlers
document.getElementById('addProductForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add product logic here
    closeAddProductModal();
});

document.getElementById('addCategoryForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add category logic here
    closeAddCategoryModal();
});

document.getElementById('orderEditForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Update order logic here
    closeOrderEditModal();
});

// Image Upload Preview
const imageUpload = document.querySelector('.image-upload input[type="file"]');
const imagePreview = document.getElementById('imagePreview');

if (imageUpload && imagePreview) {
    imageUpload.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const div = document.createElement('div');
                div.className = 'preview-image';
                div.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="remove-image" onclick="this.parentElement.remove()">×</button>
                `;
                imagePreview.appendChild(div);
            };
            reader.readAsDataURL(file);
        });
    });

}
// Employee List
// ================= EMPLOYEE MANAGEMENT =================

const employees = [
  { id: 1, name: "Nguyen Van A", role: "Manager", salary: 15000000 },
  { id: 2, name: "Tran Thi B", role: "Sales Staff", salary: 10000000 },
  { id: 3, name: "Le Van C", role: "Warehouse", salary: 9000000 },
];

// Render employee list
function renderEmployees() {
  const tbody = document.getElementById("employeeTableBody");
  tbody.innerHTML = "";
  employees.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td>${emp.salary.toLocaleString()} VND</td>
      <td>
        <button class="edit-btn" onclick="editEmployee(${emp.id})">Edit</button>
        <button class="delete-btn" onclick="deleteEmployee(${emp.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Add employee modal logic
function showAddEmployeeModal() {
  document.getElementById("addEmployeeModal").style.display = "flex";
}
function closeAddEmployeeModal() {
  document.getElementById("addEmployeeModal").style.display = "none";
}

// Handle form submit
document.getElementById("addEmployeeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;
  const newEmp = {
    id: employees.length + 1,
    name: form.name.value,
    role: form.role.value,
    salary: parseInt(form.salary.value)
  };
  employees.push(newEmp);
  renderEmployees();
  closeAddEmployeeModal();
  form.reset();
});

function deleteEmployee(id) {
  const index = employees.findIndex(e => e.id === id);
  if (index !== -1 && confirm("Are you sure to delete this employee?")) {
    employees.splice(index, 1);
    renderEmployees();
  }
}

// Khi chuyển sang trang Employees thì render list
document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-page");
    if (page === "employees") {
      renderEmployees();
    }
  });
});
