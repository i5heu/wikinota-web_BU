const Geldlog = {
  name: "Geldlog",
  data: function() {
    return {
      Status: "",
      DATA: "ERROR",
      loading: true,
      Title1: "main",
      Title2: "main",
      Num1: 1
    }
  },
  template: `
  <div id="content">
    <div class="fancyinput">
      title1<input v-model="Title1"></input><br>
      title2<input v-model="Title2"></input><br>
      num1<input type="number" v-model.number="Num1"></input><br>
      <button v-on:click="SendGeldlog" v-on:click="GetPage" >SEND</button>
      {{Status}}
    </div>
    <div v-if="loading == false">
      <DeskGeldlog :ajson="DATA"></DeskGeldlog>
    </div>
    <div v-else>
      <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  `,
  methods: {
    GetPage: function() {
      this.loading = true
      // POST /someUrl
      this.$http.post(ApiUrl, {
        PWD: AdminHash,
        Method: "Desk",
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

        this.DATA = this.tmpjson
        console.log(this.DATA);
        this.loading = false
        return this.DATA

      }, response => {
        // error callback
        console.log("API-ERROR");
      });
    },
    SendGeldlog: function() {
      // POST /someUrl
      this.$http.post(ApiUrl, {
        PWD: AdminHash,
        Method: "ItemWrite",
        APP: "geldlog",
        Title1: this.Title1,
        Title2: this.Title2,
        Num1: this.Num1,
        needlogin: true
      }).then(response => {
        // get status
        response.status;

        console.log("API-", response.status, "->", AdminHash);

        // get status text
        response.statusText;

        // get 'Expires' header
        response.headers.get('Expires');

        // get body data
        this.Status = JSON.parse(JSON.stringify(response.body)).Status;


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
