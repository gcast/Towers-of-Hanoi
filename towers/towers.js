(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});


  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.takeTurn = function (start,end){
    start = parseInt(start);
    end = parseInt(end);

    var game = this;

    if (game.move(start,end)) {
      return true
    } else {
      window.alert("Invalid move!")
    };

  };

})(this);


var game = new this.Hanoi.Game();

$(document).ready (function () {

  var move = []

    $('section').on('click', 'ul', function(){
      move.push($(this).attr('id'));
      console.log(move)
      if(move.length === 2) {
        if (game.takeTurn(move[0], move[1]) === true) {
          render();
          if (game.isWon()) {
            window.alert("You win!");
          };
        };
        move = [];
      };
    });

    var render = function(){

        $('li').each(function(){
          var myClass = $(this).attr('class');
          $(this).removeClass(myClass);
        });


        var elemObject = {
          1: "one",
          2: "two",
          3: "three",
        };

        console.log("towers", game.towers[0])

        game.towers.forEach (function (tower, towerIndex) {
          if (tower.length > 0) {
            tower.forEach ( function (el, elIndex) {
            // debugger
              $('#'+ towerIndex + ' li:nth-last-child(' + (elIndex + 1) +')').addClass(elemObject[el])
            });
          };
        });
    };

    render();

});




    //iterate through game array,
    // construct temp array with html elements
    // first pass and only put in numbered elements
    // second pass to fill all arrays with fakes til all have length three    });