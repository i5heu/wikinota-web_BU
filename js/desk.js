var GetDesktopPageTimeCreate = Vue.component("GetDesktopPageTimeCreate", {
  props: ["ajson"],
  data: function() {
    return {
      jsontmp: ""
    }
  },
  template: `
  <div class="tile">
    PAGES
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

var DeskGeldlog = Vue.component("DeskGeldlog", {
  props: ["ajson"],
  data: function() {
    return {
      jsontmp: ""
    }
  },
  template: `
  <div class="tile">
  Geldlog
  <table>
   <tr><td>Last7Days:</td><td>{{ajson.GeldlogLast7Days}}</tr></td>
   <tr><td>CurrentMonth:</td><td>{{ajson.GeldlogCurentMonth}}</tr></td>
   <tr><td>CurrentMonthFood:</td><td>{{ajson.GeldlogCurentMonthFood}}</tr></td>
   <tr><td>ALL:</td><td>{{ajson.GeldlogAll}}</tr></td>
  </table>
  <hr>
    <table>
        <tr v-for="item in ajson.Geldlog">
          <td><span class="namespace">{{ item.Title1 }}</span></td>
          <td>{{ item.Title2 }}</td>
          <td>{{ item.Num1}}</td>
          <td>{{ item.Num2}}</td>
          <td>{{ item.Timecreate}}</td>
        </tr>
    </table>
  </div>
  `
})
