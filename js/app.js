'use strict';
class Coordinates {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
};

// Inimigos que nosso jogador deve evitar
class Enemy extends Coordinates {
    constructor( {x = -101, y = 0 } = {} ) {
        super( x, y)
        // As variáveis aplicadas a nossas instâncias entram aqui.
        // Fornecemos uma a você para que possa começcar.

        // A imagem/sprite de nossos inimigos, isso usa um
        // ajudante que é fornecido para carregar imagens
        // com facilidade.
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.random() * 400;
        this.positions = [68, 151, 234];
        this.y = this.positions[Math.floor(Math.random() * this.positions.length)];
    }

    // Atualize a posição do inimigo, método exigido pelo jogo
    // Parâmetro: dt, um delta de tempo entre ticks
    update(dt) {
        // Você deve multiplicar qualquer movimento pelo parâmetro
        // dt, o que garantirá que o jogo rode na mesma velocidade
        // em qualquer computador.
        if(this.x > 505 ) {
            this.x = -101;
            this.y = this.positions[Math.floor(Math.random() * this.positions.length)];
        }
        this.x += this.speed * dt;
        
    }

    // Desenhe o inimigo na tela, método exigido pelo jogo
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Agora, escreva sua própria classe de jogador
// Esta classe exige um método update(), 
// um render() e um handleInput().
class Player extends Coordinates {
    constructor({x = 202, y = 400} = {}) {
        super(x, y)
        this.player = 'images/char-boy.png';
        this.alive = true;
        this.live = 3;
        this.level = 1;
    }

    resetPosition() {
        this.y = 400;
        this.x = 202;
    }

    lose(){
        if( checkCollisions() ) {
            this.live--;
            if ( this.live === 0 ) {
                alert('Acabou suas tentativas');
                this.isDead();
                alert('Atualize a página para voltar a jogar');
            } else {
                alert(`Você perdeu! Agora restam apenas ${this.live} vidas`);
            }
        }
    }

    isDead() {
        if (this.live === 0 ) {
            this.alive = false;
        }
    }
    

    update() {
        if( this.y <= -11 ) {
            setTimeout(() => this.resetPosition(), 1 );
            this.level++;
            nextLevel();
        }
        this.lose();
    }

    render() {
        if( this.alive === true){
            ctx.drawImage(Resources.get(this.player), this.x, this.y);
        }
    }

    handleInput(keyCode) {
        const eixoX = 101;
        const eixoY = 83;

        switch(keyCode) {
            case 'right':
                (this.x >= 400 ) ? this.x = 404 : this.x += eixoX;  
                break;
            case 'left':
                (this.x <= 0 ) ? this.x = 0 : this.x -= eixoX;
                break;
            case 'up':
                if(!(this.y <= -9)){ this.y -= eixoY };
                break;
            case 'down':
                (this.y >= 400 ) ? this.y = 400 : this.y += eixoY;
                break;
        }
    }
}

function nextLevel() {
    if( player.y <= 0 && player.level % 2 === 0) {
        allEnemies.push(new Enemy);
    }
    alert(`Muito bem! Você está no level ${player.level} `)
    allEnemies.forEach(enemy => {
        enemy.speed = Math.random() * 400;
    });
}

const allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];

const player = new Player(); 

function checkCollisions() {
    for (const enemy of allEnemies) {
        if ( Math.floor(enemy.x / 101) === Math.floor(player.x / 101) && Math.floor(enemy.y) === player.y  ) {
            player.resetPosition();
            return true;
        }
    }
}

// Isto reconhece cliques em teclas e envia as chaves para seu
// jogador. método handleInput(). Não é preciso mudar nada.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
