const STORAGE_KEYS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  USERS: "users",
  RECEIPTS: "receipts",
  ADMIN_LOGGED: "adminLoggedIn",
  ADMIN_USERNAME: "adminUsername",
};

let state = {
  products: [],
  categories: [],
  orders: [],
  receipts: [],
  users: [],
};

let stockThreshold = 10;

// ===== DOM helpers =====
const byId = (id) => document.getElementById(id);
const show = (el) => el && el.classList.remove("hidden");
const hide = (el) => el && el.classList.add("hidden");

// ===== Storage helpers =====
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorageKey(key) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : null;
  } catch (e) {
    return null;
  }
}

function loadAllFromStorage() {
  state.products = loadFromStorageKey(STORAGE_KEYS.PRODUCTS) || [];
  state.categories = loadFromStorageKey(STORAGE_KEYS.CATEGORIES) || [];
  state.orders = loadFromStorageKey(STORAGE_KEYS.ORDERS) || [];
  state.users = loadFromStorageKey(STORAGE_KEYS.USERS) || [];
  state.receipts = loadFromStorageKey(STORAGE_KEYS.RECEIPTS) || [];
}

// ===== Sample data =====
function ensureSampleData() {
  if (!state.categories.length) {
    state.categories = [
      {
        id: 1,
        name: "Nike",
        description: "Giày thể thao Nike",
        status: "active",
      },
      {
        id: 2,
        name: "Adidas",
        description: "Giày thể thao Adidas",
        status: "active",
      },
      {
        id: 3,
        name: "Converse",
        description: "Giày casual Converse",
        status: "active",
      },
      {
        id: 4,
        name: "Puma",
        description: "Giày thể thao Puma",
        status: "active",
      },
      {
        id: 5,
        name: "Vans",
        description: "Giày casual Vans",
        status: "active",
      },
      {
        id: 6,
        name: "New Balance",
        description: "Giày chạy bộ",
        status: "active",
      },
    ];
    saveToStorage(STORAGE_KEYS.CATEGORIES, state.categories);
  }

  if (!state.users.length) {
    state.users = [
      {
        id: 1,
        username: "customer1",
        password: "password123",
        fullname: "Nguyễn Văn A",
        email: "customer1@gmail.com",
        phone: "0123456789",
      },
      {
        id: 2,
        username: "demo",
        password: "123456",
        fullname: "Nguyễn Văn Demo",
        email: "demo@gmail.com",
        phone: "0912345678",
      },
    ];
    saveToStorage(STORAGE_KEYS.USERS, state.users);
  }

  if (!state.orders.length) {
    state.orders = [];
    saveToStorage(STORAGE_KEYS.ORDERS, state.orders);
  }
}

// ===== Auth functions =====
function setupLogin() {
  const loginForm = byId("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = (byId("username")?.value || "").trim();
    const p = byId("password")?.value || "";

    const admins = [
      { username: "admin", password: "admin123" },
      { username: "manager", password: "manager123" },
    ];

    const acc = admins.find((a) => a.username === u && a.password === p);
    const err = byId("errorMessage");

    if (acc) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED, "true");
      localStorage.setItem(STORAGE_KEYS.ADMIN_USERNAME, acc.username);
      updateAuthUI();
      initAfterLogin();
      alert("Đăng nhập thành công!");
    } else {
      if (err) err.textContent = "Tên đăng nhập hoặc mật khẩu không đúng!";
    }
  });
}

function updateAuthUI() {
  const logged = localStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED) === "true";
  const loginSection = byId("loginSection");
  const dashboardSection = byId("dashboardSection");

  if (logged) {
    hide(loginSection);
    show(dashboardSection);

    const name = localStorage.getItem(STORAGE_KEYS.ADMIN_USERNAME) || "Admin";
    if (byId("adminName")) byId("adminName").textContent = name;

    document
      .querySelectorAll(".content")
      .forEach((c) => c.classList.add("hidden"));
    if (byId("products-page")) byId("products-page").classList.remove("hidden");

    document
      .querySelectorAll(".nav-item")
      .forEach((n) => n.classList.remove("active"));
    const nav = document.querySelector('[data-page="products"]');
    if (nav) nav.classList.add("active");

    initAfterLogin();
  } else {
    show(loginSection);
    hide(dashboardSection);
  }
}

window.logout = function () {
  if (!confirm("Bạn có chắc chắn muốn đăng xuất?")) return;
  localStorage.removeItem(STORAGE_KEYS.ADMIN_LOGGED);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_USERNAME);
  updateAuthUI();
  alert("Đã đăng xuất");
};

// ===== Product functions =====
function renderProductsTable() {
  const tbody = byId("productTableBody");
  if (!tbody) return;

  let list = state.products || [];

  const categoryFilter = (byId("categoryFilter")?.value || "").trim();
  const statusFilter = (byId("statusFilter")?.value || "").trim();

  if (categoryFilter) {
    list = list.filter((p) => String(p.category) === categoryFilter);
  }
  if (statusFilter) {
    list = list.filter((p) => p.status === statusFilter);
  }

  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="9" class="text-center">Không có sản phẩm nào</td></tr>';
    return;
  }

  tbody.innerHTML = list
    .map((p) => {
      const cat = state.categories.find((c) => c.id == p.category);
      const stockClass =
        p.stock < 10 ? "critical-stock" : p.stock < 20 ? "low-stock" : "";

      const productImage =
        p.image || "https://placehold.co/400x400/667eea/ffffff?text=Sneaker";

      return `<tr>
        <td>${p.code || "N/A"}</td>
        <td><div class="product-cell"><img src="${productImage}" alt="${
        p.name
      }"><span>${p.name}</span></div></td>
        <td>${cat ? cat.name : "N/A"}</td>
        <td>$${Number(p.importPrice || p.price).toFixed(2)}</td>
        <td>$${Number(p.salePrice || p.price).toFixed(2)}</td>
        <td>${p.profitPercent || 10}%</td>
        <td class="${stockClass}">${p.stock}</td>
        <td><span class="status-badge ${p.status}">${
        p.status === "active" ? "Đang bán" : "Đã ẩn"
      }</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openEditProduct(${
            p.id
          })"><i class="fas fa-edit"></i></button>
          <button class="action-btn status-btn" onclick="toggleProductStatus(${
            p.id
          })">
            <i class="fas fa-eye${p.status === "active" ? "-slash" : ""}"></i>
          </button>
          <button class="action-btn delete-btn" onclick="deleteProduct(${
            p.id
          })"><i class="fas fa-trash"></i></button>
        </td>
      </tr>`;
    })
    .join("");
}

function openAddProduct() {
  const codeInput = byId("newProductCode");
  if (codeInput) codeInput.value = generateProductCode();

  // Auto-calculate sale price when profit changes
  byId("newProductProfit")?.addEventListener("input", calculateSalePrice);
  byId("newProductImportPrice")?.addEventListener("input", calculateSalePrice);

  populateCategorySelect("newProductCategory", false);
  openModal("addProductModal");
}

function calculateSalePrice() {
  const importPrice = parseFloat(byId("newProductImportPrice").value) || 0;
  const profitPercent = parseFloat(byId("newProductProfit").value) || 10;
  const salePrice = importPrice * (1 + profitPercent / 100);
  byId("newProductSalePrice").value = salePrice.toFixed(2);
}

function generateProductCode() {
  const max = state.products.length
    ? Math.max(...state.products.map((p) => Number(p.id || 0)))
    : 0;
  const next = max + 1;
  return "SP" + String(next).padStart(3, "0");
}

function saveNewProduct(e) {
  if (e) e.preventDefault();

  const code = byId("newProductCode").value.trim();
  const name = byId("newProductName").value.trim();
  const category = Number(byId("newProductCategory").value);
  const importPrice = parseFloat(byId("newProductImportPrice").value);
  const profitPercent = parseFloat(byId("newProductProfit").value) || 10;
  const stock = parseInt(byId("newProductStock").value);
  const description = byId("newProductDescription").value.trim();

  // Calculate sale price
  const salePrice = importPrice * (1 + profitPercent / 100);

  if (!name || !category || isNaN(importPrice) || isNaN(stock)) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  const newId =
    state.products.length > 0
      ? Math.max(...state.products.map((p) => p.id)) + 1
      : 1;

  let imageUrl = "https://placehold.co/400x400/667eea/ffffff?text=Sneaker";

  const fileInput = byId("newProductImage");
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imageUrl = e.target.result;
      const newProduct = {
        id: newId,
        code,
        name,
        category,
        importPrice,
        profitPercent,
        salePrice,
        price: salePrice,
        stock,
        description,
        image: imageUrl,
        status: "active",
      };

      state.products.push(newProduct);
      saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
      alert("Đã thêm sản phẩm thành công");
      closeModal("addProductModal");
      renderProductsTable();
      renderAnalytics();
      renderDashboard();
    };
    reader.readAsDataURL(file);
    return;
  } else {
    const newProduct = {
      id: newId,
      code,
      name,
      category,
      importPrice,
      profitPercent,
      salePrice,
      price: salePrice,
      stock,
      description,
      image: imageUrl,
      status: "active",
    };

    state.products.push(newProduct);
    saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
    alert("Đã thêm sản phẩm thành công");
    closeModal("addProductModal");
    renderProductsTable();
    renderAnalytics();
    renderDashboard();
  }
}

window.openEditProduct = function (pid) {
  const p = state.products.find((x) => x.id == pid);
  if (!p) {
    alert("Sản phẩm không tồn tại");
    return;
  }

  byId("editProductId").value = p.id;
  byId("productCode").value = p.code;
  byId("productName").value = p.name;
  byId("productCategory").value = p.category;
  byId("productImportPrice").value = p.importPrice || p.price;
  byId("productProfit").value = p.profitPercent || 10;
  byId("productSalePrice").value = p.salePrice || p.price;
  byId("productStock").value = p.stock;
  byId("productDescription").value = p.description || "";

  // Auto-calculate sale price when editing
  byId("productProfit")?.addEventListener("input", calculateEditSalePrice);
  byId("productImportPrice")?.addEventListener("input", calculateEditSalePrice);

  populateCategorySelect("productCategory", false);
  openModal("productEditModal");
};

function calculateEditSalePrice() {
  const importPrice = parseFloat(byId("productImportPrice").value) || 0;
  const profitPercent = parseFloat(byId("productProfit").value) || 10;
  const salePrice = importPrice * (1 + profitPercent / 100);
  byId("productSalePrice").value = salePrice.toFixed(2);
}

function submitEditProductForm(e) {
  e && e.preventDefault();
  const id = Number(byId("editProductId")?.value || 0);
  const idx = state.products.findIndex((x) => x.id == id);

  if (idx === -1) {
    alert("Sản phẩm không tồn tại");
    closeModal("productEditModal");
    return;
  }

  const code = byId("productCode").value.trim();
  const name = byId("productName").value.trim();
  const category = Number(byId("productCategory").value);
  const importPrice = parseFloat(byId("productImportPrice").value);
  const profitPercent = parseFloat(byId("productProfit").value) || 10;
  const stock = parseInt(byId("productStock").value);
  const description = byId("productDescription").value.trim();

  // Calculate sale price
  const salePrice = importPrice * (1 + profitPercent / 100);

  state.products[idx] = {
    ...state.products[idx],
    code,
    name,
    category,
    importPrice,
    profitPercent,
    salePrice,
    price: salePrice,
    stock,
    description,
  };

  saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
  alert("Cập nhật sản phẩm thành công");
  closeModal("productEditModal");
  renderProductsTable();
}

window.toggleProductStatus = function (pid) {
  const p = state.products.find((x) => x.id == pid);
  if (!p) return alert("Sản phẩm không tồn tại");
  p.status = p.status === "active" ? "hidden" : "active";
  saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
  renderProductsTable();
  alert(`Đã ${p.status === "active" ? "hiện" : "ẩn"} sản phẩm`);
};

// ===== Receipt functions =====
function renderReceipt() {
  const tbody = byId("receiptTableBody");
  if (!tbody) return;

  let list = state.receipts || [];
  const time = (byId("receiptTimeFilter")?.value || "").trim();
  if (time) {
    list = list.filter((r) => filterReceiptByTime(r.date, time));
  }

  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="8" class="text-center">Không có phiếu nhập nào</td></tr>';
    return;
  }

  tbody.innerHTML = list
    .map((r) => {
      return `<tr>
        <td>${r.code}</td>
        <td>${r.date}</td>
        <td>${r.productName}</td>
        <td>${r.quantity}</td>  
        <td>${r.brand}</td>
        <td>$${Number(r.price).toFixed(2)}</td>
        <td>$${Number(r.total).toFixed(2)}</td>
        <td>
          <button class="action-btn delete-btn" onclick="deleteReceipt(${
            r.id
          })">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>`;
    })
    .join("");
}

function filterReceiptByTime(receiptDate, timeFilter) {
  const today = new Date();
  const orderDateObj = new Date(receiptDate);
  today.setHours(0, 0, 0, 0);
  orderDateObj.setHours(0, 0, 0, 0);

  switch (timeFilter) {
    case "today":
      return orderDateObj.getTime() === today.getTime();
    case "7days":
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return orderDateObj >= sevenDaysAgo;
    case "month":
      return (
        orderDateObj.getMonth() === today.getMonth() &&
        orderDateObj.getFullYear() === today.getFullYear()
      );
    default:
      return true;
  }
}

function openAddReceiptModal() {
  const form = byId("addReceiptForm");
  if (form) form.reset();

  const codeInput = byId("newReceiptCode");
  if (codeInput) codeInput.value = generateReceiptCode();

  const dateInput = byId("newReceiptDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.value = today;
  }

  populateReceiptCategorySelect();
  openModal("addReceiptModal");
}

function generateReceiptCode() {
  let maxNumber = 0;
  state.receipts.forEach((receipt) => {
    if (receipt.code && receipt.code.startsWith("PN")) {
      const number = parseInt(receipt.code.substring(2));
      if (number > maxNumber) maxNumber = number;
    }
  });
  const nextNumber = maxNumber + 1;
  return "PN" + String(nextNumber).padStart(3, "0");
}

function populateReceiptCategorySelect() {
  const select = byId("newReceiptCategory");
  if (!select) return;
  const categories = state.categories.filter((c) => c.status === "active");
  let html = `<option value="">Chọn loại</option>`;
  html += categories
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");
  select.innerHTML = html;
}

function saveNewReceipt(e) {
  if (e) e.preventDefault();

  const code = byId("newReceiptCode").value.trim();
  const date = byId("newReceiptDate").value;
  const productName = byId("newReceiptProductName").value.trim();
  const quantity = parseInt(byId("newReceiptQuantity").value);
  const categoryId = byId("newReceiptCategory").value;
  const price = parseFloat(byId("newReceiptPrice").value);
  const profitPercent = parseFloat(byId("newReceiptProfit").value) || 10;

  if (!productName || !quantity || !categoryId || isNaN(price)) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  if (quantity <= 0 || price <= 0) {
    alert("Số lượng và giá phải lớn hơn 0");
    return;
  }

  const category = state.categories.find((c) => c.id == categoryId);
  if (!category) {
    alert("Loại sản phẩm không hợp lệ");
    return;
  }

  const total = quantity * price;
  const newId =
    state.receipts.length > 0
      ? Math.max(...state.receipts.map((r) => r.id)) + 1
      : 1;

  const newReceipt = {
    id: newId,
    code,
    date,
    productName,
    quantity,
    categoryId,
    brand: category.name,
    price,
    total,
    profitPercent,
  };

  state.receipts.push(newReceipt);
  saveToStorage(STORAGE_KEYS.RECEIPTS, state.receipts);

  // Update product stock and pricing

  const fileInput = byId("newReceiptImage");
  let imageUrl = "https://placehold.co/400x400/667eea/ffffff?text=Sneaker";

  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imageUrl = e.target.result;
      // Cập nhật sản phẩm với ảnh mới
      updateProductStockFromReceipt(
        productName,
        quantity,
        price,
        profitPercent,
        imageUrl
      );

      alert("Đã thêm phiếu nhập thành công");
      closeModal("addReceiptModal");
      renderReceipt();
      renderProductsTable();
      renderDashboard();
    };
    reader.readAsDataURL(file);
  } else {
    updateProductStockFromReceipt(
      productName,
      quantity,
      price,
      profitPercent,
      imageUrl
    );

    alert("Đã thêm phiếu nhập thành công");
    closeModal("addReceiptModal");
    renderReceipt();
    renderProductsTable();
    renderDashboard();
  }
}

function updateProductStockFromReceipt(
  productName,
  quantity,
  importPrice,
  profitPercent,
  imageUrl = null
) {
  const product = state.products.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (product) {
    // Product exists - update stock and pricing
    product.stock += quantity;
    product.importPrice = importPrice;
    product.profitPercent = profitPercent;
    product.salePrice = importPrice * (1 + profitPercent / 100);
    product.price = product.salePrice;

    if (imageUrl) {
      product.image = imageUrl;
    }

    console.log(`Đã cập nhật sản phẩm: ${product.name}`);
    console.log(`- Tồn kho: +${quantity} = ${product.stock}`);
    console.log(
      `- Giá bán mới: $${product.salePrice.toFixed(
        2
      )} (${profitPercent}% lợi nhuận)`
    );
  } else {
    // Create new product
    const newProductId =
      state.products.length > 0
        ? Math.max(...state.products.map((p) => p.id)) + 1
        : 1;
    const salePrice = importPrice * (1 + profitPercent / 100);

    const newProduct = {
      id: newProductId,
      code: "SP" + String(newProductId).padStart(3, "0"),
      name: productName,
      category: parseInt(byId("newReceiptCategory").value),
      importPrice: importPrice,
      profitPercent: profitPercent,
      salePrice: salePrice,
      price: salePrice,
      stock: quantity,
      description: "Sản phẩm nhập mới",
      image: imageUrl || "https://placehold.co/400x400/667eea/ffffff?text=Sneaker",
      status: "active",
    };

    state.products.push(newProduct);
    console.log(`Đã tạo sản phẩm mới: ${productName}`);
    console.log(
      `- Giá bán: $${salePrice.toFixed(2)} (${profitPercent}% lợi nhuận)`
    );
  }

  saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
}

window.deleteReceipt = function (rid) {
  if (!confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) return;
  state.receipts = state.receipts.filter((r) => r.id != rid);
  saveToStorage(STORAGE_KEYS.RECEIPTS, state.receipts);
  renderReceipt();
  alert("Xóa phiếu nhập thành công");
};

// ===== Dashboard functions =====
function renderDashboard() {
  const totalOrders = state.orders.length;
  const totalCustomers = state.users.length;
  const totalProducts = state.products.length;

  // Calculate revenue and profit
  let revenue = 0;
  let totalCost = 0;

  state.orders.forEach((order) => {
    if (order.status === "completed") {
      revenue += order.total || 0;
      // Calculate cost for completed orders
      if (order.products) {
        order.products.forEach((item) => {
          const product = state.products.find((p) => p.id === item.productId);
          if (product && product.importPrice) {
            totalCost += product.importPrice * item.quantity;
          }
        });
      }
    }
  });

  const totalProfit = revenue - totalCost;
  const pendingOrders = state.orders.filter(
    (o) => o.status === "pending"
  ).length;

  if (byId("totalOrders")) byId("totalOrders").textContent = totalOrders;
  if (byId("totalCustomers"))
    byId("totalCustomers").textContent = totalCustomers;
  if (byId("totalProducts")) byId("totalProducts").textContent = totalProducts;
  if (byId("totalRevenue"))
    byId("totalRevenue").textContent = `$${revenue.toFixed(2)}`;
  if (byId("totalProfit"))
    byId("totalProfit").textContent = `$${totalProfit.toFixed(2)}`;
  if (byId("pendingOrders")) byId("pendingOrders").textContent = pendingOrders;
}

// ===== Analytics functions =====
function renderAnalytics() {
  const tbody = byId("lowStockTableBody");
  if (!tbody) return;

  const lowStockProducts = state.products.filter(
    (p) => p.status === "active" && p.stock <= stockThreshold
  );
  lowStockProducts.sort((a, b) => a.stock - b.stock);

  if (!lowStockProducts.length) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="text-center">Không có sản phẩm nào sắp hết hàng</td></tr>';
    return;
  }

  tbody.innerHTML = lowStockProducts
    .map((p) => {
      const category = state.categories.find((x) => x.id == p.category);
      let stockClass = "";
      let statusText = "";
      let statusClass = "";

      if (p.stock === 0) {
        stockClass = "critical-stock";
        statusText = "Hết hàng";
        statusClass = "cancelled";
      } else if (p.stock <= stockThreshold) {
        stockClass = "low-stock";
        statusText = "Sắp hết hàng";
        statusClass = "pending";
      }

      return `<tr>
        <td>${p.code || "N/A"}</td>
        <td>${p.name}</td>
        <td>${category ? category.name : "N/A"}</td>
        <td class="${stockClass}">${p.stock}</td>
        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      </tr>`;
    })
    .join("");
}

window.updateStockThreshold = function () {
  const threshold = parseInt(byId("stockThreshold").value);
  if (!isNaN(threshold) && threshold >= 0) {
    stockThreshold = threshold;
    renderAnalytics();
    alert(`Đã cập nhật ngưỡng cảnh báo tồn kho thành ${threshold}`);
  } else {
    alert("Vui lòng nhập số hợp lệ");
  }
};

// ===== Helper functions =====
function populateCategorySelect(selectId, includeEmpty = true) {
  const sel = byId(selectId);
  if (!sel) return;
  const cats = state.categories.filter((c) => c.status !== "hidden");
  let html = includeEmpty
    ? '<option value="">Tất cả</option>'
    : '<option value="">Chọn loại</option>';
  html += cats
    .map((c) => `<option value="${c.id}">${c.name}</option>`)
    .join("");
  sel.innerHTML = html;
}

window.closeModal = function (id) {
  const m = byId(id);
  if (!m) return;
  const form = m.querySelector("form");
  if (form) form.reset();
  m.classList.add("hidden");
};

function openModal(id) {
  const m = byId(id);
  if (!m) return;
  m.classList.remove("hidden");
}

// ===== Delete functions =====
window.deleteProduct = function (pid) {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
  state.products = state.products.filter((p) => p.id != pid);
  saveToStorage(STORAGE_KEYS.PRODUCTS, state.products);
  renderProductsTable();
  alert("Xóa sản phẩm thành công");
};

window.deleteCustomer = function (uid) {
  if (!confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) return;
  state.users = state.users.filter((u) => u.id != uid);
  saveToStorage(STORAGE_KEYS.USERS, state.users);
  renderCustomers();
  renderDashboard();
  alert("Đã xóa khách hàng");
};

// ===== Order functions =====
function renderOrders() {
  const tbody = byId("orderTableBody");
  if (!tbody) return;

  let list = state.orders || [];
  const st = (byId("orderStatusFilter")?.value || "").trim();
  const time = (byId("timeFilter")?.value || "").trim();

  if (st) list = list.filter((o) => o.status === st);
  if (time) list = list.filter((o) => filterByTime(o.date, time));

  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="7" class="text-center">Không có đơn hàng nào</td></tr>';
    return;
  }

  tbody.innerHTML = list
    .map((o) => {
      return `<tr>
        <td>${o.id}</td>
        <td>${o.customer}</td>
        <td>${(o.products || [])
          .map((p) => `${p.name} (${p.quantity})`)
          .join(", ")}</td>
        <td>$${o.total.toFixed(2)}</td>
        <td>${o.date}</td>
        <td><span class="status-badge ${o.status}">${getOrderStatusText(
        o.status
      )}</span></td>
        <td>
          <button class="action-btn status-btn" onclick="openOrderStatusModal('${
            o.id
          }','${o.status}')">
            <i class="bi bi-pencil"></i>
          </button>
        </td>
      </tr>`;
    })
    .join("");
}

function filterByTime(orderDate, timeFilter) {
  const today = new Date();
  const orderDateObj = new Date(orderDate);
  today.setHours(0, 0, 0, 0);
  orderDateObj.setHours(0, 0, 0, 0);

  switch (timeFilter) {
    case "today":
      return orderDateObj.getTime() === today.getTime();
    case "7days":
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return orderDateObj >= sevenDaysAgo;
    case "month":
      return (
        orderDateObj.getMonth() === today.getMonth() &&
        orderDateObj.getFullYear() === today.getFullYear()
      );
    default:
      return true;
  }
}

function getOrderStatusText(status) {
  const statusMap = {
    pending: "Chờ xử lý",
    processing: "Đang giao",
    completed: "Đã giao",
    cancelled: "Đã hủy",
  };
  return statusMap[status] || status;
}

// ===== Customer functions =====
function renderCustomers() {
  const tbody = byId("customerTableBody");
  if (!tbody) return;

  let list = state.users || [];
  const q = (byId("customerSearch")?.value || "").toLowerCase().trim();
  if (q) {
    list = list.filter(
      (u) =>
        (u.username || "").toLowerCase().includes(q) ||
        (u.fullname || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").includes(q)
    );
  }

  if (!list.length) {
    tbody.innerHTML =
      '<tr><td colspan="6" class="text-center">Không tìm thấy khách hàng nào</td></tr>';
    return;
  }

  tbody.innerHTML = list
    .map((u) => {
      return `<tr>
        <td>${u.username}</td>
        <td>${u.fullname || ""}</td>
        <td>${u.email || ""}</td>
        <td>${u.phone || ""}</td>
        <td>
          <div class="pw-wrapper">
            <input class="pw-input" type="password" value="${
              u.password || ""
            }" readonly />
            <button class="pw-toggle" onclick="toggleCustomerPassword(this)" title="Hiện/Ẩn mật khẩu">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </td>
        <td>
          <button class="action-btn reset-btn" onclick="openResetPasswordModal(${
            u.id
          })">
            <i class="fas fa-key"></i>
          </button>
          <button class="action-btn delete-btn" onclick="deleteCustomer(${
            u.id
          })">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>`;
    })
    .join("");
}

window.toggleCustomerPassword = function (button) {
  const wrapper = button.parentNode;
  const input = wrapper.querySelector(".pw-input");
  const icon = button.querySelector("i");
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    input.type = "password";
    icon.className = "fas fa-eye";
  }
};

window.openResetPasswordModal = function (uid) {
  byId("resetPasswordCustomerId").value = uid;
  byId("newPassword").value = "password123";
  byId("confirmPassword").value = "password123";
  openModal("resetPasswordModal");
};

function submitResetPasswordForm(e) {
  e && e.preventDefault();
  const uid = Number(byId("resetPasswordCustomerId")?.value || 0);
  const np = byId("newPassword").value.trim();
  const conf = byId("confirmPassword").value.trim();

  if (!np || np !== conf) {
    alert("Mật khẩu và xác nhận không khớp");
    return;
  }

  const u = state.users.find((x) => x.id == uid);
  if (!u) {
    alert("Người dùng không tồn tại");
    return;
  }

  u.password = np;
  saveToStorage(STORAGE_KEYS.USERS, state.users);
  alert("Đã reset mật khẩu");
  closeModal("resetPasswordModal");
  renderCustomers();
}

// ===== Order status functions =====
window.openOrderStatusModal = function (orderId, currentStatus) {
  byId("updateOrderId").value = orderId;
  byId("newOrderStatus").value = currentStatus || "pending";
  openModal("updateOrderStatusModal");
};

function submitUpdateOrderStatusForm(e) {
  e && e.preventDefault();
  const oid = byId("updateOrderId").value.trim();
  const newStatus = byId("newOrderStatus").value.trim();

  const order = state.orders.find((o) => o.id === oid);
  if (!order) {
    alert("Không tìm thấy đơn hàng");
    return;
  }

  order.status = newStatus;
  saveToStorage(STORAGE_KEYS.ORDERS, state.orders);
  alert("Cập nhật trạng thái đơn thành công");
  closeModal("updateOrderStatusModal");
  renderOrders();
  renderDashboard();
}

// ===== Refresh all data =====
function refreshAll() {
  renderDashboard();
  renderProductsTable();
  renderCustomers();
  renderOrders();
  renderReceipt();
}

function populateAllSelects() {
  populateCategorySelect("categoryFilter", true);
  populateCategorySelect("newProductCategory", false);
  populateCategorySelect("productCategory", false);
}

// ===== Event bindings =====
function bindUIEvents() {
  byId("categoryFilter")?.addEventListener("change", renderProductsTable);
  byId("statusFilter")?.addEventListener("change", renderProductsTable);
  byId("orderStatusFilter")?.addEventListener("change", renderOrders);
  byId("timeFilter")?.addEventListener("change", renderOrders);
  byId("customerSearch")?.addEventListener("input", renderCustomers);
  byId("receiptTimeFilter")?.addEventListener("change", renderReceipt);

  byId("addProductBtn")?.addEventListener("click", openAddProduct);
  byId("addProductForm")?.addEventListener("submit", saveNewProduct);
  byId("addReceiptBtn")?.addEventListener("click", openAddReceiptModal);
  byId("addReceiptForm")?.addEventListener("submit", saveNewReceipt);
  byId("productEditForm")?.addEventListener("submit", submitEditProductForm);
  byId("updateOrderStatusForm")?.addEventListener(
    "submit",
    submitUpdateOrderStatusForm
  );
  byId("resetPasswordForm")?.addEventListener(
    "submit",
    submitResetPasswordForm
  );

  document.querySelectorAll(".nav-item").forEach((it) => {
    it.addEventListener("click", (e) => {
      e.preventDefault();
      const page = it.getAttribute("data-page");
      if (!page) return;

      document
        .querySelectorAll(".nav-item")
        .forEach((n) => n.classList.remove("active"));
      it.classList.add("active");
      document
        .querySelectorAll(".content")
        .forEach((c) => c.classList.add("hidden"));
      const p = byId(`${page}-page`);
      if (p) p.classList.remove("hidden");
      refreshAll();
    });
  });

  document.querySelectorAll(".modal").forEach((m) => {
    m.addEventListener("click", (ev) => {
      if (ev.target === m) closeModal(m.id);
    });
  });

  document
    .querySelector('[data-page="analytics"]')
    ?.addEventListener("click", function () {
      renderAnalytics();
    });
}

// ===== Initialization =====
function initAfterLogin() {
  loadAllFromStorage();
  ensureSampleData();
  populateAllSelects();
  refreshAll();
  renderAnalytics();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal").forEach((m) => m.classList.add("hidden"));
  loadAllFromStorage();
  ensureSampleData();
  setupLogin();
  updateAuthUI();
  bindUIEvents();
});
