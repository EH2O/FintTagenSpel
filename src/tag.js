import kaboom from "kaboom";

kaboom({
    width: 1500,
    height: 1000,
    background: [ 100, 125, 0 ]
});

const hero = "/test/man.png";
const villan2 = "/test/skeleton.png";
const villan = "/test/Pog.png";
const bulletGraphPlace = "/test/bulletWS.png";
const SPEED = 400;
const ENEMY_SPEED = 250;
let dmg = 10;
let time = 0;
let timeA = 0;
const BULLET_SPEED = 600;
let enemyHP = 1000;
let enemyHPC = enemyHP;
let Length = width()/enemyHP;
let canShot = 1;
let cash = 0;
let priceDMG = 5;
let CPlayerHP = 10;
let PlayerHP = 1; 
let priceHEALTH = 1;
let timesWon = 1;
loadSprite("hero", hero)
loadSprite("BUG", bulletGraphPlace, {
    sliceX: 5,

    anims: {
        "idle":{
            from: 0,
            to: 4,
            speed: 4,
            loop: true,
        }
    } 
})
loadSprite("HealthPack", "/test/healthUp.png", {
    sliceX: 5,

    anims: {
        "idle":{
            from: 0,
            to: 4,
            speed: 4,
            loop: true,
        }
    } 
})
loadSprite("vil", villan, {
    sliceX: 4,
    width: 112,
    
    anims: {
        "move":{
            from: 0,
            to: 3,
            speed: 5,
            loop: true,
        }
    } 
})
loadSprite("vil2", villan2, {
    sliceX: 3,
    
    anims: {
        "move":{
            from: 0,
            to: 2,
            speed: 5,
            loop: true,
        }
    } 
})

scene("start", () => {
    stats(dmg, PlayerHP);
    cashDisplay(cash);
    add([
        rect(250,100),
        color(WHITE),
        pos(center().sub(125,100)),
        area(),
        "StartButton",
        text("start")
    ])
    add([
        rect(250,100),
        color(WHITE),
        pos(center().sub(125, 0)),
        area(),
        "upgrade",
        text("upgrades")
    ])

    onClick("StartButton", () => go("LevelSelector"))
    
    onClick("upgrade", () => go("Upgrade"))
    

})
scene("LevelSelector", () => {
    add([
        text("Press the enemy you want to fight"),
        pos(20,0),
        scale(0.9)
    ])
    add([
        rect(300,300),
        color(255,255,0),
        pos(50, height()/2-100),
        area(),
        "Level1",
    ])
    add([
        sprite("vil"),
        pos(25, height()/2-70),
        scale(12),
    ])
    add([
        text("Slimy boi"),
        pos(70, height()/2-170),
        scale(0.5)
    ])
    onClick("Level1", () => go("lvl1"))
    add([
        rect(300,300),
        color(255,255,0),
        pos(450, height()/2-100),
        area(),
        "Level2",
    ])
    add([
        sprite("vil2"),
        pos(480, height()/2-70),
        scale(14),
    ])
    add([
        text("Skeletony boi"),
        pos(470, height()/2-170),
        scale(0.5)
    ])
    onClick("Level2", () => go("lvl2"))

    makeBackButton();
  





})
scene("lvl1", () => {
    cashDisplay(cash);
    stats(dmg, PlayerHP);
    enemyHP = 1000;
    canShot = 1;
    enemyHPC = 1000;
    length = width()/enemyHPC
    CPlayerHP = PlayerHP;
// Add player game object
const player = add([
    sprite("hero"),
    pos((100, 100)),
    area(),
    origin("center"),
    scale(3),
])



    const enemy = add([
        sprite("vil"),
        pos((1000, 1000)),
        area({ scale: 0.6 }),
        state["move"],
        "enemy",
        origin("center"),
        scale(5),
    ])
    enemy.play("move")
    movePlayer(player);

    const healthbar =  add([
        rect(Length*enemyHP, 14),
        color(GREEN), 
        pos(0,0),
        "hp",
        {
            set(Health){
                this.width = Length*enemyHP;
            }
        }
    ])
    
    onUpdate(() => {
        if (!player.exists()) return
        if (!enemy.exists()) return
    
    
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(ENEMY_SPEED))  
        if(time == 20){
        enemyNS(enemy.pos, dir);
        time = 0;
        }
        if(timeA >= 150 && enemyHP < enemyHPC/2){
        circleAt(10, enemy.pos);
        fireworkAT(20, enemy.pos, dir)
            timeA = 0;
        }
        if(timeA == 100){
            DeathAttack(30, enemy.pos);
        }
  
        timeA += 1;
        time += 1;
    })


    
    player.onCollide("bullet",  (bulletHit) =>{
        CPlayerHP -= 1;
        destroyAll("stats")
        stats(dmg, CPlayerHP)
        destroy(bulletHit);
        if(CPlayerHP <= 0){
            destroy(player);
            makeBackButton();
            if(enemyHP < 0)return;
            cash += Math.floor(1000/(enemyHP/3));
        }
            
    })
        
    player.onCollide("enemy", () =>{
        CPlayerHP -= 5;
        destroyAll("stats")
        stats(dmg, CPlayerHP)
        if(CPlayerHP <= 0){
            destroy(player);
            makeBackButton();
            if(enemyHP < 0)return;
            cash += Math.floor(70/(Math.ceil(enemyHP/30)))
        }
            
    })
    
    enemy.onCollide("MyB", (MyBullet) =>{
        enemyHP -= dmg;
  
        destroy(MyBullet);
        if(enemyHP <= 0){
            destroy(enemy);
            cash += 200;
            makeBackButton();
        }
        healthbar.set()
    })

    onClick(shot);
    onMouseDown(shot);
    function shot(){
        if (!player.exists() || !canShot == 1) return
        const Mpos = mousePos();
        const dir2 = Mpos.sub(player.pos).unit()
        add([
            pos(player.pos),
            rect(12,12),
            area(),
            handleout(),
            color(BLUE),
            move(dir2, 1000),
            "MyB",
            "WallB",
            ])
        canShot = 0
        wait(0.25, () => canShot = 1)
    }
    



})
scene("lvl2", () => {
    canShot = 1;
    CPlayerHP = PlayerHP;
    enemyHP = 2500
    enemyHPC = enemyHP;
    Length = width()/enemyHP
    cashDisplay(cash);
    stats(dmg, PlayerHP);
    const player = add([
        sprite("hero"),
        pos((100, 100)),
        area(),
        origin("center"),
        scale(3),
    ])
    
    
    
        const enemy = add([
            sprite("vil2"),
            pos((1000, 700)),
            area({ scale: 0.6 }),
            state["move"],
            "enemy",
            origin("center"),
            scale(5),
        ])
        enemy.play("move")
       movePlayer(player);
    
        const healthbar =     add([
            rect(Length*enemyHP, 14),
            color(GREEN), 
            pos(0,0),
            "hp",
            {
                set(Health){
                    this.width = Length*enemyHP;
                }
            }
        ])
        onClick(shot);
        onMouseDown(shot);


      // ----------------------------------------------------------------------- DO STUFF      
    onUpdate(() => {
        if (!player.exists()) return
        if (!enemy.exists()) return
    
    
        const dir = player.pos.sub(enemy.pos).unit()
        enemy.move(dir.scale(ENEMY_SPEED))  
        if(time == 20){
            enemyNS(enemy.pos, dir);
            time = 0;
        }
        if(timeA >= 30 && enemyHP < enemyHPC){
            fireworkAT(20, enemy.pos, dir)
            timeA = 0;
        }
        timeA += 1;
        time += 1;
    })
        
    player.onCollide("bullet",  (bulletHit) =>{
        CPlayerHP -= 1;
        destroyAll("stats")
        stats(dmg, CPlayerHP)
        destroy(bulletHit);
        if(CPlayerHP <= 0){
            destroy(player);
            makeBackButton();
            if(enemyHP < 0)return;
            cash += Math.floor(1000/(enemyHP/3));
        }
            
    })
        
    player.onCollide("enemy", () =>{
        CPlayerHP -= 5;
        destroyAll("stats")
        stats(dmg, CPlayerHP)
        if(CPlayerHP <= 0){
            destroy(player);
            makeBackButton();
            if(enemyHP < 0)return;
            cash += Math.floor(100/(Math.ceil(enemyHP/30)));
        }
            
    })
    
    enemy.onCollide("MyB", (MyBullet) =>{
        enemyHP -= dmg;
  
        destroy(MyBullet);
        if(enemyHP <= 0){
            destroy(enemy);
            cash += 500;
            makeBackButton();
        }
        healthbar.set()
    })

    cashDisplay(cash);

    function shot(){
        if (!player.exists() || !canShot == 1) return
        const Mpos = mousePos();
        const dir2 = Mpos.sub(player.pos).unit()
        add([
            pos(player.pos),
            rect(12,12),
            area(),
            handleout(),
            color(BLUE),
            move(dir2, 1000),
            "MyB",
            "WallB",
            ])
        canShot = 0
        wait(0.25, () => canShot = 1)
    }
    


})
scene("Upgrade", () => {
    cashDisplay(cash);


    add ([
        rect(300,300),
        color(WHITE),
        area(),
        "MoreDMG",
        pos(460,450),
        origin("center"),
        outline(10, BLACK)

    ])
    stats(dmg, PlayerHP)
    const bulletGraph = add([
        
        sprite("BUG"),
        pos((700, 500)),
        origin("center"),
        scale(10),
        state["idle"],

    ])
    makeBackButton();
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    dmgPrice(priceDMG)
    DisplayHealthPrice(priceHEALTH);
    const healthUp = add([
        sprite("HealthPack"),
        pos(800, 450),
        area(),
        origin("center"),
        scale(10),
        state["idle"],
        "IncreaseHealth"
    ])
    onClick("MoreDMG", () => {
        if(cash >= priceDMG){
        cash -= priceDMG;
        dmg += 10;
        priceDMG = Math.ceil(priceDMG*1.5)
        destroyAll("cashDis");
        cashDisplay(cash);
        dmgPrice(priceDMG);
        DisplayHealthPrice(priceHEALTH);
        stats(dmg, PlayerHP);
    }});
    onClick("IncreaseHealth", () => {
        if(cash >= priceHEALTH){
        cash -= priceHEALTH;
        PlayerHP += 1;
        priceHEALTH = Math.ceil(priceHEALTH*2)
        destroyAll("cashDis");
        cashDisplay(cash);
        dmgPrice(priceDMG);
        DisplayHealthPrice(priceHEALTH);
        stats(dmg, PlayerHP);
    }});
    healthUp.play("idle")
    bulletGraph.play("idle")


})

scene("testing", () => {
    let player = add([
        pos(600, 600),
        color(BLUE),
        rect(20,20)
        
    ])
   movePlayer(player)

    makeEne(10,800);
 
    onUpdate("redBlock", (m) => {
        
        const dir = player.pos.sub(m.pos).sub(rand(vec2(70))).unit()
        m.move(dir.scale(300));
    })
  

})



function movePlayer(player){


    onKeyDown("a", () => {
        if(player.pos.x > 24){
           player.move(-SPEED, 0)  
        }
  
    })
    
    onKeyDown("d", () => {
        if(player.pos.x < width()-24){
        player.move(SPEED, 0)
        }
    })

    onKeyDown("w", () => {
        if(player.pos.y > 67){
            player.move(0, -SPEED)
        }
    })
    
    onKeyDown("s", () => {
        if(player.pos.y < height() -40){
            player.move(0, SPEED)
            }
    
    })
}
//MAKE ENEMIES ------------------------------------------------------------------------------
function makeEne(amount, highPos){
    for(let loops = 0; loops < amount; loops++){
        
        add([
      
            pos(rand(vec2(highPos))),
            rect(12,12),
            color(RED),
            area(),
            solid({scale : 0.5}),
            "redBlock",
        ]) 
    }

}
//End of Function -----------------------------------------------------------------------------

//Needs the angle and a enemy pos
function circleAt(x, Position){
    for(let i = 0; i < 360; i += x ){
        add
        ([
            pos(Position),
            move(Vec2.fromAngle(i), BULLET_SPEED),
            rect(12, 12),
            area(),
            origin("center"),
            color(GREEN),
            handleout(),
            "bullet",
            "WallB",
            "DeathAT",
        ])
    }
}

function fireworkAT(x, test, dir){
    const firework = add([
        pos(test),
        move(dir, BULLET_SPEED/1.4),
        circle(25),
        origin("center"),
        color(GREEN),
        handleout(),
        "bullet",
        "WallB",
 
        
    ])
    wait(1, () =>  {
        circleAt(x, firework.pos)
        destroy(firework)
    })

}

function DeathAttack(x, position){
    circleAt(x, position)

    wait(1, () => {
        every("DeathAT", (test) => {circleAt(x,test.pos)})
       
    } )
}

//Needs a enemy.pos and dir towards the player

function enemyNS(enemy, dir){
      
    add([
        pos(enemy),
        move(dir, BULLET_SPEED),
        rect(12, 12),
        area(),
        cleanup(),
        origin("center"),
        color(GREEN),
        handleout(),
        "bullet",
        "WallB",
    ])
}

function handleout() {
	return {
		id: "handleout",
		require: [ "pos" ],
		update() {
			const spos = this.screenPos()
			if (
				spos.x < 0 ||
				spos.x > width() ||
				spos.y < 0 ||
				spos.y > height()
			) {
				// triggers a custom event when out
				this.trigger("out")
			}
		},
	}
}

on("out", "WallB", (m) => {
	destroy(m)
})


function cashDisplay(cash){
    add ([
        text("Cash: " + cash),
        pos(0, 10),
        "cashDis",
    ])
}
function makeBackButton(){
    add([
        rect(300,100),
        color(255,0,255),
        pos(center().sub(150, -300)),
        area(),
        "Back",
        text("Back")
    ])
    onClick("Back", () => go("start"))
}
function dmgPrice(dmgPrice){
    add ([
        text("Cost: " + dmgPrice),
        pos(300, 250),
        "cashDis",
        scale(0.7),
    ])
}
function DisplayHealthPrice(healthPrice){
    add ([
        text("Cost: " + healthPrice),
        pos(640, 250),
        "cashDis",
        scale(0.7),
    ])
}
function stats(dmg, hp){
    add([
       pos(10, height()-50),
       text("dmg: " + dmg + " HP: " + hp) ,
       "stats",
       scale(0.6),
    ])
}
go("start")
