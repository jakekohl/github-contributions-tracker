<template>
  <Toolbar class="bottom-info fixed-bottom" data-test="bottom-info">
    <template #end>
      <div>Personal project by <a href="https://github.com/jakekohl">Jacob Kohl</a></div>
    </template>
  </Toolbar>
</template>

<style>
.bottom-info {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  bottom: auto;
  margin-bottom: 0px;
}
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
</style>
