<template>

    <div class="grid-x grid-margin-x">

        <base-card extraCss="cell medium-12 large-9">
            
            <form class="mortgage-calculator cell" @submit.prevent="submitForm">

                <h3 class="mortgage-calculator__title cell">Mortgage Calculator</h3>

                <div class="grid-x grid-margin-x">
                    <div 
                        class="mortgage-calculator__section mortgage-calculator__section--euros cell medium-6"
                        :class="{error: purchasePriceValidity === false}"
                    >
                        <label for="purchase-price">Property purchase price</label>
                        <input 
                            id="purchase-price" 
                            name="purchase-price"
                            type="number"
                            class="mortgage-calculator__input"
                            v-model.number="purchasePrice" 
                            @blur="validatePurchasePrice"/>
                        <p 
                            class="mortgage-calculator__error-message" 
                            v-if="!purchasePriceValidity">
                            Please enter a valid number
                        </p>
                    </div>
                    <div 
                        class="mortgage-calculator__section mortgage-calculator__section--euros cell medium-6"
                        :class="{error: totalSavingsValidity === false}"
                    >
                        <label for="total-savings">Total savings</label>
                        <input 
                            id="total-savings" 
                            name="total-savings" 
                            type="number"
                            class="mortgage-calculator__input"
                            v-model.number="totalSavings" 
                            @blur="validateTotalSavings"/>
                        <p 
                            class="mortgage-calculator__error-message" 
                            v-if="!totalSavingsValidity">Please enter a valid number
                        </p>
                    </div>
                    <div class="mortgage-calculator__section cell medium-6">
                        <RealEstateToggle v-model="realEstateCommission" />
                    </div>
                    <div class="mortgage-calculator__section cell medium-6">
                        <RepaymentRateIncremental />
                    </div>
                    <div class="mortgage-calculator__button-wrapper cell">
                        <button 
                            class="mortgage-calculator__button"
                            :disabled="submitIsDisabled">
                            Calculate
                        </button>
                    </div>
                </div>
                
            </form>

        </base-card>

        <div class="cell medium-12 large-3">
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
import RepaymentRateIncremental from './customFormElements/RepaymentRateIncremental.vue';
import MortgageOption from './MortgageOption.vue';
import RatesTable from './RatesTable.vue';

// import util functions that will be needed later
import calculateTotalCosts from '../utils/mortgage-utils';

export default {
    components: {
        RealEstateToggle,
        RepaymentRateIncremental,
        MortgageOption,
        RatesTable
    },
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            purchasePrice: 0,
            purchasePriceValidity: true,
            totalSavings: 0,
            totalSavingsValidity: true,
            realEstateCommission: false,
            tableData: {}
        }
    },
    computed: {
        submitIsDisabled() {
            if ( this.purchasePrice > 0 && this.totalSavings >= 0 ) {
                return false;
            }
            return true;
        },
        rawLoanAmount() {
            // return a 0 if no purchase price or total savings or they're equal to zero
            if (this.purchasePrice === 0 || this.purchasePrice === '' || this.totalSavings === '' ) {
                return 0;
            }

            const totalCosts = calculateTotalCosts(
                this.purchasePrice, 
                CITY_TAX,
                this.realEstateCommission ? BROKER_TAX : null
            ); 

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
        validatePurchasePrice() {
            this.purchasePriceValidity = this.purchasePrice >= 0;
        },
        validateTotalSavings() {
            this.totalSavingsValidity = this.totalSavings >= 0;
        },
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
            fetch(window.location.href + 'mockData.json').then( (resolve) => {
                if (resolve.ok) {
                    return resolve.json();
                }
                throw new Error(resolve.status);
            })
            .then((response) => {
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
$input-value-color: #01a1b1;
$input-border-color: #dfe8f1;
$button-primary-color: #2c7083;
$button-hover-color: #dba879;
$error-color: #c41c1c;

.mortgage-calculator {
    $this: &;

    &__title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    &__section {
        margin-bottom: 30px;
        position: relative;

        &--euros {
            &:after {
                color: $input-value-color;
                content: '€';
                font-weight: 700;
                position: absolute;
                right: 20px;
                top: 54%;
            }
        }

        &.error {
            #{$this}__input {
                background-color: rgba( $error-color, .1);
                border-color: $error-color;
                color: $error-color;
            }

            &:after {
                color: $error-color;
            }
        }

        label {
            font-size: 16px;
        }
    }

    &__input {
        color: $input-value-color;
        border-color: $input-border-color;
        border-radius: 3px;
        font-size: 20px;
        font-weight: 700;
        padding: 20px 35px;
        text-align: right;
    }

    &__error-message {
        bottom: -20px;
        color: $error-color;
        font-size: 12px;
        font-weight: 700;
        position: absolute;
    }

    &__button-wrapper {
        text-align: center;
    }

    &__button {
        background: $button-primary-color;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        font-weight: 700;
        height: 40px;
        min-width: 160px;
        padding: 0 20px;

        &:hover {
            background: $button-hover-color;
            box-shadow: 1px 1px 3px #acacac;
            color: #413d3e;
        }

        &:disabled,
        &[disabled] {
            background: #acacac;
            color: #3a3939;
            pointer-events: none;
        } 

        @media screen and (max-width: 39.9375em) { // small only
            width: 100%;
        }
    }
}
</style>