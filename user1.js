// ===== GLOBAL VARIABLES =====
let products = [];
let users = [];
let currentUser = null;
let cart = [];
let orders = [];
let receipt = [];
let currentPage = 1;
const productsPerPage = 6;

// ===== DATA SYNC FUNCTIONS =====
function syncDataFromAdmin() {
  try {
    // Sync products
    const adminProducts = JSON.parse(localStorage.getItem("products")) || [];
    if (adminProducts.length > 0) {
      products = adminProducts.map((adminProd) => ({
        id: adminProd.id,
        name: adminProd.name,
        price: adminProd.price * 23000, // Convert USD to VND
        category: getCategoryName(adminProd.category),
        desc: adminProd.description || "Sản phẩm chất lượng cao",
        features: ["Chất liệu cao cấp", "Thiết kế thời trang", "Bền đẹp"],
        sizes: ["38", "39", "40", "41", "42"],
        colors: ["Đen", "Trắng", "Xám"],
        img:
          adminProd.image ||
          "https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image",
        stock: adminProd.stock || 0,
        status: adminProd.status || "active",
      }));
    }

    // Sync users
    const adminUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (adminUsers.length > 0) {
      users = adminUsers.map((adminUser) => ({
        id: adminUser.id,
        username: adminUser.username,
        password: adminUser.password,
        fullname: adminUser.fullname || "",
        phone: adminUser.phone || "",
        email: adminUser.email || "",
        address: "",
        birthday: "2000-01-01",
      }));
    }

    // Sync orders
    const adminOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (adminOrders.length > 0) {
      orders = adminOrders.map((adminOrder) => ({
        id: adminOrder.id,
        user: adminOrder.customer,
        details: adminOrder.products.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price * 23000,
          qty: p.quantity,
          size: p.size || "40",
          color: p.color || "Đen",
          img:
            products.find((prod) => prod.id === p.id)?.img ||
            "https://placehold.co/100x100/667eea/ffffff?text=Product",
        })),
        total: adminOrder.total * 23000,
        date: new Date(adminOrder.date),
        status: adminOrder.status,
      }));
    }

    console.log("Synced data:", {
      products: products.length,
      users: users.length,
      orders: orders.length,
    });
  } catch (error) {
    console.error("Error syncing data from admin:", error);
  }
}

function getCategoryName(categoryId) {
  const categories = {
    1: "Nike",
    2: "Adidas",
    3: "Converse",
    4: "Puma",
    5: "Vans",
    6: "New Balance",
  };
  return categories[categoryId] || "Thể thao";
}

function saveOrderToAdmin(order) {
  try {
    const adminOrders = JSON.parse(localStorage.getItem("orders")) || [];

    const adminOrder = {
      id: "USER-" + order.id,
      customer: order.user,
      customerId: currentUser?.id || 0,
      products: order.details.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.qty,
        price: item.price / 23000, // Convert VND to USD
        size: item.size,
        color: item.color,
      })),
      total: order.total / 23000, // Convert VND to USD
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    adminOrders.push(adminOrder);
    localStorage.setItem("orders", JSON.stringify(adminOrders));

    // Update product stock in admin
    updateStockInAdmin(order.details);

    console.log("Order saved to admin:", adminOrder);
  } catch (error) {
    console.error("Error saving order to admin:", error);
  }
}

function updateStockInAdmin(orderDetails) {
  try {
    const adminProducts = JSON.parse(localStorage.getItem("products")) || [];

    orderDetails.forEach((item) => {
      const product = adminProducts.find((p) => p.id === item.id);
      if (product && product.stock !== undefined) {
        product.stock = Math.max(0, product.stock - item.qty);
      }
    });

    localStorage.setItem("products", JSON.stringify(adminProducts));
  } catch (error) {
    console.error("Error updating stock in admin:", error);
  }
}

function saveUserToAdmin(user) {
  try {
    const adminUsers = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id:
        adminUsers.length > 0
          ? Math.max(...adminUsers.map((u) => u.id)) + 1
          : 1,
      username: user.username,
      password: user.password,
      fullname: user.fullname || "",
      email: user.email || "",
      phone: user.phone || "",
    };

    const existingIndex = adminUsers.findIndex(
      (u) => u.username === user.username
    );
    if (existingIndex >= 0) {
      adminUsers[existingIndex] = newUser;
    } else {
      adminUsers.push(newUser);
    }

    localStorage.setItem("users", JSON.stringify(adminUsers));
    console.log("User saved to admin:", newUser);
  } catch (error) {
    console.error("Error saving user to admin:", error);
  }
}

// ===== AUTHENTICATION FUNCTIONS =====
function register() {
  const username = document.getElementById("modal-reg-username").value.trim();
  const password = document.getElementById("modal-reg-password").value.trim();
  const birthday = document.getElementById("modal-reg-birthday").value;

  if (!username || !password || !birthday) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  if (users.find((u) => u.username === username)) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }

  const newUser = {
    username,
    password,
    birthday,
    fullname: "",
    phone: "",
    email: "",
    address: "",
  };

  users.push(newUser);
  saveUserToAdmin(newUser);

  alert("Đăng ký thành công! Vui lòng đăng nhập.");
  showAuthTab("login");
  clearAuthForms();
}

function login() {
  const username = document.getElementById("modal-login-username").value.trim();
  const password = document.getElementById("modal-login-password").value.trim();

  if (!username || !password) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    alert("Tên đăng nhập hoặc mật khẩu không đúng");
    return;
  }

  currentUser = user;
  alert("Đăng nhập thành công!");
  updateUserDisplay();
  closeAuthModal();
  clearAuthForms();

  // Load user-specific data
  loadUserProfile();
  loadOrders();
}

function logout() {
  if (!confirm("Bạn có chắc chắn muốn đăng xuất?")) return;

  currentUser = null;
  cart = [];
  alert("Đã đăng xuất");
  updateUserDisplay();
  showSection("home");
}

// ===== PRODUCT FUNCTIONS =====
function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = products.filter((p) => p.status === "active").slice(0, 3);

  if (featured.length === 0) {
    container.innerHTML =
      '<div class="no-products"><p>Không có sản phẩm nổi bật</p></div>';
    return;
  }

  container.innerHTML = featured
    .map(
      (product) => `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <img src="${product.img}" alt="${product.name}" 
           onerror="this.src='https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image'">
      <h3><i>${product.name}</i></h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-stock">Còn ${product.stock} sản phẩm</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
      </button>
    </div>
  `
    )
    .join("");
}

function loadAllProducts(page = 1) {
  const container = document.getElementById("all-products");
  if (!container) return;

  currentPage = page;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products
    .filter((p) => p.status === "active")
    .slice(startIndex, endIndex);

  if (productsToShow.length === 0) {
    container.innerHTML =
      '<div class="no-products"><p>Không có sản phẩm nào</p></div>';
    return;
  }
  container.innerHTML = productsToShow
    .map(
      (product) => `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <img src="${product.img}" alt="${product.name}" 
           onerror="this.src='https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image'">
      <h3>${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-stock">Còn ${product.stock} sản phẩm</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
      </button>
    </div>
  `
    )
    .join("");

  renderPagination();
}

function renderPagination() {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(
    products.filter((p) => p.status === "active").length / productsPerPage
  );
  let paginationHTML = "";

  if (currentPage > 1) {
    paginationHTML += `<button onclick="loadAllProducts(${
      currentPage - 1
    })"><i class="fas fa-chevron-left"></i></button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="loadAllProducts(${i})" class="${
      i === currentPage ? "active" : ""
    }">${i}</button>`;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="loadAllProducts(${
      currentPage + 1
    })"><i class="fas fa-chevron-right"></i></button>`;
  }
  container.innerHTML = paginationHTML;
}

// ===== CART FUNCTIONS ===== advancedSearch

function addToCart(productId, quantity = 1) {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    showAuthModal();
    return;
  }

  const product = products.find(
    (p) => p.id === productId && p.status === "active"
  );
  if (!product) return;

  if (product.stock <= 0) {
    alert("Sản phẩm đã hết hàng");
    return;
  }

  let item = cart.find((item) => item.id === productId);
  if (item) {
    if (item.qty + quantity > product.stock) {
      alert(`Chỉ còn ${product.stock} sản phẩm trong kho`);
      return;
    }
    item.qty += quantity;
  } else {
    if (quantity > product.stock) {
      alert(`Chỉ còn ${product.stock} sản phẩm trong kho`);
      return;
    }
    cart.push({
      id: productId,
      qty: quantity,
      size: "40",
      color: "Đen",
    });
  }
  alert("Đã thêm vào giỏ hàng!");
  updateCartCount();
  if (document.getElementById("cart").classList.contains("active")) {
    loadCart();
  }
}

function loadCart() {
  const container = document.getElementById("cart-items");
  const totalAmount = document.getElementById("total-amount");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3>Giỏ hàng của bạn đang trống</h3>
        <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
        <button class="checkout-btn" onclick="showSection('products')">
          <i class="fas fa-shopping-bag"></i> Mua sắm ngay
        </button>
      </div>
    `;
    if (totalAmount) totalAmount.textContent = "0";
    return;
  }
  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return "";
      const itemTotal = product.price * item.qty;
      total += itemTotal;
      return `
      <div class="cart-item">
        <img src="${product.img}" alt="${product.name}" 
             onerror="this.src='https://placehold.co/100x100/667eea/ffffff?text=Product'">
        <div class="cart-item-info">
          <h4>${product.name}</h4>
          <p>Size: ${item.size} | Màu: ${item.color}</p>
          <p class="cart-item-price">${formatPrice(product.price)}</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-btn" onclick="updateQuantity(${
            product.id
          }, -1)">-</button>
          <span>${item.qty}</span>
          <button class="quantity-btn" onclick="updateQuantity(${
            product.id
          }, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${product.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    })
    .join("");

  if (totalAmount) totalAmount.textContent = formatPrice(total);
  updateCartCount();
}

function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    const product = products.find((p) => p.id === productId);
    item.qty += change;

    if (item.qty <= 0) {
      removeFromCart(productId);
    } else if (item.qty > product.stock) {
      item.qty = product.stock;
      alert(`Chỉ còn ${product.stock} sản phẩm trong kho`);
    } else {
      loadCart();
    }
  }
}
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  loadCart();
}
// ===== ORDER FUNCTIONS =====
function confirmOrder() {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để đặt hàng");
    showAuthModal();
    return;
  }
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  const orderDetails = cart.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      id: item.id,
      name: product.name,
      price: product.price,
      qty: item.qty,
      size: item.size,
      color: item.color,
      img: product.img,
    };
  });
  const order = {
    id: Date.now(),
    user: currentUser.username,
    details: orderDetails,
    total: orderDetails.reduce((sum, item) => sum + item.price * item.qty, 0),
    date: new Date(),
    status: "pending",
  };

  orders.push(order);
  saveOrderToAdmin(order);

  // Update local stock
  orderDetails.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      product.stock -= item.qty;
    }
  });
  cart = [];
  updateCartCount();
  showSection("order-confirmation");
  const orderSummary = document.getElementById("order-summary");
  if (orderSummary) {
    orderSummary.innerHTML = `
      <div class="order-summary-details">
        <p><strong>Mã đơn hàng:</strong> #${order.id}</p>
        <p><strong>Ngày đặt:</strong> ${order.date.toLocaleDateString(
          "vi-VN"
        )}</p>
        <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
        <p><strong>Trạng thái:</strong> <span class="order-status status-pending">Đang xử lý</span></p>
      </div>
    `;
  }
}

function loadOrders() {
  const container = document.getElementById("order-history");
  if (!container) return;

  if (!currentUser) {
    container.innerHTML = `
      <div class="no-orders">
        <p>Vui lòng đăng nhập để xem đơn hàng</p>
      </div>
    `;
    return;
  }
  const userOrders = orders.filter(
    (order) => order.user === currentUser.username
  );
  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="no-orders">
        <p>Bạn chưa có đơn hàng nào</p>
      </div>
    `;
    return;
  }
  container.innerHTML = userOrders
    .map(
      (order) => `
    <div class="order-item">
      <div class="order-header">
        <h4>Đơn hàng #${order.id}</h4>
        <span class="order-date">${order.date.toLocaleDateString(
          "vi-VN"
        )}</span>
      </div>
      <div class="order-info">
        <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
        <p><strong>Trạng thái:</strong> <span class="order-status status-${
          order.status
        }">${getOrderStatusText(order.status)}</span></p>
        <p><strong>Số sản phẩm:</strong> ${order.details.length}</p>
                        <div class="order-products">
                    <strong>Sản phẩm đã đặt:</strong>
                    ${order.details
                      .map(
                        (item) =>
                          `<div class="order-product-item">
                         • ${item.name} (Size: ${item.size}, Màu: ${item.color}) x ${item.qty} 
                       </div>`
                      )
                      .join("")}
                </div>
        </div>
    </div>
  `
    )
    .join("");
}

function getOrderStatusText(status) {
  const statusMap = {
    pending: "Đang xử lý",
    processing: "Đang giao",
    completed: "Đã giao",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

function showSection(sectionName) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  const section = document.getElementById(sectionName);
  if (section) {
    section.classList.add("active");
  }

  // Update active nav
  document.querySelectorAll(".header-menu-list a").forEach((link) => {
    link.classList.remove("active");
  });

  if (sectionName === "home") {
    document.getElementById("home-link").classList.add("active");
    loadFeaturedProducts();
  } else if (sectionName === "products") {
    document.getElementById("products-link").classList.add("active");
    loadAllProducts(1);
  } else if (sectionName === "cart") {
    loadCart();
  } else if (sectionName === "orders") {
    loadOrders();
  } else if (sectionName === "profile") {
    loadUserProfile();
  } else if (sectionName === "checkout") {
    loadCheckout();
  }
}

function loadUserProfile() {
  if (!currentUser) return;

  if (document.getElementById("fullname")) {
    document.getElementById("fullname").value = currentUser.fullname || "";
    document.getElementById("phone").value = currentUser.phone || "";
    document.getElementById("email").value = currentUser.email || "";
    document.getElementById("birthday").value = currentUser.birthday || "";
    document.getElementById("address").value = currentUser.address || "";
  }
}

function saveProfile() {
  if (!currentUser) {
    alert("Vui lòng đăng nhập");
    return;
  }

  currentUser.fullname = document.getElementById("fullname").value;
  currentUser.phone = document.getElementById("phone").value;
  currentUser.email = document.getElementById("email").value;
  currentUser.address = document.getElementById("address").value;

  saveUserToAdmin(currentUser);
  alert("Đã lưu thông tin");
}

// ===== MODAL FUNCTIONS =====
function showAuthModal() {
  document.getElementById("auth-modal").style.display = "block";
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
}

function showAuthTab(tabName) {
  document.querySelectorAll(".auth-tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(tabName + "-tab").classList.add("active");
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    if (
      tab.textContent.includes(tabName === "login" ? "Đăng nhập" : "Đăng ký")
    ) {
      tab.classList.add("active");
    }
  });
}

window.onclick = function (event) {
  const modal = document.getElementById("auth-modal");
  if (event.target == modal) {
    closeAuthModal();
  }
};

// ===== SEARCH FUNCTIONS =====
function searchProducts(page = 1) {
  const input = document.getElementById("search-input");
  if (!input) return;

  const keyword = input.value.toLowerCase().trim();
  if (!keyword) {
    loadAllProducts(1);
    return;
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(keyword) &&
      product.status === "active"
  );
  const container = document.getElementById("all-products");
  if (!container) return;
  if (filteredProducts.length === 0) {
    container.innerHTML =
      '<div class="no-products"><p>Không tìm thấy sản phẩm nào</p></div>';
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  container.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <img src="${product.img}" alt="${product.name}" 
           onerror="this.src='https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image'">
      <h3>${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-stock">Còn ${product.stock} sản phẩm</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
      </button>
    </div>
  `
    )
    .join("");
  document.getElementById("pagination").innerHTML = "";
}

function focusSearch() {
  showSection("products");
  setTimeout(() => {
    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.focus();
  }, 100);
}

function advancedSearch(page = 1) {
  const category = document.getElementById("category-filter").value;
  const priceRange = document.getElementById("price-range").value;

  let filteredProducts = products.filter((p) => p.status === "active");

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= min && p.price <= max
    );
  }

  const productsPerPage = 6; // số sp mỗi trang
  const totalItems = filteredProducts.length;

  // xử lý phân trang
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayList = filteredProducts.slice(startIndex, endIndex);

  const container = document.getElementById("all-products");
  if (!container) return;

  if (filteredProducts.length === 0) {
    container.innerHTML =
      '<div class="no-products"><p>Không tìm thấy sản phẩm nào</p></div>';
    document.getElementById("pagination").innerHTML = "";
    return;
  }
  container.innerHTML = filteredProducts
    .map(
      (product) => `
    <div class="product-card" onclick="showProductDetail(${product.id})">
      <img src="${product.img}" alt="${product.name}" 
           onerror="this.src='https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image'">
      <h3>${product.name}</h3>
      <p class="product-category">${product.category}</p>
      <p class="product-price">${formatPrice(product.price)}</p>
      <p class="product-stock">Còn ${product.stock} sản phẩm</p>
      <button onclick="event.stopPropagation(); addToCart(${product.id})">
        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
      </button>
    </div>
  `
    )
    .join("");
  /*document.getElementById("pagination").innerHTML = "";*/
  renderAdvancedSearchPagination(totalItems, page, productsPerPage);
}

function renderAdvancedSearchPagination(
  totalItems,
  currentPage,
  productsPerPage = 6
) {
  const pagination = document.getElementById("pagination");
  if (!pagination) return;

  const totalPages = Math.ceil(totalItems / productsPerPage);
  let paginationHTML = "";

  /*if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let html = "";*/

  // nút trước
  if (currentPage > 1) {
    paginationHTML += `<button onclick="advancedSearch(${
      currentPage - 1
    })">‹</button>`;
  }

  // các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `<button onclick="advancedSearch(${i})" class="${
      i === currentPage ? "active" : ""
    }">${i}</button>`;
  }

  // nút sau
  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="advancedSearch(${
      currentPage + 1
    })">›</button>`;
  }

  pagination.innerHTML = paginationHTML;
}

// ===== PRODUCT DETAIL FUNCTIONS =====
function showProductDetail(productId) {
  const product = products.find(
    (p) => p.id === productId && p.status === "active"
  );
  if (!product) return;

  const container = document.getElementById("product-detail-content");
  if (!container) return;

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-image">
        <img src="${product.img}" alt="${product.name}" 
             onerror="this.src='https://placehold.co/500x400/667eea/ffffff?text=Product+Image'">
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="product-price">${formatPrice(product.price)}</p>
        <p class="product-category">Danh mục: ${product.category}</p>
        <div class="product-description">
          <h3>Mô tả sản phẩm</h3>
          <p>${product.desc}</p>
        </div>
        <div class="product-features">
          <h3>Đặc điểm nổi bật</h3>
          <ul>
            ${product.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
        </div>
        <div class="product-options">
          <div class="size-selector">
            <h4>Kích thước:</h4>
            <select id="selected-size">
              ${product.sizes
                .map((size) => `<option value="${size}">${size}</option>`)
                .join("")}
            </select>
          </div>
          <div class="color-selector">
            <h4>Màu sắc:</h4>
            <select id="selected-color">
              ${product.colors
                .map((color) => `<option value="${color}">${color}</option>`)
                .join("")}
            </select>
          </div>
        </div>
        <div class="quantity-selector">
          <h4>Số lượng:</h4>
          <button class="quantity-btn" onclick="changeQuantity(-1)">-</button>
          <span class="quantity-display" id="quantity">1</span>
          <button class="quantity-btn" onclick="changeQuantity(1)">+</button>
        </div>
        <button class="add-to-cart-btn" onclick="addToCartFromDetail(${
          product.id
        })">
          <i class="fas fa-shopping-cart"></i> Thêm vào giỏ hàng
        </button>
      </div>
    </div>

  `;
  showSection("product-detail");
}

function changeQuantity(change) {
  const quantityDisplay = document.getElementById("quantity");
  let quantity = parseInt(quantityDisplay.textContent);
  quantity = Math.max(1, quantity + change);
  quantityDisplay.textContent = quantity;
}

function addToCartFromDetail(productId) {
  const quantity = parseInt(document.getElementById("quantity").textContent);
  addToCart(productId, quantity);
}

// ===== CHECKOUT FUNCTIONS =====
function loadCheckout() {
  const container = document.getElementById("checkout-items");
  const totalElement = document.getElementById("checkout-total");
  const savedAddress = document.getElementById("saved-address");

  if (!container || !totalElement) return;

  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return "";

      const itemTotal = product.price * item.qty;
      total += itemTotal;

      return `
      <div class="checkout-item">
        <span>${product.name} (${item.qty}x)</span>
        <span>${formatPrice(itemTotal)}</span>
      </div>
    `;
    })
    .join("");

  totalElement.textContent = formatPrice(total);

  // Load saved address
  if (currentUser && currentUser.address) {
    savedAddress.textContent = currentUser.address;
  } else {
    savedAddress.textContent = "Chưa có địa chỉ nào được lưu";
  }
}

function toggleAddressInput() {
  const savedAddress = document.getElementById("saved-address");
  const newAddress = document.getElementById("new-address");
  const addressOption = document.querySelector(
    'input[name="address-option"]:checked'
  ).value;

  if (addressOption === "saved") {
    savedAddress.style.display = "block";
    newAddress.style.display = "none";
  } else {
    savedAddress.style.display = "none";
    newAddress.style.display = "block";
  }
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  syncDataFromAdmin();

  if (users.length === 0) {
    users.push({
      username: "demo",
      password: "123456",
      birthday: "2000-01-01",
      fullname: "Nguyễn Văn Demo",
      phone: "0912345678",
      email: "demo@gmail.com",
      address: "123 Đường Demo, TP.HCM",
    });
    saveUserToAdmin(users[0]);
  }

  showSection("home");
  loadFeaturedProducts();
  updateUserDisplay();

  console.log(
    "Initialized with:",
    products.length,
    "products,",
    users.length,
    "users"
  );
});

function updateUserDisplay() {
  const authLinks = document.getElementById("auth-links");
  const logoutLink = document.getElementById("logout-link");
  const currentUsername = document.getElementById("current-username");

  if (currentUser) {
    if (authLinks) authLinks.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
    if (currentUsername) currentUsername.textContent = currentUser.username;
  } else {
    if (authLinks) authLinks.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
    if (currentUsername) currentUsername.textContent = "Chưa đăng nhập";
  }
  updateCartCount();
}

function clearAuthForms() {
  const loginUsername = document.getElementById("modal-login-username");
  const loginPassword = document.getElementById("modal-login-password");
  const regUsername = document.getElementById("modal-reg-username");
  const regPassword = document.getElementById("modal-reg-password");
  const regBirthday = document.getElementById("modal-reg-birthday");

  if (loginUsername) loginUsername.value = "";
  if (loginPassword) loginPassword.value = "";
  if (regUsername) regUsername.value = "";
  if (regPassword) regPassword.value = "";
  if (regBirthday) regBirthday.value = "";
}
