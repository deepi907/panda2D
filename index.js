
    const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')
    canvas.width = 64 * 16
    canvas.height = 64 * 9
   
    let parsedCollisions
         
         let collisionBlocks 

let background
let doors 
const player = new Player({
    
    imageSrc:'./assets/img/Idle.png',
    frameRate: 4,
    animations: {
       idleRight: {
        frameRate: 4,
        frameBuffer: 2,
        loop: true,
        imageSrc:'./assets/img/RightLeftCombo.png',
       }, 
          idleLeft: {
        frameRate: 4,
        frameBuffer: 2,
        loop: true,
        imageSrc:'./assets/img/left.png',
       }, 
             runRight: {
        frameRate: 4,
        frameBuffer: 4,
        loop: true,
        imageSrc:'./assets/img/RightLeftCombo.png',
       }, 
          runLeft: {
        frameRate: 4,
        frameBuffer: 4,
        loop: true,
        imageSrc:'./assets/img/left.png',
    
       },
          enterDoor: {
        frameRate: 4,
        frameBuffer: 2,
        loop: false,
        imageSrc:'./assets/img/enterDoor.png',
        onComplete: () => {
            console.log('completed animation')
          gsap.to(overlay, {
            opacity: 1,
            onComplete: () => {
                level++
                if (level === 3) level = 1
                levels[level].init()
                player.switchSprite('idleRight')
                player.preventInput = false
                gsap.to(overlay, {
                    opacity: 0,
                })
            },
         })
        },
       },
       
    },
})

    let level = 1
    let levels = {
        1: {
            init: () => {
     parsedCollisions = collisionsLevel1.parse2D()
         
          collisionBlocks = parsedCollisions.createObjectsFrom2D()
       player.collisionBlocks = collisionBlocks
       if (player.currentAnimation) player.currentAnimation.isActive = false
 background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/img/backgroundLevel1.png'
})
doors = [
    new Sprite({
        position: {
            x: 767,
            y: 270,
        },
        imageSrc: './assets/img/doorOpen.png',
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    }),
]
            },
        },

 2: {
            init: () => {
     parsedCollisions = collisionsLevel2.parse2D()
         
          collisionBlocks = parsedCollisions.createObjectsFrom2D()
       player.collisionBlocks = collisionBlocks
  player.position.x = 96
  player.position.y = 139
  if (player.currentAnimation) player.currentAnimation.isActive = false
 background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './assets/img/backgroundLevel2.png'
})
doors = [
    new Sprite({
        position: {
            x: 786,
            y: 336,
        },
        imageSrc: './assets/img/doorOpen.png',
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    }),
]
            }
        }

    }
  
    


    const keys = {
        w: {
            pressed: false
        },
        a: {
            pressed: false
        },
        d: {
            pressed: false
        },
    }
  const overlay = {
    opacity: 0,
  }

    function animate() {
        window.requestAnimationFrame(animate)
        
   
    
    background.draw()
    //collisionBlocks.forEach((collisionBlock) => {
      //  collisionBlock.draw()
    //})

     doors.forEach((door) => {
    door.draw()
    })

   player.handleInput(keys)
   player.draw()
    player.update()
c.save()
c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
     c.fillRect(0, 0, canvas.width, canvas.height)
       c.restore() 
    }
    
    levels[level].init()
    animate()
    