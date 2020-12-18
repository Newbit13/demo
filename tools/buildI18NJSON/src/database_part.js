var textAll = {
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