// ===== MOCK DATA =====
let products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    price: 1200000,
    category: "Nike",
    desc: "Giày chạy bộ êm ái với công nghệ Air Max tiên tiến, thiết kế hiện đại và màu sắc thời trang. Chất liệu da cao cấp, đế giày bằng cao su bền bỉ.",
    features: [
      "Đệm khí Air Max tiên tiến",
      "Thoáng khí với công nghệ mesh",
      "Đế cao su bền bỉ chống trơn trượt",
      "Thiết kế thể thao năng động",
    ],
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Đen", "Trắng", "Xám"],
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 15,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 21",
    price: 1400000,
    category: "Adidas",
    desc: "Công nghệ Boost cho cảm giác êm ái vượt trội, phù hợp cho chạy bộ và tập luyện. Thiết kế Primeknit ôm chân, đế Continental bám đường.",
    features: [
      "Công nghệ Boost êm ái",
      "Primeknit upper co giãn",
      "Cổ giày sock-like ôm chân",
      "Đế Continental bám đường tốt",
    ],
    sizes: ["39", "40", "41", "42", "43"],
    colors: ["Đen", "Trắng", "Xanh navy"],
    img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 10,
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 1000000,
    category: "Puma",
    desc: "Phong cách đường phố với thiết kế retro, kết hợp hiệu ứng màu sắc độc đáo. Chất liệu da tổng hợp bền đẹp, đệm RS êm ái.",
    features: [
      "Thiết kế retro phong cách",
      "Đệm RS công nghệ mới",
      "Phong cách streetwear thời thượng",
      "Chất liệu da tổng hợp cao cấp",
    ],
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Đỏ", "Trắng", "Đen"],
    img: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 8,
  },
  {
    id: 4,
    name: "Vans Old Skool",
    price: 800000,
    category: "Vans",
    desc: "Classic skate shoes với thiết kế iconic, phù hợp cho mọi hoạt động hàng ngày. Chất liệu canvas bền chắc, logo side stripe nổi bật.",
    features: [
      "Thiết kế cổ điển iconic",
      "Chất liệu canvas bền đẹp",
      "Phù hợp skateboard và casual",
      "Logo side stripe biểu tượng",
    ],
    sizes: ["37", "38", "39", "40", "41"],
    colors: ["Đen", "Trắng", "Xanh"],
    img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 20,
  },
  {
    id: 5,
    name: "Converse Chuck 70",
    price: 900000,
    category: "Converse",
    desc: "Bản nâng cấp của classic Chuck Taylor với chất liệu và đệm được cải tiến. Đế cao su dày dặn, đệm OrthoLite êm chân.",
    features: [
      "Đế cao su dày bền bỉ",
      "Vải canvas cao cấp",
      "Đệm OrthoLite êm ái",
      "Thiết kế cổ điển timeless",
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Đen", "Trắng", "Đỏ", "Xanh"],
    img: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 12,
  },
  {
    id: 6,
    name: "Nike Jordan 1",
    price: 1800000,
    category: "Nike",
    desc: "Biểu tượng bóng rổ với thiết kế cổ điển, chất liệu da cao cấp và độ bền vượt trội. Air-Sole unit hỗ trợ tốt cho vận động.",
    features: [
      "Thiết kế cổ cao bảo vệ",
      "Da cao cấp bền đẹp",
      "Air-Sole unit hỗ trợ",
      "Phong cách retro biểu tượng",
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Đỏ đen", "Trắng đen", "Xanh hoàng gia"],
    img: "https://images.unsplash.com/photo-1556906785-653893ce3a42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 5,
  },
  {
    id: 7,
    name: "Adidas Superstar",
    price: 1100000,
    category: "Adidas",
    desc: "Giày thể thao cổ điển với thiết kế shell-toe iconic, phù hợp mọi dịp. Chất liệu da bò cao cấp, đế cao su chắc chắn.",
    features: [
      "Shell-toe iconic",
      "Chất liệu da bò cao cấp",
      "Thiết kế cổ điển versatile",
      "Đế cao su bền bỉ",
    ],
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["Trắng", "Đen", "Vàng"],
    img: "https://images.unsplash.com/photo-1584735175097-719d848f8449?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 18,
  },
  {
    id: 8,
    name: "New Balance 574",
    price: 950000,
    category: "New Balance",
    desc: "Sự kết hợp hoàn hảo giữa phong cách cổ điển và công nghệ hiện đại. Đệm ENCAP hỗ trợ tuyệt vời, nhiều màu sắc lựa chọn.",
    features: [
      "Đệm ENCAP tiên tiến",
      "Thiết kế retro đẹp mắt",
      "Nhiều màu sắc lựa chọn",
      "Thoải mái cả ngày dài",
    ],
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Xám", "Navy", "Xanh lá"],
    img: "https://images.unsplash.com/photo-1549289524-06cf8837ace5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    stock: 14,
  },
];

let users = [];
let currentUser = null;
let cart = [];
let orders = [];
let currentPage = 1;
const productsPerPage = 6;
let currentProductsPage = 1;
let isSearching = false;
let currentSearchResults = [];

// ===== REVIEW DATA & FUNCTIONS =====
let reviews = [
  {
    id: 1,
    productId: 1,
    username: "Nguyễn Văn A",
    rating: 5,
    comment:
      "Sản phẩm rất tốt, êm chân và đẹp! Giao hàng nhanh, đóng gói cẩn thận.",
    date: "2024-01-15",
  },
  {
    id: 2,
    productId: 1,
    username: "Trần Thị B",
    rating: 4,
    comment:
      "Chất lượng tốt, giao hàng nhanh. Size hơi nhỏ so với bình thường.",
    date: "2024-01-10",
  },
  {
    id: 3,
    productId: 2,
    username: "Lê Văn C",
    rating: 5,
    comment: "Ultraboost cực kỳ êm ái, đáng đồng tiền! Chạy bộ rất thoải mái.",
    date: "2024-01-12",
  },
  {
    id: 4,
    productId: 3,
    username: "Phạm Thị D",
    rating: 4,
    comment: "Mẫu mã đẹp, chất liệu tốt. Màu sắc như hình.",
    date: "2024-01-08",
  },
];

let currentRating = 0;

function generateStarRating(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += "★";
    } else {
      stars += "☆";
    }
  }
  return stars;
}

// ===== VALIDATION FUNCTIONS =====
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return phoneRegex.test(phone);
}

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
}

function submitReview(productId) {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để đánh giá");
    showAuthModal();
    return;
  }

  if (currentRating === 0) {
    alert("Vui lòng chọn số sao đánh giá");
    return;
  }

  const comment = document.getElementById("review-comment");
  if (!comment || !comment.value.trim()) {
    alert("Vui lòng nhập nội dung đánh giá");
    return;
  }

  const newReview = {
    id: reviews.length + 1,
    productId: productId,
    username: currentUser.username,
    rating: currentRating,
    comment: comment.value.trim(),
    date: new Date().toISOString().split("T")[0],
  };

  reviews.push(newReview);
  alert("Cảm ơn bạn đã đánh giá sản phẩm!");

  // Reset form
  currentRating = 0;
  const stars = document.querySelectorAll(".star-rating .star");
  stars.forEach((star) => star.classList.remove("active"));
  comment.value = "";

  // Reload product detail to show new review
  showProductDetail(productId);
}

// ===== NEW FUNCTION =====
function focusSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    showSection("products");
    setTimeout(() => {
      searchInput.focus();
    }, 100);
  }
}

// ===== AUTH FUNCTIONS =====
function register() {
  const username = document.getElementById("modal-reg-username").value;
  const password = document.getElementById("modal-reg-password").value;
  const birthday = document.getElementById("modal-reg-birthday").value;

  if (!username || !password || !birthday) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự");
    return;
  }

  if (users.find((u) => u.username === username)) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }

  users.push({
    username,
    password,
    birthday,
    fullname: "",
    phone: "",
    email: "",
    address: "",
  });

  alert("Đăng ký thành công! Vui lòng đăng nhập.");
  showAuthTab("login");
  clearAuthForms();
}

function login() {
  const username = document.getElementById("modal-login-username").value;
  const password = document.getElementById("modal-login-password").value;

  if (!username || !password) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  let user = users.find(
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

  // Update profile if on profile page
  if (document.getElementById("profile").classList.contains("active")) {
    loadUserProfile();
  }
}

function logout() {
  const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
  if (!confirmLogout) {
    return;
  }

  currentUser = null;
  cart = [];
  alert("Đã đăng xuất");
  updateUserDisplay();
  showSection("home");
}

function updateUserDisplay() {
  const authLinks = document.getElementById("auth-links");
  const logoutLink = document.getElementById("logout-link");
  const currentUsername = document.getElementById("current-username");
  const memberInfo = document.getElementById("member-info");

  if (currentUser) {
    if (currentUsername) currentUsername.textContent = currentUser.username;
    if (memberInfo)
      memberInfo.textContent = `Thành viên từ ${currentUser.birthday || "--"}`;
    if (authLinks) authLinks.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
  } else {
    if (currentUsername) currentUsername.textContent = "Chưa đăng nhập";
    if (memberInfo)
      memberInfo.textContent = "Vui lòng đăng nhập để xem thông tin";
    if (authLinks) authLinks.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
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

// ===== MODAL FUNCTIONS =====
function showAuthModal() {
  document.getElementById("auth-modal").style.display = "block";
  showAuthTab("login");
}

function closeAuthModal() {
  document.getElementById("auth-modal").style.display = "none";
  clearAuthForms();
}

function showAuthTab(tabName) {
  document.querySelectorAll(".auth-tab-content").forEach((tab) => {
    tab.classList.remove("active");
  });
  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  const tabContent = document.getElementById(tabName + "-tab");
  const tabButtons = document.querySelectorAll(".auth-tab");

  if (tabContent) tabContent.classList.add("active");

  tabButtons.forEach((button) => {
    if (
      button.textContent.includes(tabName === "login" ? "Đăng nhập" : "Đăng ký")
    ) {
      button.classList.add("active");
    }
  });

  currentRating = 0;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("auth-modal");
  if (event.target == modal) {
    closeAuthModal();
  }
};

// ===== PROFILE MANAGEMENT =====
function loadUserProfile() {
  if (!currentUser) {
    document.getElementById("current-username").textContent = "Chưa đăng nhập";
    document.getElementById("member-info").textContent =
      "Vui lòng đăng nhập để xem thông tin";
    return;
  }

  document.getElementById("fullname").value = currentUser.fullname || "";
  document.getElementById("phone").value = currentUser.phone || "";
  document.getElementById("email").value = currentUser.email || "";
  document.getElementById("birthday").value = currentUser.birthday || "";
  document.getElementById("address").value = currentUser.address || "";
  document.getElementById("current-username").textContent =
    currentUser.username;
  document.getElementById("member-info").textContent = `Thành viên từ ${
    currentUser.birthday || "--"
  }`;
}

function saveProfile() {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để lưu thông tin");
    showAuthModal();
    return;
  }

  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const fullname = document.getElementById("fullname").value;
  const address = document.getElementById("address").value;

  if (!fullname.trim()) {
    alert("Vui lòng nhập họ tên");
    return;
  }

  if (!phone.trim()) {
    alert("Vui lòng nhập số điện thoại");
    return;
  }

  if (!email.trim()) {
    alert("Vui lòng nhập email");
    return;
  }

  if (!address.trim()) {
    alert("Vui lòng nhập địa chỉ");
    return;
  }

  if (email && !validateEmail(email)) {
    alert("Email không hợp lệ! Vui lòng nhập email đúng định dạng.");
    return;
  }

  if (phone && !validatePhone(phone)) {
    alert(
      "Số điện thoại không hợp lệ! Phải có 10 số và bắt đầu bằng 03, 05, 07, 08, 09"
    );
    return;
  }

  currentUser.fullname = fullname;
  currentUser.phone = phone;
  currentUser.email = email;
  currentUser.address = address;

  alert("Thông tin đã được lưu thành công!");
}

// ===== PRODUCT DISPLAY =====
function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;

  const featured = products.slice(0, 4);

  container.innerHTML = featured
    .map(
      (product) => `
        <div class="product-card" onclick="showProductDetail(${product.id})">
            <img src="${product.img}" alt="${product.name}" loading="lazy">
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
}

function loadAllProducts(page = 1) {
  const container = document.getElementById("all-products");
  if (!container) return;

  currentPage = page;

  // Nếu đang trong chế độ tìm kiếm, hiển thị kết quả tìm kiếm
  if (isSearching && currentSearchResults.length > 0) {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedResults = currentSearchResults.slice(startIndex, endIndex);

    container.innerHTML = paginatedResults
      .map(
        (product) => `
          <div class="product-card" onclick="showProductDetail(${product.id})">
              <img src="${product.img}" alt="${product.name}" loading="lazy">
              <h3>${product.name}</h3>
              <p class="product-category">${product.category}</p>
              <p class="product-price">${formatPrice(product.price)}</p>
              <p class="product-stock">Còn ${product.stock} sản phẩm</p>
              <button onclick="event.stopPropagation(); addToCart(${
                product.id
              })">
                  <i class="fas fa-cart-plus"></i> Thêm vào giỏ
              </button>
          </div>
      `
      )
      .join("");

    renderSearchPagination(currentSearchResults.length);
  } else {
    // Hiển thị tất cả sản phẩm
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = products.slice(startIndex, endIndex);

    container.innerHTML = productsToShow
      .map(
        (product) => `
          <div class="product-card" onclick="showProductDetail(${product.id})">
              <img src="${product.img}" alt="${product.name}" loading="lazy"
                  onerror="this.src='https://via.placeholder.com/350x280/667eea/ffffff?text=Sneaker+Image'">
              <h3>${product.name}</h3>
              <p class="product-category">${product.category}</p>
              <p class="product-price">${formatPrice(product.price)}</p>
              <p class="product-stock">Còn ${product.stock} sản phẩm</p>
              <button onclick="event.stopPropagation(); addToCart(${
                product.id
              })">
                  <i class="fas fa-cart-plus"></i> Thêm vào giỏ
              </button>
          </div>
      `
      )
      .join("");

    renderPagination();
  }
}

function renderPagination() {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(products.length / productsPerPage);

  let paginationHTML = "";

  if (currentPage > 1) {
    paginationHTML += `<button onclick="loadAllProducts(${
      currentPage - 1
    })"><i class="fas fa-chevron-left"></i></button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <button 
                onclick="loadAllProducts(${i})" 
                class="${i === currentPage ? "active" : ""}"
            >
                ${i}
            </button>
        `;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="loadAllProducts(${
      currentPage + 1
    })"><i class="fas fa-chevron-right"></i></button>`;
  }

  container.innerHTML = paginationHTML;
}

function renderSearchPagination(totalResults) {
  const container = document.getElementById("pagination");
  if (!container) return;

  const totalPages = Math.ceil(totalResults / productsPerPage);

  let paginationHTML = "";

  if (currentPage > 1) {
    paginationHTML += `<button onclick="goToSearchPage(${
      currentPage - 1
    })"><i class="fas fa-chevron-left"></i></button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <button 
                onclick="goToSearchPage(${i})" 
                class="${i === currentPage ? "active" : ""}"
            >
                ${i}
            </button>
        `;
  }

  if (currentPage < totalPages) {
    paginationHTML += `<button onclick="goToSearchPage(${
      currentPage + 1
    })"><i class="fas fa-chevron-right"></i></button>`;
  }

  container.innerHTML = paginationHTML;
}

function searchProducts() {
  const input = document.getElementById("search-input");
  if (!input) return;

  const keyword = input.value.toLowerCase().trim();

  if (!keyword) {
    // Nếu không có từ khóa, quay lại trang sản phẩm bình thường
    isSearching = false;
    currentSearchResults = [];
    loadAllProducts(1);
    return;
  }

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(keyword)
  );

  isSearching = true;
  currentSearchResults = results;
  currentPage = 1;
  loadAllProducts(1);
}

function advancedSearch() {
  const category = document.getElementById("category-filter").value;
  const priceRange = document.getElementById("price-range").value;
  const keyword = document
    .getElementById("search-input")
    .value.toLowerCase()
    .trim();

  let results = products;

  // Filter by keyword
  if (keyword) {
    results = results.filter((product) =>
      product.name.toLowerCase().includes(keyword)
    );
  }

  // Filter by category
  if (category) {
    results = results.filter((product) => product.category === category);
  }

  // Filter by price range
  if (priceRange) {
    const [min, max] = priceRange.split("-").map(Number);
    results = results.filter((product) => {
      return product.price >= min && product.price <= max;
    });
  }

  isSearching = true;
  currentSearchResults = results;
  currentPage = 1;
  loadAllProducts(1);
}

// Hàm chuyển trang cho tìm kiếm
function goToSearchPage(page) {
  currentPage = page;
  loadAllProducts(page);
}

// ===== PRODUCT DETAIL =====
let currentQuantity = 1;

function showProductDetail(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const productReviews = reviews.filter((r) => r.productId === productId);
  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce((sum, r) => sum + r.rating, 0) /
          productReviews.length
        ).toFixed(1)
      : 0;

  const container = document.getElementById("product-detail-content");
  if (!container) return;
  container.innerHTML = `
        <div class="product-detail">
            <div class="product-image">
                <img src="${product.img}" alt="${product.name}" loading="lazy"
                onerror="this.src='https://via.placeholder.com/500x400/667eea/ffffff?text=Product+Image'">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                
                <div class="product-rating">
                    <div class="rating-stars">
                        ${generateStarRating(averageRating)}
                    </div>
                    <span class="rating-text">${averageRating}/5 (${
    productReviews.length
  } đánh giá)</span>
                </div>
                
                <p class="product-price">${formatPrice(product.price)}</p>
                <p class="product-category">Danh mục: ${product.category}</p>
                <div class="product-description">
                    <h3>Mô tả sản phẩm</h3>
                    <p>${product.desc}</p>
                </div>
                <div class="product-features">
                    <h3>Đặc điểm nổi bật</h3>
                    <ul>
                        ${product.features
                          .map((feature) => `<li>${feature}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-options">
                    <div class="size-selector">
                        <h4>Kích thước:</h4>
                        <select id="selected-size">
                            ${product.sizes
                              .map(
                                (size) =>
                                  `<option value="${size}">${size}</option>`
                              )
                              .join("")}
                        </select>
                    </div>
                    <div class="color-selector">
                        <h4>Màu sắc:</h4>
                        <select id="selected-color">
                            ${product.colors
                              .map(
                                (color) =>
                                  `<option value="${color}">${color}</option>`
                              )
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
        
        <div class="reviews-section">
            <h3>Đánh giá sản phẩm (${productReviews.length})</h3>
            
            ${
              currentUser
                ? `
            <div class="add-review">
                <h4>Thêm đánh giá của bạn</h4>
                <div class="rating-input">
                    <span>Chọn số sao:</span>
                    <div class="star-rating">
                        <span class="star" onclick="setRating(1)">★</span>
                        <span class="star" onclick="setRating(2)">★</span>
                        <span class="star" onclick="setRating(3)">★</span>
                        <span class="star" onclick="setRating(4)">★</span>
                        <span class="star" onclick="setRating(5)">★</span>
                    </div>
                </div>
                <textarea id="review-comment" placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..." rows="4"></textarea>
                <button class="auth-btn" onclick="submitReview(${productId})" style="margin-top: 1rem;">
                    <i class="fas fa-paper-plane"></i> Gửi đánh giá
                </button>
            </div>
            `
                : `
            <div class="auth-prompt">
                <p>Vui lòng <a href="#" onclick="showAuthModal()" style="color: #667eea; font-weight: 600;">đăng nhập</a> để đánh giá sản phẩm</p>
            </div>
            `
            }
            
            <div class="reviews-list">
                ${
                  productReviews.length > 0
                    ? productReviews
                        .map(
                          (review) => `
                    <div class="review-item">
                        <div class="review-header">
                            <strong>${review.username}</strong>
                            <div class="review-rating">
                                ${generateStarRating(review.rating)}
                            </div>
                        </div>
                        <p class="review-comment">${review.comment}</p>
                        <small class="review-date">${review.date}</small>
                    </div>
                `
                        )
                        .join("")
                    : `
                    <div class="no-reviews">
                        <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                        <p>Hãy là người đầu tiên đánh giá!</p>
                    </div>
                `
                }
            </div>
        </div>
    `;

  currentQuantity = 1;
  showSection("product-detail");
}

function changeQuantity(change) {
  currentQuantity = Math.max(1, currentQuantity + change);
  document.getElementById("quantity").textContent = currentQuantity;
}

function addToCartFromDetail(productId) {
  const sizeSelect = document.getElementById("selected-size");
  const colorSelect = document.getElementById("selected-color");

  const size = sizeSelect ? sizeSelect.value : "";
  const color = colorSelect ? colorSelect.value : "";

  addToCart(productId, currentQuantity, size, color);
  currentQuantity = 1;
}

// ===== CART MANAGEMENT =====
function addToCart(productId, quantity = 1, size = "", color = "") {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    showAuthModal();
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (!product) return;

  if (product.stock <= 0) {
    alert("Sản phẩm đã hết hàng");
    return;
  }

  let item = cart.find(
    (item) =>
      item.id === productId && item.size === size && item.color === color
  );

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
      size: size,
      color: color,
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
            <i class="fas fa-shopping-cart" style="font-size: 4rem; margin-bottom: 1rem; color: #ddd;"></i>
            <h3>Giỏ hàng của bạn đang trống</h3>
            <p>Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm</p>
            <button class="checkout-btn" onclick="showSection('products')" style="margin-top: 1rem;">
                <i class="fas fa-shopping-bag"></i> Mua sắm ngay
            </button>
        </div>
    `;
    totalAmount.textContent = "0";
    return;
  }

  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      const itemTotal = product.price * item.qty;
      total += itemTotal;

      return `
            <div class="cart-item">
                <img src="${product.img}" alt="${product.name}" loading="lazy">
                <div class="cart-item-info">
                    <h4>${product.name}</h4>
                    <p>Size: ${item.size} | Màu: ${item.color}</p>
                    <p class="cart-item-price">${formatPrice(product.price)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="updateQuantity(${
                      product.id
                    }, -1, '${item.size}', '${item.color}')">-</button>
                    <span style="min-width: 30px; text-align: center;">${
                      item.qty
                    }</span>
                    <button class="quantity-btn" onclick="updateQuantity(${
                      product.id
                    }, 1, '${item.size}', '${item.color}')">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${
                      product.id
                    }, '${item.size}', '${item.color}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    })
    .join("");

  totalAmount.textContent = formatPrice(total);
  updateCartCount();
}

function removeFromCart(productId, size = "", color = "") {
  cart = cart.filter(
    (item) =>
      !(item.id === productId && item.size === size && item.color === color)
  );
  loadCart();
}

function updateQuantity(productId, change, size = "", color = "") {
  const item = cart.find(
    (item) =>
      item.id === productId && item.size === size && item.color === color
  );
  if (item) {
    const product = products.find((p) => p.id === productId);
    item.qty += change;

    if (item.qty <= 0) {
      removeFromCart(productId, size, color);
    } else if (item.qty > product.stock) {
      item.qty = product.stock;
      alert(`Chỉ còn ${product.stock} sản phẩm trong kho`);
    } else {
      loadCart();
    }
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// ===== CHECKOUT FUNCTIONS =====
function loadCheckout() {
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thanh toán");
    showAuthModal();
    return;
  }

  if (cart.length === 0) {
    alert("Giỏ hàng trống");
    showSection("cart");
    return;
  }

  const savedAddress = document.getElementById("saved-address");
  if (savedAddress) {
    savedAddress.textContent =
      currentUser.address ||
      "Chưa có địa chỉ được lưu. Vui lòng cập nhật trong phần thông tin cá nhân.";
  }

  loadCheckoutItems();
}

function toggleAddressInput() {
  const useSaved =
    document.querySelector('input[name="address-option"]:checked').value ===
    "saved";
  const savedAddress = document.getElementById("saved-address");
  const newAddress = document.getElementById("new-address");

  if (savedAddress) savedAddress.style.display = useSaved ? "block" : "none";
  if (newAddress) newAddress.style.display = useSaved ? "none" : "block";
}

function loadCheckoutItems() {
  const container = document.getElementById("checkout-items");
  const totalElement = document.getElementById("checkout-total");

  if (!container || !totalElement) return;

  let total = 0;
  container.innerHTML = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      const itemTotal = product.price * item.qty;
      total += itemTotal;

      return `
            <div class="checkout-item">
                <span>${product.name} (${item.size}, ${item.color}) x ${
        item.qty
      }</span>
                <span>${formatPrice(itemTotal)}</span>
            </div>
        `;
    })
    .join("");

  totalElement.textContent = formatPrice(total);
}

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

  const useSavedAddress =
    document.querySelector('input[name="address-option"]:checked').value ===
    "saved";
  const addressInput = document.getElementById("new-address-input");
  const address = useSavedAddress
    ? currentUser.address
    : addressInput
    ? addressInput.value
    : "";

  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  if (!address || address.trim() === "") {
    alert("Vui lòng nhập địa chỉ giao hàng");
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
    id: orders.length + 1,
    user: currentUser.username,
    details: orderDetails,
    payment: paymentMethod,
    address: address,
    date: new Date(),
    status: "pending",
    total: orderDetails.reduce((sum, item) => sum + item.price * item.qty, 0),
  };

  orders.push(order);

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
        <p><strong>Địa chỉ giao hàng:</strong> ${order.address}</p>
        <p><strong>Phương thức thanh toán:</strong> ${getPaymentMethodText(
          order.payment
        )}</p>
        <p><strong>Trạng thái:</strong> <span class="order-status status-pending">${getStatusText(
          order.status
        )}</span></p>
      </div>
    `;
  }
}

// ===== ORDER MANAGEMENT =====
function loadOrders() {
  if (!currentUser) {
    const container = document.getElementById("order-history");
    if (container) {
      container.innerHTML = `
        <div class="no-orders">
          <i class="fas fa-user-lock" style="font-size: 4rem; margin-bottom: 1rem; color: #ddd;"></i>
          <h3>Vui lòng đăng nhập để xem đơn hàng</h3>
          <button class="auth-btn" onclick="showAuthModal()" style="margin-top: 1rem;">
            <i class="fas fa-sign-in-alt"></i> Đăng nhập ngay
          </button>
        </div>
      `;
    }
    return;
  }

  const container = document.getElementById("order-history");
  if (!container) return;

  const userOrders = orders.filter(
    (order) => order.user === currentUser.username
  );

  if (userOrders.length === 0) {
    container.innerHTML = `
      <div class="no-orders">
        <i class="fas fa-shopping-bag" style="font-size: 4rem; margin-bottom: 1rem; color: #ddd;"></i>
        <h3>Bạn chưa có đơn hàng nào</h3>
        <p>Hãy bắt đầu mua sắm và tận hưởng những ưu đãi từ chúng tôi</p>
        <button class="checkout-btn" onclick="showSection('products')" style="margin-top: 1rem;">
          <i class="fas fa-shopping-bag"></i> Mua sắm ngay
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = userOrders
    .map(
      (order) => `
        <div class="order-item" onclick="showOrderDetail(${order.id})">
            <div class="order-header">
                <h4>Đơn hàng #${order.id}</h4>
                <span class="order-date">${order.date.toLocaleDateString(
                  "vi-VN"
                )}</span>
            </div>
            <div class="order-info">
                <p><strong>Tổng tiền:</strong> ${formatPrice(order.total)}</p>
                <p><strong>Trạng thái:</strong> 
                    <span class="order-status status-${order.status}">
                        ${getStatusText(order.status)}
                    </span>
                </p>
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

function showOrderDetail(orderId) {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return;

  alert(
    `Chi tiết đơn hàng số ${orderId}
    \nTổng tiền: ${formatPrice(order.total)}\nTrạng thái: ${getStatusText(
      order.status
    )}\nĐịa chỉ: ${
      order.address
    }\nPhương thức thanh toán: ${getPaymentMethodText(order.payment)}`
  );
}

// ===== SECTION MANAGEMENT =====
function showSection(sectionName) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  const section = document.getElementById(sectionName);
  if (section) {
    section.classList.add("active");
  }

  document.querySelectorAll(".header-menu-list a").forEach((link) => {
    link.classList.remove("active");
  });

  if (sectionName === "home") {
    document.getElementById("home-link").classList.add("active");
  } else if (sectionName === "products") {
    document.getElementById("products-link").classList.add("active");
  } else if (sectionName === "connectNow") {
    document.getElementById("connect-link").classList.add("active");
  }

  switch (sectionName) {
    case "home":
      loadFeaturedProducts();
      break;
    case "products":
      // Reset trạng thái tìm kiếm khi vào trang sản phẩm
      isSearching = false;
      currentSearchResults = [];
      loadAllProducts(1);
      break;
    case "cart":
      loadCart();
      break;
    case "profile":
      loadUserProfile();
      break;
    case "orders":
      loadOrders();
      break;
    case "checkout":
      loadCheckout();
      break;
  }

  document.querySelectorAll(".navbar a").forEach((link) => {
    link.classList.remove("active");
  });

  if (sectionName === "home") {
    document
      .querySelector(".navbar a[onclick=\"showSection('home')\"]")
      .classList.add("active");
  } else if (sectionName === "products") {
    document
      .querySelector(".navbar a[onclick=\"showSection('products')\"]")
      .classList.add("active");
  }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

function getPaymentMethodText(method) {
  const methods = {
    cod: "Thanh toán khi nhận hàng",
    banking: "Chuyển khoản ngân hàng",
    online: "Thanh toán trực tuyến",
  };
  return methods[method] || method;
}

function getStatusText(status) {
  const statuses = {
    pending: "Đang xử lý",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  };
  return statuses[status] || status;
}

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", function () {
  if (users.length === 0) {
    users.push({
      username: "demo",
      password: "123456",
      birthday: "2000-01-01",
      fullname: "Nguyễn Văn Demo",
      phone: "0912345678",
      email: "demo@gmail.com",
      address: "123 Đường Demo, Phường 1, Quận 1, TP.HCM",
    });
  }

  showSection("home");
  loadFeaturedProducts();
  updateUserDisplay();
  updateCartCount();

  document.getElementById("home-link").classList.add("active");

  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("mouseenter", function () {
      this.querySelector(".dropdown-menu").style.display = "block";
    });
    dropdown.addEventListener("mouseleave", function () {
      this.querySelector(".dropdown-menu").style.display = "none";
    });
  });
});

console.log("Sneaker Store initialized with", products.length, "products");
