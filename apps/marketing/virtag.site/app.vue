<!-- <template>
  <v-app>

    <v-container>
      <v-card
        width="400"
        title="This is a title"
        subtitle="This is a subtitle"
        text="This is content"
      ></v-card>

      <div class="mt-4 text-subtitle-2">With slots</div>

      <v-card width="400">
        <template v-slot:title>
          This is a title
        </template>

        <template v-slot:subtitle>
          This is a subtitle
        </template>

        <template v-slot:text>
          This is content
        </template>
      </v-card>

      <div class="mt-4 text-subtitle-2">With markup</div>

      <v-card width="400">
        <v-card-item>
          <v-card-title>This is a title</v-card-title>

          <v-card-subtitle>This is a subtitle</v-card-subtitle>
        </v-card-item>

        <v-card-text>
          This is content
        </v-card-text>
      </v-card>

      <v-btn
      append-icon="mdi-account-circle"
      prepend-icon="mdi-check-circle"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>
        This is a button
      </v-btn>
    </v-container>

  </v-app>
</template>
-->
<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
