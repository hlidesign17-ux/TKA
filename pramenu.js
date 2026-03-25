//========================
// AMBIL DATA LOCAL STORAGE
//========================

let username = localStorage.getItem("username");
let kalimat = localStorage.getItem("kalimat");
let gender = localStorage.getItem("gender");

//========================
// SET TEXT
//========================

document.getElementById("hi").innerText = "Selamat Datang, " + username;

document.getElementById("kalimat").innerText = kalimat;

//========================
// SET AVATAR
//========================

let avatar = document.getElementById("avatar");

if (gender == "male") {
  avatar.src = "avatar/male.jpg";
} else {
  avatar.src = "avatar/female.jpg";
}

//========================
// FORMAT TANGGAL
//========================

function formatTanggal(tanggal) {
  let t = new Date(tanggal);

  let d = ("0" + t.getDate()).slice(-2);
  let m = ("0" + (t.getMonth() + 1)).slice(-2);
  let y = t.getFullYear();

  let jam = ("0" + t.getHours()).slice(-2);
  let menit = ("0" + t.getMinutes()).slice(-2);

  return d + "-" + m + "-" + y + " " + jam + ":" + menit;
}

//========================
// DATA SEMENTARA (NANTI API)
//========================

let terakhirMtk = localStorage.getItem("last_mtk");
let terakhirIndo = localStorage.getItem("last_indo");
let jumlahMtk = localStorage.getItem("jumlah_mtk") || 0;
let jumlahIndo = localStorage.getItem("jumlah_indo") || 0;

//========================
// INFO SUBMIT
//========================

let info = "";

if (terakhirMtk) {
  info += "Terakhir MTK: " + formatTanggal(terakhirMtk) + "<br>";
}

if (terakhirIndo) {
  info += "Terakhir INDO: " + formatTanggal(terakhirIndo) + "<br>";
}

info += "Total Submit MTK: " + jumlahMtk + "<br>";
info += "Total Submit INDO: " + jumlahIndo;

document.getElementById("infoSubmit").innerHTML = info;

//========================
// CATATAN
//========================

document.getElementById("catatan").innerText = "Semangat mengerjakan ujian!";

//========================
// LANJUT
//========================

function lanjut() {
  window.location = "menu.html";
}
