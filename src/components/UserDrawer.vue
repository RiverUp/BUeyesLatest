<template>
  <div>
    <!--el-drawer用于确定当前抽屉是否是打开的，是一个model-value-->
    <el-drawer
      v-model="drawer"
      size="90%"
      :direction="direction"
      :show-close="false"
      @close="Reset"
    >
      <template #header="{ avatar }">
        <div class="e">
          <el-header class="el-header">
            <el-avatar
              :id="avatar"
              :src="faceSrc"
              style="
                position: absolute;
                left: 30px;
                top: 50px;
                width: 70px;
                height: 70px;
              "
            ></el-avatar>
          </el-header>
          <el-main>
            <!--下面是收藏图标，没写完，因为显示不出来-->
            <el-collapse v-model="activeName">
              <el-collapse-item name="collect">
                <template #title>
                  <el-icon><CollectionTag /></el-icon>
                  收藏
                </template>
                <el-scrollbar>
                  <p
                    v-for="newsCollected in collections"
                    :key="newsCollected.id"
                    @click="NoteCollectNews(newsCollected)"
                    @dblclick="RouteToNewsContent(newsCollected)"
                  >
                    {{ newsCollected.title }}
                    <el-divider />
                  </p>
                </el-scrollbar>
              </el-collapse-item>
            </el-collapse>
          </el-main>
        </div>
      </template>
      <!--收藏-->
    </el-drawer>
  </div>
</template>

<script>
var time = null;
import { CollectionTag } from "@element-plus/icons-vue";
import store from "@/store";
// import { getCollection } from "@/request/UserActionController";
import router from "@/router/index";
import { speech } from "@/tool/tts";

export default {
  name: "UserDrawer",
  components: {
    CollectionTag,
  },
  data() {
    return {
      direction: "ltr",
      collections: [
        {
          id: "c1e0bdd8-2f90-4db4-ab86-2f10b8fc3715",
          author: "新华网",
          title: "习近平致信祝贺马科斯就任菲律宾总统",
          categoryId: 1,
          content:
            "<p>　　新华社北京6月30日电 &nbsp;6月30日，国家主席习近平致信费迪南德·罗慕尔德兹·马科斯，祝贺他就任菲律宾共和国总统。</p><p>　　习近平指出，不久前，我同你通电话，就中菲两国坚持睦邻友好、携手共同发展达成重要共识。我愿同马科斯总统一道，从战略高度和长远角度把握好两国关系发展大方向，续写新时期中菲友好合作大文章，造福两国和两国人民。</p>",
          time: "2022-6-30 11:57:47",
        },
        {
          id: "74978719-ae79-407c-b8bd-06c91496cdae",
          author: "新华网",
          title: "习近平会见林郑月娥",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者陈键兴　朱基钗　查文晔）国家主席习近平30日下午在香港会见了香港特别行政区行政长官林郑月娥。</p><p>　　习近平指出，5年来，在中央坚定支持下，你忠诚履行行政长官的宪制责任，坚定贯彻落实“一国两制”方针和基本法，带领特别行政区政府依法施政，团结社会各界人士止暴制乱，全力抗击新冠肺炎疫情，积极融入国家发展大局，为维护国家主权、安全、发展利益和香港繁荣稳定，落实“爱国者治港”原则，推动香港局势实现由乱到治重大转折，做了大量艰苦工作，作出重要贡献，展现了勇于担当的精神。对于你这5年来的工作，中央是充分肯定的。</p><p>　　习近平希望林郑月娥积极支持新一任行政长官和新一届特别行政区政府依法施政，继续为香港和国家的发展作出贡献。</p><p>　　林郑月娥衷心感谢习近平主席在香港疫情仍然波动的情况下亲临香港出席庆祝香港回归祖国25周年大会暨香港特别行政区第六届政府就职典礼并视察香港，这充分体现习近平主席对香港同胞的亲切关怀。她表示，香港过去5年是极不平凡的5年，她能够为“一国两制”事业作出贡献，感到十分荣幸。祝愿祖国富强昌盛，习主席视察香港圆满成功。</p><p>　　当天下午，习近平分别会见了香港特别行政区行政、立法、司法机关负责人，香港各界代表人士，香港纪律部队代表，中央驻港机构和主要中资机构负责人。</p><p>　　丁薛祥、许其亮、沈跃跃、王毅、夏宝龙等参加有关会见。</p><p>　　全国政协副主席梁振英，香港特别行政区行政长官林郑月娥、候任行政长官李家超也参加有关会见。</p>",
          time: "2022-6-30 11:43:35",
        },
        {
          id: "b2f17a25-8ad4-482d-8b82-2f2a017d55f2",
          author: "新华网",
          title: "习近平会见贺一诚",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者朱基钗　陈键兴　刘明洋）国家主席习近平30日下午在香港会见了前来出席庆祝香港回归祖国25周年活动的澳门特别行政区行政长官贺一诚。</p><p>　　习近平指出，中央充分肯定你和特别行政区政府的工作，希望你们坚持稳中求进，毫不松懈防控疫情，持续有效纾解民困，努力促进经济复苏，坚定推动经济适度多元发展，全力维护社会大局稳定。</p><p>　　贺一诚感谢习近平主席的接见，表示将努力做好各方面工作，坚决维护澳门良好发展局面。</p><p>　　丁薛祥、夏宝龙参加会见。</p>",
          time: "2022-6-30 12:0:18",
        },
        {
          id: "c4d07fc5-153e-4cc6-ae65-bbee1a0dbcb1",
          author: "中国新闻网",
          title: "长三角铁路暑运发送旅客预计超1亿人次",
          categoryId: 1,
          content:
            "<p>　　中新网南京6月30日电 (许文峰 徐珊珊)据中国铁路上海局集团有限公司30日消息，长三角铁路暑运方案于近日出台，在新冠肺炎疫情防控形势稳定向好的情况下，暑期发送旅客有望超1亿人次。</p><p>　　2022年铁路暑期旅客运输期限自7月1日至8月31日，共计62天。长三角铁路刚性探亲客流预计相对集中于假期两端，通勤流、商务流、旅游流呈现随疫情变化波动的特点。</p><p>　　为满足暑期旅客出行需要，铁路部门在“6.20”新图基础上，精准实施“一日一图”，在客流高峰期对高铁和普速线路实行高峰运行图，根据客流需要适时启用28对周末线列车和58对高峰线列车，全力满足旅客出行需要。</p><p>　　根据暑运期间周末客流特征明显的特点，铁路部门将按照小长假的标准抓好周末客流组织，进一步优化旅客进出站、上下车流线，做好有序组织和有效疏导，防止通道对流、堵塞。为应对突发客流，铁路部门还安排适当应急能力，适时组织动车组列车重联或大编组运行、增开图外临客或加挂车辆。</p><p>　　暑运期间，长三角铁路将落实、落细常态化疫情防控措施，加强车站、列车公共场所的通风消毒和卫生保洁，做好进出站旅客全面测量体温和列车运行途中有需要旅客的测量体温工作，提醒旅客全程规范佩戴口罩；全力配合地方防疫部门做好健康码、核酸检测阴性证明等查验工作，全力营造安全、放心的出行环境。</p><p>　　针对探亲、旅游等客流相对增加等情况，杭州、南京客运段乘务人员严格规范佩戴防疫“三件套”，列车运行途中加大对洗手池、卫生间、车厢通道等公共区域消杀力度；加强防疫宣传和车厢巡视，提醒旅客全程做好个人防护。</p><p>　　铁路部门提醒旅客，暑期出行请自觉遵守当地疫情防控要求，适当提前出门，为防疫查验、进站安检、实名制验证等留足时间；旅行途中，请配合铁路部门做好进出站测温等站车疫情防控工作，全程规范佩戴口罩；许多城市有两个或两个以上火车站，务必认清票面标注的站名，勿因跑错乘车站而耽误行程。</p>",
          time: "2022-6-30 12:0:49",
        },
        {
          id: "ef120f53-3435-4a32-8b65-1ccea9e82e7b",
          author: "新华网",
          title:
            "习近平会见全国政协副主席梁振英 委托相关方面转达对全国政协副主席董建华的问候",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者朱基钗　陈键兴　苏万明）国家主席习近平30日下午在香港会见了全国政协副主席梁振英。</p><p>　　习近平指出，你担任全国政协副主席以来，为国家现代化建设和香港繁荣稳定倾心尽力，这是非常难能可贵的。希望你全力支持新一任行政长官和新一届特别行政区政府依法施政，同社会各界人士一道，为“一国两制”实践行稳致远作出新贡献。</p><p>　　梁振英感谢习近平主席对他的关心和鼓励，表示将竭尽所能，继续为香港和国家服务。</p><p>　　丁薛祥、夏宝龙参加会见。</p><p>　　当天，习近平还专门委托相关方面转达对在港的全国政协副主席董建华的问候。</p>",
          time: "2022-6-30 11:59:20",
        },
        {
          id: "c1e0bdd8-2f90-4db4-ab86-2f10b8fc3715",
          author: "新华网",
          title: "习近平致信祝贺马科斯就任菲律宾总统",
          categoryId: 1,
          content:
            "<p>　　新华社北京6月30日电 &nbsp;6月30日，国家主席习近平致信费迪南德·罗慕尔德兹·马科斯，祝贺他就任菲律宾共和国总统。</p><p>　　习近平指出，不久前，我同你通电话，就中菲两国坚持睦邻友好、携手共同发展达成重要共识。我愿同马科斯总统一道，从战略高度和长远角度把握好两国关系发展大方向，续写新时期中菲友好合作大文章，造福两国和两国人民。</p>",
          time: "2022-6-30 11:57:47",
        },
        {
          id: "74978719-ae79-407c-b8bd-06c91496cdae",
          author: "新华网",
          title: "习近平会见林郑月娥",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者陈键兴　朱基钗　查文晔）国家主席习近平30日下午在香港会见了香港特别行政区行政长官林郑月娥。</p><p>　　习近平指出，5年来，在中央坚定支持下，你忠诚履行行政长官的宪制责任，坚定贯彻落实“一国两制”方针和基本法，带领特别行政区政府依法施政，团结社会各界人士止暴制乱，全力抗击新冠肺炎疫情，积极融入国家发展大局，为维护国家主权、安全、发展利益和香港繁荣稳定，落实“爱国者治港”原则，推动香港局势实现由乱到治重大转折，做了大量艰苦工作，作出重要贡献，展现了勇于担当的精神。对于你这5年来的工作，中央是充分肯定的。</p><p>　　习近平希望林郑月娥积极支持新一任行政长官和新一届特别行政区政府依法施政，继续为香港和国家的发展作出贡献。</p><p>　　林郑月娥衷心感谢习近平主席在香港疫情仍然波动的情况下亲临香港出席庆祝香港回归祖国25周年大会暨香港特别行政区第六届政府就职典礼并视察香港，这充分体现习近平主席对香港同胞的亲切关怀。她表示，香港过去5年是极不平凡的5年，她能够为“一国两制”事业作出贡献，感到十分荣幸。祝愿祖国富强昌盛，习主席视察香港圆满成功。</p><p>　　当天下午，习近平分别会见了香港特别行政区行政、立法、司法机关负责人，香港各界代表人士，香港纪律部队代表，中央驻港机构和主要中资机构负责人。</p><p>　　丁薛祥、许其亮、沈跃跃、王毅、夏宝龙等参加有关会见。</p><p>　　全国政协副主席梁振英，香港特别行政区行政长官林郑月娥、候任行政长官李家超也参加有关会见。</p>",
          time: "2022-6-30 11:43:35",
        },
        {
          id: "b2f17a25-8ad4-482d-8b82-2f2a017d55f2",
          author: "新华网",
          title: "习近平会见贺一诚",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者朱基钗　陈键兴　刘明洋）国家主席习近平30日下午在香港会见了前来出席庆祝香港回归祖国25周年活动的澳门特别行政区行政长官贺一诚。</p><p>　　习近平指出，中央充分肯定你和特别行政区政府的工作，希望你们坚持稳中求进，毫不松懈防控疫情，持续有效纾解民困，努力促进经济复苏，坚定推动经济适度多元发展，全力维护社会大局稳定。</p><p>　　贺一诚感谢习近平主席的接见，表示将努力做好各方面工作，坚决维护澳门良好发展局面。</p><p>　　丁薛祥、夏宝龙参加会见。</p>",
          time: "2022-6-30 12:0:18",
        },
        {
          id: "c4d07fc5-153e-4cc6-ae65-bbee1a0dbcb1",
          author: "中国新闻网",
          title: "长三角铁路暑运发送旅客预计超1亿人次",
          categoryId: 1,
          content:
            "<p>　　中新网南京6月30日电 (许文峰 徐珊珊)据中国铁路上海局集团有限公司30日消息，长三角铁路暑运方案于近日出台，在新冠肺炎疫情防控形势稳定向好的情况下，暑期发送旅客有望超1亿人次。</p><p>　　2022年铁路暑期旅客运输期限自7月1日至8月31日，共计62天。长三角铁路刚性探亲客流预计相对集中于假期两端，通勤流、商务流、旅游流呈现随疫情变化波动的特点。</p><p>　　为满足暑期旅客出行需要，铁路部门在“6.20”新图基础上，精准实施“一日一图”，在客流高峰期对高铁和普速线路实行高峰运行图，根据客流需要适时启用28对周末线列车和58对高峰线列车，全力满足旅客出行需要。</p><p>　　根据暑运期间周末客流特征明显的特点，铁路部门将按照小长假的标准抓好周末客流组织，进一步优化旅客进出站、上下车流线，做好有序组织和有效疏导，防止通道对流、堵塞。为应对突发客流，铁路部门还安排适当应急能力，适时组织动车组列车重联或大编组运行、增开图外临客或加挂车辆。</p><p>　　暑运期间，长三角铁路将落实、落细常态化疫情防控措施，加强车站、列车公共场所的通风消毒和卫生保洁，做好进出站旅客全面测量体温和列车运行途中有需要旅客的测量体温工作，提醒旅客全程规范佩戴口罩；全力配合地方防疫部门做好健康码、核酸检测阴性证明等查验工作，全力营造安全、放心的出行环境。</p><p>　　针对探亲、旅游等客流相对增加等情况，杭州、南京客运段乘务人员严格规范佩戴防疫“三件套”，列车运行途中加大对洗手池、卫生间、车厢通道等公共区域消杀力度；加强防疫宣传和车厢巡视，提醒旅客全程做好个人防护。</p><p>　　铁路部门提醒旅客，暑期出行请自觉遵守当地疫情防控要求，适当提前出门，为防疫查验、进站安检、实名制验证等留足时间；旅行途中，请配合铁路部门做好进出站测温等站车疫情防控工作，全程规范佩戴口罩；许多城市有两个或两个以上火车站，务必认清票面标注的站名，勿因跑错乘车站而耽误行程。</p>",
          time: "2022-6-30 12:0:49",
        },
        {
          id: "ef120f53-3435-4a32-8b65-1ccea9e82e7b",
          author: "新华网",
          title:
            "习近平会见全国政协副主席梁振英 委托相关方面转达对全国政协副主席董建华的问候",
          categoryId: 1,
          content:
            "<p>　　新华社香港6月30日电（记者朱基钗　陈键兴　苏万明）国家主席习近平30日下午在香港会见了全国政协副主席梁振英。</p><p>　　习近平指出，你担任全国政协副主席以来，为国家现代化建设和香港繁荣稳定倾心尽力，这是非常难能可贵的。希望你全力支持新一任行政长官和新一届特别行政区政府依法施政，同社会各界人士一道，为“一国两制”实践行稳致远作出新贡献。</p><p>　　梁振英感谢习近平主席对他的关心和鼓励，表示将竭尽所能，继续为香港和国家服务。</p><p>　　丁薛祥、夏宝龙参加会见。</p><p>　　当天，习近平还专门委托相关方面转达对在港的全国政协副主席董建华的问候。</p>",
          time: "2022-6-30 11:59:20",
        },
      ],
      collectFold: true,
      activeName: "collect",
      collectionss: [],
    };
  },
  mounted() {
    /* getCollection(this.userId).then((res) => {
      this.collections = res.data.data;
    }); */
  },
  computed: {
    drawer() {
      return store.state.drawerOrNot;
    },
    faceSrc() {
      return "data:image/jpeg;base64," + store.state.facePicture;
    },
    userId() {
      return store.state.userId;
    },
  },
  methods: {
    NoteCollectNews(news) {
      clearTimeout(time);
      time = setTimeout(() => {
        if (this.collectFold) {
          this.collectFold = !this.collectFold;
          speech("收藏");
        } else {
          speech(news.title);
        }
      }, 300);
    },
    DrawerValueChange() {
      this.drawer = true;
    },
    Reset() {
      store.commit("InverseDrawer");
    },
    /*     NoteCollectNews(news) {
      clearTimeout(time);
      time = setTimeout(() => {
        speech(news.title);
      }, 300);
    }, */
    RouteToNewsContent(news) {
      clearTimeout(time);
      store.commit("ConvertNews", news);
      router.push({
        name: "news",
        params: {
          id: news.id,
        },
      });
      speech("");
    },
  },
};
</script>
<style scoped>
.el-header {
  background-color: #4a2ac6;
  position: relative;
  height: 900px;
  padding: 0 !important;
  width: 90%;
}

/* 这里还是没能解决padding有白色空隙的问题 */
.el-header.el-drawer__header {
  padding: 0 !important;
  margin: 0;
}

.e {
  margin-left: 40px;
  margin-top: 120px;
  /* flex-grow:unset;
  flex-shrink:; */
  flex-basis: 0%;
  height: 70px;
  width: 70px;
}
.login_reg {
  border-radius: 50px;
  font-size: 90px;
  letter-spacing: 40px;
  height: 200px;
  padding: 0;
  width: 1000px;
  margin-block: 100px;
  background-color: #4a2ac6;
  border: 0px;
  text-align: center;
}
.el-collapse {
  font-size: 20px;
  --el-collapse-header-height: 8vh;
  --el-collapse-header-font-size: 5vw;
  --el-collapse-content-font-size: 5vw;
  font-weight: bold;
  text-align: left;
}
.el-icon {
  font-size: x-large;
  background-color: rgb(255, 217, 0);
  margin-right: 300px;
  margin-left: 50px;
  padding: 0;
}
.el-main {
  margin-top: 50px;
  height: 65vh;
}
</style>
