<template>
    <base-card extraCss="grid-x" v-if="tableHasData">
        <div class="rates-table cell">
            <table class="rates-table__table">
                <thead>
                    <tr>
                        <th>Fixation Length</th>
                        <th>Monthly Rate</th>
                        <th>Interest Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(entry, index) in tableData" :key="index">
                        <td>{{ entry.borrowingRate }}</td>
                        <td>{{ entry.borrowingRate }}</td>
                        <td>{{ entry.monthlyRate }}</td>
                    </tr>
                </tbody>
            </table>
            <p class="rates-table__info">** Results based on static values</p>
        </div>
    </base-card>
</template>

<script>
export default {
    props: {
        tableData: Object
    },
    computed: {
        tableHasData() {
            return Object.keys(this.tableData).length > 0;
        }
    }
}
</script>

<style lang="scss" scoped>
.rates-table {
    &__info {
        font-size: 14px;
    }
}
</style>