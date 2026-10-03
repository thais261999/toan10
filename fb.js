// Khởi tạo kiểm tra an toàn
try {
  const auth = firebase.auth();
  const db = firebase.firestore();

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
      console.error("Lỗi Firestore:", err);
      alert("Không thể kết nối cơ sở dữ liệu. Vui lòng kiểm tra kết nối mạng!");
    }
  });

  window.dangNhapGoogle = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(error => {
      // Nếu Popup bị chặn trên di động thì tự động đổi sang Redirect
      auth.signInWithRedirect(provider);
    });
  };

  window.dangXuat = function() {
    auth.signOut().then(() => location.reload());
  };

} catch (e) {
  console.error("Lỗi khởi tạo Firebase:", e);
}
