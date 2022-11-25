import kaboom from "kaboom";
kaboom()
const Sprite1 = "//media.discordapp.net/attachments/805080222755717160/961534665682997248/SlimeGif.gif"
// Load assets
loadSprite("bean", Sprite1)

// Define player movement speed (pixels per second)
const SPEED = 620

// Add player game object
const player = add([
sprite("bean"),
// center() returns the center point vec2(width() / 2, height() / 2)
pos(center()),
])

// onKeyDown() registers an event that runs every frame as long as user is holding a certain key
onKeyDown("left", () => {
// .move() is provided by pos() component, move by pixels per second
player.move(-SPEED, 0)
})

onKeyDown("right", () => {
player.move(SPEED, 0)
})

onKeyDown("up", () => {
player.move(0, -SPEED)
})

onKeyDown("down", () => {
player.move(0, SPEED)
})

// onClick() registers an event that runs once when left mouse is clicked
onClick(() => {
// .moveTo() is provided by pos() component, changes the position
player.moveTo(mousePos())
})

add([
// text() component is similar to sprite() but renders text
text("Press arrow keys", { width: width() / 2 }),
pos(12, 12),
])