<template>
    <p>Real estate comission</p>
    <ul>
        <li>
            <button 
                type="button"
                :class="{active: selected === 'yes'}"
                @click="selectOption('yes')">
                Yes
            </button>
        </li>
        <li>
            <button 
                type="button"
                :class="{active: selected === 'no'}"
                @click="selectOption('no')">
                No
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
            // default to 'No real estate commission'
            selected: 'no' 
        };
    },
    methods: {
        selectOption(option) {
            this.selected = option;

            const optionBoolean = option === 'yes';
            this.$emit('update:modelValue', optionBoolean);
        }
    }
}
</script>

<style lang="scss" scoped>
.active {
    background: rgb(45, 173, 201);
}
</style>