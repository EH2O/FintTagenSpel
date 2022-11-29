import kaboom from "kaboom";

kaboom({
    width: 1500,
    height: 1000,
    background: [ 255, 125, 0 ]
});

const hero = "https://media.giphy.com/media/3XUmDYg1EytjNtAu7u/giphy.gif";

const villan = "/test/Pog.png";
const SPEED = 900;
const ENEMY_SPEED = 250;
let time = 0;
let timeA = 0;
const BULLET_SPEED = 600;
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
    scale(0.1),
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
        if(player.pos.x > 0){
           player.move(-SPEED, 0)  
        }
  
    })
    
    onKeyDown("d", () => {
        if(player.pos.x < width()){
        player.move(SPEED, 0)
        }
    })

    onKeyDown("w", () => {
        if(player.pos.y > 0){
            player.move(0, -SPEED)
        }
    })
    
    onKeyDown("s", () => {
        if(player.pos.y < height()){
            player.move(0, SPEED)
            }
    
    })




onUpdate(() => {
    if (!player.exists()) return
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
			"bullet",
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
                "bullet",
            ])
        }
        timeA = 0;
    }
    timeA += 1;
   time += 1;

})

player.onCollide("enemy", () =>{
    destroy(player)
})
player.onCollide("bullet", () =>{
    destroy(player)
})


