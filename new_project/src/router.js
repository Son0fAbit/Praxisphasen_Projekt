import Vue from "vue";
import Router from "vue-router";
// import HomePage from "@/components/HomePage.vue";
// import User1 from "@/components/User.vue";
import TaskTab from "@/components/Task.vue";
import TableTab from "@/components/Table.vue";
import HelloWorldTab from "@/components/HelloWorld.vue";

Vue.use(Router);

export default new Router({
    mode: "hash",
  routes: [
    {
        path: "",
        component: HelloWorldTab
      },
    {
      path: "/start",
      name: 'start',
      component: HelloWorldTab 
    },
    {
        path: "/task",
        name: 'task',
        component: TaskTab
      },
      {
        path: "/table",
        name: 'table',
        component: TableTab
      }
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
