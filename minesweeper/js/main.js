!function(){var e={476:function(e){e.exports={OPENED_CELL_STATE:"opened",MARKED_CELL_STATE:"marked",MINED_CELL_STATE:"mined",NUMBER_CELL_STATE:"number"}},101:function(e){e.exports={OPENED_CELL_COLOR:"rgb(237, 237, 237)",CLOSED_CELL_COLOR:"rgb(153, 153, 153)",INACTIVE_CELL_COLOR:"rgb(68, 68, 68)",AMOUNT_MINE_COLOR:"black",ERROR_CELL_COLOR:"tomato"}},693:function(e,i,t){const{Model:s}=t(146),{View:n}=t(996),{Controller:h}=t(15);new h(s,n)},15:function(e,i){i.Controller=class{#e;#i;constructor(e,i){this.#e=new e(10,10,10),this.#i=new i,this.#i.draw(this.#e.gameField),this.#t(this.#e.time),this.#s(this.#e.steps),this.#n(this.#e.numberMarkedCells),this.#h(this.#e.numberMines),this.#e.bindShowTime(this.#t),this.#e.bindShowSteps(this.#s),this.#e.bindShowWinStatus(this.#a),this.#e.bindShowLostGameStatus(this.#l),this.#e.bindShowNumberFlags(this.#n),this.#e.bindShowNumberRemainingMines(this.#h),this.#e.bindDrawLostGame(this.#m),this.#e.bindCellChanged(this.#o),this.#e.bindHandleEndGame(this.#r),this.#i.bindOpenCell(this.#d),this.#i.bindMarkCell(this.#w)}#t=e=>{this.#i.showTime(e)};#s=e=>{this.#i.showSteps(e)};#n=e=>{this.#i.showNumberFlags(e)};#h=e=>{this.#i.showNumberRemainingMines(e)};#a=e=>{this.#i.showWinStatus(e)};#l=e=>{this.#i.showLostGameStatus(e)};#m=e=>{this.#i.drawLostGame(e)};#r=()=>{this.#i.handleEndGame()};#o=(e,i)=>{this.#i.draw(e,i)};#d=(e,i)=>{this.#e.openCell(e,i)};#w=(e,i)=>{this.#e.markCell(e,i)}}},146:function(e,i,t){const{makeRandomNumber:s}=t(637),{OPENED_CELL_STATE:n,MARKED_CELL_STATE:h,MINED_CELL_STATE:a,NUMBER_CELL_STATE:l}=t(476);i.Model=class{#u=[];#g=!1;#E=!1;#C;#S;#p="win";#L="gameOver";#_;#c;#T;#b;#F=0;#I=0;#M=0;#N=0;#G={minutes:0,seconds:0};#H={[n]:!1,[h]:!1,[a]:!1,[l]:0};#t;#s;#n;#h;#a;#l;#m;#r;#o;constructor(e,i,t){if(e*i<=t)throw new Error("Wrong number of mines");this.#_=e,this.#c=i,this.#b=e*i,this.#T=t,this.#A()}bindCellChanged(e){this.#o=e}bindShowSteps(e){this.#s=e}bindShowTime(e){this.#t=e}bindShowNumberFlags(e){this.#n=e}bindShowNumberRemainingMines(e){this.#h=e}bindShowWinStatus(e){this.#a=e}bindShowLostGameStatus(e){this.#l=e}bindDrawLostGame(e){this.#m=e}bindHandleEndGame(e){this.#r=e}get time(){return this.#G}get steps(){return this.#N}get numberMarkedCells(){return this.#F}get numberMines(){return this.#T}get gameField(){return this.#u}#O(){let e=Date.now(),i=0;this.#C=setInterval(function(){let t=Math.trunc((Date.now()-e)/1e3);60===t&&(t=0,e=Date.now(),i+=1);const s={minutes:i,seconds:t};this.#G={...s},this.#t(s)}.bind(this),1e3)}#x(){clearInterval(this.#C),this.#C=null}#A(){for(let e=0;e<this.#_;e+=1){this.#u[e]=[];for(let i=0;i<this.#c;i+=1)this.#u[e][i]={...this.#H}}}#f(e,i){for(let t=0;t<this.#T;t+=1){let t,n;do{t=s(this.#_),n=s(this.#c)}while(t===e&&n===i||!0===this.#u[t][n][a]);this.#u[t][n][a]=!0}}#D(){this.#u.forEach(this.#v.bind(this))}#v(e,i){e.forEach(((e,t)=>{this.#R(i,t).forEach((e=>this.#k(e,i,t)))}))}#k(e,i,t){const{rowIndex:s,cellIndex:n}=e;this.#u[s][n][a]&&(this.#u[i][t][l]+=1)}#R(e,i){const t=[];return this.#u[e][i-1]&&t.push({rowIndex:e,cellIndex:i-1}),this.#u[e-1]&&this.#u[e-1][i]&&t.push({rowIndex:e-1,cellIndex:i}),this.#u[e][i+1]&&t.push({rowIndex:e,cellIndex:i+1}),this.#u[e+1]&&this.#u[e+1][i]&&t.push({rowIndex:e+1,cellIndex:i}),this.#u[e+1]&&this.#u[e+1][i-1]&&t.push({rowIndex:e+1,cellIndex:i-1}),this.#u[e-1]&&this.#u[e-1][i-1]&&t.push({rowIndex:e-1,cellIndex:i-1}),this.#u[e-1]&&this.#u[e-1][i+1]&&t.push({rowIndex:e-1,cellIndex:i+1}),this.#u[e+1]&&this.#u[e+1][i+1]&&t.push({rowIndex:e+1,cellIndex:i+1}),t}openCell(e,i){this.#g||(this.#f(e,i),this.#g=!0),this.#E||(this.#D(),this.#E=!0),this.#u[e][i][n]||(this.#N+=1,this.#s(this.#N)),this.#u[e][i][a]&&!this.#u[e][i][h]?(this.#u[e][i][n]=!0,this.#M+=1,this.#x(),this.#S=this.#L,this.#m(this.#u),this.#l("Game over. Try again"),this.#r()):this.#u[e][i][n]||this.#u[e][i][h]||(this.#u[e][i][n]=!0,this.#M+=1,this.#C||this.#O(),0===this.#u[e][i][l]&&this.#W(e,i)),this.#I===this.#T&&this.#M+this.#I===this.#b&&(this.#x(),this.#S=this.#p,this.#a(`Win! You found all the mines in ${this.#G.minutes} minutes \n        ${this.#G.seconds} seconds and ${this.#N} moves!`),this.#r()),this.#S!==this.#L&&this.#o(this.#u)}#W(e,i){this.#R(e,i).forEach((e=>this.#P(e,this.#W.bind(this))))}#P(e,i){const{rowIndex:t,cellIndex:s}=e;this.#u[t][s][a]||this.#u[t][s][n]||(this.#u[t][s][n]=!0,this.#M+=1,this.#u[t][s][h]&&(this.#u[t][s][h]=!1),0===this.#u[t][s][l]&&i(t,s))}markCell(e,i){this.#u[e][i][n]||(this.#N+=1,this.#s(this.#N)),this.#u[e][i][n]||this.#u[e][i][h]||this.#u[e][i][a]?this.#u[e][i][n]||!this.#u[e][i][h]||this.#u[e][i][a]?this.#u[e][i][n]||this.#u[e][i][h]||!this.#u[e][i][a]?!this.#u[e][i][n]&&this.#u[e][i][h]&&this.#u[e][i][a]&&(this.#u[e][i][h]=!1,this.#F-=1,this.#I-=1):(this.#u[e][i][h]=!0,this.#F+=1,this.#I+=1):(this.#u[e][i][h]=!1,this.#F-=1):(this.#u[e][i][h]=!0,this.#F+=1),this.#I===this.#T&&this.#M+this.#I===this.#b&&(this.#x(),this.#S=this.#p,this.#a(`Win! You found all the mines in ${this.#G.minutes} minutes \n        ${this.#G.seconds} seconds and ${this.#N} moves!`)),this.#n(this.#F),this.#h(this.#T-this.#I),this.#o(this.#u,this.#S)}}},996:function(e,i,t){const{OPENED_CELL_STATE:s,NUMBER_CELL_STATE:n,MINED_CELL_STATE:h,MARKED_CELL_STATE:a}=t(476),{OPENED_CELL_COLOR:l,CLOSED_CELL_COLOR:m,INACTIVE_CELL_COLOR:o,AMOUNT_MINE_COLOR:r,ERROR_CELL_COLOR:d}=t(101);i.View=class{#y="game-field";#U="playing field for the classic minesweeper game";#$="./assets/img/icons/naval-mine.png";#K="./assets/img/icons/flag.png";#B=40;#V=40;#X=30;#Y=30;#j="20px serif";#q=document.getElementById("root");#z=this.createElement({tag:"div",classes:["main"]});#J=this.createElement({tag:"div",classes:["main__container","container"]});#Q=this.createElement({tag:"div",classes:["minesweeper"]});#Z=this.createElement({tag:"div",classes:["minesweeper__container"]});#ee=this.createElement({tag:"div",classes:["minesweeper__game"]});#ie=this.createElement({tag:"div",classes:["minesweeper__display"]});#te=this.createElement({tag:"output",classes:["minesweeper__game-status"]});#se=this.createElement({tag:"output",classes:["minesweeper__time"]});#ne=this.createElement({tag:"output",classes:["minesweeper__steps"]});#he=this.createElement({tag:"output",classes:["minesweeper__flags"]});#ae=this.createElement({tag:"output",classes:["minesweeper__mines"]});#u=this.createElement({tag:"canvas",id:this.#y,classes:["minesweeper__game-field"]});#le=this.#u.getContext("2d");constructor(){this.#ee.prepend(this.#u),this.#Z.prepend(this.#ee,this.#ie),this.#ie.prepend(this.#se,this.#ne,this.#he,this.#ae,this.#te),this.#Q.append(this.#Z),this.#J.append(this.#Q),this.#z.append(this.#J),this.#u.textContent=this.#U,this.#q.prepend(this.#z)}createElement(e={}){const{tag:i,id:t,classes:s,attributeName:n,attributeValue:h}=e,a=document.createElement(i);return t&&(a.id=t),s&&a.classList.add(...s),n&&h&&a.setAttribute(n,`${h}`),a}showTime(e={}){let{minutes:i,seconds:t}=e;i<10&&(i=`0${i}`),t<10&&(t=`0${t}`),this.#se.textContent=`Time: ${i}:${t}`}showSteps(e){this.#ne.textContent=`Steps: ${e}`}showNumberFlags(e){this.#he.textContent=`Flags: ${e}`}showNumberRemainingMines(e){this.#ae.textContent=`Remaining mines: ${e}`}showWinStatus(e){this.#te.textContent=e}showLostGameStatus(e){this.#te.textContent=e}handleEndGame(){this.removeEventHandler(this.#u,"oncontextmenu"),this.removeEventHandler(this.#u,"onclick")}draw(e){const i=e.length,t=e[0].length;this.#u.width=this.#B*t,this.#u.height=this.#V*i,e.forEach(((e,i)=>{e.forEach(((e,t)=>{e[s]?this.#me(i,t,e):e[a]?(this.#oe(i,t,this.#K),this.#re(i,t)):this.#re(i,t)}))}))}drawLostGame(e){e.forEach(((e,i)=>{e.forEach(((e,t)=>{e[s]||e[a]?this.#me(i,t,e):this.#de(i,t),e[a]&&(this.#oe(i,t,this.#K),e[h]?this.#de(i,t):this.#we(i,t)),e[h]&&!e[a]&&(this.#oe(i,t,this.#$),e[s]?this.#we(i,t):this.#de(i,t))}))}))}#ue(e,i,t){this.#le.strokeRect(i*this.#B,e*this.#V,this.#B,this.#V),this.#le.fillStyle=t,this.#le.fillRect(i*this.#B,e*this.#V,this.#B,this.#V)}#we(e,i){this.#ue(e,i,d)}#de(e,i){this.#ue(e,i,o)}#oe(e,i,t){const s=t=>{this.#le.drawImage(t,i*this.#B+(this.#B-this.#X)/2,e*this.#V+(this.#V-this.#Y)/2,this.#X,this.#Y)},n=new Image;n.src=t,n.onload=()=>{s(n)}}#me(e,i,t){this.#ue(e,i,l),t[n]>0&&(this.#le.textAlign="center",this.#le.textBaseline="middle",this.#le.font=this.#j,this.#le.fillStyle=r,this.#le.fillText(t[n],i*this.#B+this.#B/2,e*this.#V+this.#V/2))}#re(e,i){this.#ue(e,i,m)}bindOpenCell(e){this.#u.onclick=i=>{this.#ge(i,e)}}bindMarkCell(e){this.#u.oncontextmenu=i=>{this.#ge(i,e)}}#ge(e,i){e.preventDefault();const t=e.offsetX,s=e.offsetY;i(Math.floor(s/this.#V),Math.floor(t/this.#B))}removeEventHandler(e,i){e[i]=null}}},637:function(e,i){i.makeRandomNumber=e=>Math.floor(Math.random()*e)}},i={};!function t(s){var n=i[s];if(void 0!==n)return n.exports;var h=i[s]={exports:{}};return e[s](h,h.exports,t),h.exports}(693)}();