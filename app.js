document.addEventListener("DOMContentLoaded", () => {

     const bird = document.querySelector(".bird")
     const gameDisplay = document.querySelector(".game-container")
     const sky = document.querySelector(".sky")

     let birdLeft = 220
     let birdBottom = 100
     let gravity = 2.4 
     let gap = 480

     let score = -1
     let gameTimeout 
     let checkGameButton = false
     let isGameOver = false

     let diffMuli = 3000
     let diff = "Normal"


     let leaderBoard = []


    const scoreDiv = document.createElement("div")
    scoreDiv.classList.add("score") 
   
    function gameStarts (){
        function startGame() {
            if(birdBottom >= 0) { birdBottom -= gravity}
            bird.style.bottom = birdBottom + "px"
            bird.style.left = birdLeft + "px"
        }
        let  gameTimerId = setInterval (startGame, 20)
        
        function control(e){
            if(e.keyCode === 32) {
                jump()
            }
        }
    
        function jump(){
            if(birdBottom < 500) {birdBottom += 50}
            bird.style.bottom = birdBottom + "px"

        }
    
        document.addEventListener("keyup", control)
    
    
        function generateObstacle(){
           
            const random = (Math.random() * 40 ) - ( Math.random() * 30)
            
            let randomHeight = Math.random() * 60
            let obstacleLeft = 500
            let obstacleBottom = randomHeight
    
            const obstacle = document.createElement("div")
            const topObstacle = document.createElement("div")
    
    
            if(!isGameOver){
                obstacle.classList.add("obstacle")
                topObstacle.classList.add("topObstacle")
            }
            gameDisplay.appendChild(obstacle)
            gameDisplay.appendChild(topObstacle)
            obstacle.style.left = obstacleLeft + "px"
            topObstacle.style.left = obstacleLeft  + random + "px"
            topObstacle.style.bottom = obstacleBottom +gap +  "px"
            obstacle.style.bottom = obstacleBottom + "px"

            function moveObstacle () { 
               if(!isGameOver){
                obstacleLeft -= 2
                obstacle.style.left = obstacleLeft +  "px"
                topObstacle.style.left = obstacleLeft   + random  + "px"
    
                if(obstacleLeft === -60){
                    clearInterval(timerId)
                    gameDisplay.removeChild(obstacle)
                    gameDisplay.removeChild(topObstacle)
                }
                if(
                    obstacleLeft> 200 && obstacleLeft < 280 && birdLeft === 220 && 
                    (birdBottom <obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) ||
                    birdBottom === 0) {
                    gameOver()
                    clearInterval(timerId)
                }
               }
            }
    
            let timerId = setInterval(moveObstacle, 20)
            if(!isGameOver){
                gameTimeout = setTimeout(generateObstacle, diffMuli)
                score ++
                scoreDiv.innerHTML = score 
                sky.appendChild(scoreDiv)   
            } 
    
        }

        generateObstacle()


        function changeDifficulty (){
            const diffBttnContainer = document.createElement("div")
            diffBttnContainer.classList.add("diffModeButton")
            gameDisplay.appendChild(diffBttnContainer)

            const easyBtn = document.createElement("button")
            easyBtn.innerHTML = "Easy Mode"
            easyBtn.onclick = function(){
                diffMuli = 4000
                diff = "Easy"
                easyBtn.style.color = "blue"
                hardBtn.style.color = "white"
                normalBtn.style.color = "white" 
            } 
            easyBtn.classList.add("changeDiffBtn")
            diffBttnContainer.appendChild(easyBtn)

            const normalBtn = document.createElement("button")
            normalBtn.innerHTML = "Normal Mode"
            normalBtn.onclick = function(){
                diffMuli = 3000
                diff = "Normal"
                normalBtn.style.color = "blue"
                
                hardBtn.style.color = "white"
                easyBtn.style.color = "white"
            } 
            normalBtn.classList.add("changeDiffBtn")
            diffBttnContainer.appendChild(normalBtn)

            const hardBtn = document.createElement("button")
            hardBtn.innerHTML = "Hard Mode"
            
            hardBtn.onclick = function(){
                diffMuli = 2000
                diff = "Hard"
                hardBtn.style.color = "blue"
                
                normalBtn.style.color = "white"
                easyBtn.style.color = "white"
            } 
            hardBtn.classList.add("changeDiffBtn")
            diffBttnContainer.appendChild(hardBtn)   
            

        }

        function leadFunc (){
           
            leaderBoard.sort((b,a) => (b.score < a.score) ? 1 : ((a.score < b.score) ? -1 : 0))

            console.log(leaderBoard)

            let shortLeaderBoard = leaderBoard.slice(0,9)

            const leadListCont = document.createElement("div")
            leadListCont.classList.add("leadListContainer")
            sky.appendChild(leadListCont)
            const leadlist = document.createElement("list")
            leadlist.classList.add("leadlist")
            leadListCont.appendChild(leadlist)

            leadlist.innerHTML = shortLeaderBoard.map(i => `<li>${i.score + " " + i.diffiuculty}</li>`).join('');
            
            
        }

        function gameOver() {
        
        console.log(birdBottom)
        console.log(birdLeft)
  
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener("keyup", control)
        console.log("game Over")
        if(!checkGameButton){
          
            leaderBoard.push({
                score:  "Score: "+ score +"<br />",
                diffiuculty: " Difficulty: " + diff
            })

            const gameButton = document.createElement("button")
            gameButton.classList.add("gameButton")
            gameButton.innerHTML = "Restart"
            sky.appendChild(gameButton)

            const difficultyButton = document.createElement("button")
            difficultyButton.classList.add("diffButton")
            difficultyButton.innerHTML = "Difficulty"
            sky.appendChild(difficultyButton)
            difficultyButton.onclick = function(){
                changeDifficulty()
            }

            const boardButton = document.createElement("button")
            boardButton.classList.add("boardButton")
            boardButton.innerHTML = "Leader Board"
            sky.appendChild(boardButton)
            let leadSwitch = false
            boardButton.onclick = function(){
                if(!leadSwitch) {
                    leadSwitch = true
                    leadFunc()
                } else{
                    leadSwitch = false
                        while(sky.children[5]) {
                            sky.removeChild(sky.children[5])
                        } 
                
        
                }
            }
        
            gameButton.onclick = function(){
                clearTimeout(gameTimeout)
                checkGameButton = false
                isGameOver = false
                console.log("New Game")
                if(gameDisplay.children[2]){
                    while(gameDisplay.children[2]) {
                        if(gameDisplay.children[2]){gameDisplay.removeChild(gameDisplay.children[2])} 
                    }
                }
                if(sky.children[1]){
                    while(sky.children[1]) {
                        if(sky.children[1]) {sky.removeChild(sky.children[1])} 
                    } 
                }
                birdBottom += 100
                score = -1
                gameStarts()
            }
            
            checkGameButton = true
        }
        
    }
    }
 

    gameStarts ()
})