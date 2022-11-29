import kaboom from "kaboom";

kaboom({
    width: 1500,
    height: 1000,
    background: [ 255, 125, 0 ]
});

const hero = "/test/man.png";

const villan = "/test/Pog.png";
const SPEED = 1000;
const ENEMY_SPEED = 250;
let time = 0;
let timeA = 0;
const BULLET_SPEED = 600;
let enemyHP = 1000;
const Length = width()/enemyHP;
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


		add([
			pos(enemy.pos),
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
        time = 0;
    }
    if(timeA == 100){
        for(let i = 0; i < 360; i += 20 ){
            add
            ([
                pos(enemy.pos),
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
        timeA = 0;
    }
    timeA += 1;
   time += 1;
})


player.onCollide("bullet", () =>{
    destroy(player)
})

enemy.onCollide("MyB", () =>{
    enemyHP -= 10;
    if(enemyHP <= 0){
        destroy(enemy);
    }
    healthbar.set()
})
onClick(shot);
function shot(){
    if (!player.exists()) return
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

