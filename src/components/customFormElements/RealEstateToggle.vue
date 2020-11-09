<template>
    <p>Real estate comission</p>
    <ul class="real-estate-toggle">
        <li 
            class="real-estate-toggle__item"
            v-for="option in options"
            :key="option" >
            <button
                type="button"
                class="real-estate-toggle__button"
                :class="{active: selected === option}"
                @click="selectOption(option)">
                {{ option }}
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    data() {
        return {
            options: [ 'Yes', 'No' ],
            // default to 'No real estate commission'
            selected: 'No' 
        };
    },
    methods: {
        selectOption(option) {
            this.selected = option;

            const optionBoolean = option === 'Yes';
            this.$emit('update:modelValue', optionBoolean);
        }
    }
}
</script>

<style lang="scss" scoped>

$main-bg-color: #f1d9bd;
$active-color: #dba879;

.real-estate-toggle {
    background: $main-bg-color;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 5px;

    &__item {
        flex: 1%;
        list-style-type: none;
    }

    &__button {
        cursor: pointer;
        height: 30px;
        width: 100%;

        &.active {
            background: $active-color;
            border-radius: 3px;
            box-shadow: 1px 1px 3px #acacac;
            font-weight: bold;
        }
    }
}
</style>