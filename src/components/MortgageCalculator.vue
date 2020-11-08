<template>

    <base-card extraCss="grid-x">
        <h3 class="cell">Mortgage Calculator</h3>
        
        <form class="cell" @submit.prevent="submitForm">
            <div>
                <label for="purchase-price">Property purchase price</label>
                <input 
                    id="purchase-price" 
                    name="purchase-price" 
                    type="number"
                    v-model.number="purchasePrice" />
            </div>
            <div>
                <RealEstateToggle v-model="realEstateCommission" />
            </div>
            <div>
                <label for="total-savings">Total savings</label>
                <input 
                    id="total-savings" 
                    name="total-savings" 
                    type="number"
                    v-model.number="totalSavings" />
            </div>
            <div>
                <label for="">Annual repayment rate</label>
                <input type="text" />
            </div>
            <button>Calculate</button>
        </form>

    </base-card>

    <base-card extraCss="grid-x">
        <div class="cell medium-6">
            <p>Implied Loan</p>
            <p>{{ rawLoanAmount }} €</p>
        </div>
        <div class="cell medium-6">
            <p>Loan to value</p>
            <p>{{ loanToValue }} %</p>
        </div>
    </base-card>

    <!-- <div class="grid-x grid-margin-x">
        <base-card extraCss="cell medium-6">
            <p>Implied Loan</p>
            <p>{{ rawLoanAmount }} €</p>
        </base-card>
        <base-card extraCss="cell medium-6">
            <p>Loan to value</p>
            <p>{{ loanToValue }} %</p>
        </base-card>
    </div> -->

</template>

<script>

import RealEstateToggle from './RealEstateToggle.vue';

const getNotaryCosts = (propertyPrice) => {
    // notaryCosts = (2144.0 + (0.013 * (property_price - 100000.0)))
    return (2144.0 + (0.013 * (propertyPrice - 100000.0)));
}

const getBrokerCosts = (brokerTax, propertyPrice) => {
    // brokerCosts = brokerTax * property_price
    return brokerTax * propertyPrice;
}

const getStampDutyCosts = (cityTax, propertyPrice) => {
    // stampDutyCosts = cityTax * property_price
    return cityTax * propertyPrice;
}

const getTotalCosts = (notaryCosts, brokerCosts, stampDutyCosts) => {
    return notaryCosts + brokerCosts + stampDutyCosts;
}

export default {
    components: {
        RealEstateToggle
    },
    data() {
        return {
            brokerTax: 0.0714, // TODO: move to global
            cityTax: 0.06, // TODO: move to global
            purchasePrice: 0,
            totalSavings: 0,
            realEstateCommission: false
        }
    },
    computed: {
        rawLoanAmount() {

            const notaryCosts = getNotaryCosts(this.purchasePrice);

            const brokerCosts = this.realEstateCommission ? getBrokerCosts(this.brokerTax, this.purchasePrice) : 0;

            const stampDutyCosts = getStampDutyCosts(this.cityTax, this.purchasePrice);

            const totalCosts = getTotalCosts(notaryCosts, brokerCosts, stampDutyCosts); 

            // rawLoanAmount = totalCosts - total_savings + property_price
            return totalCosts - this.totalSavings + this.purchasePrice;
        },
        loanToValue() {
            // loanToValue = rawLoanAmount / property_price
            const value = (this.rawLoanAmount / this.purchasePrice) * 100;
            return value.toFixed(1);
        }
    },
    methods: {
        submitForm() {
            console.log('Form submitted');
        }
    }
}
</script>