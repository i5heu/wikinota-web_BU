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
