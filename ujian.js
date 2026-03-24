//==================================================
// KONFIGURASI API
//==================================================

let api =
  "https://script.google.com/macros/s/AKfycbwY78pB86rZDtm1Ec2PhKQ4JMMSb3Eh90GYOFVsl6Y8ovuRzDUrp7TAGGomk8eZX9n4/exec";

//==================================================
// DATA UJIAN
//==================================================

let semuaSoal = [];
let jawabanUser = [];
let indexSoal = 0;

//=====================================
// MENYIMPAN JAWABAN USER
//=====================================

//==================================================
// AMBIL DATA DARI MENU
//==================================================

let jenjang = localStorage.getItem("jenjang_pilih");
let mapel = localStorage.getItem("mapel_pilih");
let bank = localStorage.getItem("bank_pilih");

/* =====================================================
MENGAMBIL SOAL DARI API
===================================================== */

async function ambilSoal() {
  let url =
    api +
    "?aksi=soal" +
    "&jenjang=" +
    jenjang +
    "&mapel=" +
    mapel +
    "&bank=" +
    bank;

  let response = await fetch(url);

  semuaSoal = await response.json();

  /* =====================================================
  MEMBUAT TEMPAT PENYIMPANAN JAWABAN USER
  Jumlahnya sama dengan jumlah soal
  ===================================================== */

  jawabanUser = new Array(semuaSoal.length);

  /* =====================================================
  MENAMPILKAN SOAL PERTAMA
  ===================================================== */

  tampilSoal();
  console.log("Jumlah soal:", semuaSoal.length);
  console.log("Array jawaban:", jawabanUser);
}

/* =====================================================
MENJALANKAN FUNGSI AMBIL SOAL
===================================================== */

ambilSoal();

//==================================================
// TAMPILKAN SOAL
//==================================================

function tampilSoal() {
  let soal = semuaSoal[indexSoal];

  document.getElementById("nomorSoal").innerText = "Soal " + (indexSoal + 1);

  let html = "";

  //==========================
  // TIPE 1
  //==========================

  if (soal.tipe == 1) {
    // tampilkan gambar jika ada
    if (soal.gambar) {
      html += `
    <div class="gambar-soal">
      <img src="gambar/${soal.gambar}">
    </div>
    `;
    }
    //batas gambar ditampilkan

    html += `<p>${soal.pertanyaan}</p>`;

    html += `
<div class="pilihan">
<input type="radio" name="jawab" value="A"> A. ${soal.A}
</div>

<div class="pilihan">
<input type="radio" name="jawab" value="B"> B. ${soal.B}
</div>

<div class="pilihan">
<input type="radio" name="jawab" value="C"> C. ${soal.C}
</div>

<div class="pilihan">
<input type="radio" name="jawab" value="D"> D. ${soal.D}
</div>
`;
  }

  //==========================
  // TIPE 2
  //==========================

  if (soal.tipe == 2) {
    // tampilkan gambar jika ada
    if (soal.gambar) {
      html += `
    <div class="gambar-soal">
      <img src="gambar/${soal.gambar}">
    </div>
    `;
    }
    //batas gambar ditampilkan
    html += `<p>${soal.pertanyaan}</p>`;

    html += `
<div class="pilihan">
<input type="checkbox" value="A"> A. ${soal.A}
</div>

<div class="pilihan">
<input type="checkbox" value="B"> B. ${soal.B}
</div>

<div class="pilihan">
<input type="checkbox" value="C"> C. ${soal.C}
</div>
`;
  }

  //==========================
  // TIPE 3 (TABEL)
  //==========================

  if (soal.tipe == 3) {
    // tampilkan gambar jika ada
    if (soal.gambar) {
      html += `
    <div class="gambar-soal">
      <img src="gambar/${soal.gambar}">
    </div>
    `;
    }
    //batas gambar ditampilkan
    html += `<p>${soal.pertanyaan}</p>`;

    html += `

<table>

<tr>
<th>Pernyataan</th>
<th>Benar</th>
<th>Salah</th>
</tr>

<tr>
<td>${soal.p1}</td>
<td><input type="radio" name="p1" value="B"></td>
<td><input type="radio" name="p1" value="S"></td>
</tr>

<tr>
<td>${soal.p2}</td>
<td><input type="radio" name="p2" value="B"></td>
<td><input type="radio" name="p2" value="S"></td>
</tr>

<tr>
<td>${soal.p3}</td>
<td><input type="radio" name="p3" value="B"></td>
<td><input type="radio" name="p3" value="S"></td>
</tr>

</table>

`;
  }

  document.getElementById("soal").innerHTML = html;

  //=====================================
  // MENAMPILKAN JAWABAN YANG SUDAH DIPILIH
  //=====================================

  let jawaban = jawabanUser[indexSoal];

  if (jawaban) {
    if (soal.tipe == 1) {
      let radio = document.querySelector('input[value="' + jawaban + '"]');

      if (radio) radio.checked = true;
    }

    if (soal.tipe == 2) {
      let arr = jawaban.split(",");

      arr.forEach(function (v) {
        let cek = document.querySelector('input[value="' + v + '"]');

        if (cek) cek.checked = true;
      });
    }

    if (soal.tipe == 3) {
      let arr = jawaban.split(",");

      if (arr[0]) {
        document.querySelector(
          'input[name="p1"][value="' + arr[0] + '"]',
        ).checked = true;
      }

      if (arr[1]) {
        document.querySelector(
          'input[name="p2"][value="' + arr[1] + '"]',
        ).checked = true;
      }

      if (arr[2]) {
        document.querySelector(
          'input[name="p3"][value="' + arr[2] + '"]',
        ).checked = true;
      }
    }
  }

  /* tambahan baru sekali */
  /* =====================================================
KONTROL TOMBOL NAVIGASI
===================================================== */

  let btnPrev = document.getElementById("btnPrev");
  let btnNext = document.getElementById("btnNext");
  let btnSubmit = document.getElementById("btnSubmit");

  btnSubmit.style.display = "none";

  if (indexSoal == 0) {
    btnPrev.style.display = "none";
  } else {
    btnPrev.style.display = "inline-block";
  }

  if (indexSoal == semuaSoal.length - 1) {
    btnNext.style.display = "none";
    btnSubmit.style.display = "inline-block";
  } else {
    btnNext.style.display = "inline-block";
  }
}

//==================================================
// TOMBOL SELANJUTNYA
//==================================================

function selanjutnya() {
  simpanJawaban();

  if (indexSoal < semuaSoal.length - 1) {
    indexSoal++;

    tampilSoal();
  }
}
//==================================================
// TOMBOL SEBELUMNYA
//==================================================

function sebelumnya() {
  simpanJawaban();

  if (indexSoal > 0) {
    indexSoal--;

    tampilSoal();
  }
}

//==================================================
// MENYIMPAN JAWABAN USER
//==================================================

function simpanJawaban() {
  let soal = semuaSoal[indexSoal];

  //==========================
  // TIPE 1
  //==========================

  if (soal.tipe == 1) {
    let pilih = document.querySelector('input[name="jawab"]:checked');

    if (pilih) {
      jawabanUser[indexSoal] = pilih.value;
    }
  }

  //==========================
  // TIPE 2
  //==========================

  if (soal.tipe == 2) {
    let cek = document.querySelectorAll('#soal input[type="checkbox"]:checked');

    let arr = [];

    cek.forEach(function (c) {
      arr.push(c.value);
    });

    jawabanUser[indexSoal] = arr.join(",");
  }

  //==========================
  // TIPE 3
  //==========================

  if (soal.tipe == 3) {
    let p1 = document.querySelector('input[name="p1"]:checked');
    let p2 = document.querySelector('input[name="p2"]:checked');
    let p3 = document.querySelector('input[name="p3"]:checked');

    let j1 = p1 ? p1.value : "";
    let j2 = p2 ? p2.value : "";
    let j3 = p3 ? p3.value : "";

    jawabanUser[indexSoal] = j1 + "," + j2 + "," + j3;
  }
}

/* =====================================================
TIMER UJIAN
===================================================== */

let waktu = 3600; // 3600 detik = 60 menit

function mulaiTimer() {
  setInterval(function () {
    let menit = Math.floor(waktu / 60);
    let detik = waktu % 60;

    document.getElementById("timer").innerText =
      "Sisa waktu : " + menit + ":" + (detik < 10 ? "0" : "") + detik;

    waktu--;

    if (waktu < 0) {
      submitUjian();
    }
  }, 1000);
}

mulaiTimer();

/* =====================================================
MENGHITUNG SKOR
===================================================== */

function hitungSkor() {
  let benar = 0;

  for (let i = 0; i < semuaSoal.length; i++) {
    let soal = semuaSoal[i];
    let jawabanBenar = soal.jawaban;
    let jawabanUserNow = jawabanUser[i];

    if (jawabanBenar == jawabanUserNow) {
      benar++;
    }
  }

  let nilai = (benar / semuaSoal.length) * 100;

  return Math.round(nilai);
}

/* =====================================================
SUBMIT UJIAN
===================================================== */

/* =====================================================
SUBMIT UJIAN
===================================================== */

/* =====================================================
SUBMIT UJIAN
===================================================== */

function submitUjian() {
  // simpan jawaban terakhir
  simpanJawaban();

  // hitung nilai
  let nilai = hitungSkor();

  // simpan nilai
  localStorage.setItem("nilai", nilai);

  // simpan semua soal
  localStorage.setItem("soalUjian", JSON.stringify(semuaSoal));

  // simpan semua jawaban user
  localStorage.setItem("jawabanUser", JSON.stringify(jawabanUser));

  console.log("SOAL TERSIMPAN:", semuaSoal);
  console.log("JAWABAN USER:", jawabanUser);

  // pindah ke halaman skor
  window.location = "skor.html";
}

/* =====================================================
SIMPAN DATA SOAL UNTUK HALAMAN SKOR
===================================================== */
