// Admin JavaScript
let adminProducts = [];
let adminCategories = [];
let adminUsers = [];
let adminOrders = [];
let adminCurrentUser = null;
let adminReceipts = [];
let adminProfitMargins = [];

document.addEventListener('DOMContentLoaded', function () {
    console.log('Admin page loaded');
    initializeAdminData();
});

function initializeAdminData() {
    console.log('Initializing admin data...');

    // Load data từ localStorage
    try {
        adminProducts = JSON.parse(localStorage.getItem('products')) || [];
        adminCategories = JSON.parse(localStorage.getItem('categories')) || [];
        adminUsers = JSON.parse(localStorage.getItem('users')) || [];
        adminOrders = JSON.parse(localStorage.getItem('orders')) || [];
        adminReceipts = JSON.parse(localStorage.getItem('receipts')) || [];
        adminProfitMargins = JSON.parse(localStorage.getItem('profitMargins')) || [];

        console.log('Users loaded:', adminUsers);
        console.log('Products loaded:', adminProducts.length);
        console.log('Categories loaded:', adminCategories.length);

        // Kiểm tra xem có user admin không
        const adminUser = adminUsers.find(u => u.role === 'admin');
        if (!adminUser) {
            console.log('No admin user found, creating default...');
            createDefaultAdmin();
        }

    } catch (error) {
        console.error('Error loading data:', error);
        createDefaultData();
    }

    // Luôn hiển thị màn hình đăng nhập đầu tiên
    document.getElementById('adminLoginScreen').style.display = 'block';
    document.getElementById('adminInterface').style.display = 'none';

    // Thiết lập form đăng nhập
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Login form submitted');
            handleAdminLogin();
        });
    } else {
        console.error('Login form not found!');
    }
}

function createDefaultAdmin() {
    const defaultAdmin = {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@sneaker.com',
        fullName: 'Administrator',
        role: 'admin',
        phone: '0123456789',
        address: '123 Admin Street',
        status: 'active'
    };

    adminUsers.push(defaultAdmin);
    localStorage.setItem('users', JSON.stringify(adminUsers));
    console.log('Default admin created:', defaultAdmin);
}

function createDefaultData() {
    console.log('Creating default data...');

    // Tạo admin mặc định
    const defaultAdmin = {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@sneaker.com',
        fullName: 'Administrator',
        role: 'admin',
        phone: '0123456789',
        address: '123 Admin Street',
        status: 'active'
    };

    // Tạo categories mặc định
    const defaultCategories = [
        { id: 1, name: 'All', status: 'active' },
        { id: 2, name: 'WOMEN', status: 'active' },
        { id: 3, name: 'MEN', status: 'active' },
        { id: 4, name: 'UNISEX', status: 'active' },
        { id: 5, name: 'CASUAL', status: 'active' }
    ];

    // Tạo products mặc định
    const defaultProducts = [
        {
            id: 1,
            name: 'WORK SHOE',
            category: 'MEN',
            code: 'WS001',
            price: 299.43,
            cost: 150.00,
            profitMargin: 99.62,
            image: '../assest/Rebel_57449601_black_hi-res.png',
            description: 'Comfortable work shoes for professional environments',
            stock: 50,
            status: 'active'
        },
        {
            id: 2,
            name: 'WOMEN CASUAL',
            category: 'WOMEN',
            code: 'WC001',
            price: 299.43,
            cost: 140.00,
            profitMargin: 113.88,
            image: '../assest/BB550VTB-2.png',
            description: 'Stylish casual shoes for women',
            stock: 30,
            status: 'active'
        }
    ];

    // Lưu vào localStorage
    adminUsers = [defaultAdmin];
    adminCategories = defaultCategories;
    adminProducts = defaultProducts;

    localStorage.setItem('users', JSON.stringify(adminUsers));
    localStorage.setItem('categories', JSON.stringify(adminCategories));
    localStorage.setItem('products', JSON.stringify(adminProducts));
    localStorage.setItem('orders', JSON.stringify([]));
    localStorage.setItem('receipts', JSON.stringify([]));
    localStorage.setItem('profitMargins', JSON.stringify([]));

    console.log('Default data created successfully');
}

function toggleAdminPasswordVisibility() {
    const passwordField = document.getElementById('adminPassword');
    const toggleBtn = document.querySelector('.toggle-password');

    if (passwordField && toggleBtn) {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordField.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }
}

function handleAdminLogin() {
    console.log('Handling admin login...');

    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const messageDiv = document.getElementById('adminLoginMessage');

    console.log('Username:', username);
    console.log('Password:', password);

    if (!username || !password) {
        showAdminMessage(messageDiv, 'Vui lòng nhập đầy đủ thông tin!', 'error');
        return;
    }

    // Tìm user với role admin
    const user = adminUsers.find(u => {
        console.log('Checking user:', u.username, 'Role:', u.role, 'Status:', u.status);
        return u.username === username &&
            u.password === password &&
            u.role === 'admin' &&
            u.status === 'active';
    });

    if (user) {
        console.log('Login successful:', user);
        adminCurrentUser = user;
        showAdminMessage(messageDiv, 'Đăng nhập thành công!', 'success');

        setTimeout(() => {
            document.getElementById('adminLoginScreen').style.display = 'none';
            document.getElementById('adminInterface').style.display = 'block';
            document.getElementById('adminUserInfo').textContent = user.fullName;
            showAdminTab('dashboard');
        }, 1000);

    } else {
        console.log('Login failed - user not found or invalid credentials');
        showAdminMessage(messageDiv, 'Tên đăng nhập hoặc mật khẩu không đúng!', 'error');
    }
}

function showAdminMessage(element, message, type) {
    if (element) {
        element.innerHTML = message;
        element.style.color = type === 'success' ? 'green' : 'red';
        element.style.fontWeight = 'bold';
        element.style.padding = '10px';
        element.style.borderRadius = '4px';
        element.style.backgroundColor = type === 'success' ? '#e8f5e8' : '#ffe8e8';
    }
}

function adminLogout() {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        adminCurrentUser = null;
        document.getElementById('adminInterface').style.display = 'none';
        document.getElementById('adminLoginScreen').style.display = 'block';
        document.getElementById('adminLoginForm').reset();
        document.getElementById('adminLoginMessage').innerHTML = '';
    }
}

function showAdminProfile() {
    if (!adminCurrentUser) return;

    const modalHtml = `
        <div id="adminProfileModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="closeAdminModal()">&times;</span>
                <h2>Thông tin quản trị viên</h2>
                <div class="profile-info">
                    <p><strong>Tên đăng nhập:</strong> ${adminCurrentUser.username}</p>
                    <p><strong>Họ tên:</strong> ${adminCurrentUser.fullName}</p>
                    <p><strong>Email:</strong> ${adminCurrentUser.email}</p>
                    <p><strong>Vai trò:</strong> Quản trị viên</p>
                    <p><strong>Trạng thái:</strong> ${adminCurrentUser.status === 'active' ? 'Hoạt động' : 'Bị khóa'}</p>
                </div>
                <button onclick="closeAdminModal()" style="margin-top: 20px; padding: 10px 20px; background: #6B68FF; color: white; border: none; border-radius: 4px; cursor: pointer;">Đóng</button>
            </div>
        </div>
    `;

    document.getElementById('adminModals').innerHTML = modalHtml;
    document.getElementById('adminProfileModal').style.display = 'block';
}

function showAdminTab(tabName) {
    console.log('Showing tab:', tabName);

    // Ẩn tất cả các tab
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.style.display = 'none';
    });

    // Cập nhật active menu
    document.querySelectorAll('.admin-nav a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hiển thị tab được chọn
    const tabElement = document.getElementById(`${tabName}-tab`);
    if (tabElement) {
        tabElement.style.display = 'block';
    } else {
        console.error('Tab not found:', `${tabName}-tab`);
    }

    // Tải nội dung tab
    switch (tabName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'users':
            loadUsersManagement();
            break;
        case 'categories':
            loadCategoriesManagement();
            break;
        case 'products':
            loadProductsManagement();
            break;
        case 'orders':
            loadOrdersManagement();
            break;
        case 'inventory':
            loadInventoryManagement();
            break;
        case 'receiving':
            loadReceivingManagement();
            break;
        case 'pricing':
            loadPricingManagement();
            break;
    }
}

function loadDashboard() {
    console.log('Loading dashboard...');

    const totalUsers = adminUsers.filter(u => u.role === 'customer').length;
    const totalProducts = adminProducts.filter(p => p.status === 'active').length;
    const totalOrders = adminOrders.length;
    const revenue = adminOrders.reduce((sum, order) => sum + order.total, 0);

    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('revenue').textContent = `$${revenue.toFixed(2)}`;
}

function loadUsersManagement() {
    console.log('Loading users management...');

    const tbody = document.getElementById('usersTable');
    if (!tbody) {
        console.error('Users table not found!');
        return;
    }

    tbody.innerHTML = '';

    adminUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.role === 'admin' ? 'Quản trị' : 'Khách hàng'}</td>
            <td>${user.status === 'active' ? 'Hoạt động' : 'Bị khóa'}</td>
            <td>
                <button class="action-btn status-btn" onclick="resetUserPassword(${user.id})">Reset MK</button>
                <button class="action-btn edit-btn" onclick="toggleUserStatus(${user.id})">${user.status === 'active' ? 'Khóa' : 'Mở'}</button>
                ${user.role !== 'admin' ? `<button class="action-btn delete-btn" onclick="deleteUser(${user.id})">Xóa</button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadCategoriesManagement() {
    const tbody = document.getElementById('categoriesTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    adminCategories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${category.status === 'active' ? 'Hiển thị' : 'Ẩn'}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editCategory(${category.id})">Sửa</button>
                <button class="action-btn status-btn" onclick="toggleCategoryStatus(${category.id})">${category.status === 'active' ? 'Ẩn' : 'Hiện'}</button>
                <button class="action-btn delete-btn" onclick="deleteCategory(${category.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadProductsManagement() {
    const tbody = document.getElementById('productsTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    adminProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>${product.name}</td>
            <td>${product.code}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Sửa</button>
                <button class="action-btn status-btn" onclick="toggleProductStatus(${product.id})">${product.status === 'active' ? 'Ẩn' : 'Hiện'}</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadOrdersManagement() {
    const tbody = document.getElementById('ordersTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    adminOrders.forEach(order => {
        const user = adminUsers.find(u => u.id === order.userId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${user ? user.fullName : 'N/A'}</td>
            <td>${new Date(order.orderDate).toLocaleDateString()}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)" style="padding: 5px; border: 1px solid #ddd; border-radius: 4px;">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Đang xử lý</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Đã giao hàng</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Đã nhận hàng</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Đã hủy</option>
                </select>
            </td>
            <td>
                <button class="action-btn view-btn" onclick="viewOrderDetails(${order.id})">Xem chi tiết</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function loadInventoryManagement() {
    const tbody = document.getElementById('inventoryTable');
    if (!tbody) return;

    tbody.innerHTML = '';

    adminProducts.forEach(product => {
        const warning = product.stock < 10 ? 'Sắp hết hàng' : product.stock < 5 ? 'Sắp hết' : 'Đủ hàng';
        const warningClass = product.stock < 5 ? 'style="color: red; font-weight: bold;"' : product.stock < 10 ? 'style="color: orange; font-weight: bold;"' : '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.cost ? product.cost.toFixed(2) : '0.00'}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td ${warningClass}>${warning}</td>
        `;
        tbody.appendChild(row);
    });
}

function loadReceivingManagement() {
    const tbody = document.getElementById('receivingTable');
    if (!tbody) {
        console.error('Receiving table not found!');
        return;
    }

    tbody.innerHTML = '<tr><td colspan="5">Chức năng đang được phát triển...</td></tr>';
}

function loadPricingManagement() {
    const categoryTbody = document.getElementById('categoryPricingTable');
    const productTbody = document.getElementById('productPricingTable');

    if (categoryTbody) {
        categoryTbody.innerHTML = '<tr><td colspan="3">Chức năng đang được phát triển...</td></tr>';
    }
    if (productTbody) {
        productTbody.innerHTML = '<tr><td colspan="7">Chức năng đang được phát triển...</td></tr>';
    }
}

// ==================== USER MANAGEMENT FUNCTIONS ====================
function resetUserPassword(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (user && confirm(`Reset mật khẩu cho user ${user.username}?`)) {
        user.password = '123456';
        localStorage.setItem('users', JSON.stringify(adminUsers));
        alert('Mật khẩu đã được reset thành: 123456');
    }
}

function toggleUserStatus(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('users', JSON.stringify(adminUsers));
        loadUsersManagement();
        alert(`Đã ${user.status === 'active' ? 'mở khóa' : 'khóa'} tài khoản ${user.username}`);
    }
}

function deleteUser(userId) {
    const user = adminUsers.find(u => u.id === userId);
    if (user && user.role !== 'admin' && confirm(`Xóa user ${user.username}?`)) {
        adminUsers = adminUsers.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(adminUsers));
        loadUsersManagement();
        alert('Đã xóa user thành công!');
    }
}

// ==================== UTILITY FUNCTIONS ====================
function closeAdminModal() {
    document.querySelectorAll('#adminModals .modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        closeAdminModal();
    }
});

// Các hàm quản lý categories, products, orders giữ nguyên...
// (Các hàm từ phiên bản trước)
// ==================== CẬP NHẬT NAVIGATION ====================
function updateNavigation() {
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    const logoutLink = document.getElementById('logoutLink');
    const userWelcome = document.getElementById('userWelcome');
    const cartLink = document.getElementById('cartLink');
    const cartCountHeader = document.getElementById('cartCountHeader');
    const userDropdown = document.getElementById('userDropdown');

    if (currentUser) {
        // Đã đăng nhập - Ẩn login/register, hiển thị dropdown user
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'none';
        userWelcome.style.display = 'none';

        if (userDropdown) {
            userDropdown.style.display = 'block';
            userDropdown.innerHTML = `
                <button class="user-dropbtn">
                    👤 ${currentUser.fullName} ▼
                </button>
                <div class="user-dropdown-content">
                    <a href="#" onclick="showProfileModal()">Thông tin tài khoản</a>
                    <a href="#" onclick="showOrderHistory()">Lịch sử đơn hàng</a>
                    <a href="#" onclick="logout()">Đăng xuất</a>
                </div>
            `;
        }

        // Cập nhật số lượng giỏ hàng
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountHeader.textContent = totalItems;

    } else {
        // Chưa đăng nhập
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
        userWelcome.style.display = 'none';
        if (userDropdown) userDropdown.style.display = 'none';
        cartCountHeader.textContent = '0';
    }
}

// ==================== THIẾT LẬP DROPDOWN ====================
function setupUserDropdown() {
    // Đóng dropdown khi click bên ngoài
    window.addEventListener('click', function (event) {
        if (!event.target.matches('.user-dropbtn')) {
            const dropdowns = document.getElementsByClassName('user-dropdown-content');
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.style.display === 'block') {
                    openDropdown.style.display = 'none';
                }
            }
        }
    });

    // Mở dropdown khi click
    document.addEventListener('click', function (event) {
        if (event.target.matches('.user-dropbtn')) {
            event.preventDefault();
            const dropdown = event.target.nextElementSibling;
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
            }
        }
    });
}

// Gọi hàm setup trong DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    initializeData();
    loadProducts();
    loadCategories();
    checkLoginStatus();
    setupEventListeners();
    updateNavigation();
    setupSearchFunctionality();
    setupUserDropdown(); // Thêm dòng này
});
function showAddReceiptModal() {
    // Hiển thị form thêm phiếu nhập hàng
    // Cho phép chọn sản phẩm, nhập giá nhập, số lượng
}

function saveReceipt() {
    // Lưu phiếu nhập hàng
    // Cập nhật tồn kho và giá vốn sản phẩm
}
function updateCategoryMargin(categoryId) {
    // Cập nhật % lợi nhuận theo danh mục
    // Tự động tính lại giá bán cho tất cả sản phẩm trong danh mục
}

function updateProductPrice(productId) {
    // Cập nhật giá bán cho từng sản phẩm riêng
}
function filterOrders() {
    const startDate = document.getElementById('filterStartDate').value;
    const endDate = document.getElementById('filterEndDate').value;
    const status = document.getElementById('filterStatus').value;

    // Lọc đơn hàng theo khoảng thời gian và trạng thái
    let filteredOrders = adminOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const matchDate = (!startDate || orderDate >= new Date(startDate)) &&
            (!endDate || orderDate <= new Date(endDate));
        const matchStatus = status === 'all' || order.status === status;
        return matchDate && matchStatus;
    });

    // Hiển thị kết quả
    displayFilteredOrders(filteredOrders);
    function updateCategoryMargin(categoryId) {
        // Cập nhật % lợi nhuận theo danh mục
        // Tự động tính lại giá bán cho tất cả sản phẩm trong danh mục
    }

    function updateProductPrice(productId) {
        // Cập nhật giá bán cho từng sản phẩm riêng
    }
}
