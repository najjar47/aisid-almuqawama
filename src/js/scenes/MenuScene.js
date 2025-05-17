export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add background
        this.add.image(width / 2, height / 2, 'background')
            .setScale(width / 800)
            .setAlpha(0.5);

        // Add logo
        this.add.image(width / 2, height * 0.2, 'logo')
            .setScale(0.5);

        // Title text
        this.add.text(width / 2, height * 0.3, 'أسد المقاومة', {
            font: 'bold 48px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Credits text in Arabic
        this.add.text(width / 2, height * 0.4, 'تصميم: أسامة النجار (أبو حمزة)', {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Credits text in English
        this.add.text(width / 2, height * 0.45, 'Created by: Osama Al-Najjar (Abu Hamza)', {
            font: '20px Arial',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Progress warning
        const warningText = this.add.text(width / 2, height * 0.52, 'تنبيه: لا يتم حفظ التقدم في اللعبة', {
            font: '20px Arial',
            fill: '#ff9900',
            align: 'center'
        }).setOrigin(0.5);

        // Make warning text blink
        this.tweens.add({
            targets: warningText,
            alpha: 0.5,
            duration: 1000,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        });

        // Create buttons
        this.createButton(width / 2, height * 0.65, 'ابدأ اللعب', () => {
            this.scene.start('GameScene');
        });

        this.createButton(width / 2, height * 0.75, 'التعليمات', () => {
            this.showInstructions();
        });

        // Play theme music
        this.sound.play('theme', { loop: true, volume: 0.5 });
    }

    createButton(x, y, text, callback) {
        const button = this.add.image(x, y, 'button')
            .setInteractive()
            .setScale(2);

        const buttonText = this.add.text(x, y, text, {
            font: '24px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        button.on('pointerover', () => {
            button.setTint(0xcccccc);
        });

        button.on('pointerout', () => {
            button.clearTint();
        });

        button.on('pointerdown', callback);
    }

    showInstructions() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, width, height);

        const instructions = [
            'التحكم:',
            '- اسحب لليمين واليسار للحركة',
            '- انقر للقفز',
            '- اسحب لأسفل للانزلاق',
            '- انقر مرتين للتخفي',
            '',
            'ملاحظة: اللعبة تعمل على جميع الأجهزة'
        ];

        const instructionsText = this.add.text(width / 2, height * 0.3, instructions, {
            font: '24px Arial',
            fill: '#ffffff',
            align: 'right',
            lineSpacing: 10
        }).setOrigin(0.5);

        const closeButton = this.add.text(width / 2, height * 0.8, 'عودة', {
            font: '32px Arial',
            fill: '#ffffff'
        })
        .setOrigin(0.5)
        .setInteractive();

        closeButton.on('pointerdown', () => {
            overlay.destroy();
            instructionsText.destroy();
            closeButton.destroy();
        });
    }
} 