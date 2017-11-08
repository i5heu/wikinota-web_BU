var SHA512 = new Hashes.SHA512
var ApiUrl = "/api"
var AdminHash = localStorage.AdminHash
Vue.config.devtools = true
Vue.use(VueRouter)


const GetPageByURL = {
  name: "GetPageByURL",
  data: function() {
    return {
    PC:"HAAAXXX"
  }},
  props:{
    title1 :{
      type:String,
      default: "main"
    },
    title2 :{
      type:String,
      default: "main"
    }
  },
  template: `
  <div>
    <span class="namespace">{{ PC.Ttitle1 }}</span>
    <h1>{{ PC.Ttitle1 }}</h1>

    <div>{{ PC.Text1 }}</div>
  </div>
  `,
  methods: {
    GetPage: function() {
      // POST /someUrl
      this.$http.post(ApiUrl, {
        PWD: AdminHash ,
        Method: "ItemIdRead",
        APP: "page",
        Title1: this.title1,
        Title2: this.title2
      }).then(response => {

        // get status
        response.status;

        console.log("API-",response.status, "->" , AdminHash);

        // get status text
        response.statusText;

        // get 'Expires' header
        response.headers.get('Expires');

        // get body data
        this.json = JSON.parse(JSON.stringify(response.body));

        this.PC = this.json.DATA[0]

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
       component: GetPageByURL,
     },
     {
     path: '/p/:title1/:title2',
      component: GetPageByURL,
      props: true
     }
  ]
})


var app = new Vue({
  el: "#root",
  router: router,
  components: { login: 'wn-login' },
  data: {
    menue: false,
    PageContent: ""
  },
  methods: {},
  beforeMount() {
  }

})
