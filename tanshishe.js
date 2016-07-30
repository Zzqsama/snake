$(function(){
            for (var i = 0; i < 40; i++) {
                for (var j = 0; j < 40; j++) {
                    var g = Math.floor(Math.random() * 100);
                    var b = Math.floor(Math.random() * 50 + 155);
                    $('<div>').addClass('black')
                        .attr('id', i + '_' + j)
                        .appendTo(".changjing")
                        .css('backgroundColor', 'rgba(0,' + g + ',' + b + ',0.3)')
                }
            }
        var she = [
          {x: 0, y: 0},
          {x: 0, y: 1},
          {x: 0, y: 2},
    ]
    chong();

      function chong () {
          for (var i = 0; i < she.length; i++) {
              $('#' + she[i].x + '-' + she[i].y).removeClass("she");
              
          }

          she = [
              {x: 0, y: 0},
              {x: 0, y: 1},
              {x: 0, y: 2},
          ]
      }


          var shebiao = {
              '0_0': true,
              '0_1': true,
              '0_2': true
          }


          var zhaodian = function (dian) {
              return $('#' + dian.x + '_' + dian.y)
          }
          var init = function () {
              for (i = 0; i < she.length; i++) {
                  zhaodian(she[i]).addClass('she')

              }
          }
          init();
          function shiwus() {
              //不能放身上
              do {
                  var a = Math.floor(Math.random() * 40);
                  var b = Math.floor(Math.random() * 40);
              } while (shebiao[a + '_' + b]);
              $('#' + a + '_' + b).addClass('shiwu');

              return {x: a, y: b};
          }

          var shiwu = shiwus();
          var fen = 0;


//控制方向
          var fangxiang = "right";
          $(document).on('keydown', function (e) {
              e.preventDefault();
              var biao = {
                  'left': 37,
                  'right': 39,
                  'up': 38,
                  'down': 40
              }
              //防止倒车
              if (Math.abs(e.keyCode - biao[fangxiang]) == 2) {
                  return;
              }
              if (e.keyCode == 37) {
                  fangxiang = "left";
              } else if (e.keyCode == 38) {
                  fangxiang = 'up';
              } else if (e.keyCode == 39) {
                  fangxiang = 'right';
              } else if (e.keyCode == 40) {
                  fangxiang = 'down';
              }
          })


          move = function () {
              var jiutou = she[she.length - 1]
              var xintou = {x: jiutou.x, y: jiutou.y + 1}
              if (fangxiang == 'right') {
                  var xintou = {x: jiutou.x, y: jiutou.y + 1};
              } else if (fangxiang == 'down') {
                  var xintou = {x: jiutou.x + 1, y: jiutou.y};
              } else if (fangxiang == 'up') {
                  var xintou = {x: jiutou.x - 1, y: jiutou.y};
              } else if (fangxiang == 'left') {
                  var xintou = {x: jiutou.x, y: jiutou.y - 1};
              }

              if (shebiao[xintou.x + '_' + xintou.y]) {
                  /*alert("撞到自己了");*/
                  over.css({'display': 'block'});
                  chonglai.on('click', function () {

                  })
                  paused();
                  return;
              }

              she.push(xintou);
              shebiao[xintou.x + '_' + xintou.y] = true;
              zhaodian(xintou).addClass('she');
              if ((xintou.x === shiwu.x) && (xintou.y === shiwu.y)) {
                  zhaodian(xintou).removeClass('shiwu')
                  shiwu = shiwus()
                  fen += 10;
                  fenshu.text(fen);
              } else {
                  var weiba = she.shift();
                  delete shebiao[weiba.x + '_' + weiba.y] //删除尾巴
                  zhaodian(weiba).removeClass('she');
              }
              if (xintou.x > 39 || xintou.y > 39 || xintou.x < 0 || xintou.y < 0) {
                  /*alert("死亡");*/
                  over.css({'display': 'block'});
                  chonglai.on('click', function () {

                  })
                  paused();
                  return;
              }
              /*fenshu.text(she.length-3);*/


          }

          var start = $('.start')
          var startgame = $('.start .startgame');
          var jixu = $('.start .jixu');
          var fenshu = $('.changjing .fenshu #fenshu')
          var over = $('.gameover')
          var chonglai = $('.gameover .chonglai')
          var timeId;

          var kaishi = function () {
              clearInterval(timeId)
              timeId = setInterval(move, 50);
              $(".changjing").on('click', function () {
                  paused();
                  start.css({'display': 'block'})
                  jixu.css({'display': 'block'})
                  jixu.on('click', function () {
                      kaishi();
                      start.css({'display': 'none'})
                      jixu.css({'display': 'none'})
                  })
              })
              $(document).on('keydown', function (e) {
                  e.preventDefault();
                  if (e.keyCode == 32) {
                      paused()
                      start.css({'display': 'block'})
                      jixu.css({'display': 'block'})
                      jixu.on('click', function () {
                          kaishi();
                          start.css({'display': 'none'})
                          jixu.css({'display': 'none'})
                      })
                      jixu.on('keydown', function (e) {
                          e.preventDefault();
                          if (e.keyCode == 32) {
                              kaishi();
                              kaishi();
                              start.css({'display': 'none'})
                              jixu.css({'display': 'none'})
                          }
                      })
                  }
              })
          }

          var paused = function () {
              clearInterval(timeId);
          }

          startgame.on('click', function () {
              kaishi();
              start.css({'display': 'none'})
              startgame.css({'display': 'none'})

          });

          chonglai.on('click', function () {
              chong();
          })


  



















})
