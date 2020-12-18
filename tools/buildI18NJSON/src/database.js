var textAll = {
    "gb": {
        a:1,
        'filter': {
            filter_title: '选择赛事',
            All: '全部',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: '王者荣耀',

            submit: '提交',
            featured: '精选',
            selectAll: '全选',
            reset: '重置',
            cancel: '取消', 
            cookie_tip: '注：保存本窗口中的设置需您的浏览器支持并开启Cookie。'
        },
        'base':{
            'week':["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                'all': '全',
                '1st': '上',
                '2nd': '下',
                'ot': '加',
                'kills': '击杀数',
                'moneys': '经济',
                'pushTowers': '推塔',
                'dragon': '小龙',
                'baron': '大龙',
                'barracks': '兵营',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    var w = ['零','一','二','三','四','五','六','七','八','九','十'];
                    return "第" + w[num] + "局";
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num;
                },
                'gameEnd': '已完场', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': '得分',
                'pup_scoreNone': '取消得分',
                'FirstBlood': '一血',
                'FirstTurret': '首塔',
                'FirstBaron': '首大龙',
                'FirstDragon': '首小龙',
                'FirstBarrack': '首兵营',
                'stHalf1': '上半场手枪胜方',
                'stHalf2': '下半场手枪胜方',
                'team_side':'阵容',
                'live': '直播',
                'live_video':'直播分享:',
                'to_top':'置顶',
                'to_bottom':'取消置顶',
                'analyse':'分析',
                'analyseTitle':'数据分析'
            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: '未开始',
                1: '进行中',
                3: '延期',
                5: '待定'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: '红',
                2: '蓝'
            },
            'camp_dota2': {
                1: '魇',
                2: '辉'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                'select': '精选比赛',
                'all': '全部比赛',
                'category': '按联赛显示',
                'time': '按时间显示',
                'refresh': '点击：刷新页面',
                'openSound': '点击：打开提示音',
                'offSound': '点击：关闭提示音',
                'list_show_tip':'列表显示：'
            },

        },
        tips: {
            no_support: '抱歉，您的浏览器当前版本过低，无法实时更新比分数据，请升级至最新版!',
            no_data: '暂无数据',
            to_top:'页面顶部'
        },
        video: {
            alert: '比赛暂未开始'
        },
        menu: '电竞比分', 
        'result': {
            'calendar': '日历',
            'schedule': '最新赛程',
            'afterGame': '完场赛事'
        },
        'common_header': {
            'live': "实时赛况",
        },
        "goaldata": {
            'lookLive': '看直播',
            
            'needAnthorName': {
                'lol': {
                    'barracks': '水晶'
                }
            },
            "roshan": "肉山",

            "summonerSkill": "英雄/技能",
            "hero": "英雄",
            "skill": "技能",
            "heroLevel": "等级",
            "kda": "K/D/A",
            "rop": "参团率",
            "lastHits": "正补",
            "creepKills": "补刀",
            "creepDenies": "反补",
            "exports": "伤害",
            "hurts": "承伤",
            "equipment": "装备",
            "firstHalfWins": "上半场",
            "secondHalfWins": "下半场",
            "otWins": "加时",
            "Khs": "K(hs)",
            "D": "D",
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            "no_game_data": "暂无赛事数据",
            "loading_game_data": "数据更新中，请稍后重试",
            "ground":function(num){
                return '第'+num+'局';
            },
            //新增
            "goldDiff":"经济差",
            "teamGold":"团队经济",
            "teamCreepKill":"团队补刀",
            "time":"时间"

        },
        "analyse":{
            "winRate":"胜率",
            "avgKills":"场均击杀",
            "avgTimeLen":"场均时长",
            "firstBloodRate":"一血率",
            "firstTowerRate":"一塔率",
            "firstRouShanRate":"首肉山率",
            "firstBaronRate":"首大龙率",
            "firstDragonRate":"首小龙率",
            "firstHalfPistolRate":"上半场<br/>手枪局胜率",
            "secondHalfPistolRate":"下半场<br/>手枪局胜率",
            "recentRound":function(num){
                return '最近'+num+'场';
            },
            'league':'赛事',
            'betTime':'比赛时间',
            'team':'战队',
            'score':'比分',

            'data_comp':'数据对比',
            'h2h_rc':'交锋往绩',
            'past_rc':'以往战绩',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span>近<i class="total">0</i>场 </span>'+
                '<span class="win_box"><i class="win">0</i>胜</span><span class="lost_box"><i class="lost">0</i>负</span>'+
                '<span>胜率：<i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'友情链接',
        //新增
        'apply':{
            style:'样式',
            width:'宽度',
            widthNote:'注：宽度最小为740，可设置具体数字，也可设置百分比，例如100%',
            TimeZone:'时区',
            TimeZoneNote:'注：“时区设置”可根据贵站大多数访问者所在地的时区进行设置，以便用户以当地时间浏览比分，以达到最佳观看效果。',
            colorStyle:'风格',
            darkBlue:'深蓝',
            red:'红色',
            green:'绿色',
            blue:'蓝色',
            codeAndResult:'代码与效果',
            codeNote1:'生成调用URL：即调用页面的网址，只要将网址直接打开，或者放入框架页，即可显示比分信息。',
            codeNote2:'生成调用代码：即调用页面的调用代码，只要将其放入网页中，即可显示比分信息。',
            preview:'预览效果',
            getUseUrl:'生成调用URL',
            getUseCode:'生成调用代码',
            copyCode:'复制代码',
            emailTip1:'为给您提供更好的服务，请留下您的邮箱',
            emailTip2:'请输入您的邮箱账号',
            freeUseTip1:'免费调用',
            freeUseTip2:'7M 电竞即时比分页',
            smallTip:'您只需要完成以下信息配置即可使用',
            live:'即时比分',
            result:'完场',
            fixture:'赛程',
            yes:'确定',
            captchaTip1:'请先通过下方的智能验证',
            captchaTip2:'请输入正确的邮箱格式',
            captchaTip3:'点击按钮开始智能验证',
            captchaTip4:'验证成功',
            captchaTip5:'验证失败，请在此点击按钮刷新',
            captchaTip6:'智能检测中',
            copyTip1:'已复制到粘贴板',
            copyTip2:'您的浏览器暂不支持此操作',
            copyTip3:'请先生成地址或代码'
        },
        dataBank: {
            internation: '国际',
            europe: '欧洲',
            asia: '亚洲',
            america: '美洲',
            others: '其他',
            ing: '赛季中'//赛季中
        },
        news: {
            point: '焦点',
            runs: '第_局'
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                return stateTime + ' 至 ' + endTime;  
            },
            season: '选择赛季',
            stage: '选择阶段',
            number: '局数',
            integrals: '积分表',
            point: '积分',
            team_top: '战队榜',
            player_top: '选手榜',
            match_short: '赛事简称',
            hold_time: '举办时间',
            hold_site: '举办地',
            url: '官网地址',
            recommended: '推荐',
            rank: '排名',
            win: '胜',
            draw: '平',
            loss: '负',
            match_explain: '赛事说明',
            match_session: '比赛场次',
            durationPerGame: '局均时长',
            turretsPerGame: '局均推塔',
            boutTurretsPerGame: '场均推塔',
            at1stHalfWinRate: '上半场手枪获胜率',
            at2ndHalfWinRate: '下半场手枪获胜率',
            player: '选手',
            kda: 'KDA',
            kd: 'K/D',
            belong_team: '所属战队',
            appearance: '出场次数',
            killsPerGame: '局均击杀数',
            deathsPerGame: '局均死亡数',
            assistsPerGame: '局均助攻数',
            boutKillsPerGame: '场均击杀数',
            boutDeathsPerGame: '场均死亡数',
            boutAssistsPerGame: '场均助攻数',
            goldPerMinute: '分均经济',
            damageDealtPerMinute: '分均伤害',
            damageTakenPerMinute: '分均承伤',
            lastHitsPerMinute: '分均正补',
            creepDeniesPerMinute: '分均反补',
            creepKillsPerMinute: '分均补刀',
            headshotPercentage: '爆头率',
            killsPerRound: '回合击杀数',
            assistsPerRound: '回合助攻数',
            deathsPerRound: '回合死亡数', 
            total: '局总数',
            count_win_rate: '局胜率'
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                // return time + '成立 / ' + (country? country : '-');
                return (time? time + '成立 / ': '-/') + (country? country : '-');
            },
            abbreviation: '简称',
            recentRecords: '近期战绩',
            type: '战队类型',
            details: '详细',
            wl: function (win, loss) {
                return '<span style="color: #d3b47e">' + win +'胜</span><span style="color: #204b82">' + loss + '负</span>'  
            },
            club: function (num) {
                return {
                    0: '-',
                    1: '俱乐部',
                    2: '国家',
                    3: '临时'    
                }[num]    
            },
            allMatch: '全部赛事',
            noIntro: '暂无战队简介',
            noLineUpData: '暂无阵容数据',
            fitures_results: '赛程赛果',
            data: '数据',
            profile: '战队简介：',
            lineUp: '战队阵容',
            gamePlayed: '总场数',
            win: '胜场数',
            draw: '和场数',
            loss: '失败数',
            statistics: '数据统计',
            headshotsPerGame: '局均爆头数',
            recentEncounters: function (n) {
                return '近 ' + n + ' 场交锋';
            },
            winPercent: function (win, loss) {
                return win + '胜 ' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return loss + '负 ' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                return (time || '-') + ' / ' + (country? country : '-');
            },
            name: '姓名',
            position: '位置',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助
                1: {
                    1: '抗压路',
                    3: '中路',
                    4: '优势路',
                    5: '辅助'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助
                2: {
                    1: '上路',
                    2: '打野',
                    4: '下路',
                },
                // 王者荣耀 0 未知 1 边路 2 打野 3 中路 4 射手 5 辅助
                4: {
                    1: '边路',
                    4: '射手',
                }
                
            },
            team: '效力战队',
            overallData: '综合数据',
            teammates: '同队选手',
            noPlayerData: '暂无选手数据',
            noHeroData: '暂无英雄数据',
            matchRecords: '比赛记录',
            mostPicks: '常用英雄',
            none: '无',
            appearance: function (n) {
                return '出场' + n + '次';
            },
            moreFixtures: '更多赛程',
            gameOfNumber: function (n) {
                return '第' + n + '局';
            }
        }
    },
    "big": {
        'filter': {
            filter_title: '選擇賽事',
            All: '全部',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: '王者榮耀',

            submit: '提交',
            featured: '精選',
            selectAll: '全選',
            reset: '重置',
            cancel: '取消',

            cookie_tip: '註：保存本窗口中的設置需您的瀏覽器支持並開啟Cookie。'
        }, 
        'base':{
            'week':["周日", "周壹", "周二", "周三", "周四", "周五", "周六"]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                'all': '全',
                '1st': '上',
                '2nd': '下',
                'ot': '加',
                'kills': '擊殺數',
                'moneys': '經濟',
                'pushTowers': '推塔',
                'dragon': '小龍',
                'baron': '大龍',
                'barracks': '兵營',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    var w = ['零','壹','二','三','四','五','六','七','八','九','十'];
                    return "第" + w[num] + "局";
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num;
                },
                'gameEnd': '已完場', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': '得分',
                'pup_scoreNone': '取消得分',
                'FirstBlood': '壹血',
                'FirstTurret': '首塔',
                'FirstBaron': '首大龍',
                'FirstDragon': '首小龍',
                'FirstBarrack': '首兵營',
                'stHalf1': '上半場手槍勝方',
                'stHalf2': '下半場手槍勝方',
                'team_side':'陣容',
                'live': '直播',
                'live_video':'直播分享:',
                'to_top':'置頂',
                'to_bottom':'取消置頂',
                'analyse':'分析',
                'analyseTitle':'數據分析'
            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: '未開始',
                1: '進行中',
                3: '延期',
                5: '待定'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: '紅',
                2: '藍'
            },
            'camp_dota2': {
                1: '魘',
                2: '輝'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                'select': '精選比賽',
                'all': '全部比賽',
                'category': '按聯賽顯示',
                'time': '按時間顯示設置',
                'refresh': '點擊：刷新頁面',
                'openSound': '點擊：打開提示音',
                'offSound': '點擊：關閉提示音',
                'list_show_tip':'列表顯示：'
            }
        },
        tips: {
            no_support: '抱歉，您的瀏覽器當前版本過低，無法實時更新比分數據，請升級至最新版!',
            no_data: '暫無數據',
            to_top:'頁面頂部'
        },
        video: {
            alert: '比賽暫未開始'
        },
        menu: '電競比分',

        'result': { // textAll[lan]["result"]['calendar']
            'calendar': '日歷',
            'schedule': '最新賽程',
            'afterGame': '完場賽事'
        },
        'common_header': {
            'live': "實時賽況",
        },
        "goaldata": {
            'lookLive': '看直播',
            
            'needAnthorName': {
                'lol': {
                    'barracks': '水晶'
                }
            },
            "roshan": "肉山",

            "summonerSkill": "英雄/技能",
            "hero": "英雄",
            "skill": "技能",
            "heroLevel": "等級",
            "kda": "K/D/A",
            "rop": "參團率",
            "lastHits": "正補",
            "creepKills": "補刀",
            "creepDenies": "反補",
            "exports": "傷害",
            "hurts": "承傷",
            "equipment": "裝備",

            "firstHalfWins": "上半場",
            "secondHalfWins": "下半場",
            "otWins": "加時",
            "Khs": "K(hs)",
            "D": "D",
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            "no_game_data": "暫無賽事數據",
            "loading_game_data": "數據更新中，請稍後重試",
            "ground":function(num){
                return '第'+num+'局';
            },
            //新增
            "goldDiff":"經濟差",
            "teamGold":"團隊經濟",
            "teamCreepKill":"團隊補刀",
            "time":"時間"

        },
        "analyse":{
            "winRate":"勝率",
            "avgKills":"場均擊殺",
            "avgTimeLen":"場均時長",
            "firstBloodRate":"壹血率",
            "firstTowerRate":"壹塔率",
            "firstRouShanRate":"首肉山率",
            "firstBaronRate":"首大龍率",
            "firstDragonRate":"首小龍率",
            "firstHalfPistolRate":"上半場<br/>手槍局勝率",
            "secondHalfPistolRate":"下半場<br/>手槍局勝率",
            "recentRound":function(num){
                return '最近'+num+'場';
            },
            'league':'賽事',
            'betTime':'比賽時間',
            'team':'戰隊',
            'score':'比分',

            'data_comp':'數據對比',
            'h2h_rc':'交鋒往績',
            'past_rc':'以往戰績',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span>近<i class="total">0</i>場 </span>'+
                '<span class="win_box"><i class="win">0</i>勝</span><span class="lost_box"><i class="lost">0</i>負</span>'+
                '<span>勝率：<i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'友情鏈接',
        //新增
        'apply':{
            style:'樣式',
            width:'寬度',
            widthNote:'註：寬度最小為740，可設置具體數字，也可設置百分比，例如100%',
            TimeZone:'時區',
            TimeZoneNote:'註：“時區設置”可根據貴站大多數訪問者所在地的時區進行設置，以便用戶以當地時間瀏覽比分，以達到最佳觀看效果。',
            colorStyle:'風格',
            darkBlue:'深藍',
            red:'紅色',
            green:'綠色',
            blue:'藍色',
            codeAndResult:'代碼與效果',
            codeNote1:'生成調用URL：即調用頁面的網址，只要將網址直接打開，或者放入框架頁，即可顯示比分信息。',
            codeNote2:'生成調用代碼：即調用頁面的調用代碼，只要將其放入網頁中，即可顯示比分信息。',
            preview:'預覽效果',
            getUseUrl:'生成調用URL',
            getUseCode:'生成調用代碼',
            copyCode:'復制代碼',
            emailTip1:'為給您提供更好的服務，請留下您的郵箱',
            emailTip2:'請輸入您的郵箱賬號',
            freeUseTip1:'免費調用',
            freeUseTip2:'7M 電競即時比分頁',
            smallTip:'您只需要完成以下信息配置即可使用',
            live:'即時比分',
            result:'完場',
            fixture:'賽程',
            yes:'確定',
            captchaTip1:'請先通過下方的智能驗證',
            captchaTip2:'請輸入正確的郵箱格式',
            captchaTip3:'點擊按鈕開始智能驗證',
            captchaTip4:'驗證成功',
            captchaTip5:'驗證失敗，請在此點擊按鈕刷新',
            captchaTip6:'智能檢測中',
            copyTip1:'已復制到粘貼板',
            copyTip2:'您的瀏覽器暫不支持此操作',
            copyTip3:'請先生成地址或代碼'
        },
        dataBank: {
            internation: '國際',
            europe: '歐洲',
            asia: '亞洲',
            america: '美洲',
            others: '其他',
            home: '首頁',
            previous: '上壹頁',
            next: '下壹頁',
            last: '尾頁',
            ing: '賽季中'
        },
        news: {
            point: '焦點',
            runs: '第_局'
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                return stateTime + ' 至 ' + endTime;         
            },
            season: '選擇賽季',
            stage: '選擇階段',
            number: '局數',
            integrals: '積分表',
            point: '積分',
            team_top: '戰隊榜',
            player_top: '選手榜',
            match_short: '賽事簡稱',
            hold_time: '舉辦時間',
            hold_site: '舉辦地',
            url: '官網地址',
            recommended: '推薦',
            rank: '排名',
            win: '勝',
            draw: '平',
            loss: '負',
            match_explain: '賽事說明',
            match_session: '比賽場次',
            durationPerGame: '局均時長',
            turretsPerGame: '局均推塔',
            boutTurretsPerGame: '場均推塔',
            at1stHalfWinRate: '上半場手槍獲勝率',
            at2ndHalfWinRate: '下半場手槍獲勝率',
            player: '選手',
            kda: 'KDA',
            kd: 'K/D',
            belong_team: '所屬戰隊',
            appearance: '出場次數',
            killsPerGame: '局均擊殺數',
            deathsPerGame: '局均死亡數',
            assistsPerGame: '局均助攻數',
            boutKillsPerGame: '場均擊殺數',
            boutDeathsPerGame: '場均死亡數',
            boutAssistsPerGame: '場均助攻數',
            goldPerMinute: '分均經濟',
            damageDealtPerMinute: '分均傷害',
            damageTakenPerMinute: '分均承傷',
            lastHitsPerMinute: '分均正補',
            creepDeniesPerMinute: '分均反補',
            creepKillsPerMinute: '分均補刀',
            headshotPercentage: '爆頭率',
            killsPerRound: '回合擊殺數',
            assistsPerRound: '回合助攻數',
            deathsPerRound: '回合死亡數',
            total: '局總數',
            count_win_rate: '局勝率',
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                // return time + '成立/' + (country? country : '-');
                return (time? time + '成立 / ': '-/') + (country? country : '-');
            },
            abbreviation: '簡稱',
            recentRecords: '近期戰績',
            type: '戰隊類型',
            details: '詳細',
            wl: function (win, loss) {
                return '<span style="color: #d3b47e">' + win +'勝</span><span style="color: #204b82">' + loss + '負</span>'  
            },
            club: function (num) {
                return {
                    0: '-',
                    1: '俱樂部',
                    2: '國家',
                    3: '臨時'    
                }[num]    
            },
            allMatch: '全部賽事',
            noIntro: '暫無戰隊簡介',
            noLineUpData: '暫無陣容數據',
            fitures_results: '賽程賽果',
            data: '數據',
            profile: '戰隊簡介：',
            lineUp: '戰隊陣容',
            gamePlayed: '總場數',
            win: '勝場數',
            draw: '和場數',
            loss: '失敗數',
            statistics: '數據統計',
            headshotsPerGame: '局均爆頭數',
            boutHeadshotsPerGame: '場均爆頭數',
            recentEncounters: function (n) {
                return '近 ' + n + ' 場交鋒';
            },
            winPercent: function (win, loss) {
                return win + '勝 ' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return loss + '負 ' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                return (time || '-') + ' / ' + (country? country : '-');
            },
            name: '姓名',
            position: '位置',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助
                1: {
                    1: '抗壓路',
                    3: '中路',
                    4: '優勢路',
                    5: '輔助'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 輔助
                2: {
                    1: '上路',
                    2: '打野',
                    4: '下路',
                },
                // 王者荣耀 0 未知 1 边路 2 打野 3 中路 4 射手 5 辅助
                4: {
                    1: '邊路',
                    4: '射手',
                }    
            },
            team: '效力戰隊',
            overallData: '綜合數據',
            teammates: '同隊選手',
            noPlayerData: '暫無選手數據',
            noHeroData: '暫無英雄數據',
            matchRecords: '比賽記錄',
            mostPicks: '常用英雄',
            none: '無',
            appearance: function (n) {
                return '出場' + n + '次';
            },
            moreFixtures: '更多賽程',
            gameOfNumber: function (n) {
                return '第' + n + '局';
            }
        }
    },
    "en": {
        'filter': {
            filter_title: 'Choose Competitions',
            All: 'All',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: 'HOK',

            submit: 'Submit',
            featured: 'Featured',
            selectAll: 'Select All',
            reset: 'Reset',
            cancel: 'Cancel',

            cookie_tip: 'Note: To save the settings in this window, your browser is required to be able to support and open Cookie.'
        }, 
        'base':{
            'week':["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                
                '1st': '1st',
                '2nd': '2nd',
                'ot': 'OT',
                'kills': 'Kills',
                'moneys': 'Gold',
                'pushTowers': 'Turrets',
                'dragon': 'Dragons',
                'baron': 'Barons',
                'barracks': 'Barracks',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    var numTxt;
                    switch (num) {
                        case 1:
                            numTxt = '1st';
                            break;
                        case 2:
                            numTxt = '2nd';
                            break;
                        case 3:
                            numTxt = '3rd';
                            break;
                        default:
                            numTxt = num + 'th';
                            break;
                    }
                    return "The " + numTxt + " Game"; //(备注：中间的num不能直接用数字代替，需要改为序数词，第1到第10的序数词分别为：1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th)
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num;
                },
                'gameEnd': 'Finished', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': 'Score',
                'pup_scoreNone': 'Score Cancelled',
                'FirstBlood': 'First Blood',
                'FirstTurret': 'First Turret',
                'FirstBaron': 'First Baron',
                'FirstDragon': 'First Dragon',
                'FirstBarrack': 'First Barrack',
                'stHalf1': 'Pistol Round Winner at 1st Half',
                'stHalf2': 'Pistol Round Winner at 2nd Half',
                'team_side':'Lineup',
                'live': 'Live',
                'live_video':'Match streams:',
                'to_top':'Top',
                
                'analyse':'Analysis',
                'analyseTitle':'Data Analysis'

            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: 'Not Started',
                1: 'In-play',
                
                3: 'Postponed',
                4: 'Canceled',
                5: 'Pending'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: 'R', //'Blue',
                2: 'B' //'Red'
            },
            'camp_dota2': {
                1: 'D', //'Dire',
                //'Radiant'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                'optional': 'Select Competitions',
                'select': 'Selected Matches',
                'all': 'All Matches',
                'category': 'Order by Competitions',
                'time': 'Order by Time',
                'refresh': 'Click：Refresh the Page',
                'openSound': 'Click：Turn on the Prompt Tone',
                'offSound': 'Click：Turn off the Prompt Tone',
                'list_show_tip':'Shown in the list:'
            }
        },
        tips: {
            no_support: 'Sorry, the current version of your browser is too old to update the score data in real time. Please upgrade it to the latest version!',
            no_data: 'No data now',
            
        },
        menu: 'Esports Scores',

        'result': {
            'calendar': 'Calendar',
            'schedule': 'Fixtures',
            'afterGame': 'Results'
        },
        'common_header': {
            'live': "Real-time",
            
        },
        "goaldata": {
            
            
            
            
            
            
            'lookLive': 'Watch the Live',
            
            'needAnthorName': {
                'lol': {
                    'barracks': 'Inhibitors'
                }
            },
            "roshan": "Roshans",

            "summonerSkill": "Hero/Skills",
            "hero": "Hero",
            "skill": "Skills",
            "heroLevel": "Grade",
            "kda": "K/D/A",
            
            "rop": "KP",
            "lastHits": "Last Hits",
            "creepKills": "Creep Kills",
            "creepDenies": "Creep Denies",
            "exports": "Damage Dealt",
            "hurts": "Damage Taken",
            "equipment": "Equipments",

            "firstHalfWins": "1st Half",
            "secondHalfWins": "2nd Half",
            
            "Khs": "K(hs)",
            
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            "no_game_data": "No Data Now",
            "loading_game_data": "The data are updating now. Please try again later.",
            "ground":function(num){
                return 'Game '+num;
            },
            //新增
            "goldDiff":"Gold Difference",
            "teamGold":"Team Gold",
            "teamCreepKill":"Team Creep Kills",
            "time":"Time"

        },
        "analyse":{
            "winRate":"Win Rate",
            "avgKills":"Kills Per Game",
            "avgTimeLen":"Duration Per Game",
            "firstBloodRate":"First Blood Rate",
            "firstTowerRate":"First Turret Rate",
            "firstRouShanRate":"First Roshan Rate",
            "firstBaronRate":"First Baron Rate",
            "firstDragonRate":"First Dragon Rate",
            "firstHalfPistolRate":"Pistol Round Win Rate<br/>at 1st Half",
            "secondHalfPistolRate":"Pistol Round Win Rate<br/>at 2nd Half",
            "recentRound":function(num){
                return 'Last '+num+' Games';
            },
            'league':'Competition',
            'betTime':'Date',
            'team':'Team',
            

            'data_comp':'Data Comparison',
            'h2h_rc':'H2H Records',
            'past_rc':'Past Records',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span>Last <i class="total">0</i> Games </span>'+
                '<span class="win_box">Win <i class="win">0</i></span><span class="lost_box"> Loss <i class="lost">0</i></span>'+
                '<span>Win Rate：<i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'Link Exchanges',
        //新增
        'apply':{
            style:'Format',
            width:'Width',
            widthNote:'Note: The width should be at least 740. You can set either a specific number or a percentage, such as 100%.',
            TimeZone:'Time Zone',
            TimeZoneNote:"Note: The 'Time Zone Setting' can be set according to the time zone where the majority of visitors of your site are located, so that users can view the scores in local time to achieve the best effect.",
            colorStyle:'Style',
            darkBlue:'Dark Blue',
            red:'Red',
            green:'Green',
            blue:'Blue',
            codeAndResult:'Code & Preview',
            codeNote1:'Generating Calling URL: It means generating the URL of the free feed page. As long as you open the URL directly or put it into the frame page, the live score information can be shown.',
            codeNote2:'Generating Calling Code: It means generating the calling code of the free feed page. As long as you put it into the webpage, the live score information can be shown.',
            preview:'Preview',
            getUseUrl:'Generating Calling URL',
            getUseCode:'Generating Calling Code',
            copyCode:'Copy Code',
            emailTip1:'In order to provide you with better service, please leave your email address',
            emailTip2:'Please enter your email account',
            freeUseTip1:'Free Feed of',
            freeUseTip2:'7M Esports Live Scores page',
            smallTip:'You only need to fill in the following information to use the free feed service',
            live:'Live Scores',
            
            
            yes:'Confirm',
            
            captchaTip1:'Please go through the smart verification below first',
            captchaTip2:'Please enter the correct email format',
            captchaTip3:'Click here to start smart verification',
            captchaTip4:'Verified',
            captchaTip5:'Failed. Please click here to refresh',
            captchaTip6:'Verifying',
            copyTip1:'Copied',
            copyTip2:'Your browser does not currently support this operation',
            copyTip3:'Please generate the address or code first'
        },
        dataBank: {
            
            internation: 'International',
            europe: 'Europe',
            asia: 'Asia',
            america: 'America',
            others: 'Others',
            home: 'Home',
            previous: 'Previous',
            next: 'Next',
            last: 'Last',
            ing: 'Mid-Season'
        },
        news: {
            all: '全部',
            other: '其他',
            point: '焦点',
            runs: '第_局'
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                var start_date = stateTime.split('-');
                var end_date = endTime.split('-');
                return 'From ' + start_date[2] + '/' + start_date[1] + '/' + start_date[0] + ' to ' + end_date[2] + '/' + end_date[1] + '/' + end_date[0]; 
            },
            season: 'Select Season',
            stage: 'Select Stage',
            
            
            
            number: 'No. of Game',
            match: 'Competitions',
            integrals: 'Points',
            
            team_top: 'Teams',
            player_top: 'Players',
            match_short: "Competition's Short Name",
            
            hold_site: 'Venue',
            url: 'Official Website',
            recommended: 'Recommended',
            rank: 'Ranking',
            win: 'Win',
            draw: 'Draw',
            loss: 'Loss',
            match_explain: 'Introduction',
            match_session: 'Game Played',
            
            
            
            
            
            turretsPerGame: 'Turrets Per Game',
            
            
            
            
            at1stHalfWinRate: 'Pistol Round Win Rate at 1st Half',
            at2ndHalfWinRate: 'Pistol Round Win Rate at 2nd Half',
            player: 'Player',
            kda: 'KDA',
            
            kd: 'K/D',
            appearance: 'Appearances',
            
            deathsPerGame: 'Deaths Per Game',
            assistsPerGame: 'Assists Per Game',
            
            
            
            goldPerMinute: 'Gold Per Minute',
            damageDealtPerMinute: 'Damage Dealt Per Minute',
            damageTakenPerMinute: 'Damage Taken Per Minute',
            lastHitsPerMinute: 'Last Hits Per Minute',
            creepDeniesPerMinute: 'Creep Denies Per Minute',
            creepKillsPerMinute: 'Creep Kills Per Minute',
            headshotPercentage: 'Headshot Percentage',
            killsPerRound: 'Kills Per Round',
            assistsPerRound: 'Assists Per Round',
            deathsPerRound: 'Deaths Per Round',
            
            
             
            
            
            
            total: 'Total Rounds',
            
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                // return 'Established on ' + date[2] + '-' + date[1] + '-' + date[0] + ' / ' + (country? country : '-');
                return (time?'Established on ' + date[2] + '-' + date[1] + '-' + date[0] + ' / ': 'Established on ') + (country? country : '-');
            },
            abbreviation: 'Abbreviation',
            recentRecords: 'Recent Records',
            type: 'Type',
            details: 'More',
            wl: function (win, loss) {
                var wintext = win > 1?'Wins':'Win';
                var losstext = loss > 1?'Losses':'Loss';
                return '<span style="color: #d3b47e">' + win +' '+wintext+'</span><span style="color: #204b82"> ' + loss + ' '+losstext+'</span>'  
            },
            club: function (num) {
                return {
                    0: '-',
                    1: 'Club',
                    2: 'Country',
                    3: 'Temporary'    
                }[num]    
            },
            allMatch: 'All Competitions',
            noIntro: 'No profile yet',
            noLineUpData: 'No line-up data yet',
            noMatchData: 'No competitions data yet',
            fitures_results: 'Fixtures & Results',
            data: 'Data',
            
            
            profile: 'Profile:',
            lineUp: 'Line-up',
            
            
            
            
            statistics: 'Statistics',
            headshotsPerGame: 'Headshots Per Game',
            
            recentEncounters: function (n) {
                return 'Recent ' + n + ' Encounters';
            },
            winPercent: function (win, loss) {
                return win + ' Win(s) ' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return loss + ' Loss(es) ' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                return (time?(date[2] + '-' + date[1] + '-' + date[0]) : '-') + ' / ' + (country? country : '-');
            },
            name: 'Name',
            position: 'Position',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助  OFFLANE/MID/SAFE LANE/SUP
                1: {
                    
                    1: 'OFFLANE',
                    3: 'MID',
                    4: 'SAFE LANE',
                    5: 'SUP'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助 TOP/MID/ADC/JUG/SUP
                2: {
                    
                    1: 'TOP',
                    
                    3: 'ADC',
                    4: 'JUG',
                    
                },
                // 王者荣耀 0 未知 1 边路 3 中路 4 射手 5 辅助 2 打野  SIDE/MID/ADC/SUP/JUG
                4: {
                    
                    1: 'SIDE',
                    
                    
                    
                    
                }
            },
            
            overallData: 'Overall Data',
            teammates: 'Teammates',
            noPlayerData: 'No player data yet',
            noHeroData: 'No hero data yet',
            matchRecords: 'Match Records',
            mostPicks: 'Most Picks',
            none: 'none',
            appearance: function (n) {
                return 'Appearance: ' + n;
            },
            moreFixtures: 'More Fixtures',
            result: function (n) {
                return {
                    
                    
                }[n]
            },
            gameOfNumber: function (n) {
                return 'Game ' + n;
            }
        }
    },
    "th": {
        'filter': {
            filter_title: 'เลือกรายการ',
            All: 'ทั้งหมด',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: 'HOK',

            submit: 'ยืนยัน',
            featured: 'เลือก',
            selectAll: 'เลือกทั้งหมด',
            reset: 'ตั้งค่าใหม่',
            cancel: 'ยกเลิก',

            cookie_tip: 'หมายเหตุ ถ้าคุณต้องการบันทึกการตั้งค่าในหน้าต่างนี้ควรให้สอดคล้องกับการทำงานของเบราว์เซอร์พร้อมเปิดใช้คุกกี้'
        }, 
        'base':{
            'week':["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                'all': 'All',
                '1st': '1st',
                '2nd': '2nd',
                'ot': 'OT',
                'kills': 'kills',
                'moneys': 'ตังค์',
                'pushTowers': 'ทำลายป้อม',
                'dragon': 'มังกรเล็ก',
                'baron': 'มังกรใหญ่',
                'barracks': 'ค่ายทหาร',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    return "เกมที่" + num; //第几局 เกมที่+num
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num // เกมที่+num;
                },
                'gameEnd': 'จบการแข่งขัน', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': 'คะแนน',
                'pup_scoreNone': 'ยกเลิกคะแนน',
                'FirstBlood': 'เลือดครั้งแรก',
                'FirstTurret': 'ป้อมแรก',
                'FirstBaron': 'ได้มังกรใหญ่แรก',
                'FirstDragon': 'ได้มังกรเล็กแรก',
                'FirstBarrack': 'ค่ายทหารแรก',
                'stHalf1': 'ฝ่ายชนะของปืนพกในครึ่งแรก',
                'stHalf2': 'ฝ่ายชนะของปืนพกในครึ่งหลั',
                'team_side':'รายชื่อผู้เล่น',
                'live': 'ถ่ายทอดสด',
                'live_video':'แชร์ถ่ายทอดสด:',
                'to_top':'Top',
                
                'analyse':'วิเคราะห์',
                'analyseTitle':'การวิเคราะห์ข้อมูล'

            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: 'รอแข่ง',
                1: 'live',
                2: 'FT',
                3: 'เลื่อนเวลา',
                
                5: 'รอการระบุเวลา'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: 'R', //'Blue',
                2: 'B' //'Red'
            },
            'camp_dota2': {
                1: 'D', //'Dire',
                //'Radiant'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                'optional': 'เลือกเกม',
                'select': 'เกมฮิต',
                'all': 'เกมทั้งหมด',
                'category': 'แสดงตามลีก',
                'time': 'แสดงตามเวลา',
                'refresh': 'คลิกรีเฟรชหน้าเว็ป',
                'openSound': 'คลิกเปิดเสียงแจ้งเตือน',
                'offSound': 'คลิกปิดเสียงแจ้งเตือน',
                'list_show_tip':'แสดงรายการ:'
            }
        },
        tips: {
            no_support: 'ขอโทษ เวอร์ชั่นเบราว์เซอร์ของคุณเป็นรุ่นเก่า ไม่สามารถอัพเดทข้อมูลผลการแข่งขัน โปรดอัพเดทเวอร์ชั่นล่าสุด',
            no_data: 'ยังไม่มีข้อมูล',
            
        },
        menu: 'ผลอีสปอร์ต',

        'result': {
            'calendar': 'ปฏิทิน',
            'schedule': 'ตารางการแข่งขัน',
            'afterGame': 'ผลการแข่งขัน'
        },
        'common_header': {
            'live': "ผลอีสปอร์ตสด",
            
        },
        "goaldata": {
            
            
            
            
            
            
            'lookLive': 'ดูถ่ายทอดสด',
            
            'needAnthorName': {
                'lol': {
                    'barracks': 'ป้อม'
                }
            },
            "roshan": "โรชาน",

            "summonerSkill": "ฮีโร่/สกิล",
            "hero": "ฮีโร่",
            "skill": "สกิล",
            "heroLevel": "ระดับ",
            "kda": "K/D/A",
            
            "rop": "KP",
            "lastHits": "ฆ่าครีปฝั่งตรงข้าม",
            "creepKills": "คืบคลานฆ่า",
            "creepDenies": "คืบคลานปฏิเสธ",
            "exports": "รับการโจมตี",
            "hurts": "สร้างความเสียหาย",
            "equipment": "อุปกรณ์",

            "firstHalfWins": "ครึ่งแรก",
            "secondHalfWins": "ครึ่งหลัง",
            "otWins": "ต่อเวลา",
            "Khs": "K(hs)",
            
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            "no_game_data": "ไม่พบรายการ",
            "loading_game_data": "กำลังอัพเดทข้อมูลอยู่ โปรดลองใหม่ภายหลัง",
            "ground":function(num){
                return 'เกมที่'+num;
            },
            //新增
            "goldDiff":"ตังค์ห่างกัน",
            "teamGold":"ตังค์ทีม",
            "teamCreepKill":"การฆ่าครีปของทีม",
            "time":"เวลา"

        },
        "analyse":{
            "winRate":"อัตราชนะ",
            "avgKills":"ฆ่าเฉลี่ยต่อเกม",
            "avgTimeLen":"เวลาเฉลี่ยต่อเกม",
            "firstBloodRate":"อัตราเลือดครั้งแรก",
            "firstTowerRate":"อัตราป้อมแรก",
            "firstRouShanRate":"อัตราโรชานแรก",
            "firstBaronRate":"อัตราได้มังกรใหญ่แรก",
            "firstDragonRate":"อัตราได้มังกรเล็กแรก",
            "firstHalfPistolRate":"อัตราการชนะของ<br/>ปืนพกในครึ่งแรก",
            "secondHalfPistolRate":"อัตราการชนะของ<br/>ปืนพกในครึ่งหลัง",
            "recentRound":function(num){
                return num+' เกมหลังสุด';
            },
            'league':'การแข่งขัน',
            'betTime':'เวลาเปิดเกม',
            'team':'ทีม',
            'score':'สกอร์',

            'data_comp':'การเปรียบเทียบข้อมูล',
            'h2h_rc':'สถิติการพบกัน',
            'past_rc':'สถิติผลงาน',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span><i class="total">0</i> เกมหลังสุด</span>'+
                '<span class="win_box"> ชนะ <i class="win">0</i></span><span class="lost_box"> แพ้ <i class="lost">0</i></span>'+
                '<span>อัตราชนะ: <i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'แลกเปลี่ยนลิงค์',
        //新增
        'apply':{
            style:'รูปแบบ',
            width:'ความกว้าง',
            widthNote:'หมายเหตุ:ขนาดขั้นต่ำคือ 740 คุณสามารถตั้งค่าตัวเลขเจาะจงหรือเปอร์เซ็นต์ เช่น 100%',
            TimeZone:'เขตเวลา',
            TimeZoneNote:'หมายเหตุ："เขตเวลา" สามารถตั้งค่าตามผู้ใช้กลุ่มใหญ่ของเว็บไซต์ท่าน เพื่อสะดวกในการดูผลสดตามเวลาท้องถิ่นและให้ประสบการณ์การชมเว็บที่ดีที่สุดแก่ผู้ใช้งาน',
            colorStyle:'สไตล์',
            darkBlue:'น้ำเงินเข้ม',
            red:'แดง',
            green:'เขียว',
            blue:'น้ำเงิน',
            codeAndResult:'โค้ดและภาพตัวอย่าง',
            codeNote1:'สร้าง URL การโทร: URL ของหน้าการโทรตราบใดที่ URL ถูกเปิดหรือวางโดยตรงในหน้าเฟรม ข้อมูลคะแนนจะสามารถแสดงได้',
            codeNote2:'สร้างรหัสการโทร: รหัสการโทรของหน้าการโทรตราบใดที่มันถูกใส่เข้าไปในหน้าเว็บ ข้อมูลคะแนนจะสามารถแสดงได้',
            preview:'ดูตัวอย่างเอฟเฟกต์',
            getUseUrl:'สร้าง URL การโทร',
            getUseCode:'สร้างรหัสโทร',
            copyCode:'คัดลอกรหัส',
            emailTip1:'เพื่อสามารถอำนวยบริการที่ดีขึ้นแก่คุณ โปรดฝากที่อยู่อีเมลของคุณไว้',
            emailTip2:'โปรดป้อนบัญชีอีเมลของคุณ',
            freeUseTip1:'ลิงค์เว็บผลสด7M eSports',
            freeUseTip2:'นำใช้ฟรี',
            smallTip:'คุณต้องการเพียงตั้งค่าข้อมูลต่อไปนี้ก็จะใช้งานได้',
            live:'ผลเกมสด',
            result:'ผลเกมย้อนหลัง',
            fixture:'โปรแกรม',
            
            
            captchaTip1:'โปรดผ่านการยืนยันแบบสมาร์ทของข้างล่างก่อน',
            captchaTip2:'โปรดกรอกรูปแบบอีเมลที่ถูกต้อง',
            captchaTip3:'กดปุ่มเพื่อเริ่มการยืนยันแบบสมาร์ท',
            captchaTip4:'ยืนยันสำเร็จ',
            captchaTip5:'ยืนยันล้มเหลว โปรดกดปุ่มเพื่อรีเฟรช',
            captchaTip6:'กำลังตรวจอยู่',
            copyTip1:'ก็อบปี้ในคลิปบอร์ดแล้ว',
            copyTip2:'เบราว์เซอร์ของคุณไม่สามารถดำเนินขั้นตอนนี้',
            copyTip3:'โปรดสร้างที่อยู่ลิงค์หรือโค้ดก่อน'
        },
        dataBank: {
            
            internation: 'สากล',
            europe: 'ยุโรป',
            asia: 'เอเชีย',
            america: 'สหรัฐอเมริกา',
            others: 'อื่น ๆ',
            home: 'หน้าแรก',
            previous: 'ย้อนกลับ',
            next: 'ถัดไป',
            last: 'หน้าสุดท้าย',
            ing: 'กลางฤดูกาล'
        },
        news: {
            
            other: 'อื่นๆ ',
            point: 'โฟกัส',
            runs: 'เกมที่'
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                var start_date = stateTime.split('-');
                var end_date = endTime.split('-');
                return start_date[2] + '-' + start_date[1] + '-' + start_date[0] + ' ถึง ' + end_date[2] + '-' + end_date[1] + '-' + end_date[0];     
            },
            season: 'เลือกฤดูกาล',
            stage: 'เลือกสเตจ',
            
            
            
            number: 'จำนวนเกม',
            
            integrals: 'ตารางคะแนน',
            
            team_top: 'ตารางทีม',
            player_top: 'ตารางผู้เล่น',
            match_short: 'ตัวย่อการแข่งขัน',
            hold_time: 'เวลาการจัด',
            hold_site: 'สถานที่จัด',
            url: 'เว็บไซต์อย่างเป็นทางการ',
            recommended: 'ฮอต',
            rank: 'อันดับ',
            win: 'ชนะ',
            draw: 'เสมอ',
            loss: 'แพ้',
            match_explain: 'คำอธิบายของเกม',
            match_session: 'รอบ',
            
            
            
            FirstRoshanRate: 'อัตราโรซันแรก',
            
            turretsPerGame: 'เฉลี่ยทำลายป้อมต่อเกม',
            
            
            firstBaronRate: 'อัตรามันกรใหญ่แรก',
            firstDragonRate: 'อัตรมันกรเล็กแรก',
            at1stHalfWinRate: 'อัตราชนะของปืนพกครึ่งแรก',
            at2ndHalfWinRate: 'อัตราชนะของปืนพกครึ่งหลัง',
            player: 'ผู้เล่น',
            kda: 'KDA',
            
            kd: 'K/D',
            appearance: 'การปรากฏตัว',
            killsPerGame: 'เฉลี่ยฆ่าต่อเกม',
            deathsPerGame: 'เฉลี่ยตายต่อเกม',
            assistsPerGame: 'เฉลี่ยแอสซิสต์ต่อเกม',
            
            
            
            goldPerMinute: 'เฉลี่ยตังค์ต่อนาที',
            damageDealtPerMinute: 'เฉลี่ยทำลายต่อนาที',
            damageTakenPerMinute: 'เฉลี่ยรับทำลายต่อนาที',
            lastHitsPerMinute: 'เฉลี่ยฆ่าครีปฝั่งตรงข้ามต่อนาที',
            creepDeniesPerMinute: 'เฉลี่ยดีไนด์ครีปต่อนาที',
            creepKillsPerMinute: 'เฉลี่ยการฆ่าครีปต่อนาที',
            headshotPercentage: 'อัตราเฮดช็อต',
            killsPerRound: 'เฉลี่ยฆ่าต่อรอบ',
            assistsPerRound: 'เฉลี่ยแอสซิสต์ต่อรอบ',
            deathsPerRound: 'เฉลี่ยตายต่อรอบ', 
            
            
             
            
            
            
            total: 'รอบรวม',
            
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                // return time + ' ก่อตั้งขึ้น / ' + (country? country : '-');
                return (time?time + ' ก่อตั้งขึ้น / ': '-/') + (country? country : '-');
            },
            abbreviation: 'ตัวย่อ',
            recentRecords: 'ผลงานช่วงนี้',
            type: 'ประเภททีม',
            details: 'รายละเอียด',
            wl: function (win, loss) {
                return '<span style="color: #d3b47e">ชนะ ' + win +'</span><span style="color: #204b82"> แพ้ ' + loss + '</span>';
            },
            club: function (num) {
                return {
                    0: '-',
                    1: 'ทีมกีฬาอีสปอร์ต',
                    2: 'ประเทศ',
                    3: 'ชั่วคราว'    
                }[num]    
            },
            allMatch: 'การแข่งขันทั้งหมด',
            noIntro: 'ไม่พบข้อมูลของทีม',
            noLineUpData: 'ไม่พบข้อมูลของรายชื่อเกมเมอร์',
            noMatchData: 'ไม่พบข้อมูลของรายการ',
            fitures_results: 'โปรแกรม/ผลบอล',
            data: 'ข้อมูล',
            
            
            profile: 'รายละเอียดทีม:',
            
            gamePlayed: 'จำนวนเกมทั้งหมด',
            win: 'จำนวนชนะ',
            draw: 'จำนวนเสมอ',
            loss: 'จำนวนแพ้',
            statistics: 'สถิติการข้อมูล',
            headshotsPerGame: 'เฮดช็อตต่อเกม',
            
            recentEncounters: function (n) {
                return  n + ' เกมหลังที่พบกัน';
            },
            winPercent: function (win, loss) {
                return 'ชนะ ' + win + '&nbsp;&nbsp;' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return 'แพ้' + loss + '&nbsp;&nbsp;' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                return (time || '-') + ' / ' + (country? country : '-');
            },
            name: 'ชื่อ',
            position: 'ตำแหน่ง',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助  ออฟเลน/เลนกลาง/เลนแห่งความหวัง/สนับสนุน
                1: {
                    
                    1: 'ออฟเลน',
                    3: 'เลนกลาง',
                    4: 'เลนแห่งความหวัง',
                    5: 'สนับสนุน'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助  เลนบน/เลนกลาง/เลนล่าง/ฟาร์มป่า/สนับสนุน
                2: {
                    
                    1: 'เลนบน',
                    
                    3: 'เลนล่าง',
                    4: 'ฟาร์มป่า',
                    
                },
                // 王者荣耀 0 未知 1 边路 3 中路 4 射手 5 辅助 2 打野  เลนข้าง/เลนกลาง/นักแม่นปืน/สนับสนุน/ฟาร์มป่า
                4: {
                    
                    1: 'เลนข้าง',
                    
                    
                    4: 'นักแม่นปืน',
                    
                }
            },
            
            overallData: 'ข้อมูลครอบคลุม',
            teammates: 'เกมเมอร์ทีมเดียวกัน',
            noPlayerData: 'ไม่พบข้อมูล<br />ของเกมเมอร์',
            noHeroData: 'ไม่พบข้อมูลของฮีโร่',
            matchRecords: 'สถิติการแข่งขัน',
            mostPicks: 'ฮีโร่สามัญ',
            none: 'none',
            appearance: function (n) {
                return 'ลงเล่น ' + n + ' ครั้ง';
            },
            moreFixtures: 'โปรแกรมเพิ่งเติม',
            result: function (n) {
                return {
                    
                    
                }[n]
            },
            gameOfNumber: function (n) {
                return 'เกมที ' + n;
            }
        }
    },
    "kr": {
        'filter': {
            filter_title: '경기 선택',
            All: '모두',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: '펜타스톰', 
            submit: '확인',
            featured: '정선',
            selectAll: '전체',
            reset: '초기화',
            cancel: '취소',

            cookie_tip: '비고: 본 창의 설정을 저장하려면 브라우저 서포트를 확인하고 쿠키를 켜야 합니다.'
        },
        'base':{
            'week':["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                'all': 'All',
                '1st': '1st',
                '2nd': '2nd',
                'ot': 'OT',
                'kills': '킬 횟수',
                'moneys': '골드',
                'pushTowers': '포탑 공격',
                'dragon': '드래곤',
                'baron': '바론',
                'barracks': '배럭',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    return num + "세트";
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num;
                },
                'gameEnd': '경기결과', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': '득점',
                'pup_scoreNone': '득점 취소',
                'FirstBlood': '첫 킬',
                'FirstTurret': '첫 타워',
                'FirstBaron': '첫 바론',
                'FirstDragon': '첫 드래곤',
                'FirstBarrack': '첫 배럭',
                'stHalf1': '후반전 권총전 승자',//전반전권총전승자
                'stHalf2': '전반전 권총전 승자',//후반전권종전승자
                'team_side':'라인업',
                'live': '생방송',
                'live_video':'생방송 공유:',
                'to_top':'톱으로',
                'to_bottom':'톱 취소',
                'analyse':'분석',
                'analyseTitle':'데이터 분석'
            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: '경기전',
                1: '진행중',
                2: '경기종료',
                3: '연기',
                
                5: '미확정'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: 'R', //'Blue',
                2: 'B' //'Red'
            },
            'camp_dota2': {
                1: 'D', //'Dire',
                //'Radiant'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                
                'select': '특선 경기',
                'all': '모든 경기',
                'category': '리그순',
                'time': '시간순',
                'refresh': '클릭: 새로고침',
                'openSound': '클릭: 음소거 취소',
                'offSound': '클릭: 음소거',
                'list_show_tip':'리스트 표시:'
            }
        },
        tips: {
            no_support: '죄송합니다. 현 브라우저 버전이 너무 낮아서 실시로 스코어를 업데이트할 수 없습니다. 최신 버전을 업데이트하세요!',
            no_data: '데이터가 없습니다.',
            to_top:'맨 위로'
        },

        menu: 'e스포츠 스코어',
        'result': {
            'calendar': '캘린더',
            'schedule': '경기일정',
            
        },
        
        'common_header': {
            'live': "실시간",
            
        },
        "goaldata": {
            
            
            
            
            
            
            'lookLive': '생방송 보기',
            
            'needAnthorName': {
                'lol': {
                    'barracks': '억제기'
                }
            },
            "roshan": "로샨",

            "summonerSkill": "영웅/스킬",
            "hero": "영웅",
            "skill": "스킬",
            "heroLevel": "레벨",
            "kda": "K/D/A",
            
            "rop": "KP",
            "lastHits": "막타",
            
            "creepDenies": "디나이",
            "exports": "데미지 딜트",
            "hurts": "데미지 테이큰",
            "equipment": "장비",

            "firstHalfWins": "전반전",
            "secondHalfWins": "후반전",
            "otWins": "연장전",
            "Khs": "K(hs)",
            
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            
            "loading_game_data": "데이터 업데이트 중, 잠시 후에 다시 시도해주세요.",
            "ground":function(num){
                return num+'세트';
            },
            //新增
            "goldDiff":"골드 차이",
            "teamGold":"팀 골드",
            "teamCreepKill":"팀 막타",
            "time":"시간"
        },
        "analyse":{
            "winRate":"승률",
            "avgKills":"경기당 킬 횟수",
            "avgTimeLen":"경기당 시간",
            "firstBloodRate":"첫 킬 비율",
            "firstTowerRate":"첫 타워 비율",
            "firstRouShanRate":"첫 로샨 비율",
            "firstBaronRate":"첫 바론 비율",
            "firstDragonRate":"첫 드래곤 비율",
            "firstHalfPistolRate":"전반전 권총전 승률",
            "secondHalfPistolRate":"후반전 권총전 승률",
            "recentRound":function(num){
                return '최근 '+num+'경기';
            },
            'league':'경기',
            
            'team':'팀',
            'score':'스코어',

            'data_comp':'데이터 비교',
            'h2h_rc':'상대전적',
            'past_rc':'역대전적',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span>최근 <i class="total">0</i>경기 </span>'+
                '<span class="win_box"><i class="win">0</i>승</span><span class="lost_box"><i class="lost">0</i>패</span>'+
                '<span>승률：<i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'추천 링크',
        //新增
        'apply':{
            style:'양식',
            width:'너비',
            widthNote:'참고: 너비는 최소 740이고, 구체적인 수치 혹은 백분율(예:100%)로 설치할수 있습니다.',
            TimeZone:'시간대',
            TimeZoneNote:"비고: 최고의 구경 효과가 보이도록 '시간대 설정'에서 방문자 현지 시간을 설정 하세요.",
            colorStyle:'스타일',
            darkBlue:'네이비',
            red:'빨강',
            green:'초록색',
            blue:'파란색',
            codeAndResult:'코드 및 효과',
            codeNote1:'URL 호출 : 바로 호출될 페이지의 주소입니다. 직접 웹사이트를 열거나 프레임워크 페이지에 넣으시면 스코어를 보실수 있습니다.',
            codeNote2:'코드 호출 : 바로 호출된 페이지의 코드입니다. 웹페이지에다가 넣으시면 스코어를 보실 수 있습니다.',
            preview:'미리보기',
            getUseUrl:'URL 호출',
            getUseCode:'코드 호출',
            copyCode:'코드 복사',
            emailTip1:'더 좋은 서비스를 제공하기 위해서<br/>이메일을 남겨두시기 바랍니다.',
            emailTip2:'이메일을 입력하십시오.',
            freeUseTip1:'무료사용',
            freeUseTip2:'7M e스포츠 라이브스코어',
            smallTip:'하기 정보를 완성하시면 사용할 수 있습니다.',
            live:'라이브스코어',
            
            
            yes:'확정',
            
            captchaTip1:'하기의 인증을 하세요.',
            captchaTip2:'정확한 이메일을 입력하세요.',
            captchaTip3:'버튼을 클릭해서 인증하세요.',
            captchaTip4:'인증에 성공했습니다.',
            captchaTip5:'인증에 실패했습니다. 클릭해서 새로고침 하세요.',
            captchaTip6:'검증중...',
            copyTip1:'복사 됩니다.',
            copyTip2:'본 브라우저는 이 조작을 지원하지 않습니다.',
            copyTip3:'먼저 주소나 코드를 생성하세요.'
        },
        dataBank: {
            
            internation: '국제',
            europe: '유럽',
            asia: '아시아',
            america: '아메리카',
            others: '기타',
            home: '홈',
            previous: '전 페이지',
            next: '다음 페이지',
            last: '마지막',
            ing: '시즌 중'
        },
        news: {
            
            
            point: '인기',
            runs: 'X세트'
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                var start_date = stateTime.split('-');
                var end_date = endTime.split('-');
                return start_date[0] + ' 년 ' + start_date[1] + ' 월 ' + start_date[2] + ' 일부터 ' + end_date[0] + ' 년 ' + end_date[1] + ' 월 ' + end_date[2] + ' 일까지';         
            },
            season: '시즌 선택',
            stage: '단계 선택',
            match_time: '경기 시간',
            
            
            number: '세트',
            
            integrals: '랭킹순위',
            point: '점수',
            team_top: '팀 순위',
            player_top: '선수 랭킹',
            match_short: '약칭',
            hold_time: '개최 날짜',
            hold_site: '개최지',
            url: '홈페이지',
            recommended: '추천',
            rank: '랭킹',
            win: '승',
            draw: '무',
            loss: '패',
            match_explain: '경기 사항',
            match_session: '경기수',
            
            
            
            
            
            turretsPerGame: '경기당 포탑 공격',
            
            
            
            
            
            
            player: '선수',
            kda: 'KDA',
            kd: 'K/D',
            belong_team: '소속팀',
            appearance: '출장 횟수',
            
            deathsPerGame: '경기당 사망 횟수',
            assistsPerGame: '경기당 어시스트 횟수',
            
            
            
            goldPerMinute: '분당 골드',
            damageDealtPerMinute: '분당 데미지 딜트',
            damageTakenPerMinute: '분당 데미지 테이큰',
            lastHitsPerMinute: '분당 다이브',
            creepDeniesPerMinute: '분당 디나이',
            creepKillsPerMinute: '분당 막타',
            headshotPercentage: '헤드샷 비율',
            killsPerRound: '세트당 킬',
            assistsPerRound: '세트당 어시스트',
            deathsPerRound: '세트당 사망', 
            
            
             
            
            
            
            
            count_win_rate: '경기당 승률',
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                // return '설립날짜: ' + date[0] + ' 년 ' + date[1] + ' 월 ' + date[2] + ' 일 ' + '(' + (country? country : '-') + ')';
                return (time?'설립날짜: ' + date[0] + '년 ' + date[1] + '월 ' + date[2] + '일 ': '-/') + '('+(country? country : '-')+')';
            },
            
            recentRecords: '최근 전적',
            type: '팀 유형',
            details: '더보기',
            wl: function (win, loss) {
                return '<span style="color: #d3b47e">' + win +'승</span><span style="color: #204b82"> ' + loss + '패</span>'  
            },
            club: function (num) {
                return {
                    0: '-',
                    1: '클럽',
                    2: '국가',
                    3: '임시'    
                }[num]    
            },
            
            noIntro: '데이터가 없음',
            
            
            fitures_results: '일정/결과',
            data: '데이터',
            
            
            profile: '팀 소개:',
            
            
            win: '승전 횟수',
            draw: '무승부 횟수',
            loss: '패전 횟수',
            statistics: '데이터 통계',
            headshotsPerGame: '경기당 헤드샷 비율',
            
            recentEncounters: function (n) {
                return '최근 대진 ' + n + '경기';
            },
            winPercent: function (win, loss) {
                return win + '승 ' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return loss + '패 ' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                return (time? (date[0] + ' 년 ' + date[1] + ' 월 ' + date[2] + ' 일') : '-') + '(' + (country? country : '-') + ')';
            },
            name: '성함',
            position: '포지션',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助  오프/미드/세이프/서폿
                1: {
                    
                    1: '오프',
                    3: '미드',
                    4: '세이프',
                    5: '서폿'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助  탑/미드/원딜/정글/서폿
                2: {
                    
                    1: '탑',
                    
                    3: '원딜',
                    4: '정글',
                    
                },
                // 王者荣耀 0 未知 1 边路 3 中路 4 射手 5 辅助 2 打野  측면/미드/원딜/서폿/정글
                4: {
                    
                    1: '측면',
                    
                    
                    
                    
                }           
            },
            
            overallData: '종합 데이터',
            teammates: '동료',
            
            
            matchRecords: '경기 기록',
            mostPicks: '애용 영웅',
            none: 'none',
            appearance: function (n) {
                return '출장 횟수: ' + n;
            },
            moreFixtures: '더 보기',
            result: function (n) {
                return {
                    
                    
                }[n]
            },
            gameOfNumber: function (n) {
                return n + '세트';
            }
        }
    },
    "vn": {
        'filter': {
            filter_title: 'Chọn giải đấu',
            All: 'Tất cả',
            DOTA2: 'DOTA2',
            LOL: 'LOL',
            CSGO: 'CS:GO',
            HOK: 'VGVD',

            submit: 'Xác nhận',
            featured: 'Giải hot',
            selectAll: 'Chọn hết',
            reset: 'Đặt lại',
            cancel: 'Hủy',

            cookie_tip: 'Lưu ý: giữ cài đặt của cửa sổ hiện tại phải có sự ủng hộ của trình duyệt của bạn và bật Cookie.'
        },
        'base':{
            'week':["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."]
        },
        "gameLi": {
            'section': { // textAll[lan]["gameLi"]['section']
                'all': 'All',
                '1st': '1st',
                '2nd': '2nd',
                'ot': 'OT',
                'kills': 'Kills',
                'moneys': 'Tiền',
                'pushTowers': 'Phá Tower',
                'dragon': 'Rồng',
                'baron': 'Baron',
                'barracks': 'Doanh trại',
                "innings": function (num) { // textAll[lan]["gameLi"]['section'].innings()
                    return "Ván thứ " + num; //备注: 越语用, "Map" + num (示例第1局: Map 1,中间需要空格) 
                },
                "inningsNum": function (num) { // textAll[lan]["gameLi"]['section'].inningsNum()
                    return "BO" + num; //(备注: 数字前面需要空格)
                },
                'gameEnd': 'Đã kết thúc', // textAll[lan]["gameLi"]['section']['gameEnd']
                'pup_score': 'Ghi điểm',
                'pup_scoreNone': 'Hủy điểm',
                'FirstBlood': 'First Blood',
                'FirstTurret': 'Trụ đầu tiên',
                'FirstBaron': 'Baron đầu tiên',
                'FirstDragon': 'Rồng đầu tiên',
                'FirstBarrack': 'Doanh trại đầu tiên',
                'stHalf1': 'Pistol Round Winner at 1st Half',
                'stHalf2': 'Pistol Round Winner at 2nd Half',
                'team_side':'Đội hình',
                'live': 'Trực tuyến',
                'live_video':'Chia sẻ:',
                'to_top':'Ghim',
                'to_bottom':'Bỏ ghim',
                'analyse':'Phân tích',
                'analyseTitle':'Phân tích dữ liệu'

            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: 'Chưa bắt đầu',
                1: 'Đang diễn ra',
                
                3: 'Hoãn',
                
                5: 'Chờ xác định'
            },
            'camp_lol': { // textAll[lan]["gameLi"]['camp_lol']
                1: 'R', //'Blue',
                2: 'B' //'Red'
            },
            'camp_dota2': {
                1: 'D', //'Dire',
                //'Radiant'
            },
            'nav': { // textAll[lan]["gameLi"]['nav']['optional']
                
                
                
                'category': 'Hiển thị theo giải đấu',
                'time': 'Hiển thị theo thời gian',
                'refresh': 'Click: Làm mới trang',
                'openSound': 'Click: bật âm thanh gợi ý',
                'offSound': 'Click: tắt âm thanh gợi ý',
                'list_show_tip':'Chọn cách hiển thị:'
            }
        },
        tips: {
            no_support: 'Xin lỗi, không thể cập nhật dữ liệu vì phiên bản trình duyệt của bạn quá thấp, vui lòng cập nhật phiên bản mới nhất!',
            no_data: 'Tạm không dữ liệu',
            to_top:'Top'
        },
        menu: 'Tỷ số eSports',

        'result': {
            'calendar': 'Lịch ngày',//'Ngày lịch',
            'schedule': 'Lịch thi đấu',
            'afterGame': 'Kết quả'
        },
        'common_header': {
            'live': "Real-time",
            'analyse': "Game Statistics"
        },
        "goaldata": {
            
            
            
            
            
            
            'lookLive': 'Xem trực tuyến',
            
            'needAnthorName': {
                'lol': {
                    'barracks': 'Nhà chính'
                }
            },
            "roshan": "Roshan",

            "summonerSkill": "Tướng/Kỹ năng",
            "hero": "Tướng",
            "skill": "Kỹ năng",
            "heroLevel": "Đẳng cấp",
            "kda": "K/D/A",
            
            "rop": "KP",
            "lastHits": "Last Hits",
            "creepKills": "Creep Kills",
            "creepDenies": "Creep Denies",
            "exports": "Damage Dealt",
            "hurts": "Damage Taken",
            "equipment": "Trang bị",

            "firstHalfWins": "1st Half",
            "secondHalfWins": "2nd Half",
            
            "Khs": "K(hs)",
            
            "A": "A(f)",
            "KAST": "KAST",
            "ADR": "ADR",
            "Rating": "Rating",
            "no_game_data": "Tạm không có dữ liệu ",
            "loading_game_data": "Dữ liệu đang cập nhật. Vui lòng thử lại sau.",
            "ground":function(num){
                return 'Ván thứ '+num;
            },
            //新增
            "goldDiff":"Gold Difference",
            "teamGold":"Team Gold",
            "teamCreepKill":"Team Creep Kills",
            "time":"Thời gian"

        },
        "analyse":{
            "winRate":"Tỷ lệ thắng",
            "avgKills":"Kills Per Game",
            "avgTimeLen":"Duration Per Game",
            
            
            "firstRouShanRate":"First Roshan",
            
            
            "firstHalfPistolRate":"Pistol Round Win Rate<br/>at 1st Half",
            "secondHalfPistolRate":"Pistol Round Win Rate<br/>at 2nd Half",
            "recentRound":function(num){
                return num+' trận gần đây';
            },
            'league':'Giải đấu',
            
            'team':'Đội',
            'score':'Tỷ số',

            'data_comp':'Thống kê số liệu',
            'h2h_rc':'Lịch sử đối đầu',
            'past_rc':'Chiến tích',
            'result_rate_rc':function(){
                var dom = '';
                dom +=
                '<span><i class="total">0</i> trận gần đây </span>'+
                '<span class="win_box"><i class="win">0</i> thắng </span><span class="lost_box"><i class="lost">0</i> thua</span>'+
                '<span>Tỷ lệ thắng: <i class="rate">0%</i></span>';
                return dom
            }
        },
        //新增
        'friendLink':'Trao đổi liên kết',
        //新增
        'apply':{
            style:'Kiểu thức',
            width:'Chiều rộng',
            widthNote:'Lưu ý: Chiều rộng ít nhất phải là 740, có thể đặt theo con số cụ thể, cũng có thể đặt theo tỷ lệ phần trăm như: 100%.',
            TimeZone:'Múi giờ',
            TimeZoneNote:'Chú: “Đặt múi giờ” có thể đặt theo đa số users của quý website nằm ở, để họ có thể cập nhật tỷ số theo giờ địa phương, truy cập website với hiệu quả tốt nhất.',
            colorStyle:'Phong cách',
            darkBlue:'Màu xanh đậm',
            red:'Màu đỏ',
            green:'Màu xanh lá cây',
            blue:'Màu xanh lam',
            codeAndResult:'Code và hiệu quả',
            codeNote1:'Khởi tạo & sử dụng URL: Tức là sử dụng địa chỉ của trang web, chỉ cần mở trang web trực tiếp hoặc đặt vào khung trang web, thì có thể hiển thị thông tin tỷ số.',
            codeNote2:'Khởi tạo & sử dụng Code: Tức là sử dụng Code của trang web, chỉ cần đặt vào trang web, thì có thể hiển thị thông tin tỷ số.',
            preview:'Hiệu quả xem trước',
            getUseUrl:'Khởi tạo & sử dụng URL',
            getUseCode:'Khởi tạo & sử dụng Code',
            copyCode:'Copy Code',
            emailTip1:'Vui lòng để lại email để cung cấp phục vụ tốt hơn cho bạn',
            emailTip2:'Vui lòng nhập tài khoản email của bạn',
            freeUseTip1:'Tiện ích miễn phí',
            freeUseTip2:'trang tỷ số trực tuyến eSports 7M',
            smallTip:'Bạn chỉ cần điền thông tin sau đây thì có thể sử dụng',
            live:'Tỷ số trực tuyến',
            
            
            yes:'Xác định',
            cancel:'Hủy bỏ',
            captchaTip1:'Vui lòng thông qua việc xác minh thông minh dưới đây trước',
            captchaTip2:'Vui lòng nhập đúng định dạng email',
            captchaTip3:'Nhấn nút để bắt đầu xác minh thông minh',
            captchaTip4:'Xác minh thành công',
            captchaTip5:'Xác minh thất bại, vui lòng nhấn nút này để làm mới',
            captchaTip6:'Đang xác minh thông minh',
            copyTip1:'Đã sao chép',
            copyTip2:'Trình duyệt của bạn không ủng hộ thao tác này',
            copyTip3:'Vui lòng khởi tạo địa chỉ hoặc Code trước'
        },
        dataBank: {
            
            internation: 'Quốc tế',
            europe: 'Châu Âu',
            asia: 'Châu Á',
            america: 'Châu Mỹ',
            others: 'Khác',
            home: 'Trang chủ',
            previous: 'Trang trước',
            next: 'Trang sau',
            last: 'Cuối trang',
            ing: 'Giữa mùa'
        },
        news: {
            
            
            point: 'Nóng',
            runs: 'Ván thứ '
        },
        matchPage: {
            hold_at: function (stateTime, endTime) {
                var start_date = stateTime.split('-');
                var end_date = endTime.split('-');
                return 'Từ ' + start_date[2] + '/' + start_date[1] + '/' + start_date[0] + ' đến ' + end_date[2] + '/' + end_date[1] + '/' + end_date[0];        
            },
            season: 'Chọn mùa giải',
            stage: 'Chọn giai đoạn',
            
            team: 'Team',
            
            number: 'Ván',
            
            integrals: 'BXH',
            point: 'Điểm',
            
            player_top: 'Game thủ',
            match_short: 'Tên viết tắt giải đấu',
            
            hold_site: 'Địa điểm',
            url: 'Trang web chính thức',
            recommended: 'Giải Hot',
            rank: 'Xếp hạng',
            win: 'Thắng',
            draw: 'Hòa',
            loss: 'Thua',
            match_explain: 'Giới thiệu về giải đấu',
            match_session: 'Trận',
            
            
            
            FirstRoshanRate: 'Roshan đầu tiên',
            durationPerGame: 'Thời gian trung bình',
            turretsPerGame: 'Trung bình phá trụ ',
            
            
            
            firstDragonRate: 'Dragon đầu tiên',
            at1stHalfWinRate: 'Pistol Round Win Rate at 1st Half',
            at2ndHalfWinRate: 'Pistol Round Win Rate at 2nd Half',
            
            kda: 'KDA',
            kd: 'K/D',
            
            appearance: 'Số lần đấu',
            
            deathsPerGame: 'Deaths Per Game',
            assistsPerGame: 'Assists Per Game',
            
            
            
            goldPerMinute: 'Gold Per Minute',
            damageDealtPerMinute: 'Damage Dealt Per Minute',
            damageTakenPerMinute: 'Damage Taken Per Minute',
            lastHitsPerMinute: 'Last Hits Per Minute',
            creepDeniesPerMinute: 'Creep Denies Per Minute',
            creepKillsPerMinute: 'Creep Kills Per Minute',
            headshotPercentage: 'Tỷ lệ Headshot',
            killsPerRound: 'Kills Per Round',
            assistsPerRound: 'Assists Per Round',
            deathsPerRound: 'Deaths Per Round', 
            
            
             
            
            
            
            total: 'Tổng số ván',
            
        },
        teamPage: {
            established: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                // return 'Thành lập vào ' + date[2] + '-' + date[1] + '-' + date[0] + '/' + (country? country : '-');
                return (time?'Thành lập vào ' + date[2] + '-' + date[1] + '-' + date[0] + '/': '-/') + (country? country : '-');
            },
            abbreviation: 'Viết tắt',
            recentRecords: 'Chiến tích gần đây',
            type: 'Loại hình',
            details: 'Chi tiết',
            wl: function (win, loss) {
                return '<span style="color: #d3b47e">' + win +' Thắng </span><span style="color: #204b82">' + loss + ' Thua</span>'  
            },
            club: function (num) {
                return {
                    0: '-',
                    1: 'CLB',
                    2: 'Quốc gia',
                    3: 'Tạm thời'    
                }[num]    
            },
            allMatch: 'Tất cả giải đấu',
            noIntro: 'Tạm không có giới thiệu về đội bóng',
            noLineUpData: 'Tạm không có dữ liệu của đội hình',
            noMatchData: 'Tạm không có dữ liệu của giải đấu',
            fitures_results: 'Lịch thi đấu & Kết quả',
            data: 'Số liệu',
            
            
            profile: 'Giới thiệu tóm tắt:',
            
            gamePlayed: 'Tổng số trận',
            
            
            
            statistics: ' Thống kê số liệu',
            headshotsPerGame: 'Headshot trung bình',
            
            recentEncounters: function (n) {
                return n + ' trận đối đầu gần đây';
            },
            winPercent: function (win, loss) {
                return win + ' thắng ' + (loss == 0? '100%' : ((win * 100 / (win + loss)).toFixed(2) + '%'));
            },
            lossPercent: function (win, loss) {
                return loss + ' thua ' + (win == 0? '100%' : ((loss * 100 / (win + loss)).toFixed(2) + '%'));
            }
        },
        playerPage: {
            born: function (time, country) {
                if(!time && !country) return '-/-';
                var date = time.split('-');
                return (time? (date[2] + '-' + date[1] + '-' + date[0]) : '-') + ' / ' + (country? country : '-');
            },
            name: 'Tên',
            position: 'Vị trí',
            gamePosition: {
                // DOTA2  0 未知 1 抗压路 3 中路 4 优势路 5 辅助  OFFLANE/MID/SAFE LANE/SUP
                1: {
                    
                    1: 'OFFLANE',
                    3: 'MID',
                    4: 'SAFE LANE',
                    5: 'SUP'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助  Đấu sĩ/Pháp sư/Xạ thủ/Sát thủ/Hỗ trợ
                2: {
                    
                    1: 'Đấu sĩ',
                    2: 'Pháp sư',
                    3: 'Xạ thủ',
                    4: 'Sát thủ',
                    5: 'Hỗ trợ'
                },
                // 王者荣耀 0 未知 1 边路 3 中路 4 射手 5 辅助 2 打野  Đấu sĩ/Pháp sư/Xạ thủ/Hỗ trợ/ Sát thủ
                4: {
                    
                    
                    
                    
                    
                    
                }
            },
            
            overallData: 'Số liệu thống kê',
            teammates: 'Game thủ cùng đội',
            noPlayerData: 'Tạm không có dữ liệu<br />game thủ',
            noHeroData: 'Tạm không có dữ liệu của tướng',
            matchRecords: 'Lịch sử đấu',
            mostPicks: 'Tướng thường dùng',
            none: 'none',
            appearance: function (n) {
                return n + ' lần đấu';
            },
            
            result: function (n) {
                return {
                    
                    
                }[n]
            },
            gameOfNumber: function (n) {
                return 'Ván thứ ' + n;
            }
        }
    }
}

module.exports = textAll;