let api = "https://script.google.com/macros/s/AKfycbwY78pB86rZDtm1Ec2PhKQ4JMMSb3Eh90GYOFVsl6Y8ovuRzDUrp7TAGGomk8eZX9n4/exec";

async function loadLeaderboard() {
  let mapel = document.getElementById("mapel").value;
  let bank = document.getElementById("bank").value;

  let url = api + "?aksi=leaderboard&mapel=" + mapel + "&bank=" + bank;

  let res = await fetch(url);
  let data = await res.json();

  let tabel = document.getElementById("tabel");

  tabel.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Username</th>
      <th>Nilai</th>
      <th>Waktu</th>
    </tr>
  `;

  data.forEach((item, index) => {
    let row = tabel.insertRow();

    if (index == 0) row.classList.add("gold");
    if (index == 1) row.classList.add("silver");
    if (index == 2) row.classList.add("bronze");

    row.insertCell(0).innerText = index + 1;
    row.insertCell(1).innerText = item.username;
    row.insertCell(2).innerText = item.nilai;
    row.insertCell(3).innerText = item.waktu;
  });
}