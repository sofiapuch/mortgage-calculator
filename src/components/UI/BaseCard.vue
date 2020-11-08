<template>
    <div 
        class="base-card"
        :class="extraCss"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        extraCss: String
    }
}
</script>

<style lang="scss" scoped>
$card-border: rgba(#7bb4bd, .8);

.base-card {
    border: 2px solid $card-border;
    margin-bottom: 30px;
    padding: 30px 60px;

    @media screen and (max-width: 39.9375em) { // small only
        padding: 30px 15px;
    }

    &--small {
        margin-bottom: 15px;
        padding: 20px 60px;

        @media screen and (max-width: 64em) { // below large
            float: left;
            margin: 0 5px 30px;
            padding: 20px 10px;
            width: calc(50% - 10px);
        }
    }
}
</style>

