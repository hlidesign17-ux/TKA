// ===============================
// ANTI BACK
// ===============================
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};



// ===============================
// cek login disetiap halaman
// ===============================
if (!localStorage.getItem("username")) {
  window.location = "index.html";
}

/* =====================================================
AMBIL DATA USER DARI LOCAL STORAGE
===================================================== */
let api =
  "https://script.google.com/macros/s/AKfycbwY78pB86rZDtm1Ec2PhKQ4JMMSb3Eh90GYOFVsl6Y8ovuRzDUrp7TAGGomk8eZX9n4/exec";
let jenjangUser = localStorage.getItem("jenjang");
let mtk = parseInt(localStorage.getItem("mtk"));
let indo = parseInt(localStorage.getItem("indo"));

let pilihanJenjang = "";
let pilihanMapel = "";

/* =====================================================
LANGKAH 1 : PILIH JENJANG
===================================================== */

function tampilJenjang() {
  let html = "<h2>Pilih Jenjang</h2>";

  if (jenjangUser == "SD") {
    html += "<button onclick=\"pilihJenjang('SD')\">SD</button>";
    html += "<button disabled>SMP 🔒</button>";
  }

  if (jenjangUser == "SMP") {
    html += "<button disabled>SD 🔒</button>";
    html += "<button onclick=\"pilihJenjang('SMP')\">SMP</button>";
  }

  html += "<br><br>";
  html += "<button onclick='lanjutMapel()'>Selanjutnya</button>";

  document.getElementById("menuArea").innerHTML = html;
}

/* =====================================================
PILIH JENJANG
===================================================== */

function pilihJenjang(j) {
  pilihanJenjang = j;
}

/* =====================================================
LANJUT KE MENU MAPEL
===================================================== */

function lanjutMapel() {
  if (pilihanJenjang == "") {
    alert("Silakan pilih jenjang terlebih dahulu");
    return;
  }

  let html = "<h2>Pilih Mata Pelajaran</h2>";

  if (mtk > 0) {
    html += "<button onclick=\"pilihMapel('MTK')\">MTK</button>";
  } else {
    html += "<button disabled>MTK 🔒</button>";
  }

  if (indo > 0) {
    html += "<button onclick=\"pilihMapel('INDO')\">B.INDO</button>";
  } else {
    html += "<button disabled>B.INDO 🔒</button>";
  }

  html += "<br><br>";

  html += "<button onclick='tampilJenjang()'>Sebelumnya</button>";
  html += "<button onclick='lanjutBankSoal()'>Selanjutnya</button>";

  document.getElementById("menuArea").innerHTML = html;
}

/* =====================================================
PILIH MAPEL
===================================================== */

function pilihMapel(m) {
  pilihanMapel = m;

  let buttons = document.querySelectorAll("#menuArea button");

  buttons.forEach((btn) => btn.classList.remove("selected"));

  event.target.classList.add("selected");
}

/* =====================================================
LANJUT KE BANK SOAL
===================================================== */

function lanjutBankSoal() {
  if (pilihanMapel == "") {
    alert("Silakan pilih mapel terlebih dahulu");
    return;
  }

  let html = "<h2>Pilih Bank Soal " + pilihanMapel + "</h2>";

  for (let i = 1; i <= 5; i++) {
    html +=
      '<button onclick="pilihBank(' + i + ')">Bank Soal ' + i + "</button>";
  }

  html += "<br><br>";

  html += "<button onclick='lanjutMapel()'>Sebelumnya</button>";
  html += "<button onclick='mulaiUjian()'>Mulai</button>";

  document.getElementById("menuArea").innerHTML = html;
}

/* =====================================================
PILIH BANK SOAL
===================================================== */

let bankDipilih = "";

function pilihBank(n) {
  bankDipilih = n;

  let buttons = document.querySelectorAll("#menuArea button");

  buttons.forEach((btn) => btn.classList.remove("selected"));

  event.target.classList.add("selected");
}

/* =====================================================
MULAI UJIAN
===================================================== */

/* =====================================================
MULAI UJIAN
===================================================== */

async function mulaiUjian() {

  if (bankDipilih == "") {
    alert("Silakan pilih bank soal terlebih dahulu");
    return;
  }

  let username = localStorage.getItem("username");

  // 🔥 AMBIL DATA TERBARU
  let res = await fetch(api + "?aksi=dashboard&username=" + username);
  let data = await res.json();

  // =========================
  // 🔒 CEK BLOKIR MTK
  // =========================
  if (
    pilihanMapel == "MTK" &&
    data.sisa_mtk <= 0 &&
    data.mtk_jumlah >= data.limit_mtk
  ) {
    alert("Jatah MTK sudah habis!");
    localStorage.clear();
    window.location = "index.html";
    return;
  }

  // =========================
  // 🔒 CEK BLOKIR INDO
  // =========================
  if (
    pilihanMapel == "INDO" &&
    data.sisa_indo <= 0 &&
    data.indo_jumlah >= data.limit_indo
  ) {
    alert("Jatah INDO sudah habis!");
    localStorage.clear();
    window.location = "index.html";
    return;
  }

  // =========================
  // LANJUT NORMAL
  // =========================
  localStorage.setItem("jenjang_pilih", pilihanJenjang);
  localStorage.setItem("mapel_pilih", pilihanMapel);
  localStorage.setItem("bank_pilih", bankDipilih);

  await fetch(
    api +
    "?aksi=pakai" +
    "&username=" + username +
    "&mapel=" + pilihanMapel
  );

  window.location = "ujian.html";
}

/* =====================================================
JALANKAN HALAMAN AWAL
===================================================== */

tampilJenjang();
