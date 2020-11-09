<template>
    <p>Anual Repayment Rate</p>
    <div class="repayment-rate-incremental">
        <button class="repayment-rate-incremental__button">-</button>
        <input type="text" value="2%" disabled/>
        <button class="repayment-rate-incremental__button">+</button>
    </div>
</template>

<script>
// Dummy component, doesn't do anything since it's not used for fetching data atm
export default {}
</script>

<style lang="scss" scoped>

$main-bg-color: #f1d9bd;
$active-color: #dba879;

.repayment-rate-incremental {
    align-items: center;
    display: flex;

    &__button {
        background: $main-bg-color;
        border-radius: 3px;
        height: 39px;
        font-weight: 900;
        width: 55px;

        &:hover {
            background: $active-color;
            box-shadow: 1px 1px 3px #acacac;
            cursor: pointer;
        }
    }

    input {
        border-radius: 3px;
        margin: 0 3px !important;
        text-align: center;
    }
}
</style>
