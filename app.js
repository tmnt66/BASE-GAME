//Music 
let coin_take = new Audio('./sounds/coin_take.wav')
let move = new Audio('./sounds/move.wav')



let root  = document.getElementById('root');
let playarea = document.getElementById('playarea')
let random = document.querySelector('.btn')

//variables
let points = 0;
let steps = 0;
let yoshi ={class:'yoshi',position:45 , prevPos:45 , score:0};
let goomba = 54;
let koopa = 44;
let peach = 55;
let coinpos=[78,16,12,28,36,47,89,20,58,98,41,25,73,87,33,5,62,84,65,90,93];

//  playarea.innerHTML = localStorage.getItem('gameState')
for(let i =0;i<100;i++){
    playarea.innerHTML += `<div class="box" id="box${i}">${i}</div>`
}

//Adding coins 

coinpos.forEach((val)=>[
    document.getElementById(`box${val}`).classList.add('coin')
])


random.addEventListener('click',(e)=>{
    e.target.innerHTML= parseInt(Math.random()*10000000%5+1);
    steps=e.target.innerHTML;
})

//initial state
let character = document.getElementById(`box${yoshi.position}`);
character.classList.add(yoshi.class)
// console.log(character)

let play = (yoshi)=>{
    document.addEventListener('keyup',(e)=>{
        if(coinpos.length&&steps!=0){
        
            move.play();
            yoshi.prevPos=yoshi.position;
            let coord = yoshi.position;
            if(e.key==='ArrowUp'&&(yoshi.position-10*steps)>0){
                yoshi.position-=10*steps;
                random.innerHTML= parseInt(Math.random()*10000000%5+1);
                steps=random.innerHTML;
                points-=1;
            }
            else if(e.key==='ArrowDown'&&(yoshi.position+10*steps)<99){
                yoshi.position+=10*steps;
                random.innerHTML= parseInt(Math.random()*10000000%5+1);
                steps=random.innerHTML;
                points-=1;
            }
            else if(e.key==='ArrowLeft'&&(yoshi.position-1*steps)>=(coord-coord%10)){
                yoshi.position-=1*steps;
                random.innerHTML= parseInt(Math.random()*10000000%5+1);
                steps=random.innerHTML;
                points-=1;
            }
            else if(e.key==='ArrowRight'&&(yoshi.position+1*steps)<(coord-coord%10+10)){
                yoshi.position+=1*steps;
                random.innerHTML= parseInt(Math.random()*10000000%5+1);
                steps=random.innerHTML;
                points-=1;
            }
          
         

            if(coinpos.includes(yoshi.position)){
                document.querySelector(`#box${yoshi.position}`).classList.remove('coin');
                coinpos.splice(coinpos.indexOf(yoshi.position) , 1);
                yoshi.score+=1;
                coin_take.play();
                console.log(coinpos)
                points+=10;
            }
            
            let prevCharacter = document.getElementById(`box${yoshi.prevPos}`);
            prevCharacter.classList.remove(yoshi.class)

            let character = document.getElementById(`box${yoshi.position}`);
            character.classList.add(yoshi.class)

            let score = document.getElementById('score')
            score.innerHTML = points;
        }
        else if(steps!=0){
       
            playarea.classList.add('gameover')
        }
        else{
            random.innerHTML= parseInt(Math.random()*10000000%5+1);
            steps=random.innerHTML;
    }
        })
}



localStorage.setItem('gameState',playarea.innerHTML)


play(yoshi)