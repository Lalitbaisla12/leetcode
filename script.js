
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();

    const firstname = e.target.children[0].value,
    lastname = e.target.children[1].value,
    country = e.target.children[2].value,
    score = e.target.children[3].value;

    const errorpromptor = document.querySelector(".main_error-prompter");
    errorpromptor.style.display = "none";

    if(firstname ==='' || lastname === '' || country ==='' || score ==='')
    return (errorpromptor.style.display = "block");
    const scoreboardContainer = document.querySelector(".main_scoreboard-wrapper")

    const scoreboardElement = document.createElement("div");

    scoreboardElement.classList.add("main_scoreboard");
    scoreboardElement.innerHTML =`
    <div>
       <p class="main_player-name">${firstname} ${lastname}</ p>
       <p class="main_time-stamp">${generateDateAndTime()}</p>
    </div>
    <p class="main_player-country">${country}</p>
    <p class="main_player-score">${score}</p>
    <div class="main_scoreboard-btn-container">
        <button>&#x1f5d1;</button>
        <button>+5</button>
        <button>-5</button>
    </div>
    `
    scoreboardContainer.appendChild(scoreboardElement);
    sortScoreboard()
    activatebtneventlistner()

})

function activatebtneventlistner() {
    document.querySelectorAll(".main_scoreboard-btn-container button").forEach((el) => {
        el.addEventListener("click", (e) => {
            let textcontent = e.target.textContent; 
            console.log(textcontent);
            let scoreplayer = e.target.parentElement.parentElement.children[2];
            console.log(scoreplayer);
            if (textcontent === '🗑️') { 
                return e.target.parentElement.parentElement.remove();
            }

            scoreplayer.textContent = parseInt(scoreplayer.textContent) + parseInt(textcontent);

            sortScoreboard();
        });
    });
}

activatebtneventlistner();


function sortScoreboard() {
    let scoreboardContainer = document.querySelector(".main_scoreboard-wrapper");
    let scoreboards = document.querySelectorAll(".main_scoreboard"); 

    let elementsInArray = [];
    scoreboards.forEach((el) => elementsInArray.push(el));

    console.log(elementsInArray);

    let sortedElements = elementsInArray.sort((a, b) => {
        let numA = parseInt(a.children[2].textContent); 
        let numB = parseInt(b.children[2].textContent);
        if (numA > numB) return -1;
        if (numB > numA) return 1;
    });

    sortedElements.forEach((el) => {
        scoreboardContainer.append(el);
    });
}




function generateDateAndTime() {
    let dateObject = new Date();
    let month = dateObject.toLocaleString("default", { month: "long" });
    let day = dateObject.getDate();
    let year = dateObject.getFullYear();
    let time = dateObject.toLocaleTimeString().slice(0, 7);

    let generateresult = `${month} ${day}, ${year} ${time}`;

    return generateresult;
}