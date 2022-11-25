import kaboom from "kaboom";
kaboom({
    width: 1500,
    height: 1000,
    background: [ 255, 125, 0 ]
});
const hero = "https://media.giphy.com/media/3XUmDYg1EytjNtAu7u/giphy.gif";

const villan = "//media.discordapp.net/attachments/805080222755717160/961534665682997248/SlimeGif.gif";
const SPEED = 300;
const ENEMY_SPEED = 250;
loadSprite("hero", hero)
loadSprite("vil", villan)

// Add player game object
const player = add([
    sprite("hero"),
    pos((100, 100)),
    area(),
    origin("center"),
    scale(0.25)
    ])
const enemy = add([
    sprite("vil"),
    pos((1000, 1000)),
    area(),
    state["move"],
    origin("center"),
    "enemy",
])

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
})
player.onCollide("enemy", () =>{
    destroy(player)
})