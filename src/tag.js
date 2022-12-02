import kaboom from "kaboom";

kaboom({
    width: 1400,
    height: 1000,
    background: [ 100, 125, 0 ]
});

const hero = "/test/man.png";
const villan2 = "/test/skeleton.png";
const villan = "/test/Pog.png";
const SPEED = 500;
const ENEMY_SPEED = 250;
let dmg = 10;
let time = 0;
let timeA = 0;
const BULLET_SPEED = 600;
let enemyHP = 1000;
let enemyHPC = enemyHP;
let Length = width()/enemyHP;
let canShot = 1;

loadSprite("hero", hero)
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
    add([
        rect(250,100),
        color(BLACK),
        pos(center().sub(110, 110)),
        area(),
        "StartButton",
    ])
    add([
        text("start"),
        pos(center().sub(100, 100))
    ])
    onClick("StartButton", () => go("LevelSelector"))
    

})
scene("LevelSelector", () => {
    add([
        text("Press the enemie you want to fight"),
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

    add([
        rect(300,100),
        color(255,0,255),
        pos(center().sub(150, -300)),
        area(),
        "Back",
        text("Back")
    ])
    onClick("Back", () => go("start"))
  





})
scene("lvl1", () => {

    
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
            //circleAt(10, enemy.pos);
            fireworkAT(20, enemy.pos, dir)
            timeA = 0;
        }
        timeA += 1;
        time += 1;
    })
    
    
    player.onCollide("bullet", () =>{
        destroy(player)
    })
    
    enemy.onCollide("MyB", () =>{
        enemyHP -= dmg;
        if(enemyHP <= 0){
            destroy(enemy);
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

    enemyHP = 2500
    enemyHPC = enemyHP;
    Length = width()/enemyHP
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
        if(timeA >= 50 && enemyHP < enemyHPC/3){
            fireworkAT(20, enemy.pos, dir)
            timeA = 0;
        }
        timeA += 1;
        time += 1;
    })
        
    player.onCollide("bullet", () =>{
        destroy(player)
    })
    
    enemy.onCollide("MyB", () =>{
        enemyHP -= dmg;
        if(enemyHP <= 0){
            destroy(enemy);
        }
        healthbar.set()
    })




})





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

go("start")
