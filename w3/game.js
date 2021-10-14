const config = {
        type: Phaser.WEBGL,
        width: 800,
        height: 600,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        parent: "mygame",
        physics: {
            default: 'arcade'
        },
        backgroundColor: '#4488aa',
        scene: []
    }
     
export default new Phaser.Game(config)

    