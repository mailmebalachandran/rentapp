const dev = {
    urls: {
        USER_SERVICE: "http://localhost:5000/api/userService/",
        EXPENSE_SERVICE: "http://localhost:5000/api/expenseService/",
        AUTH_SERVICE: "http://localhost:7000/api/authService/"
    }
}

const prod = {
    urls: {
        USER_SERVICE: "http://localhost:5000/api/userService/",
        EXPENSE_SERVICE: "http://localhost:5000/api/expenseService/",
        AUTH_SERVICE: "http://localhost:7000/api/authService/"
    }
}

const config = process.env.REACT_APP_STAGE === 'prod'
    ? prod
    : dev;

export default {
    ...config
};