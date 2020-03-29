const dev = {
    urls: {
        USER_SERVICE: "http://localhost:5000/api/userService/",
        EXPENSE_SERVICE: "http://localhost:5000/api/expenseService/"
    }
}

const prod = {
    urls: {
        USER_SERVICE: "http://localhost:5000/api/userService/",
        EXPENSE_SERVICE: "http://localhost:5000/api/expenseService/"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};