import Vue from "vue";
import Router from "vue-router";
// import HomePage from "@/components/HomePage.vue";
// import User1 from "@/components/User.vue";
import HelpTab from "@/components/Help.vue";
import StartTab from "@/components/Start.vue";
import LoginTab from "@/components/Login.vue";
// import HelloWorldTab from "@/components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
    mode: "hash",
  routes: [
    {
        path: "",
        component: StartTab
      },
    {
      path: "/start",
      name: 'start',
      component: StartTab 
    },
    {
        path: "/help",
        name: 'help',
        component: HelpTab
      },
      {
        path: "/login",
        name: 'login',
        component: LoginTab
      }
      // ,
      // {
      //   path: "/table",
      //   name: 'table',
      //   component: TableTab
      // }
    // {
    //   path: "/user/:id",
    //   component: User1,
    //   props: true,
    //   children: [
    //     {
    //       path: "",
    //       component: TaskTab
    //     },
    //     {
    //       path: "project",
    //       component: ProjectTab
    //     }
    //   ]
    // }
  ],
});
