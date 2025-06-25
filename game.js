const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 600;

const ChessBoardStartX = 255;
const ChessBoardStartY = 55;
const ChessBlockSize = 61;

let startgame;

whitepawn.onload = () => {
  startgame = new game
}

class game {
  constructor({}={}){

    this.pieces = [
      {color: 'white', pic: whitepawn, x: 0, y: 6, index:0},
      {color: 'white', pic: whitepawn, x: 1, y: 6, index:1},
      {color: 'white', pic: whitepawn, x: 2, y: 6, index:2},
      {color: 'white', pic: whitepawn, x: 3, y: 6, index:3},
      {color: 'white', pic: whitepawn, x: 4, y: 6, index:4},
      {color: 'white', pic: whitepawn, x: 5, y: 6, index:5},
      {color: 'white', pic: whitepawn, x: 6, y: 6, index:6},
      {color: 'white', pic: whitepawn, x: 7, y: 6, index:7},

      {color: 'white', pic: whiterook, x: 0, y: 7, index:8},
      {color: 'white', pic: whiterook, x: 7, y: 7, index:9},

      {color: 'white', pic: whiteknight, x: 1, y: 7, index:10},
      {color: 'white', pic: whiteknight, x: 6, y: 7, index:11},

      {color: 'white', pic: whitebishop, x: 2, y: 7, index:12},
      {color: 'white', pic: whitebishop, x: 5, y: 7, index:13},

      {color: 'white', pic: whitequeen, x: 3, y: 7, index:14},
      {color: 'white', pic: whiteking, x: 4, y: 7, index:15},

      {color: 'black', pic: blackpawn, x: 0, y: 1, index:16},
      {color: 'black', pic: blackpawn, x: 1, y: 1, index:17},
      {color: 'black', pic: blackpawn, x: 2, y: 1, index:18},
      {color: 'black', pic: blackpawn, x: 3, y: 1, index:19},
      {color: 'black', pic: blackpawn, x: 4, y: 1, index:20},
      {color: 'black', pic: blackpawn, x: 5, y: 1, index:21},
      {color: 'black', pic: blackpawn, x: 6, y: 1, index:22},
      {color: 'black', pic: blackpawn, x: 7, y: 1, index:23},

      {color: 'black', pic: blackrook, x: 0, y: 0, index:24},
      {color: 'black', pic: blackrook, x: 7, y: 0, index:25},

      {color: 'black', pic: blackknight, x: 1, y: 0, index:26},
      {color: 'black', pic: blackknight, x: 6, y: 0, index:27},

      {color: 'black', pic: blackbishop, x: 2, y: 0, index:28},
      {color: 'black', pic: blackbishop, x: 5, y: 0, index:29},

      {color: 'black', pic: blackqueen, x: 3, y: 0, index:30},
      {color: 'black', pic: blackking, x: 4, y: 0, index:31},
    ]
    this.moves = [];
    this.turn = 'white';
    this.clicked = 'none';

    this.setupEventListener();
    this.draw();
  }

  setupEventListener(){
    canvas.addEventListener('mousemove', (e)=>{
      let cursorIn = false;
      for (let i = 0; i < this.pieces.length; i++) {
        const piece = this.pieces[i];
        if(
          e.offsetX >= ChessBlockSize * piece.x + ChessBoardStartX && 
          e.offsetX <= ChessBlockSize * piece.x + ChessBoardStartX + ChessBlockSize &&
          e.offsetY >= ChessBlockSize * piece.y + ChessBoardStartY && 
          e.offsetY <= ChessBlockSize * piece.y + ChessBoardStartY + ChessBlockSize
        ){
          cursorIn = true;
        }
      }
      for (let i = 0; i < this.moves.length; i++) {
        const move = this.moves[i];
        if(
          e.offsetX >= ChessBlockSize * move.x + ChessBoardStartX && 
          e.offsetX <= ChessBlockSize * move.x + ChessBoardStartX + ChessBlockSize &&
          e.offsetY >= ChessBlockSize * move.y + ChessBoardStartY && 
          e.offsetY <= ChessBlockSize * move.y + ChessBoardStartY + ChessBlockSize
        ){
          cursorIn = true;
        }
      }
      if(cursorIn){
        canvas.style.cursor = 'pointer';
      } else {
        canvas.style.cursor = 'default';
      }
    });
    canvas.addEventListener('click', (e)=>{
      let pieceClicked = false;
      for (let i = 0; i < this.moves.length; i++) {
        const move = this.moves[i];
        if(
          e.offsetX >= ChessBlockSize * move.x + ChessBoardStartX && 
          e.offsetX <= ChessBlockSize * move.x + ChessBoardStartX + ChessBlockSize &&
          e.offsetY >= ChessBlockSize * move.y + ChessBoardStartY && 
          e.offsetY <= ChessBlockSize * move.y + ChessBoardStartY + ChessBlockSize
        ){
          const index = this.pieces.findIndex(p => p.index === this.clicked.index);
          if (index !== -1) {
            this.pieces.splice(index, 1);
          }

          if(this.pieces.some(p=>p.x === move.x && p.y === move.y)){
            const index = this.pieces.findIndex(p => p.x === move.x && p.y === move.y);
            this.pieces.splice(index, 1);
          }

          this.pieces.push({
            ...this.clicked,
            x: move.x,
            y: move.y
          })
          if(this.turn === 'white'){
            this.turn = 'black'
          } else {
            this.turn = 'white'
          }
          break
        }
      }
      for (let i = 0; i < this.pieces.length; i++) {
        const piece = this.pieces[i];
        if(
          e.offsetX >= ChessBlockSize * piece.x + ChessBoardStartX && 
          e.offsetX <= ChessBlockSize * piece.x + ChessBoardStartX + ChessBlockSize &&
          e.offsetY >= ChessBlockSize * piece.y + ChessBoardStartY && 
          e.offsetY <= ChessBlockSize * piece.y + ChessBoardStartY + ChessBlockSize
        ){
          this.clicked = piece;
          pieceClicked = true;
          break
        }
      }
      if(!pieceClicked){
        this.clicked = 'none';
      }
      this.checkMoves();
    });
  }

  checkMoves(){
    this.moves = [];
    if(this.turn === 'white'){
      if(this.clicked.pic === whitepawn){
        const outOfBounds = (move) =>
              move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;
        if(this.clicked.y === 6){
          this.moves.push(
            {x:this.clicked.x, y:this.clicked.y-1},
            {x:this.clicked.x, y:this.clicked.y-2}
          );
        } else {
          this.moves.push(
            {x:this.clicked.x, y:this.clicked.y-1}
          )
        }
        if(this.pieces.find(p => p.x === this.clicked.x - 1 && p.y === this.clicked.y - 1 && p.color !== this.clicked.color)){
          this.moves.push({x:this.clicked.x - 1, y:this.clicked.y - 1});
        }
        if(this.pieces.find(p => p.x === this.clicked.x + 1 && p.y === this.clicked.y - 1 && p.color !== this.clicked.color)){
          this.moves.push({x:this.clicked.x + 1, y:this.clicked.y - 1});
        }
        for (let i = this.moves.length - 1; i >= 0; i--) {
          const move = this.moves[i];
          if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece1 = this.pieces.find(p => p.x === this.clicked.x && p.y === this.clicked.y - 1);
          const blockingPiece2 = this.pieces.find(p => p.x === this.clicked.x && p.y === this.clicked.y - 2);
          
          if (blockingPiece1) {
            this.moves.splice(blockingPiece1, 1);
            this.moves.splice(blockingPiece2, 1);
            break
          } else if (blockingPiece2) {
            this.moves.splice(blockingPiece2, 1);
            break
          }
        }
      }
      
      if(this.clicked.pic === whiteknight){
        this.moves.push(
          {x:this.clicked.x + 2, y:this.clicked.y + 1},
          {x:this.clicked.x + 2, y:this.clicked.y - 1},
          {x:this.clicked.x - 2, y:this.clicked.y + 1},
          {x:this.clicked.x - 2, y:this.clicked.y - 1},
          {x:this.clicked.x + 1, y:this.clicked.y + 2},
          {x:this.clicked.x + 1, y:this.clicked.y - 2},
          {x:this.clicked.x - 1, y:this.clicked.y + 2},
          {x:this.clicked.x - 1, y:this.clicked.y - 2},
        );
        const outOfBounds = (move) =>
          move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;
      
        for (let i = this.moves.length - 1; i >= 0; i--) {
           const move = this.moves[i];
            if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece = this.pieces.find(p => p.x === move.x && p.y === move.y);
          
          if (blockingPiece) {
            if (blockingPiece.color === this.clicked.color) {
              this.moves.splice(i, 1);
            }
          }
        }
      }

      if (this.clicked.pic === whitebishop) {
        const directions = [
          { dx: 1, dy: 1 },  
          { dx: -1, dy: 1 },  
          { dx: 1, dy: -1 },  
          { dx: -1, dy: -1 } 
        ];

        for (const dir of directions) {
          for (let i = 1; i <= 7; i++) {
            const x = this.clicked.x + dir.dx * i;
            const y = this.clicked.y + dir.dy * i;

            if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
          }
        }
      }

      if(this.clicked.pic === whiterook){
        const directions = [
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: -1, y: 0},
          {x: 0, y: -1},
        ]

        for (const dir of directions) {
         for (let i = 1; i < 8; i++) {
          const x = this.clicked.x + dir.x * i;
          const y = this.clicked.y + dir.y * i;

           if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
         }
        }
      }

      if(this.clicked.pic === whiteking){
        this.moves.push(
          {x:this.clicked.x, y: this.clicked.y + 1},
          {x:this.clicked.x, y: this.clicked.y - 1},
          {x:this.clicked.x + 1, y: this.clicked.y + 1},
          {x:this.clicked.x + 1, y: this.clicked.y - 1},
          {x:this.clicked.x - 1, y: this.clicked.y + 1},
          {x:this.clicked.x - 1, y: this.clicked.y - 1},
          {x:this.clicked.x + 1, y: this.clicked.y},
          {x:this.clicked.x - 1, y: this.clicked.y},
        )
        const outOfBounds = (move) =>
          move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;
        
        for (let i = this.moves.length - 1; i >= 0; i--) {
          const move = this.moves[i];
            if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece = this.pieces.find(p => p.x === move.x && p.y === move.y);
          
          if (blockingPiece) {
            if (blockingPiece.color === this.clicked.color) {
              this.moves.splice(i, 1);
            }
          }
        }
      }

      if(this.clicked.pic === whitequeen){
         const directions = [
          { x: 1, y: 1 },  
          { x: -1, y: 1 },  
          { x: 1, y: -1 },  
          { x: -1, y: -1 },
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: -1, y: 0},
          {x: 0, y: -1},
        ]

        for (const dir of directions) {
         for (let i = 1; i < 8; i++) {
          const x = this.clicked.x + dir.x * i;
          const y = this.clicked.y + dir.y * i;

           if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
         }
        }
      }
  }

    if(this.turn === 'black'){
      if(this.clicked.pic === blackknight){
        this.moves.push(
          {x:this.clicked.x + 2, y:this.clicked.y + 1},
          {x:this.clicked.x + 2, y:this.clicked.y - 1},
          {x:this.clicked.x - 2, y:this.clicked.y + 1},
          {x:this.clicked.x - 2, y:this.clicked.y - 1},
          {x:this.clicked.x + 1, y:this.clicked.y + 2},
          {x:this.clicked.x + 1, y:this.clicked.y - 2},
          {x:this.clicked.x - 1, y:this.clicked.y + 2},
          {x:this.clicked.x - 1, y:this.clicked.y - 2},
        );
        this.draw();
        c.fillStyle = 'green';
        const outOfBounds = (move) =>
          move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;

        for (let i = this.moves.length - 1; i >= 0; i--) {
           const move = this.moves[i];
            if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece = this.pieces.find(p => p.x === move.x && p.y === move.y);
          
          if (blockingPiece) {
            if (blockingPiece.color === this.clicked.color) {
              this.moves.splice(i, 1);
            }
          }
        }
      }

      if(this.clicked.pic === blackpawn){
         const outOfBounds = (move) =>
              move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;
        if(this.clicked.y === 1){
          this.moves.push(
            {x:this.clicked.x, y:this.clicked.y+1},
            {x:this.clicked.x, y:this.clicked.y+2}
          );
        } else {
          this.moves.push(
            {x:this.clicked.x, y:this.clicked.y+1}
          )
        }
        if(this.pieces.find(p => p.x === this.clicked.x - 1 && p.y === this.clicked.y + 1 && p.color !== this.clicked.color)){
          this.moves.push({x:this.clicked.x - 1, y:this.clicked.y + 1});
        }
        if(this.pieces.find(p => p.x === this.clicked.x + 1 && p.y === this.clicked.y + 1 && p.color !== this.clicked.color)){
          this.moves.push({x:this.clicked.x + 1, y:this.clicked.y + 1});
        }
        for (let i = this.moves.length - 1; i >= 0; i--) {
          const move = this.moves[i];
          if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece1 = this.pieces.find(p => p.x === this.clicked.x && p.y === this.clicked.y + 1);
          const blockingPiece2 = this.pieces.find(p => p.x === this.clicked.x && p.y === this.clicked.y + 2);
          
          if (blockingPiece1) {
            this.moves.splice(blockingPiece1, 1);
            this.moves.splice(blockingPiece2, 1);
            break
          } else if (blockingPiece2) {
            this.moves.splice(blockingPiece2, 1);
            break
          }
        }
      }

      if (this.clicked.pic === blackbishop) {
        const directions = [
          { dx: 1, dy: 1 },  
          { dx: -1, dy: 1 },  
          { dx: 1, dy: -1 },  
          { dx: -1, dy: -1 } 
        ];

        for (const dir of directions) {
          for (let i = 1; i <= 7; i++) {
            const x = this.clicked.x + dir.dx * i;
            const y = this.clicked.y + dir.dy * i;

            if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
          }
        }
      }

      if(this.clicked.pic === blackrook){
        const directions = [
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: -1, y: 0},
          {x: 0, y: -1},
        ]

        for (const dir of directions) {
         for (let i = 1; i < 8; i++) {
          const x = this.clicked.x + dir.x * i;
          const y = this.clicked.y + dir.y * i;

           if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
         }
        }
      }

      if(this.clicked.pic === blackking){
        this.moves.push(
          {x:this.clicked.x, y: this.clicked.y + 1},
          {x:this.clicked.x, y: this.clicked.y - 1},
          {x:this.clicked.x + 1, y: this.clicked.y + 1},
          {x:this.clicked.x + 1, y: this.clicked.y - 1},
          {x:this.clicked.x - 1, y: this.clicked.y + 1},
          {x:this.clicked.x - 1, y: this.clicked.y - 1},
          {x:this.clicked.x + 1, y: this.clicked.y},
          {x:this.clicked.x - 1, y: this.clicked.y},
        )
        const outOfBounds = (move) =>
          move.x < 0 || move.x > 7 || move.y < 0 || move.y > 7;
        
        for (let i = this.moves.length - 1; i >= 0; i--) {
          const move = this.moves[i];
            if (outOfBounds(move)) {
            this.moves.splice(i, 1);
            continue;
          }

          const blockingPiece = this.pieces.find(p => p.x === move.x && p.y === move.y);
          
          if (blockingPiece) {
            if (blockingPiece.color === this.clicked.color) {
              this.moves.splice(i, 1);
            }
          }
        }
      }

      if(this.clicked.pic === blackqueen){
         const directions = [
          { x: 1, y: 1 },  
          { x: -1, y: 1 },  
          { x: 1, y: -1 },  
          { x: -1, y: -1 },
          {x: 1, y: 0},
          {x: 0, y: 1},
          {x: -1, y: 0},
          {x: 0, y: -1},
        ]

        for (const dir of directions) {
         for (let i = 1; i < 8; i++) {
          const x = this.clicked.x + dir.x * i;
          const y = this.clicked.y + dir.y * i;

           if (x < 0 || x > 7 || y < 0 || y > 7) break;

            const blockingPiece = this.pieces.find(p => p.x === x && p.y === y);

            if (blockingPiece) {
              if (blockingPiece.color !== this.clicked.color) {
                this.moves.push({ x, y });
              }
              break; 
            }

            this.moves.push({ x, y });
         }
        }
      }
    }

    if(this.clicked === 'none'){
      this.draw();
    }

    this.draw();
    c.fillStyle = 'green';
    for (let i = 0; i < this.moves.length; i++) {
      const move = this.moves[i]; 
      c.fillRect(ChessBlockSize * move.x + ChessBoardStartX, ChessBlockSize * move.y + ChessBoardStartY, ChessBlockSize, ChessBlockSize);
    }
  }

  draw(){
      c.drawImage(boardimg, 250, 50, 500, 500);
      c.drawImage(textimg, 270, 570, 450, 25);
      c.drawImage(numbersimg, 200, 75, 20, 450);

      for (let i = 0; i < this.pieces.length; i++) {
        const piece = this.pieces[i];
        c.drawImage(piece.pic, ChessBlockSize * piece.x + ChessBoardStartX, ChessBlockSize * piece.y + ChessBoardStartY, ChessBlockSize, ChessBlockSize);
      }
  }
  
}