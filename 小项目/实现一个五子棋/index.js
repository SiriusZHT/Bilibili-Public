class Gobang {
    constructor(options){
        this.options = options;
        // 获取棋盘 
        this.chessboard = document.getElementById(options.canvas || 'chess');
        // 获取结果
        this.result = document.getElementById('result');
        
        // 初始化
        this.init();
        // 棋盘元素
        this.lattice = {
            width: options.gobangStyle.padding,
            height: options.gobangStyle.padding
        };
    }
    // 初始化 
    init(){
        const {options} = this;
        // 角色 ，1黑色棋子 2白色棋子
        this.role = options.role || 1;
        // 是否已经分出了胜负
        this.win = false;
        // 走棋的记录
        this.history = [];
        // 当前步
        this.currentStep = 0;
        // 结果提示信息
        this.result.innerText = "";
        // 画出棋盘
        this.drawChessBoard();
        // 落子
        this.listenDownChessman();
        //  初始棋盘矩阵
        this.initChessboardMatrix();
    }
    
    // 画出棋盘
    drawChessBoard() {
        const {options} = this;
        const context = this.chessboard.getContext('2d');
        const {count,padding,borderColor} = options.gobangStyle;
        this.chessboard.width = this.chessboard.height = padding * count;
        context.strokeStyle = borderColor;
        context.lineWidth = 2;
        
        for(var i = 0; i < count; i++){
            context.moveTo(15 + i * padding , 15);
            context.lineTo(15 + i * padding , count * padding - 15);
            context.stroke();
            context.moveTo(15 , 15 + i * padding);
            context.lineTo(count * padding - 15 , 15 + i * padding);
            context.stroke();
        }
    }
    // 初始棋盘矩阵
    initChessboardMatrix() {
        const {options} = this;
        const checkerboard = [];
        for(let x = 0; x < options.gobangStyle.count; x++){
            checkerboard[x] = [];
            for(let y = 0; y < options.gobangStyle.count; y++){
                checkerboard[x][y] = 0;
            }
        }
        this.checkerboard = checkerboard;
    }
    // 判断下输赢
    checkReferee(x , y , role) {
        if((x == undefined)||(y == undefined)||(role==undefined)) return;
        // 连杀的分数
        let countContinuous = 0;
        const XContinuous = this.checkerboard.map(x => x[y]);
        const YContinuous = this.checkerboard[x];
        const S1Continuous = [];
        const S2Continuous = [];
        this.checkerboard.forEach((_y,i) => {
            // 左斜线
            const S1Item = _y[y - (x - i)];
            if(S1Item !== undefined){
                S1Continuous.push(S1Item);
            }
            // 右斜线
            const S2Item = _y[y + (x - i)];
            if(S2Item !== undefined) {
                S2Continuous.push(S2Item);
            }
        });
        // 当前落棋点所在的X轴/Y轴/交叉斜轴，只要有能连起来的5个子的角色即有胜者
        [XContinuous, YContinuous, S1Continuous, S2Continuous].forEach(axis => {
            if(axis.some((x, i) => axis[i] !== 0 &&
                    axis[i - 2] === axis[i - 1] &&
                    axis[i - 1] === axis[i] &&
                    axis[i] === axis[i + 1] &&
                    axis[i + 1] === axis[i + 2])) {
                countContinuous++
            }
        });
        // 如果赢了就给出提示
        if(countContinuous){
            this.win = true;
            let msg = (role == 1 ? '黑' : '白') + '子胜利✌️';
            // 提示信息
            this.result.innerText = msg;
            // 不允许再操作
            this.chessboard.onclick = null;
        }

    }
    // 刻画棋子
    drawChessman(x,y,isBlack ){
        const context = this.chessboard.getContext('2d');
        context.beginPath();
        context.arc(15 + x * 30, 15 + y * 30, 13, 0, 2 * Math.PI);// 画圆
        context.closePath();
        //渐变
        var gradient = context.createRadialGradient(15 + x * 30 + 2, 15 + y * 30 - 2, 13, 15 + x * 30 + 2, 15 + y * 30 - 2, 0);
        if(isBlack){ // 黑子
            gradient.addColorStop(0,'#0a0a0a');
            gradient.addColorStop(1,'#636766');
        }else{ // 白子
            gradient.addColorStop(0,'#d1d1d1');
            gradient.addColorStop(1,'#f9f9f9');
        }
        context.fillStyle = gradient;
        context.fill();
        // 每次落子完成后都要判断下输赢
        setTimeout(() => {
            this.checkReferee(x,y,isBlack ? 1 : 2);
        },0);
    }
    // 落子
    listenDownChessman() {
        console.log('落子');
        this.chessboard.onclick = event => {
            // 获取棋子的位置(x,y) => (0,1)
           let {
               offsetX: x,
               offsetY: y
           } = event;
           x = Math.round((x-15) / this.lattice.width);
           y = Math.round((y-15) / this.lattice.height);
            //    console.log(x , y)
           // 空的位置才可以落子
           if(this.checkerboard[x][y] !== undefined && Object.is(this.checkerboard[x][y] , 0)){
                // 落子后更新矩阵,切换角色，并且记录
                this.checkerboard[x][y] = this.role;
                // 刻画棋子
                this.drawChessman(x,y,Object.is(this.role , 1));
                // 落子完之后有可能悔棋之后落子，这种情况下应该重置历史记录
                this.history.length = this.currentStep;
                this.history.push({
                    x,
                    y,
                    role: this.role
                });
                // 保存坐标，切换角色和保存快照
                this.currentStep++;
                this.role = Object.is(this.role , 1) ? 2 : 1;
           }
        }
    }
    // 悔棋
    regretChess() {
        // 找到最后一次记录，回滚到UI，更新矩阵
        if(this.history.length && !this.win){
            const prev = this.history[this.currentStep - 1];
            if(prev){
                const {
                    x,
                    y,
                    role
                } = prev;
                // 销毁棋子
                this.minusStep(x, y);
                this.checkerboard[prev.x][prev.y] = 0
                this.currentStep--
                this.role = Object.is(this.role, 1) ? 2 : 1
            }
        }
    }
    // 撤销悔棋
    revokedRegretChess(){
        const next = this.history[this.currentStep]
        if(next) {
            this.drawChessman(next.x, next.y, next.role === 1)
            this.checkerboard[next.x][next.y] = next.role
            this.currentStep++
            this.role = Object.is(this.role, 1) ? 2 : 1
        }
    }
    // 销毁棋子
    minusStep(x,y) {
        let {options} = this;
        const {count} = options.gobangStyle;
        const context = this.chessboard.getContext('2d');
        context.clearRect(x * 30, y * 30, 30, 30);
        // 重画该圆周围的格子,对边角的格式进行特殊的处理
        if(x<=0 && y <=0){
            this.fixchessboard(15,15,15,30,15,15,30,15);
        }else if(x>=count-1 && y<=0){
            this.fixchessboard(count*30-15,15,count*30-30,15,count*30-15,15,count*30-15,30);
        }else if(y>=count-1 && x <=0){
            this.fixchessboard(15,count*30-15,15,count*30-30,15,count*30-15,30,count*30-15);
        }else if(x>=count-1 && y >= count-1){
            this.fixchessboard(count*30-15,count*30-15,count*30-30,count*30-15,count*30-15,count*30-15,count*30-15,count*30-30);
        }else if(x <=0 && y >0 && y <count-1){
            this.fixchessboard(15,30*y+15,30,30*y+15,15,30*y,15,30*y+30);
        }else if(y <= 0 && x > 0 && x < count-1){
            this.fixchessboard(x*30+15,15,x*30+15,30,x*30,15,x*30+30,15);
        }else if(x>=count-1 && y >0 && y < count-1){
            this.fixchessboard(count*30-15,y*30+15,count*30-30,y*30+15,count*30-15,y*30,count*30-15,y*30+30);
        }else if(y>=count-1 && x > 0 && x < count-1){
            this.fixchessboard(x*30+15,count*30-15,x*30+15,count*30-30,x*30,count*30-15,x*30+30,count*30-15);
        }else{
            this.fixchessboard(15+x*30,y*30,15+x*30,y*30 + 30,x*30,y*30+15,(x+1)*30,y*30+15)
        }
        
    }
    // 修补删除后的棋盘
    fixchessboard (a , b, c , d , e , f , g , h){
        const context = this.chessboard.getContext('2d');
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(a , b);
        context.lineTo(c , d);
        context.moveTo(e, f);
        context.lineTo(g , h);
        context.stroke();
    }
}

// 实例化游戏
let gobangGame = new Gobang({
    canvas: 'chess', // 画布的id
    role: 2, // 角色 1黑色棋子 2白色棋子 ，这里是白色棋子先下
    gobangStyle: {
        // padding不允许改变哦
        padding: 30, // 边和边之间的距离 ,不可修改，这里没考虑到边距的问题
        count: 20, // 正方体的边数
        borderColor: '#bfbfbf' // 描边的颜色
    }
});

// 悔棋
let goback = document.getElementById("goback");
goback.onclick = ()=>{
    gobangGame.regretChess();
}


// 撤销悔棋
let regret = document.getElementById('regret');
regret.onclick = () => {
    gobangGame.revokedRegretChess();
}

// 重新开始
let restart = document.getElementById("restart");
restart.onclick = () => {
    gobangGame.init();
}