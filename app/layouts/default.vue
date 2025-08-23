<template>
	<main class="layout">
		<slot />
		<UiButtonScrollTop class="layout__scroll-top-btn" />
	</main>
</template>

<style lang="scss">
.layout{
  max-width: $maxWidth;
  min-height: 101dvh;
  padding: 96px 20px;
  margin: 0 auto;
  position: relative;
  @media (max-width:$lg2) {
    padding: 48px 20px;
  }
  &__scroll-top-btn{
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
}
</style>
