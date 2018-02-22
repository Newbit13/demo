<template>
  <div class="main-container" v-show="show">
    <div class="useful-link no-print">
      <!--<a class="theme-link" href="/index2.html"></a>-->
      <a class="github-button" href="https://github.com/Newbit13/Newbit13.github.io" title="查看源码">
        <img src="/static/images/star.svg" alt="Github"><span>Star</span>
      </a>
    </div>
    <section class="section section-header">
      <div class="section-bg section-header-bg"></div>
      <div class="section-bg section-content-bg"></div>
      <div class="container">
        <header class="header">
          <div class="header-box">
            <div class="avatar wow inShow no-print">
              <img src="/static/images/logo.jpg" alt="logo" class="img-responsive">
            </div>
            <h1 class="name text-center wow inShow no-print">{{userInfo.nickname}}</h1>
            <h1 class="name text-center hide show-print-block">{{userInfo.name}}</h1>
          </div>
        </header>
        <div class="section-content">
          <div class="content-box">
            <div class="name-slogan">
              <h2 class="wow inShow no-print" data-wow-delay="0.1s">
                <span class="text-light">{{userInfo.lastName}}</span>&nbsp;{{userInfo.firstName}}
              </h2>
              <div class="description wow inShow" data-wow-delay="0.15s">{{userInfo.slogan}}</div>
            </div>
            <div class="contact-info">
              <div class="row">
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.3s">
                    <h4>性别</h4>
                    <div class="info">{{userInfo.sex}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.45s">
                    <h4>年龄</h4>
                    <div class="info">{{calcDate(userInfo.birthday)}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.5s" :href="'mailto:'+userInfo.email">
                    <h4>学历</h4>
                    <div class="info">{{userInfo.education}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.55s" :href="userInfo.website" target="_blank">
                    <h4>经验</h4>
                    <div class="info">{{userInfo.exp[0]+(calcDate(userInfo.workSince)-1)+userInfo.exp[1]+calcDate(userInfo.workSince)+userInfo.exp[2]}}</div>
                  </a>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.6s">
                    <h4>Phone</h4>
                    <address class="info">{{userInfo.phone}}</address>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <div class="item wow inShow" data-wow-delay="0.65s">
                    <h4>QQ</h4>
                    <div class="info">{{userInfo.qq.number}}</div>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.7s" :href="userInfo.website" target="_blank">
                    <h4>Website</h4>
                    <div class="info">{{userInfo.websiteName}}</div>
                  </a>
                </div>
                <div class="col-md-6 col-lg-3">
                  <a class="item wow inShow" data-wow-delay="0.75s" :href="userInfo.github" target="_blank">
                    <h4>Github</h4>
                    <div class="info">{{userInfo.github}}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">介绍&nbsp;/&nbsp;
              <small><i>Intro</i></small>
            </h2>
            <div class="description">介绍一些个人基本情况</div>
          </div>
        </header>
        <div class="section-content">
          <div class="intro">
            <p v-for="intro in userInfo.intro.content" v-html="intro"></p>
          </div>
          <div class="technology">
            <ul class="inline">
              <li><b>{{userInfo.intro.technology.title}}</b></li>
              <li v-for="item in userInfo.intro.technology.content">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">工作经验&nbsp;/&nbsp;
              <small><i>Experience</i></small>
            </h2>
            <div class="description">不同时期简短的从业经历介绍</div>
          </div>
        </header>
        <div class="section-content">
          <div class="experience">
            <div class="item" v-for="item in userInfo.experience">
              <div class="row">
                <div class="col-md-5">
                  <div class="time">{{item.time}}</div>
                  <div class="title">{{item.title}}</div>
                  <div class="description">{{item.intro}}</div>
                </div>
                <div class="col-md-7">
                  <div class="content">{{item.description}}</div>
                  <div class="tips" v-for="tip in item.tips">
                    <b>{{tip.title}}</b>
                    <ul>
                      <li v-for="list in tip.content">{{list}}</li>
                    </ul>
                  </div>
                  <div class="technology" v-for="tech in item.technology">
                    <b>{{tech.title}}</b>
                    <ul class="inline">
                      <li v-for="techItem in tech.content">{{techItem}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">技能&nbsp;/&nbsp;
              <small><i>Skills</i></small>
            </h2>
            <div class="description">我所掌握的工具和技术栈</div>
          </div>
        </header>
        <div class="section-content">
          <div class="row skill">
            <div class="col-md-6" v-for="s in userInfo.skill">
              <div class="item">
                <div class="text-info">
                  <span class="num text-light">{{s.percent}}</span>{{s.name}}
                </div>
                <div class="progress">
                  <div class="progress-bar wow progressShow" :style="'width:'+s.percent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">项目经验&nbsp;/&nbsp;
              <small><i>Experience</i></small>
            </h2>
            <div class="description">近期主要做过的一些项目</div>
          </div>
        </header>
        <div class="section-content">
          <div class="experience">
            <div class="item" v-for="item in userInfo.project">
              <div class="row">
                <div class="col-md-5">
                  <div class="time">{{item.time}}</div>
                  <div class="title">{{item.title}}</div>
                  <div class="description">{{item.intro}}</div>
                </div>
                <div class="col-md-7">
                  <div class="content">{{item.description}}</div>
                  <div class="tips" v-for="tip in item.tips">
                    <b>{{tip.title}}</b>
                    <ul>
                      <li v-for="list in tip.content">{{list}}</li>
                    </ul>
                  </div>
                  <div class="technology" v-for="tech in item.technology">
                    <b>{{tech.title}}</b>
                    <ul class="inline">
                      <li v-for="techItem in tech.content">{{techItem}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">常逛&nbsp;/&nbsp;
              <small><i>Usually</i></small>
            </h2>
            <div class="description">经常逛的技术或者设计相关网站</div>
          </div>
        </header>
        <div class="section-content">
          <div class="row usually">
            <div class="col-lg-4 col-md-6" v-for="u in userInfo.usually">
              <a v-if="u.link" :href="u.link" target="_blank" class="item" :title="u.link">
                <i class="fa fa-github"></i>
                <h3 class="text-light">{{u.name}}</h3>
                <p>{{u.description}}</p>
              </a>
              <div v-if="!u.link" class="item" :title="u.link">
                <i class="fa fa-github"></i>
                <h3 class="text-light">{{u.name}}</h3>
                <p>{{u.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section no-print">
      <div class="container">
        <div class="section-bg section-header-bg"></div>
        <div class="section-bg section-content-bg"></div>
        <header class="header">
          <div class="content-box">
            <h2 class="title">联系&nbsp;/&nbsp;
              <small><i>Contact</i></small>
            </h2>
            <div class="description">通过这些信息可以联系到我</div>
          </div>
        </header>
        <div class="section-content">
          <div class="contact">
            <div class="row">
              <div class="col-md-6 col-lg-3">
                <div class="item">
                  <h4>Phone</h4>
                  <div class="info">{{userInfo.phone}}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="item">
                  <h4>QQ</h4>
                  <div class="info">{{userInfo.qq.number}}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="item">
                  <h4>Location</h4>
                  <div class="info">{{userInfo.location}}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <a class="item" :href="'mailto:'+userInfo.email">
                  <h4>Email</h4>
                  <div class="info">{{userInfo.email}}</div>
                </a>
              </div>
            </div>
          </div>
          <div class="name-slogan">
            <h2 class="wow inShow">
              <span class="text-light">{{userInfo.lastName}}</span>&nbsp;{{userInfo.firstName}}
            </h2>
            <div class="description wow inShow" data-wow-delay="0.05s">{{userInfo.slogan}}（{{userInfo.tips}}）</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'front',
    data() {
      return {
        show:false,
        userInfo: {
          exp:[],
          qq:{},
          nickname:'',
          intro:{
            content:[],
            technology:{
              title:'',
              content:[]
            }
          },
          experience:[{
            tips:{
              title:'',
              content:[],
            },
            technology:[],
          }],
          skill:[],
          project:[{
            tips:{
              title:'',
              content:[],
            },
            technology:[],
          }],
          usually:[],
        },
      }
    },
    created(){
      var self = this;
      // 开发后改为this.$http.get('/static/resume.json')
      this.$http.get('/api/data').then((res) =>{console.log(res)
        self.userInfo = res.body.data;
        self.$parent.loading = false;
        self.show = true;
      });
    },
    methods:{
      calcDate(birthday){
        let birthdayDate = new Date(birthday);
        let todyDate = new Date();
        return todyDate.getYear() - birthdayDate.getYear()
      }
    }
  }
</script>
