export const currencyFormatter = (amount) => {
    const formatter = Intl.NumberFormat("en-Us", {currency:"USD", style:"currency"});

    return formatter.format(amount)
}