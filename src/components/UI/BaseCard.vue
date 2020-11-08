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
$card-border: rgba(#7bb4bd, .4);

.base-card {
    border: 2px solid $card-border;
    margin-bottom: 30px;
    padding: 10px;
}
</style>

