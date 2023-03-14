async function getStandings() {
  const url =
    "https://v3.football.api-sports.io/standings?season=2022&league=1";

  const response = await fetch(
    "https://v3.football.api-sports.io/standings?season=2022&league=1",
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "2ef0abc183c8165b7638aa1f98113636",
      },
    }
  );

  const data = await response.json();
  const standings = data.response[0].league.standings;
  document.getElementById("standings").innerHTML = " ";
  for (standing of standings) {
    let tableContent = "";

    for (row of standing) {
      tableContent += `<li class="list-group-item">
                    <div class="row">
                         <div class="col-sm-4 d-flex justify-content-center align-items-center" style="text-align:center ;">
                           <span class="flag">
                                <img 
                                style="height:40px; width: 40px;"
                                class="rounded-circle"
                                 src=${row.team.logo}>
                           </span>
                            
                          </div>
                         

                         <div class="col-sm-1" style="text-align:center ;">${row.all.win}</div>
     
                         <div class="col-sm-1" style="text-align:center ;">${row.all.lose}</div>
     
                        <div class="col-sm-1" style="text-align:center ;">${row.all.draw}</div>
     
                        <div class="col-sm-1" style="text-align:center ;">${row.all.goals.for}</div>
     
                        <div class="col-sm-1" style="text-align:center ;">${row.all.goals.against}</div>
     
                       <div class="col-sm-1" style="text-align:center ;">${row.goalsDiff}</div>

                       <div class="col-sm-1" style="text-align:center ;">${row.all.played}</div>
     
                         <div class="col-sm-1" style="text-align:center ;">${row.points}</div>

                </li>`;
    }
    const content = `
                 <div class="col-sm-6 mb-4">
            <div class="card shadow border-none">
               <div class="card-header bg-primary" style="text-align:center;">
                <b>${row.group}</b></div>

                <div class="row bg-secondary m-0">
                    <div class="col-sm-4" style="text-align:center ;">
                       Team
                    </div>

                   <div class="col-sm-1" style="text-align:center ;">W</div> 

                   <div class="col-sm-1" style="text-align:center ;">L</div>

                  <div class="col-sm-1" style="text-align:center ;">D</div>

                    <div class="col-sm-1" style="text-align:center ;">GF</div>

                    <div class="col-sm-1" style="text-align:center ;">GA</div>

                   <div class="col-sm-1" style="text-align:center ;">GD</div>

                    <div class="col-sm-1" style="text-align:center ;">GP</div>

                     <div class="col-sm-1" style="text-align:center ;">Pts</div>
                 </div>
                
               <ul class="list-group list-group-flush">

                 ${tableContent}
               </ul>
              
             </div>
           </div>
                 `;
    document.getElementById("standings").innerHTML += content;
  }
}

async function getMatches() {
  const url = `https://v3.football.api-sports.io/fixtures/?season=2022&league=1&from=2022-12-03&to=2022-12-18`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2ef0abc183c8165b7638aa1f98113636",
    },
  });
  const data = await response.json();

  

  const matches = data.response;

  document.getElementById("matches").innerHTML = "";

  for (match of matches) {
    let tableContent = "";
    const utcDate = match.fixture.date;
    const homeTeam = match.teams.home;
    const awayTeam = match.teams.away;
    const content = `<div class="col-sm-12">
             <div class="card shadow rounded-pill mt-5" style="overflow: hidden;">
           <div class="card-body p-0">
             <div class="row" style="height: 120px;" >
               <div class="col-sm-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-right:solid 5px #5b0d25 ;" >
              <div class="d-flex justify-content-center align-items-center">
              <div>
                 <div class="flag">                   <img 
                   style="height:40px; width: 40px; object-fit:cover"
                   class="rounded-circle"
                    src=${homeTeam.logo} alt="?" >
                   </div>
                  
            
               </div>
             </div>
            
               </div>
              

            <div class="col-sm-6" style="text-align:center ;">
            <div class="row">

              <div class="col-sm-2" style="margin:auto 0px;">
                  <h3>
                  ${match.score.fulltime.home ?? "-"}
                  </h3>
              </div>
              <div class="col-sm-2" style="margin:auto 0px;">
              <h3>
              (${match.score.penalty.home ?? "-"})
              </h3>
          </div>
              

              <div class="col-sm-4" style="margin:auto 0px;">
                  <h6>${match.league.round}</h6>
              <h1>X</h1>
              <h6>${utcDate}</h6>
              </div>

              <div class="col-sm-2" style="margin:auto 0px;">
              <h3>
              (${match.score.penalty.away ?? "-"})
              </h3>
          </div>

              <div class="col-sm-2" style="margin:auto 0px;">
                  <h3 >
                   ${match.score.fulltime.away ?? "-"}
                  </h3>
              </div>
              

            </div>
              
            </div>

            <div class="col-sm-3 bg-primary d-flex flex-direction-column justify-content-center align-items-center" style="border-left:solid 5px #5b0d25 ;" >
              <div class="d-flex justify-content-center align-items-center">
              <div>
                 <div class="flag">
                   <img 
                   style="height:40px; width: 40px; object-fit:cover"
                   class="rounded-circle"
                    src=${awayTeam.logo} alt="?">
                   </div>
                   
                   
               </div>
             </div>
               </div>
            
            
            </div>
          </div>
        </div>
    
      </div>
      `;
    document.getElementById("matches").innerHTML += content;
  }
}

getStandings();
getMatches();
