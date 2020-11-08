<template>
    <base-card extraCss="base-card--small">
        <div class="mortgage-option">
            <p class="mortgage-option__value">{{ optionValue.toFixed(2) }} {{optionSymbol}}</p>
            <p class="mortgage-option__title">{{ title }}</p>
        </div>
    </base-card>
</template>

<script>
export default {
    props: {
        title: String,
        optionSymbol: String,
        optionValue: Number
    }
}
</script>

<style lang="scss" scoped>
$value-color: #01a1b1;

.mortgage-option {
    text-align: right;

    &__title,
    &__value {
        white-space: nowrap;
    }

    &__title {
        font-size: 12px;
        font-weight: 700;
    }

    &__value {
        color: $value-color;
        font-size: 22px;
        font-weight: 900;
        line-height: 22px;
    }
}
</style>