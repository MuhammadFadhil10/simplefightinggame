// game 
// jurus akan ditawarkan random
// waktu memilih jurus adalah 7 detik
// jika waktu habis namun belum memilih, maka tidak ada menyerang
// jurus bisa di random lagi jika tidak puas,
    // selama masih ada waktu memilih.

let contentsRemoved = [];
let choosedSkills;
let choosedSkillsDamage;

// OBJECT
// skills object
class Skills {
    constructor(name, damage) {
        this.name = name
        this.damage = damage
    };
};
// make skills object
let fire = new Skills(['fire'],18); //  if < 0.7
let water = new Skills(['water'],16); // if < 0.5
let wind = new Skills(['wind'],13); // if < 0.3
let lightning = new Skills(['lightning'],30); // if < 0.9
let earth = new Skills(['earth'],22); // if < 0.8
let healthSkill = new Skills(['health'],19); // if < 1
let staminaSkill = new Skills(['stamina'],15); // if < 1

// make skills object end
// skills object end
// character object blueprint
class Character {
    constructor(body,name,health,stamina,score,status) {
        this.body = body
        this.name = name;
        this.health = health;
        this.stamina = stamina;
        this.score = score;
        this.status = status;
    };
    DamagedEffect() {
        console.log('damaged work');
        if( this.name == user.name ) {
            // give enemy body class bg-danger
            const compBody = comp.body;
            compBody.classList.add('bg-danger');
            // remove class bg-danger from enemy body
            setTimeout(()=>{
                compBody.classList.remove('bg-danger');
                compBody.style.transition = '500ms'
            },500);
            const userHealthMeter = user.body.previousElementSibling.previousElementSibling.firstElementChild;
            const userHealthLabel = user.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            if(user.health <= 0) {
                user.health = 0;
                userHealthMeter.style.width = `${user.health}%`;
                userHealthLabel.innerText = user.health;
            };
        } else if( this.name == comp.name ) {
            // give enemy body class bg-danger
            const userBody = user.body;
            userBody.classList.add('bg-danger');
            // remove class bg-danger from enemy body
            setTimeout(()=>{
                userBody.classList.remove('bg-danger');
                userBody.style.transition = '500ms'
            },500);
            const compHealthMeter = comp.body.previousElementSibling.previousElementSibling.firstElementChild;
            const compHealthLabel = comp.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            if(comp.health <= 0) {
                comp.health = 0;
                compHealthMeter.style.width = `${comp.health}%`;
                compHealthLabel.innerText = comp.health;
            };
        };
    };
    resetHealth() {
        if( comp.health <= 0 ) {   
            const healthMeter = comp.body.previousElementSibling.previousElementSibling.firstElementChild;
            const healthLabel = comp.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            comp.health = 0;
            healthMeter.style.width = `${comp.health}%`;
            healthLabel.innerText = comp.health;
            comp.status = 'lose';
            user.status = 'win';
            this.WinCondition();

        } else if( user.health <= 0 ) {
            const healthMeter = user.body.previousElementSibling.previousElementSibling.firstElementChild;
            const healthLabel = user.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            user.health = 0;
            healthMeter.style.width = `${user.health}%`;
            healthLabel.innerText = user.health;
            comp.status = 'win';
            user.status = 'lose';
            this.WinCondition();
        }
        // 
    }
    //  damaged END
    HealthEnemyReduced(){
        this.DamagedEffect();
        if( this.name == user.name ) {
            // reducing comp health
            const compHealthMeter = comp.body.previousElementSibling.previousElementSibling.firstElementChild;
            const compHealthLabel = comp.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            comp.health -= choosedSkillsDamage;
            // enemy health meter width - skill damage
            compHealthMeter.style.width = `${comp.health}%`;
            compHealthMeter.style.transition = `500ms`;
            // enemy health label - skill damage
            compHealthLabel.innerText = comp.health;
            // if enemy health meter smaller than 35
            
            if(comp.health < 35) {
                // give class bg-danger to enemy health meter
                compHealthMeter.classList.add('bg-danger');
                compHealthLabel.innerText += '!';
                compHealthLabel.style.color = '#ddd';
                compHealthLabel.style.transition = '500ms';
            };
            this.resetHealth();
        } else if( this.name == comp.name ) {
            // reducing user health
            const userHealthMeter = user.body.previousElementSibling.previousElementSibling.firstElementChild;
            const userHealthLabel = user.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            user.health -= choosedSkillsDamage
            // enemy health meter width - skill damage
            userHealthMeter.style.width = `${user.health}%`;
            userHealthMeter.style.transition = `500ms`;
            // enemy health label - skill damage
            userHealthLabel.innerText = user.health;
            // if enemy health meter smaller than 35
            if(user.health < 35) {
                // give class bg-danger to enemy health meter
                userHealthMeter.classList.add('bg-danger');
                userHealthLabel.innerText += '!';
                userHealthLabel.style.color = '#ddd';
                userHealthLabel.style.transition = '500ms';
            };
            
            this.resetHealth();
            
        };
    };
    StaminaReduced(){
        const staminaMeter = this.body.previousElementSibling.firstElementChild;
        const staminaLabel = this.body.previousElementSibling.firstElementChild.firstElementChild;
        // reducing user stamina
        // user stamina - damage - 3
        this.stamina -= choosedSkillsDamage - 3;
        // user stamina meter - damage - 3
        staminaMeter.style.width = `${this.stamina}%`;
        staminaMeter.style.transition = '500ms';
        // user stamina label - damage - 3
        staminaLabel.innerText = this.stamina;
        // if stamina user <= 30
        if(this.stamina <= 30) {
            // give class danger to user stamina meter
            staminaMeter.classList.add('bg-danger');
            staminaMeter.style.transition = '500ms';
            staminaLabel.innerText += '!';
            staminaLabel.style.color = '#ddd';
        };
        if(this.stamina <= 0) {
            // health - 2/second
            this.Dying();
        };
    };
    StaminaChoosed(){
        const staminaMeter = this.body.previousElementSibling.firstElementChild;
        const staminaLabel = this.body.previousElementSibling.firstElementChild.firstElementChild;
        // stamina plus stamina damage
        this.stamina += parseInt(choosedSkillsDamage);
        staminaMeter.style.width = `${this.stamina}%`;
        staminaLabel.innerText = this.stamina;
        if( this.stamina > 30 ) {
            staminaMeter.classList.remove('bg-danger');
            staminaLabel.style.color = '#212529';
        }
        // if stamina equal or greater than 100
        if( this.stamina >= 100 ) {
            // stamina still 100 maximum
            this.stamina = 100;
            staminaMeter.style.width = `${this.stamina}%`;
            staminaLabel.innerText = this.stamina;
            // alert('your stamina maximum is 100');
        };
    };
    HealthChoosed(){
        const healthMeter = this.body.previousElementSibling.previousElementSibling.firstElementChild;
        const healthLabel = this.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
        
        // health plus health damage
        this.health += parseInt(choosedSkillsDamage);
        healthMeter.style.width = `${this.health}%`;
        healthLabel.innerText = this.health;
        if( this.health > 35 ) {
            healthMeter.classList.remove('bg-danger');
            healthLabel.style.color = '#212529';
        };
        // if health equal or greater than 100
        if ( this.health >= 100 ) {
            // health still 100 maximum
            this.health = 100;
            healthMeter.style.width = `${this.health}%`;
            healthLabel.innerText = this.health;
            // alert('your health maximum is 100');
            const alert = document.querySelector('#alert-content');
            alert.style.display =  'flex';
            if ( this.name == user.name ) {
                alert.innerText = 'your health maximum is 100';
            } else if (this.name == comp.name) {
                alert.innerText = 'Computer choose health';
            }
            setTimeout(()=>{
                alert.style.display = 'none';
            },2500);
        };
    };
    Dying(){
        const healthMeter = this.body.previousElementSibling.previousElementSibling.firstElementChild;
        const healthLabel = this.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
        const staminaMeter = this.body.previousElementSibling.firstElementChild;
        const staminaLabel = this.body.previousElementSibling.firstElementChild.firstElementChild;
        // change stamina to 0
        this.stamina = 0;
        // change stamina meter width to 0
        staminaLabel.innerText = this.stamina;
        staminaMeter.style.width = `${this.stamina}%`;
        let kurangi = setInterval( ()=> {    
            this.health -= 6;
            healthMeter.style.width = `${this.health}%`;
            healthMeter.style.transition = `500ms`;
            healthLabel.innerText = this.health;
            if(this.health <= 35) {
                // give class danger to user stamina meter
                healthMeter.classList.add('bg-danger');
                healthMeter.style.transition = '500ms';
                healthLabel.innerText += '!';
                healthLabel.style.color = '#ddd';
            }
            if(this.health <=0) {
                this.health = 0;
                healthMeter.style.width = `${this.health}%`;
                healthMeter.style.transition = `500ms`;
                healthLabel.innerText = this.health;
                clearInterval(kurangi);
                this.resetHealth()
                // user death  
            } else if( this.stamina > 0 ) {
                clearInterval(kurangi);
            } else if( this.name == user.name ) {
                if( comp.health <= 0 ) { clearInterval(kurangi); }
            } else if( this.name == comp.name ) {
                if( user.health <= 0 ) { clearInterval(kurangi);  }
            };
            
           
        },1000);
        
    };
    WinCondition() {
        if ( user.status == 'win' ) {
            // this.Scoring();
            let userScore = document.querySelector('#user-score');
            user.score += 1;
            userScore.innerText = user.score;
            //////////////
            alert( `${user.name} win!`);
            this.PlayAgain();
            // alert(`score ${this.name} = ${this.score}`);
        } else if ( comp.status == 'win' ) {
            // this.Scoring();
            let compScore = document.querySelector('#comp-score');
            comp.score += 1;
            compScore.innerText = comp.score;
            /////
            alert( `${comp.name} win!`);
            this.PlayAgain();
            // alert(`score ${this.name} = ${this.score}`);
        } else if ( user.status == 'win' || comp.status == 'win' ) {
            // this.Scoring();
            // alert( `${comp.name} win!`);
            this.PlayAgain();
            // alert(`score ${this.name} = ${this.score}`);
        }
    };
    CancelPlayAgain() {
            // const userHealthMeter = user.body.previousElementSibling.previousElementSibling.firstElementChild;
            // const userHealthLabel = user.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            // const userStaminaMeter = user.body.previousElementSibling.firstElementChild;
            // const userStaminaLabel = user.body.previousElementSibling.firstElementChild.firstElementChild;
            
            // const compHealthMeter = comp.body.previousElementSibling.previousElementSibling.firstElementChild;
            // const compHealthLabel = comp.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            // const compStaminaMeter = comp.body.previousElementSibling.firstElementChild;
            // const compStaminaLabel = comp.body.previousElementSibling.firstElementChild.firstElementChild;

            // user.health = 100;
            // user.stamina = 100;
            // user.score = 0;
            // user.status = undefined;
            // comp.health = 100;
            // comp.stamina = 100;
            // comp.score = 0;
            // comp.status = undefined;

            // userHealthMeter.style.width = `${user.health}%`;
            // userHealthMeter.classList.remove('bg-danger');
            // userHealthLabel.innerText = user.health;
            // userHealthLabel.style.width = '#1b1b1b';
            // userStaminaMeter.style.width = `${user.stamina}%`;
            // userStaminaMeter.classList.remove('bg-danger');
            // userStaminaLabel.innerText = user.stamina;
            // userStaminaLabel.style.color = '#1b1b1b';

            // compHealthMeter.style.width = `${comp.health}%`;
            // compHealthMeter.classList.remove('bg-danger');
            // compHealthLabel.innerText = comp.health;
            // compHealthLabel.style.width = '#1b1b1b';
            // compStaminaMeter.style.width = `${comp.stamina}%`;
            // compStaminaMeter.classList.remove('bg-danger');
            // compStaminaLabel.innerText = comp.stamina;
            // compStaminaLabel.style.color = '#1b1b1b';
            console.log(user.score == comp.score);
            if( user.score == comp.score ) {
                alert(`${user.name} and ${comp.name} Tie!, score = ${user.name} ${user.score}:${comp.score} ${comp.name}`);
                secondContent.replaceWith(thirdContent);
                thirdContent.style.display = 'flex';
                const byeUser = document.querySelector('#thanks-to-user');
                byeUser.innerText = `, ${user.name}`;
            } else if( parseInt(user.score) >= parseInt(comp.score) ) {
                alert(`${user.name} Win, score = ${user.name} ${user.score}:${comp.score} ${comp.name}`);
                secondContent.replaceWith(thirdContent);
                thirdContent.style.display = 'flex';
                const byeUser = document.querySelector('#thanks-to-user');
                byeUser.innerText = `, ${user.name}`;
                // contentsRemoved.forEach(elements => {
                //     if(elements == firstContent) {
                //         mainContainer.append(elements);
                //     } else if ( elements == secondContent ) {
                //         elements.remove();
                //     }
                // });
                // contentsRemoved.push(secondContent);
                // secondContent.remove();
                // firstContent.style.display = 'flex';
                // console.log(contentsRemoved[0]);
            } else if ( parseInt(user.score) <= parseInt(comp.score) ){
                alert(`${comp.name} Win, score = ${user.name} ${user.score}:${comp.score} ${comp.name}`);
                secondContent.replaceWith(thirdContent);
                thirdContent.style.display = 'flex';
                const byeUser = document.querySelector('#thanks-to-user');
                byeUser.innerText = `, ${user.name}`;
                // contentsRemoved.forEach(elements => {
                //     if(elements == firstContent) {
                //         mainContainer.append(elements);
                //     } else if ( elements == secondContent ) {
                //         elements.remove();
                //     }
                // });
                // contentsRemoved.push(secondContent);
                // secondContent.remove();
                // firstContent.style.display = 'flex';
                // console.log(contentsRemoved[0]);
            };
            
            
            
    };
    PlayAgain() {
        let askUser = confirm('Play Again? \n *Play again not reset the score');
        if( askUser ) {
            const userHealthMeter = user.body.previousElementSibling.previousElementSibling.firstElementChild;
            const userHealthLabel = user.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            const userStaminaMeter = user.body.previousElementSibling.firstElementChild;
            const userStaminaLabel = user.body.previousElementSibling.firstElementChild.firstElementChild;
            
            const compHealthMeter = comp.body.previousElementSibling.previousElementSibling.firstElementChild;
            const compHealthLabel = comp.body.previousElementSibling.previousElementSibling.firstElementChild.firstElementChild;
            const compStaminaMeter = comp.body.previousElementSibling.firstElementChild;
            const compStaminaLabel = comp.body.previousElementSibling.firstElementChild.firstElementChild;

            user.health = 100;
            user.stamina = 100;
            comp.health = 100;
            comp.stamina = 100;

            userHealthMeter.style.width = `${user.health}%`;
            userHealthMeter.classList.remove('bg-danger');
            userHealthLabel.innerText = user.health;
            userHealthLabel.style.color = '#1b1b1b';
            userStaminaMeter.style.width = `${user.stamina}%`;
            userStaminaMeter.classList.remove('bg-danger');
            userStaminaLabel.innerText = user.stamina;
            userStaminaLabel.style.color = '#1b1b1b';

            compHealthMeter.style.width = `${comp.health}%`;
            compHealthMeter.classList.remove('bg-danger');
            compHealthLabel.innerText = comp.health;
            compHealthLabel.style.color = '#1b1b1b';
            compStaminaMeter.style.width = `${comp.stamina}%`;
            compStaminaMeter.classList.remove('bg-danger');
            compStaminaLabel.innerText = comp.stamina;
            // compStaminaLabel.style.color = '#1b1b1b';
        } else {
            this.CancelPlayAgain();
        };
    };
};
// character object blueprint END
// win condition
// win condition end
// child Character Class
class User extends Character{  
    Attack(){
        const userAlert = document.querySelector('#alert-content');
        userAlert.style.display =  'flex';
        userAlert.innerText = `${this.name} choosed ${choosedSkills}, damage: ${choosedSkillsDamage}`
        setTimeout(()=>{
            userAlert.style.display = 'none';
        },2500);
        console.log(this.body.previousElementSibling.previousElementSibling.previousElementSibling);
        console.log(`user memilih ${choosedSkills}, ${choosedSkillsDamage}`);
        console.log(this.name)
        // if choosed skill = stamina
        if(choosedSkills == 'stamina') {         
            this.StaminaChoosed();            
        } else if( choosedSkills == 'health' ) {     // else if choosed skill = health
            this.HealthChoosed();    
        } else { 
            // attack.removeEventListener('click',attacking)
            this.StaminaReduced(); 
            this.HealthEnemyReduced(); 
            // attack.removeEventListener('click',attacking);
        };
        // USER ATTACK END
    };
};

class Computer extends Character{
    Attack(){
        randomizeSkills();
        pickSkills();
        const compAlert = document.querySelector('#alert-content');
        compAlert.style.display =  'flex';
        compAlert.innerText = `${this.name} choosed ${choosedSkills}, damage: ${choosedSkillsDamage}`
        setTimeout(()=>{
            compAlert.style.display = 'none';
        },2500);
        console.log('comp choose '+choosedSkills,choosedSkillsDamage);
        // if choosed skill = stamina
        if(choosedSkills == 'stamina') {
            this.StaminaChoosed();
        } else if( choosedSkills == 'health' ) {     // else if choosed skill = health
            this.HealthChoosed();    
        } else { 
            this.StaminaReduced(); 
            this.HealthEnemyReduced() 
        };
        // COMP ATTACK END 
    };
}
// child Character Class END
// OBJECT END

// change content

const mainContainer = document.querySelector('.container-main');
const userName = document.querySelector('.user-name');
const compName = 'Computer';
const firstContent = document.querySelector('.first-content');
const secondContent = document.querySelector('.second-content');
const thirdContent = document.querySelector('.third-content');
const containerCharacter = document.querySelector('.container-choose-character');
const firstTitle = document.querySelector('#first-title');
const submit = document.querySelector('#submit');
const attack = document.querySelector('#attack');
const healthBorder = document.querySelectorAll('.health-border');
const staminaBorder = document.querySelectorAll('.stamina-border');
const skillsContainer = document.querySelector('.container-skills');
let score = document.querySelector('#score-board');
let scoreNumber = document.querySelectorAll('.score-number');
let userNameBoard = document.querySelector('#user-in-score');
let compNameBoard = document.querySelector('#comp-in-score');
// 
let skillsQueue = document.querySelector('.skills-name');
let damageQueue = document.querySelector('.skills-damage');
// 
const pickSkillsButton = document.querySelector('#pick')
const randomSkillsButton = document.querySelector('#random')

function guide() {
    alert('berhasil');
}
// FUNCTION
// skills Randomize
// function randomSkills 
let randomizeSkills = ()=> {
    let randomSkills = Math.random() * 10;
    Math.floor(randomSkills);
    if(randomSkills < 3) { randomSkills = wind; }
    else if(randomSkills < 5) { randomSkills = water; }
    else if(randomSkills < 6) { randomSkills = fire; }
    else if(randomSkills < 7) { randomSkills = staminaSkill; }
    else if(randomSkills < 8) { randomSkills = earth; }
    else if(randomSkills < 9) { randomSkills = lightning; }
    else if(randomSkills < 10) { randomSkills = healthSkill; };
    skillsQueue.innerText = randomSkills.name;
    damageQueue.innerText = randomSkills.damage;
    console.log('random berhasil');
}
// contentsRemoved.push(secondContent);
let user;
let comp;
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');
// EVENT
// event submit
submit.addEventListener('click',e=> {
    if(userName.value == '') {
        alert('Input your username first!');
    } else {
        e.preventDefault();
        // firstContent.style.display = 'none';
        // firstContent.style.display = 'none';
        firstContent.replaceWith(secondContent);
        secondContent.style.display = 'flex'; 
        // secondContent.style.justifyContent = 'center';
    }
})
// choose character

let ifGreen = ()=> {
    green.firstElementChild.innerHTML = userName.value;
    green.style.border = '5px solid #be2e3c';
    blue.style.border = 'none';
    blue.firstElementChild.innerHTML = 'computer';
    // making object character after choosing
    user = new User(green,userName.value,100,100,0,undefined);
    comp = new Computer(blue,compName,100,100,0,undefined);
    userHealthHTML = green.previousElementSibling.previousElementSibling;
    compHealthHTML = blue.previousElementSibling.previousElementSibling;
    userStaminaHTML = green.previousElementSibling;
    compStaminaHTML = blue.previousElementSibling;
};
let ifBlue = ()=> {
    blue.firstElementChild.innerHTML = userName.value;
    blue.style.border = '5px solid #be2e3c';
    green.style.border = 'none';
    green.firstElementChild.innerHTML = 'computer';
    // making object character after choosing
    user = new User(blue,userName.value,100,100,0,undefined);
    comp = new Computer(green,compName,100,100,0,undefined);
    userHealthHTML = blue.previousElementSibling.previousElementSibling;
    compHealthHTML = green.previousElementSibling.previousElementSibling;
    userStaminaHTML = blue.previousElementSibling;
    compStaminaHTML = green.previousElementSibling;
};
green.addEventListener('click',ifGreen);
blue.addEventListener('click',ifBlue);
// choose character end
  

function pickSkills() {
    choosedSkills = skillsQueue.textContent;
    choosedSkillsDamage = damageQueue.textContent;
    randomSkillsButton.removeEventListener('click',randomizeSkills);
    pickSkillsButton.removeEventListener('click',pickSkills);
    console.log('pick berhasil!');
}
function attacking() {
    if(choosedSkills == undefined) {
        alert('Pick your skills first!')
    } else {
        user.Attack();
        attack.removeEventListener('click',attacking); 
        // choosedSkills = undefined;
    };
    
    // randomSkillsButton.removeEventListener('click',randomizeSkills);
    randomizeSkills();
    
    
    console.log('attack berhasil!');
};
let userTimer;
let compTimer;
// event play
play.addEventListener('click', e => {
    
    e.preventDefault();
    // username value check
    if(user == undefined || comp == undefined) {
        alert('Choose your character first!');
    } else {
        // remove event body character
        green.removeEventListener('click',ifGreen);
        blue.removeEventListener('click',ifBlue);
        green.style.cursor = 'default';
        blue.style.cursor = 'default';
        // remove event body character END
        // remove border
        if(user.body == green) {
            user.body.style.border = 'none'
        } else if(user.body == blue) {
            user.body.style.border = 'none'
        };
        // remove border END
        // TRANSFORM CONTENT
        secondContent.style.height = '80%'
        containerCharacter.style.justifyContent = 'space-evenly'
        attack.style.display = 'block';
        healthBorder.forEach(items => {
            items.style.display = 'block';
        });
        staminaBorder.forEach(items => {
            items.style.display = 'block';
        });
        score.style.display = 'block';
        firstTitle.replaceWith(score);
        userNameBoard.innerHTML = userName.value;
        compNameBoard.innerHTML = compName;
        scoreNumber.forEach(el => {
            el.style.backgroundColor = '#dadada';
            el.style.padding = '1rem';
        });
        green.style.width = '300px';
        green.firstElementChild.style.scale = '1.5';
        blue.style.width = '300px';
        blue.firstElementChild.style.scale = '1.5';
        skillsContainer.style.display = 'flex';
        play.replaceWith(attack);
        // TRANSFORM CONTENT END
        randomizeSkills();
        let timerText = document.querySelector('.timer-text');
        let turnInfo = document.querySelector('.turn-info');
        attack.addEventListener('click',attacking);
        pickSkillsButton.addEventListener('click',pickSkills);
        randomSkillsButton.addEventListener('click',randomizeSkills);
        userTimer = ()=>{
            setTimeout( ()=> {
                turnInfo.innerText = `${user.name}'s turn`;
                // randomizeSkills();
            },1000);
            let count = 7;
            let timer = setInterval(()=> {
                count--
                timerText.innerHTML = count;
                if(count <= 0) {
                    clearInterval(timer);
                    compTimer();
                };
                
            },1000);
        };
        compTimer = ()=>{
            setTimeout( ()=> {
                turnInfo.innerText = `${comp.name}'s turn`;
                randomizeSkills();
            },1000);
            let count = 7;
            let timerr = setInterval(()=> {
                randomizeSkills();
                count--
                timerText.innerHTML = count
                attack.removeEventListener('click',attacking);
                pickSkillsButton.removeEventListener('click',pickSkills);
                randomSkillsButton.removeEventListener('click',randomizeSkills);
                if(count <= 0) {
                    comp.Attack();
                    clearInterval(timerr);
                    userTimer();
                    choosedSkills = undefined;
                    attack.addEventListener('click',attacking);
                    pickSkillsButton.addEventListener('click',pickSkills);
                    randomSkillsButton.addEventListener('click',randomizeSkills);
                };
            },1000);
        };
        userTimer();
       
    };
    // else END
});
// event play end




