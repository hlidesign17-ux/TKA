// ===============================
// ANTI BACK
// ===============================
history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.go(1);
};

/* =====================================================
MENAMPILKAN NILAI
===================================================== */

let nilai = localStorage.getItem("nilai");

document.getElementById("nilai").innerText = nilai || 0;

/* =====================================================
AMBIL DATA LOCAL STORAGE
===================================================== */

let soal = JSON.parse(localStorage.getItem("soalUjian")) || [];
let jawabanUser = JSON.parse(localStorage.getItem("jawabanUser")) || [];

/* =====================================================
FUNGSI MENAMPILKAN JAWABAN
===================================================== */
console.log("SOAL:", soal);
console.log("JAWABAN USER:", jawabanUser);
function lihatJawaban() {
  let tabel = document.getElementById("tabelJawaban");

  tabel.style.display = "table";

  for (let i = 0; i < soal.length; i++) {
    let row = tabel.insertRow();

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);

    cell1.innerText = i + 1;

    let user = jawabanUser[i] || "-";
    let sistem = soal[i].jawaban || "-";

    cell2.innerText = user;
    cell3.innerText = sistem;

    // warna benar salah
    if (user == sistem) {
      row.classList.add("benar");
    } else {
      row.classList.add("salah");
    }
  }
}

function kembali() {
  window.location.href = "pramenu.html";
}
