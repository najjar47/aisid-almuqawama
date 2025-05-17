export class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);

        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'جاري التحميل...', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        loadingText.setOrigin(0.5, 0.5);

        // Loading progress
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
        });

        // When loading completes
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            this.scene.start('MenuScene');
        });

        // Load game assets
        this.loadAssets();
    }

    loadAssets() {
        // Character sprites
        this.load.spritesheet('player', 'assets/sprites/player.png', { 
            frameWidth: 32, 
            frameHeight: 48 
        });

        // Environment assets
        this.load.image('background', 'assets/backgrounds/city.png');
        this.load.image('platform', 'assets/environment/platform.png');
        
        // UI elements
        this.load.image('logo', 'assets/ui/logo.png');
        this.load.image('button', 'assets/ui/button.png');

        // Audio
        this.load.audio('theme', 'assets/audio/theme.mp3');
        this.load.audio('jump', 'assets/audio/jump.mp3');
    }
} 