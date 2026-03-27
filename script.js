/* =====================================================
   FUNGSI 1 : MENAMPILKAN / MENYEMBUNYIKAN PASSWORD
   Digunakan saat icon mata diklik
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // mengambil elemen icon mata
  let togglePassword = document.getElementById("togglePassword");

  // mengambil input password
  let passwordInput = document.getElementById("password");

  // saat icon mata diklik
  togglePassword.addEventListener("click", function () {
    // jika password sedang tersembunyi
    if (passwordInput.type === "password") {
      // ubah menjadi terlihat
      passwordInput.type = "text";

      // ubah icon menjadi mata tertutup
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    } else {
      // jika password sedang terlihat
      passwordInput.type = "password";

      // ubah icon kembali menjadi mata
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    }
  });
});

/* ================== AKHIR FUNGSI TOGGLE PASSWORD ================== */

/* =====================================================
   FUNGSI LOGIN
   ===================================================== */

async function login() {
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();
  let token = document.getElementById("token").value.trim();

  let url =
    "https://script.google.com/macros/s/AKfycbwY78pB86rZDtm1Ec2PhKQ4JMMSb3Eh90GYOFVsl6Y8ovuRzDUrp7TAGGomk8eZX9n4/exec" +
    "?username=" +
    encodeURIComponent(username) +
    "&password=" +
    encodeURIComponent(password) +
    "&token=" +
    encodeURIComponent(token);

  let response = await fetch(url);
  let data = await response.json();

  console.log(data); // 🔥 penting untuk debug

  if (data.status == "success") {
    localStorage.setItem("username", data.username);
    localStorage.setItem("kalimat", data.kalimat);

    localStorage.setItem("jenjang", data.jenjang);
    localStorage.setItem("mtk", data.mtk);
    localStorage.setItem("indo", data.indo);
    localStorage.setItem("gender", data.gender);

    window.location = "pramenu.html";
  } else if (data.status == "blokir") {
    document.getElementById("error").innerText = data.pesan;
  } else {
    document.getElementById("error").innerText =
      "username/password/token yang anda masukkan salah";
  }
}

/* ================== AKHIR FUNGSI LOGIN ================== */
