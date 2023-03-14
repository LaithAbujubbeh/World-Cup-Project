const btn = document.getElementById("btn");
const year = document.getElementById("year");
document.getElementById("card").innerHTML = "";

btn.addEventListener("click", (e) => {
  yearValue = year.value;
  getData();
});

async function getData() {
  const year = document.getElementById("year");

  const url = `https://v3.football.api-sports.io/fixtures/?season=${yearValue}&league=1&round=final`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2ef0abc183c8165b7638aa1f98113636",
    },
  });
  const data = await res.json();
  console.log(data);

  const awayTeam = data.response[0].teams.away.name;
  const homeTeam = data.response[0].teams.home.name;
  const yearGot = data.parameters.season;
  const logo = data.response[0].league.logo;
  document.getElementById("card").innerHTML = "";
  if (data.response[0].teams.away.winner == false)
    document.getElementById(
      "card"
    ).innerHTML = `<div id="card" class="card" style="width: 18rem;">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">The Year: ${yearGot}</li>
        <li id="winner" class="list-group-item"><img src="${data.response[0].teams.home.logo}" class="rounded-5" style="height:40px; width: 40px;" >The Winner: ${homeTeam}</li>
        <li id="runner-up" class="list-group-item"><img src="${data.response[0].teams.away.logo}" class="rounded-5" style="height:40px; width: 40px;"> The Runners Up: ${awayTeam} </li>
      </ul>
    </div>`;
}
