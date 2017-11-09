var GetDesktopPageTimeCreate = Vue.component("GetDesktopPageTimeCreate", {
  props: ["ajson"],
  data: function() {
    return {
      jsontmp: ""
    }
  },
  template: `
  <div class="tile">
    <table>
        <tr v-for="item in ajson">

          <td><span class="namespace">{{ item.Title1 }}</span></td>
          <td><router-link :to="{ name: 'page', params: { title1: item.Title1, title2: item.Title2}}">{{ item.Title1 }}</router-link></td>

          <td v-html="item.Text1"></td>
        </tr>
    </table>
  </div>
  `
})
