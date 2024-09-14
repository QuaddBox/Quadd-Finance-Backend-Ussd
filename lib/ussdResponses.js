module.exports.ussdResponses = {
    welcome:`CON Welcome to Quadd Finace
        1. Register
        2. Help
    `,

    register_default:`CON Please Enter your full name
        (Example John Doe)
    `,

    register_phone:`CON Please enter your mobile phone number"
        (Example +234-XXX-XXX-XXXX)
    `,

    register_pin:`CON Please set a 4-digit PIN"
        (Example 1234)
    `,

    register_end:(name,phone)=>`END Congratulations ${name} your number is ${phone} and your wallet is now active`,

    default:`END Sorry could not process your request please try again later`
}

module.exports.ussdBalanceResponse = {
    welcome:`CON Welcome to Quadd Finace
        1. Check Balance
        2. Transfer Fund
        3. Withdraw Funds
        4. Transaction History
        5. Settings
        6. Help Support
    `,
    balance_start:`CON Please input your 4 digit transaction PIN
    (Example : 1234)
    `,
    balance_currency:`CON Please select currency
        1. USDT
        2. BTC
        3. ETH
        4. NGN
        5. KHES
        6. CEDI
    `,
    balance_end:(currency)=>`END your balance is ${Math.floor(Math.random() * 1000000)} ${currency}`,
}
