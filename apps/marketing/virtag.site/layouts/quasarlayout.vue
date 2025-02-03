<template>
  <QLayout view="hHh lpR fFf">
    <QPageContainer>
      <QPage padding class="column flex-center q-gutter-xl">
        <!-- if on layouts use `slot`. if on app.vue use `NuxtPage` -->
        <slot />
      </QPage>
    </QPageContainer>
  </QLayout>
</template>
