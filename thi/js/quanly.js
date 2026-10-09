/* ============================================================
   quanly.js — trang quản lý lớp, chỉ giáo viên vào được
   ============================================================ */
(function () {
  'use strict';

  var el = {};
  ['manVao','manBang','nutGoogle','nutRa','nutXuat','bao',
   'dsCho','dsOk','demCho','demOk','timKiem','sapXep'
  ].forEach(function (id) { el[id] = document.getElementById(id); });

  var tatCa = [];

  function thoat(chu) {
    el.bao.textContent = chu;
    el.manVao.hidden = false;
    el.manBang.hidden = true;
    el.nutRa.hidden = true;
    el.nutXuat.hidden = true;
  }

  FB.batDau(function (t) {
    if (t.loai === 'loi') { thoat('Không kết nối được: ' + ((t.e && t.e.message) || '')); return; }
    if (t.loai === 'chua') { thoat(''); return; }

    if (!FB.laGiaoVien(t.u.email)) {
      thoat('Tài khoản ' + t.u.email + ' không có quyền vào trang này.');
      el.nutRa.hidden = false;
      return;
    }
    el.manVao.hidden = true;
    el.manBang.hidden = false;
    el.nutRa.hidden = false;
    el.nutXuat.hidden = false;
    nap();
  });

  el.nutGoogle.addEventListener('click', function () {
    FB.vaoGoogle().catch(function (e) { el.bao.textContent = e.message || e; });
  });
  el.nutRa.addEventListener('click', function () {
    FB.ra().then(function () { location.reload(); });
  });

  function nap() {
    FB.dsHocSinh().then(function (ds) {
      tatCa = ds;
      ve();
    }).catch(function (e) {
      thoat('Không đọc được dữ liệu: ' + (e.message || e) +
            '. Thầy cô kiểm tra lại luật bảo mật trên Firebase nhé.');
    });
  }

  function theHS(d, cho) {
    var nut = cho
      ? '<div class="em__nut">' +
          '<button class="nut--duyet" data-duyet="' + d._id + '">Duyệt</button>' +
          '<button class="nut--tu" data-xoa="' + d._id + '">Từ chối</button></div>'
      : '<div class="em__nut"><button class="nut--tu" data-xoa="' + d._id + '">Loại</button></div>';

    var so = cho ? '' :
      '<div class="em__so">' +
        '<div><b>' + (d.soBai || 0) + '</b><small>bài</small></div>' +
        '<div><b>' + (d.xu || 0) + '</b><small>xu</small></div>' +
        '<div><b>' + (d.phieu || 0) + '</b><small>điểm cộng</small></div>' +
      '</div>';

    return '<div class="em">' +
      '<div class="em__chu"><b>' + (d.ten || '(chưa khai tên)') + ' · ' + (d.lop || '?') + '</b>' +
      '<small>' + (d.email || '') + '</small></div>' + so + nut + '</div>';
  }

  function ve() {
    var cho = tatCa.filter(function (d) { return !d.duyet; });
    var ok  = tatCa.filter(function (d) { return d.duyet; });

    var tim = (el.timKiem.value || '').toLowerCase().trim();
    if (tim) {
      ok = ok.filter(function (d) {
        return ((d.ten || '') + ' ' + (d.lop || '')).toLowerCase().indexOf(tim) !== -1;
      });
    }
    var k = el.sapXep.value;
    ok.sort(function (a, b) {
      if (k === 'xu')    return (b.xu || 0) - (a.xu || 0);
      if (k === 'phieu') return (b.phieu || 0) - (a.phieu || 0);
      if (k === 'lop')   return String(a.lop).localeCompare(String(b.lop), 'vi');
      return String(a.ten).localeCompare(String(b.ten), 'vi');
    });

    el.demCho.textContent = cho.length;
    el.demOk.textContent = ok.length;
    el.dsCho.innerHTML = cho.length
      ? cho.map(function (d) { return theHS(d, true); }).join('')
      : '<p class="ql__trong">Không có em nào đang chờ.</p>';
    el.dsOk.innerHTML = ok.length
      ? ok.map(function (d) { return theHS(d, false); }).join('')
      : '<p class="ql__trong">Chưa có em nào được duyệt.</p>';
  }

  el.timKiem.addEventListener('input', ve);
  el.sapXep.addEventListener('change', ve);

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-duyet],[data-xoa]');
    if (!b) return;

    if (b.dataset.duyet) {
      b.disabled = true;
      FB.duyet(b.dataset.duyet, true).then(nap)
        .catch(function (e) { alert('Không duyệt được: ' + (e.message || e)); b.disabled = false; });
      return;
    }
    var d = tatCa.filter(function (x) { return x._id === b.dataset.xoa; })[0];
    if (!confirm('Xoá hồ sơ của ' + ((d && d.ten) || 'em này') + '? Mọi xu và tiến độ sẽ mất.')) return;
    b.disabled = true;
    FB.xoaHocSinh(b.dataset.xoa).then(nap)
      .catch(function (e) { alert('Không xoá được: ' + (e.message || e)); b.disabled = false; });
  });

  /* ---------- Xuất ra file Excel mở được ---------- */
  el.nutXuat.addEventListener('click', function () {
    var dong = [['Họ và tên', 'Lớp', 'Email', 'Số bài', 'Xu', 'Điểm cộng', 'Trạng thái']];
    tatCa.forEach(function (d) {
      dong.push([d.ten || '', d.lop || '', d.email || '',
                 d.soBai || 0, d.xu || 0, d.phieu || 0,
                 d.duyet ? 'Đã duyệt' : 'Chờ duyệt']);
    });
    var csv = '﻿' + dong.map(function (r) {
      return r.map(function (o) { return '"' + String(o).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');

    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = 'lop-toan10-' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  });
})();
