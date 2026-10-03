const auth = firebase.auth();
const db = firebase.firestore();

// Tự động kiểm tra kết quả đăng nhập lại từ Redirect (Dành cho điện thoại)
auth.getRedirectResult().then((result) => {
  if (result.user) {
    console.log("Đăng nhập thành công qua Redirect");
  }
}).catch((error) => {
  console.error("Lỗi Redirect:", error);
});

auth.onAuthStateChanged(async (user) => {
  const loginScreen = document.getElementById('login-screen');
  const pendingScreen = document.getElementById('pending-screen');
  const mainApp = document.getElementById('main-app');
  const userInfo = document.getElementById('user-info');

  if (!user) {
    if (loginScreen) loginScreen.classList.remove('d-none');
    if (pendingScreen) pendingScreen.classList.add('d-none');
    if (mainApp) mainApp.classList.add('d-none');
    return;
  }

  try {
    const userRef = db.collection('hocsinh').doc(user.uid);
    let doc = await userRef.get();

    if (!doc.exists) {
      await userRef.set({
        ten: user.displayName || "Học sinh",
        email: user.email,
        duyet: false,
        xu: 0,
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
      doc = await userRef.get();
    }

    const data = doc.data();

    if (data && data.duyet === true) {
      if (loginScreen) loginScreen.classList.add('d-none');
      if (pendingScreen) pendingScreen.classList.add('d-none');
      if (mainApp) mainApp.classList.remove('d-none');
      if (userInfo) {
        userInfo.innerHTML = `
          <span class="me-3">👋 <b>${data.ten}</b> (${data.xu || 0} Xu)</span>
          <button onclick="dangXuat()" class="btn btn-outline-light btn-sm">Đăng xuất</button>
        `;
      }
    } else {
      if (loginScreen) loginScreen.classList.add('d-none');
      if (pendingScreen) pendingScreen.classList.remove('d-none');
      if (mainApp) mainApp.classList.add('d-none');
    }
  } catch (err) {
    console.error("Lỗi kết nối Firestore:", err);
  }
});

function dangNhapGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  // Kiểm tra nếu là thiết bị di động thì dùng Redirect, máy tính dùng Popup
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    auth.signInWithRedirect(provider);
  } else {
    auth.signInWithPopup(provider).catch(error => alert("Lỗi đăng nhập: " + error.message));
  }
}

function dangXuat() {
  auth.signOut().then(() => location.reload());
}

async function tichLuyXu(soXu) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    const userRef = db.collection('hocsinh').doc(user.uid);
    await userRef.update({
      xu: firebase.firestore.FieldValue.increment(soXu)
    });
    alert(`🎉 Bạn nhận được +${soXu} xu tích lũy!`);
    location.reload();
  } catch (err) {
    alert("Không thể lưu xu. Vui lòng thử lại sau!");
  }
}
