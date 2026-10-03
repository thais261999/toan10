const db = firebase.firestore();

let currentStudentId = localStorage.getItem('student_id');

window.onload = function() {
  if (currentStudentId) {
    kiemTraDuyet(currentStudentId);
  }
};

async function xacNhanHocSinh() {
  const nameInput = document.getElementById('student-name').value.trim();
  const classInput = document.getElementById('student-class').value.trim();

  if (!nameInput || !classInput) {
    alert("Vui lòng nhập đầy đủ Họ tên và Lớp!");
    return;
  }

  const studentId = `${nameInput}_${classInput}`.toLowerCase().replace(/\s+/g, '_');

  try {
    const userRef = db.collection('hocsinh').doc(studentId);
    let doc = await userRef.get();

    if (!doc.exists) {
      await userRef.set({
        ten: nameInput,
        lop: classInput,
        duyet: false,
        xu: 0,
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    localStorage.setItem('student_id', studentId);
    currentStudentId = studentId;

    kiemTraDuyet(studentId);
  } catch (err) {
    console.error("Lỗi Firestore:", err);
    alert("Không thể kết nối. Vui lòng kiểm tra lại mạng!");
  }
}

async function kiemTraDuyet(studentId) {
  const loginScreen = document.getElementById('login-screen');
  const pendingScreen = document.getElementById('pending-screen');
  const mainApp = document.getElementById('main-app');
  const userInfo = document.getElementById('user-info');

  try {
    const userRef = db.collection('hocsinh').doc(studentId);
    const doc = await userRef.get();

    if (doc.exists) {
      const data = doc.data();
      if (data.duyet === true) {
        if (loginScreen) loginScreen.classList.add('d-none');
        if (pendingScreen) pendingScreen.classList.add('d-none');
        if (mainApp) mainApp.classList.remove('d-none');

        if (userInfo) {
          userInfo.innerHTML = `
            <span class="me-3">👋 <b>${data.ten} (${data.lop})</b> - ${data.xu || 0} Xu</span>
            <button onclick="doiTaiKhoan()" class="btn btn-outline-light btn-sm">Thoát</button>
          `;
        }
      } else {
        if (loginScreen) loginScreen.classList.add('d-none');
        if (pendingScreen) pendingScreen.classList.remove('d-none');
        if (mainApp) mainApp.classList.add('d-none');
      }
    } else {
      doiTaiKhoan();
    }
  } catch (err) {
    console.error("Lỗi kiểm tra:", err);
  }
}

function kiemTraLai() {
  if (currentStudentId) kiemTraDuyet(currentStudentId);
}

function doiTaiKhoan() {
  localStorage.removeItem('student_id');
  location.reload();
}

async function tichLuyXu(soXu) {
  if (!currentStudentId) return;
  try {
    const userRef = db.collection('hocsinh').doc(currentStudentId);
    await userRef.update({
      xu: firebase.firestore.FieldValue.increment(soXu)
    });
    alert(`🎉 Bạn nhận được +${soXu} xu tích lũy!`);
    location.reload();
  } catch (err) {
    alert("Không thể lưu xu. Vui lòng thử lại sau!");
  }
}
