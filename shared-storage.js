// shared-storage.js - Quản lý localStorage chung cho cả Admin và User
const SHARED_KEYS = {
  PRODUCTS: "products",
  CATEGORIES: "categories",
  ORDERS: "orders",
  USERS: "users",
  REVIEWS: "reviews",
  ADMIN_LOGGED: "adminLoggedIn",
  ADMIN_USERNAME: "adminUsername",
};

// Hàm lấy dữ liệu từ localStorage
function getSharedData(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Lỗi đọc dữ liệu từ localStorage:", error);
    return null;
  }
}

// Hàm lưu dữ liệu vào localStorage
function saveSharedData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (error) {
    console.error("Lỗi lưu dữ liệu vào localStorage:", error);
    return false;
  }
}

// Hàm xóa dữ liệu
function removeSharedData(key) {
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
    return true;
  } catch (error) {
    console.error("Lỗi xóa dữ liệu từ localStorage:", error);
    return false;
  }
}

// Hàm kiểm tra dữ liệu tồn tại
function hasSharedData(key) {
  return localStorage.getItem(key) !== null;
}

// Hàm đồng bộ sản phẩm từ Admin sang User
function syncProductsFromAdmin() {
  const adminProducts = getSharedData(SHARED_KEYS.PRODUCTS);
  if (adminProducts && adminProducts.length > 0) {
    return adminProducts.map((adminProd) => ({
      id: adminProd.id,
      name: adminProd.name,
      price: adminProd.price * 23000, // Convert to VND
      category: getCategoryName(adminProd.category),
      desc: adminProd.description || "Sản phẩm chất lượng cao",
      features: adminProd.features || [
        "Chất liệu cao cấp",
        "Thiết kế thời trang",
        "Bền đẹp",
      ],
      sizes: ["38", "39", "40", "41", "42"],
      colors: ["Đen", "Trắng", "Xám"],
      img:
        adminProd.image ||
        "https://placehold.co/350x280/667eea/ffffff?text=Sneaker+Image",
      stock: adminProd.stock || 0,
      status: adminProd.status || "active",
    }));
  }
  return null;
}

// Hàm chuyển đổi ID category thành tên
function getCategoryName(categoryId) {
  const categoryMap = {
    1: "Nike",
    2: "Adidas",
    3: "Converse",
    4: "Puma",
    5: "Vans",
    6: "New Balance",
  };
  return categoryMap[categoryId] || "Thể thao";
}

// Hàm đồng bộ đơn hàng từ User sang Admin
function syncOrderToAdmin(order, currentUser) {
  const adminOrders = getSharedData(SHARED_KEYS.ORDERS) || [];

  const adminOrder = {
    id: "USER-" + order.id,
    customer: order.user,
    customerId: currentUser ? currentUser.id : 0,
    products: order.details.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.qty,
      price: item.price / 23000, // Convert to USD
      size: item.size,
      color: item.color,
    })),
    total: order.total / 23000, // Convert to USD
    date: order.date.toISOString().split("T")[0],
    status: order.status,
  };

  adminOrders.push(adminOrder);
  saveSharedData(SHARED_KEYS.ORDERS, adminOrders);

  // Cập nhật stock
  updateProductStock(order.details);

  return adminOrder;
}

// Hàm cập nhật stock sản phẩm
function updateProductStock(orderDetails) {
  const adminProducts = getSharedData(SHARED_KEYS.PRODUCTS) || [];
  orderDetails.forEach((item) => {
    const product = adminProducts.find((p) => p.id === item.id);
    if (product && product.stock !== undefined) {
      product.stock = Math.max(0, product.stock - item.qty);
    }
  });
  saveSharedData(SHARED_KEYS.PRODUCTS, adminProducts);
}

// Hàm đồng bộ người dùng từ User sang Admin
function syncUserToAdmin(user) {
  const adminUsers = getSharedData(SHARED_KEYS.USERS) || [];

  const newUserId =
    adminUsers.length > 0 ? Math.max(...adminUsers.map((u) => u.id)) + 1 : 1;

  const userToSave = {
    id: newUserId,
    username: user.username,
    password: user.password,
    fullname: user.fullname || "",
    email: user.email || "",
    phone: user.phone || "",
  };

  const existingUserIndex = adminUsers.findIndex(
    (u) => u.username === user.username
  );

  if (existingUserIndex !== -1) {
    adminUsers[existingUserIndex] = {
      ...adminUsers[existingUserIndex],
      ...userToSave,
    };
  } else {
    adminUsers.push(userToSave);
  }

  saveSharedData(SHARED_KEYS.USERS, adminUsers);
  return userToSave;
}

// Format price for display
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}
