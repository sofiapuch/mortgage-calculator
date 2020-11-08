<template>
    <h2>Mortgage Calculator</h2>
    
    <form @submit.prevent="submitForm">
        <div>
            <label for="purchase-price">Property purchase price</label>
            <input 
                id="purchase-price" 
                name="purchase-price" 
                type="number"
                v-model.number="purchasePrice" />
        </div>
        <div>
            <label for="">Real estate comission</label>
            <input type="text" />
        </div>
        <div>
            <label for="">Total savings</label>
            <input type="text" />
        </div>
        <div>
            <label for="">Annual repayment rate</label>
            <input type="text" />
        </div>
        <button>Calculate</button>
    </form>

    <div>
        <p>Implied Loan</p>
        <p>{{ rawLoanAmount }} €</p>
    </div>

    <div>
        <p>Loan to value</p>
        <p>{{ loanToValue }} %</p>
    </div>

</template>

<script>

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

export default {
    data() {
        return {
            brokerTax: 0.0714, // TODO: move to global
            cityTax: 0.06, // TODO: move to global
            purchasePrice: 0,
            totalSavings: 0,
            // impliedLoan: 0,
            loanToValue: 0
        }
    },
    computed: {
        rawLoanAmount() {

            console.log(this.purchasePrice);
            const notaryCosts = getNotaryCosts(this.purchasePrice);

            // TODO: only if real estate commission 
            const brokerCosts = getBrokerCosts(this.brokerTax, this.purchasePrice);

            const stampDutyCosts = getStampDutyCosts(this.cityTax, this.purchasePrice);

            // TODO: extract
            const totalCosts = notaryCosts + brokerCosts + stampDutyCosts; 

            //rawLoanAmount = totalCosts - total_savings + property_price
            return totalCosts - this.totalSavings + this.purchasePrice;
        }
    },
    methods: {
        submitForm() {
            console.log('Form submitted');
        }
    }
}
</script>