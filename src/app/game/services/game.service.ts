import { Injectable } from '@angular/core';
import { Block } from '../modals/block';
import { Player } from '../modals/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  players: Player[] = [];
  turn = 0; // By Default First Player turn is First
  draw = 0;

  blocks: Block[] = [];
  freeBlocksRemaining = 9;

  constructor() { }

  initBlocks(): Block[] {
    this.blocks = [];

    for (let i = 1; i <= 9; ++i) {
      const block = new Block();

      block.free = true;
      block.value = '';
      block.symbol = '';

      this.blocks.push(block);
    }
    return this.blocks;
  }

  initPlayers(): Player[] {
    // Player1
    const player1 = new Player();
    player1.bot = false;

    // Bot
    const player2 = new Player();


    this.players.push(player1);
    this.players.push(player2);

    return this.players;
  }

  changeTurn(): number {

    if (this.turn === 1) {
      this.turn = 0;
    } else {
      this.turn = 1;
    }

    return this.turn;
  }

  blockSetComplete(): boolean {
    const block1 = this.blocks[0];
    const block2 = this.blocks[1];
    const block3 = this.blocks[2];

    const block4 = this.blocks[3];
    const block5 = this.blocks[4];
    const block6 = this.blocks[5];

    const block7 = this.blocks[6];
    const block8 = this.blocks[7];
    const block9 = this.blocks[8];

    if (
      (!block1.free && !block2.free && !block3.free && (block1.value === block2.value) && (block1.value === block3.value)) ||
      (!block1.free && !block4.free && !block7.free && (block1.value === block4.value) && (block1.value === block7.value)) ||
      (!block1.free && !block5.free && !block9.free && (block1.value === block5.value) && (block1.value === block9.value)) ||
      (!block2.free && !block5.free && !block8.free && (block2.value === block5.value) && (block2.value === block8.value)) ||
      (!block3.free && !block6.free && !block9.free && (block3.value === block6.value) && (block3.value === block9.value)) ||
      (!block3.free && !block5.free && !block7.free && (block3.value === block5.value) && (block3.value === block7.value)) ||
      (!block4.free && !block5.free && !block6.free && (block4.value === block5.value) && (block4.value === block6.value)) ||
      (!block7.free && !block8.free && !block9.free && (block7.value === block8.value) && (block7.value === block9.value))
    ) {
      return true;
    }


    return false;
  }


  figureBotMove(): number {
    // Priortize by checking block that is completing
    let botMove = this.GetCompletingSet();

    if (botMove > 0) {
      return botMove;
    }

    // 2nd Priority Block enemy from completing Set
    botMove = this.blockEnemyAttemptCompleteSet();

    if (botMove > 0) {
      return botMove;
    }

    return Math.floor(Math.random() * 8) + 1;
  }


  /*
		Check if any Block Set is completing
	*/
  GetCompletingSet(): number {

    const block1 = this.blocks[0];
    const block2 = this.blocks[1];
    const block3 = this.blocks[2];

    const block4 = this.blocks[3];
    const block5 = this.blocks[4];
    const block6 = this.blocks[5];

    const block7 = this.blocks[6];
    const block8 = this.blocks[7];
    const block9 = this.blocks[8];

    // Block#1
    if (!block1.free && block2.free && !block3.free && (block1.value === 'cross' && block1.value === block3.value)) {
      return 2;

    } else if (!block1.free && !block2.free && block3.free && (block1.value === 'cross' && block1.value === block2.value)) {
      return 3;

    } else if (!block1.free && block4.free && !block7.free && (block1.value === 'cross' && block1.value === block7.value)) {
      return 4;

    } else if (!block1.free && !block4.free && block7.free && (block1.value === 'cross' && block1.value === block4.value)) {
      return 7;

    } else if (!block1.free && block5.free && !block9.free && (block1.value === 'cross' && block1.value === block9.value)) {
      return 5;

    } else if (!block1.free && !block5.free && block9.free && (block1.value === 'cross' && block1.value === block5.value)) {
      return 9;

      // Block#2
    } else if (!block2.free && !block3.free && block1.free && (block2.value === 'cross' && block2.value === block3.value)) {
      return 1;

    } else if (!block2.free && !block8.free && block5.free && (block2.value === 'cross' && block2.value === block8.value)) {
      return 5;

    } else if (!block2.free && block8.free && !block5.free && (block2.value === 'cross' && block2.value === block5.value)) {
      return 8;

      // Block#3
    } else if (!block3.free && block6.free && !block9.free && (block3.value === 'cross' && block3.value === block9.value)) {
      return 6;

    } else if (!block3.free && block9.free && !block6.free && (block3.value === 'cross' && block3.value === block6.value)) {
      return 9;

    } else if (!block3.free && block5.free && !block7.free && (block3.value === 'cross' && block3.value === block7.value)) {
      return 5;

    } else if (!block3.free && block7.free && !block5.free && (block3.value === 'cross' && block3.value === block5.value)) {
      return 7;

      // Block#4
    } else if (!block4.free && block5.free && !block6.free && (block4.value === 'cross' && block4.value === block6.value)) {
      return 5;

    } else if (!block4.free && block6.free && !block5.free && (block4.value === 'cross' && block4.value === block5.value)) {
      return 6;

      // Block#5
    } else if (!block5.free && block4.free && !block6.free && (block5.value === 'cross' && block5.value === block6.value)) {
      return 4;

      // Block#7
    } else if (!block7.free && block8.free && !block9.free && (block7.value === 'cross' && block7.value === block9.value)) {
      return 8;

    } else if (!block7.free && block9.free && !block8.free && (block7.value === 'cross' && block7.value === block8.value)) {
      return 9;

      // Block#8
    } else if (!block8.free && block7.free && !block9.free && (block8.value === 'cross' && block8.value === block9.value)) {
      return 7;

    } else { // If none is applicable
      return 0;
    }

  }


  /*
		Block Enemy Attempt to Complete Set
	*/
  blockEnemyAttemptCompleteSet(): number {

    const block1 = this.blocks[0];
    const block2 = this.blocks[1];
    const block3 = this.blocks[2];

    const block4 = this.blocks[3];
    const block5 = this.blocks[4];
    const block6 = this.blocks[5];

    const block7 = this.blocks[6];
    const block8 = this.blocks[7];
    const block9 = this.blocks[8];


    // Block#1
    if (!block1.free && block2.free && !block3.free && (block1.value === block3.value)) {
      return 2;

    } else if (!block1.free && !block2.free && block3.free && (block1.value === block2.value)) {
      return 3;

    } else if (!block1.free && block4.free && !block7.free && (block1.value === block7.value)) {
      return 4;

    } else if (!block1.free && !block4.free && block7.free && (block1.value === block4.value)) {
      return 7;

    } else if (!block1.free && block5.free && !block9.free && (block1.value === block9.value)) {
      return 5;

    } else if (!block1.free && !block5.free && block9.free && (block1.value === block5.value)) {
      return 9;

      // Block#2
    } else if (!block2.free && !block3.free && block1.free && (block2.value === block3.value)) {
      return 1;

    } else if (!block2.free && !block8.free && block5.free && (block2.value === block8.value)) {
      return 5;

    } else if (!block2.free && block8.free && !block5.free && (block2.value === block5.value)) {
      return 8;

      // Block#3
    } else if (!block3.free && block6.free && !block9.free && (block3.value === block9.value)) {
      return 6;

    } else if (!block3.free && block9.free && !block6.free && (block3.value === block6.value)) {
      return 9;

    } else if (!block3.free && block5.free && !block7.free && (block3.value === block7.value)) {
      return 5;

    } else if (!block3.free && block7.free && !block5.free && (block3.value === block5.value)) {
      return 7;

      // Block#4
    } else if (!block4.free && block5.free && !block6.free && (block4.value === block6.value)) {
      return 5;

    } else if (!block4.free && block6.free && !block5.free && (block4.value === block5.value)) {
      return 6;

      // Block#5
    } else if (!block5.free && block4.free && !block6.free && (block5.value === block6.value)) {
      return 4;

      // Block#7
    } else if (!block7.free && block8.free && !block9.free && (block7.value === block9.value)) {
      return 8;

    } else if (!block7.free && block9.free && !block8.free && (block7.value === block8.value)) {
      return 9;

      // Block#8
    } else if (!block8.free && block7.free && !block9.free && (block8.value === block9.value)) {
      return 7;

    } else { // If none is applicable
      return 0;
    }
  }
}
