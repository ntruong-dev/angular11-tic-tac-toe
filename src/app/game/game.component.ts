import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';
import { Block } from './modals/block';
import { Player } from './modals/player';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  blocks: Block[] = [];
  players: Player[] = [];
  draw = 0;
  lock = false;

  constructor(private gameService: GameService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.blocks = this.gameService.initBlocks();
    this.players = this.gameService.initPlayers();
    this.draw = this.gameService.draw;
  }

  calcBlock(i: number): any {
    if (this.blocks[i].free === false || this.lock === true) { // If Block is already fill, don't Do anything
      return;
    }

    this.gameService.freeBlocksRemaining -= 1; // Reduce no. of free blocks after each selection

    if (this.gameService.freeBlocksRemaining <= 0) {

      this.gameService.draw += 1;
      this.draw = this.gameService.draw;
      this.lock = true;
      this.snackBar.open('Game:', 'Draw', {
        duration: 4000,
      });
      this.replay();
      return;
    }


    this.blocks[i].free = false;

    if (this.gameService.turn === 0) { // Player1 Turn
      this.blocks[i].setValue('tick');

    } else { // Bot Turn
      this.blocks[i].setValue('cross');
    }

    const complete = this.gameService.blockSetComplete();

    if (complete === false) {
      this.changeTurn();
      return;

    } else {
      this.lock = true;
      this.players[this.gameService.turn].score += 1;
      this.snackBar.open('Winner:', 'Player ' + (this.gameService.turn + 1), {
        duration: 4000,
      });

      this.replay();
      return;
    }
  }

  replay(): void {
    this.gameService.freeBlocksRemaining = 9;
    this.blocks = this.gameService.initBlocks();
    this.lock = false;
    this.gameService.turn = 0;
  }

  resetGame(event: Event): void {
    location.reload();
    event.preventDefault();
  }

  botTurn(): any {
    if (this.gameService.freeBlocksRemaining <= 0) {
      return;
    }

    const botSelected = this.gameService.figureBotMove() - 1;

    if (this.blocks[botSelected].free === true) {
      this.calcBlock(botSelected);
    } else {
      this.botTurn();
      return;
    }
  }


  changeTurn(): any {
    const player = this.gameService.changeTurn();

    if (player === 1) { // Bot Turn
      this.botTurn();
    }
  }

}
