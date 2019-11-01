export default {
    methods: {
        /**
         * Check if the value is a valid email
         * @param value
         * @returns {boolean}
         */
        isValidEmail: function (value) {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value).toLowerCase());
        },
        /**
         * Check for valid phone number
         * @param value
         * @returns {boolean}
         */
        isValidPhone: function (value) {
            let re = /^(\+\d)?[\d\-\(\)\s]{5,15}\d$/;
            return re.test(String(value).toLowerCase());
        },
        /**
         * Check if valid password
         * Must contain one upper case, one lowecase, number, special charactor, and minimum length of eight
         */
        isValidPassword: function (value) {
            // let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            // return re.test(value);
            return value && value.trim();
        },
        /**
         * Check basic validation for field value
         * @param value
         * @returns {*}
         */
        isValidField: function (value) {
            return value && value.trim();
        }
    }
}
