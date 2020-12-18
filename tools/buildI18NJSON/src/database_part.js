var textAll = {
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
                'all': 'All',
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
                'to_bottom':'Cancel',
                'analyse':'Analysis',
                'analyseTitle':'Data Analysis'

            },
            "state": { // textAll[lan]["gameLi"]['state']
                0: 'Not Started',
                1: 'In-play',
                2: 'Finished',
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
                2: 'R' //'Radiant'
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
            to_top:'Top'
        },
        menu: 'Esports Scores',

        'result': {
            'calendar': 'Calendar',
            'schedule': 'Fixtures',
            'afterGame': 'Results'
        },
        'common_header': {
            'live': "Real-time",
            'analyse': "Data Analysis"
        },
        "goaldata": {
            'kills': 'Kills',
            'moneys': 'Gold',
            'pushTowers': 'Turrets',
            'dragon': 'Dragons',
            'baron': 'Barons',
            'barracks': 'Barracks',
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
            "moneys": "Gold",
            "rop": "KP",
            "lastHits": "Last Hits",
            "creepKills": "Creep Kills",
            "creepDenies": "Creep Denies",
            "exports": "Damage Dealt",
            "hurts": "Damage Taken",
            "equipment": "Equipments",

            "firstHalfWins": "1st Half",
            "secondHalfWins": "2nd Half",
            "otWins": "OT",
            "Khs": "K(hs)",
            "D": "D",
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
            'score':'Score',

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
            result:'Results',
            fixture:'Fixtures',
            yes:'Confirm',
            cancel:'Cancel',
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
            all: 'All',
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
            match_time: 'Time',
            team: 'Team',
            score: 'Score',
            number: 'No. of Game',
            match: 'Competitions',
            integrals: 'Points',
            point: 'Points',
            team_top: 'Teams',
            player_top: 'Players',
            match_short: "Competition's Short Name",
            hold_time: 'Date',
            hold_site: 'Venue',
            url: 'Official Website',
            recommended: 'Recommended',
            rank: 'Ranking',
            win: 'Win',
            draw: 'Draw',
            loss: 'Loss',
            match_explain: 'Introduction',
            match_session: 'Game Played',
            win_rate: 'Win Rate',
            FirstBloodRate: 'First Blood Rate',
            FirstTurretRate: 'First Turret Rate',
            FirstRoshanRate: 'First Roshan Rate',
            durationPerGame: 'Duration Per Game',
            turretsPerGame: 'Turrets Per Game',
            boutDurationPerGame: 'Duration Per Game',
            boutTurretsPerGame: 'Turrets Per Game',
            firstBaronRate: 'First Baron Rate',
            firstDragonRate: 'First Dragon Rate',
            at1stHalfWinRate: 'Pistol Round Win Rate at 1st Half',
            at2ndHalfWinRate: 'Pistol Round Win Rate at 2nd Half',
            player: 'Player',
            kda: 'KDA',
            belong_team: 'Team',
            kd: 'K/D',
            appearance: 'Appearances',
            killsPerGame: 'Kills Per Game',
            deathsPerGame: 'Deaths Per Game',
            assistsPerGame: 'Assists Per Game',
            boutKillsPerGame: 'Kills Per Game',
            boutDeathsPerGame: 'Deaths Per Game',
            boutAssistsPerGame: 'Assists Per Game',
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
            boutKillsPerRound: 'Kills Per Round',
            boutAssistsPerRound: 'Assists Per Round',
            boutDeathsPerRound: 'Deaths Per Round', 
            Rating: 'Rating',
            ADR: 'ADR',
            KAST: 'KAST',
            total: 'Total Rounds',
            count_win_rate: 'Win Rate'
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
            allCompetitions: 'All Competitions',
            league: 'Competitions',
            profile: 'Profile:',
            lineUp: 'Line-up',
            gamePlayed: 'Game Played',
            win: 'Win',
            draw: 'Draw',
            loss: 'Loss',
            statistics: 'Statistics',
            headshotsPerGame: 'Headshots Per Game',
            boutHeadshotsPerGame: 'Headshots Per Game',
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
                    0: '-',
                    1: 'OFFLANE',
                    3: 'MID',
                    4: 'SAFE LANE',
                    5: 'SUP'
                },
                // LOL 0 未知 1 上路 2 打野 3 中路 4 下路 5 辅助 TOP/MID/ADC/JUG/SUP
                2: {
                    0: '-',
                    1: 'TOP',
                    2: 'MID',
                    3: 'ADC',
                    4: 'JUG',
                    5: 'SUP'
                },
                // 王者荣耀 0 未知 1 边路 3 中路 4 射手 5 辅助 2 打野  SIDE/MID/ADC/SUP/JUG
                4: {
                    0: '-',
                    1: 'SIDE',
                    2: 'JUG',
                    3: 'MID',
                    4: 'ADC',
                    5: 'SUP'
                }
            },
            team: 'Team',
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
                    1: 'Win',
                    2: 'Loss',
                }[n]
            },
            gameOfNumber: function (n) {
                return 'Game ' + n;
            }
        }
    },
}

module.exports = textAll;