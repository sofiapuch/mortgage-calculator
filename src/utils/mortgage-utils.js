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

/*
 * Calculate total mortgage cost
*/
export default function calculateTotalCosts(propertyPrice, cityTax, brokerTax) {

    const notaryCosts = getNotaryCosts(propertyPrice);
    const stampDutyCosts = getStampDutyCosts(cityTax, propertyPrice);

    let brokerCosts = 0;
    if (brokerTax) {
        brokerCosts = getBrokerCosts(brokerTax, propertyPrice);
    } 

    return notaryCosts + stampDutyCosts + brokerCosts;
}

