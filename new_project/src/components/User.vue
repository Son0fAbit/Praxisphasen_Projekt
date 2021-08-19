<template>
  <div>
    <v-tabs v-model="activeTab" grow>
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
        {{ tab.name }}
      </v-tab>

      <v-tab-item v-for="tab of tabs" :key="tab.id" :value="tab.route">
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      activeTab: `/user/${this.id}`,
      tabs: [
        { id: 1, name: "Task", route: `/user/${this.id}` },
        { id: 2, name: "Project", route: `/user/${this.id}/project` }
      ]
    };
  }
};
</script>
