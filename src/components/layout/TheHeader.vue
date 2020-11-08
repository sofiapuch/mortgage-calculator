<template>
    <div class="the-header">
        <p class="the-header__title">Vue.js Challenge</p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$teal: #2c7083;

.the-header {
    border-bottom: 2px solid $teal;
    padding: 25px 50px;

    &__title {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
    }
}
</style>