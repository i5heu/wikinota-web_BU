var SHA512 = new Hashes.SHA512
var ApiUrl = "/api"
var AdminHash = localStorage.AdminHash
Vue.config.devtools = true
Vue.use(VueRouter)


const GetDesktop = {
  name: "GetDesktop",
  data: function() {
    return {
      DATA: "ERROR"
    }
  },
  template: `
  <div>
  DESK<br>
    <GetDesktopPageTimeCreate :ajson="DATA"></GetDesktopPageTimeCreate>
  </div>
  `,
  methods: {
    GetPage: function() {
      // POST /someUrl
      this.$http.post(ApiUrl, {
        PWD: AdminHash,
        Method: "ItemListRead",
        SearchAPP: "page"
      }).then(response => {
        // get status
        response.status;

        console.log("API-", response.status, "->", AdminHash);

        // get status text
        response.statusText;

        // get 'Expires' header
        response.headers.get('Expires');

        // get body data
        this.tmpjson = JSON.parse(JSON.stringify(response.body));

        this.DATA = this.tmpjson.DATA

        console.log(this.DATA);
        return this.DATA




      }, response => {
        // error callback
        console.log("API-ERROR");
      });
    }
  },
  beforeMount() {
    console.log("HAHAHAHAHH");
   this.GetPage()
  }
};

const GetPageByURL = {
  name: "GetPageByURL",
  data: function() {
    return {
      PC: "HAAAXXX"
    }
  },
  props: {
    title1: {
      type: String,
      default: "main"
    },
    title2: {
      type: String,
      default: "main"
    }
  },
  template: `
  <div id="content">
    <span class="namespace">{{ PC.Title1 }}</span>
    <h1>{{ PC.Title2 }}</h1>
    <table class="time">
      <tr>
        <td>createt </td>
        <td>{{ PC.Timecreate }}</td>
      </tr>
      <tr>
        <td>lastedit </td>
        <td>{{ PC.Timelastedit }}</td>
      </tr>
    </table>
    <div class="Text" v-html="PC.Text1"></div>
    <hr>
    <div>
      Notizen:<br>
      <div class="Text">{{ PC.Text2 }}</div>
    </div>
    <hr>
    Tags:<br>
    {{PC.Tags1}}



</div>
  `,
  methods: {
    GetPage: function() {
      // POST /someUrl
      this.$http.post(ApiUrl, {
        PWD: AdminHash,
        Method: "ItemIdRead",
        APP: "page",
        Title1: this.title1,
        Title2: this.title2
      }).then(response => {

        // get status
        response.status;

        console.log("API-", response.status, "->", AdminHash);

        // get status text
        response.statusText;

        // get 'Expires' header
        response.headers.get('Expires');

        // get body data
        this.json = JSON.parse(JSON.stringify(response.body));

        this.PC = this.json.DATA[0]
        this.PC.Text1 = marked(this.PC.Text1, { sanitize: true })

        console.log(this.PC.Title1);
        return this.PC




      }, response => {
        // error callback
        console.log("API-ERROR");
      });
    }
  },
  beforeMount() {
    console.log("HAHAHAHAHH");
    this.GetPage()
  }
};


Vue.component("wn-login", {
  data: function() {
    return {
      modalvar: "",
      message: '',
      AdminHash: localStorage.AdminHash
    }
  },
  methods: {
    HashSave: function(message) {
      if (message != "") {
        this.AdminHash = SHA512.hex(message)
        localStorage.AdminHash = this.AdminHash
        AdminHash = this.AdminHash
      }
    },
    LoginChek: function() {
      AdminHash = localStorage.AdminHash
      if (localStorage.AdminHash && localStorage.AdminHash.length) {
        if (localStorage.AdminHash.length == "") {
          this.modalvar = "HashSave"
        }
      } else {
        this.modalvar = "HashSave"
      }

    },
    CheckModalvar: function() {
      if (this.modalvar.length != 0) {
        return true
      } else {
        return false
      }

    }
  },
  beforeMount() {
    this.LoginChek()
  }
})


Vue.component("wn-menue", {
  data: function() {
    return {}
  },
  methods: {
    test: function() {}
  },
  beforeMount() {}
})

const router = new VueRouter({
  routes: [
    // dynamische Segmente beginnen mit Doppelpunkt
    {
      path: '/',
      name: "home",
      component: GetDesktop,
    },
    {
      path: '/p/:title1/:title2',
      name: "page",
      component: GetPageByURL,
      props: true
    }
  ]
})


var app = new Vue({
  el: "#root",
  router: router,
  components: {
    login: 'wn-login'
  },
  data: {
    menue: false,
    PageContent: ""
  },
  methods: {},
  beforeMount() {}

})
