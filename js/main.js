var SHA512 = new Hashes.SHA512
Vue.config.devtools = true

var ModulFunctions = new Vue({
  el: '#ModulFunctions',
  data: {
    modalvar: "",
    message: '',
    AdminHash: localStorage.AdminHash
  },
  methods: {
    HashSave: function(message) {
      if (message != "") {
        this.AdminHash = SHA512.hex(message)
        localStorage.AdminHash = this.AdminHash
      }
    },
    LoginChek: function() {
      if (localStorage.AdminHash && localStorage.AdminHash.length) {
        if (localStorage.AdminHash.length == "") {
          this.modalvar = "HashSave"
        }
        console.log("LoginChek>", this.modalvar);
      } else {
        this.modalvar = "HashSave"
      }

    },
    CheckModalvar: function() {
      console.log("CheckModalvar >>", this.modalvar);
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


var desk = new Vue({

  el: '#desk',

  data: {
  },
  created: function () {
    console.log("test");


  // POST /someUrl
  this.$http.post('http://localhost:8080/api', {foo: 'bar'}).then(response => {

    // get status
    response.status;

    // get status text
    response.statusText;

    // get 'Expires' header
    response.headers.get('Expires');

    // get body data
    this.someData = response.body;

  }, response => {
    // error callback
  });



  },

  watch: {

  },
  methods: {

  }
})



var DeskPortal = new Vue({

  el: '#DeskPortal',

  data: {
  },
  created: function () {
    console.log("test2");
  },

  watch: {

  },
  methods: {

  }
})
