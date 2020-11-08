<template>
    <div class="the-header">
        <p class="the-header__title">Vue.js Challenge</p>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$header-border: #dba879;

.the-header {
    border-bottom: 2px solid $header-border;
    margin-bottom: 60px;
    padding: 25px 50px;

    @media screen and (max-width: 39.9375em) { // small only
        margin-bottom: 30px;
    }

    &__title {
        font-size: 22px;
        font-weight: bold;
        margin: 0;
    }
}
</style>