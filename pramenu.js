const api =
  "https://script.google.com/macros/s/AKfycbwY78pB86rZDtm1Ec2PhKQ4JMMSb3Eh90GYOFVsl6Y8ovuRzDUrp7TAGGomk8eZX9n4/exec";

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
  if (!tanggal || tanggal == "-") return "-";

  // kalau sudah string dari API → langsung pakai
  if (typeof tanggal === "string") return tanggal;

  // fallback kalau Date object
  let t = new Date(tanggal);
  if (isNaN(t)) return "-";

  let d = ("0" + t.getDate()).slice(-2);
  let m = ("0" + (t.getMonth() + 1)).slice(-2);
  let y = t.getFullYear();

  let jam = ("0" + t.getHours()).slice(-2);
  let menit = ("0" + t.getMinutes()).slice(-2);

  return d + "-" + m + "-" + y + " " + jam + ":" + menit;
}

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

/* ---------------------------------------------------------------------------------------------------- */
async function loadDashboard() {
  try {
    let username = localStorage.getItem("username");

    let url = api + "?aksi=dashboard&username=" + username;
    document.getElementById("infoSubmit").innerHTML = "Loading..."; /* --- */
    let res = await fetch(url);
    let data = await res.json();

    console.log("DATA DASHBOARD:", data);

    // ========================
    // TEXT
    // ========================
    document.getElementById("hi").innerText =
      "Selamat Datang, " + data.username;

    document.getElementById("kalimat").innerText = data.kalimat;

    // ========================
    // AVATAR
    // ========================
    let avatar = document.getElementById("avatar");

    if (data.gender == "male") {
      avatar.src = "avatar/male.jpg";
    } else {
      avatar.src = "avatar/female.jpg";
    }

    // ========================
    // INFO SUBMIT (FIX)
    // ========================
    let info = "";

    info += "Terakhir MTK: " + formatTanggal(data.mtk_terakhir) + "<br>";
    info += "Terakhir INDO: " + formatTanggal(data.indo_terakhir) + "<br>";
    info += "Total Submit MTK: " + (data.mtk_jumlah || 0) + "<br>";
    info += "Total Submit INDO: " + (data.indo_jumlah || 0);

    document.getElementById("infoSubmit").innerHTML = info;

    // ========================
    // PESAN
    // ========================
    let pesanText = data.pesan || "Semangat mengerjakan ujian!";

    document.getElementById("pesan").innerText = "Pesan Admin: " + pesanText;
  } catch (err) {
    console.error("ERROR DASHBOARD:", err);

    document.getElementById("infoSubmit").innerHTML = "Gagal memuat data";
  }
}

loadDashboard();
