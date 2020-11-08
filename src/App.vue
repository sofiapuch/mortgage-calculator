<template>
    <TheHeader />
    <MortgageCalculator />
</template>

<script>

import TheHeader from './components/layout/TheHeader.vue';
import MortgageCalculator from './components/MortgageCalculator.vue';

export default {
    components: {
        TheHeader,
        MortgageCalculator
    }
}
</script>

<style lang="scss">

$body-font-color: #413d3e;

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $body-font-color;
}
</style>