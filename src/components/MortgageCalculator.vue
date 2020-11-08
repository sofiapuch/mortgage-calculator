<template>

    <div class="grid-x grid-margin-x">

        <base-card extraCss="cell medium-8 large-10">
            
            <form class="mortgage-calculator cell" @submit.prevent="submitForm">

                <h3 class="mortgage-calculator__title cell">Mortgage Calculator</h3>

                <div class="grid-x grid-margin-x">
                    <div class="cell medium-6">
                        <label for="purchase-price">Property purchase price</label>
                        <input 
                            id="purchase-price" 
                            name="purchase-price" 
                            type="number"
                            v-model.number="purchasePrice" />
                    </div>
                    <div class="cell medium-6">
                        <label for="total-savings">Total savings</label>
                        <input 
                            id="total-savings" 
                            name="total-savings" 
                            type="number"
                            v-model.number="totalSavings" />
                    </div>
                    <div class="cell medium-6">
                        <RealEstateToggle v-model="realEstateCommission" />
                    </div>
                    <div class="cell medium-6">
                        <label for="">Annual repayment rate</label>
                        <input type="text" />
                    </div>
                    <div class="mortgage-calculator__button-wrapper cell">
                        <button class="mortgage-calculator__button">Calculate</button>
                    </div>
                </div>
                
            </form>

        </base-card>

        <div class="cell medium-4 large-2">
            <MortgageOption
                title="Implied Loan"
                option-symbol="€"
                :option-value="rawLoanAmount"
            />
            <MortgageOption
                title="Loan to value"
                option-symbol="%"
                :option-value="loanToValue"
            />
        </div>

    </div>
    
    <RatesTable :tableData="tableData"/>

</template>

<script>

const BROKER_TAX = 0.0714;
const CITY_TAX = 0.06;

import RealEstateToggle from './customFormElements/RealEstateToggle.vue';
import MortgageOption from './MortgageOption.vue';
import RatesTable from './RatesTable.vue';

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
        RealEstateToggle,
        MortgageOption,
        RatesTable
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            brokerTax: BROKER_TAX,
            cityTax: CITY_TAX,
            purchasePrice: 0,
            totalSavings: 0,
            realEstateCommission: false,
            tableData: {}
        }
    },
    computed: {
        rawLoanAmount() {

            // return a 0 on page load
            if (this.purchasePrice === 0 && this.totalSavings === 0) {
                return 0;
            }

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
            return Number.isNaN(value) ? 0 : value;
        }
    },
    methods: {
        submitForm() {
 
            // IMPORTANT: Server CORS issue - Data saved from request
            // via Postman

            // fetch("https://hypofriend.de/q", { 
            //     "headers": {
            //         "accept": "*/*",
            //         "accept-language": "en,de;q=0.9,cs;q=0.8", 
            //         "cache-control": "no-cache", 
            //         "content-type": "application/json", 
            //         "pragma": "no-cache",
            //         "sec-fetch-dest": "empty", 
            //         "sec-fetch-mode": "cors", 
            //         "sec-fetch-site": "same-origin",
            //     },
            //     "referrer": "https://hypofriend.de", 
            //     "referrerPolicy": "same-origin",
            //     "body": "{\"query\":\"query {root {rates_table(property_price: 340000, repayment: 2, loan_amount: 315664, years_fixed: [5,10,15,20,25,30])} }\"}",
            //     "method": "POST",
            //     "mode": "cors",
            //     "credentials": "include"
            // }).then(response => response.json()).then(data => console.log(data));

            // Fetch the data from a mockData file saved on the public folder
            fetch(this.baseUrl + 'mockData.json').then( (resolve) => {
                if (resolve.ok) {
                    return resolve.json();
                }
                throw new Error(resolve.status);
            })
            .then((response) => {
                console.log("response: ", response);

                const data = response.data;

                if (data && data.root && data.root.ratesTable) {
                    this.tableData = data.root.ratesTable;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
$button-primary-color: #2c7083;
$button-hover-color: #dba879;

.mortgage-calculator {

    &__title {
        font-size: 20px;
        font-weight: 700;
    }

    &__button-wrapper {
        text-align: center;
        margin: 20px 0 0;
    }

    &__button {
        background: $button-primary-color;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        min-width: 160px;
        padding: 10px 20px;

        &:hover {
            background: $button-hover-color;
            color: #413d3e;
        }

        @media screen and (max-width: 39.9375em) { // small only
            width: 100%;
        }
    }
}
</style>