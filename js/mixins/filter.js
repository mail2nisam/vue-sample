export default {
    methods: {
        /**
         * Append or update the given query to current route
         * @param key : query key
         * @param value : query value
         */
        addRouteQuery: function (key, value) {
            // get the current query data from the route
            let query = this.$route.query;
            // get the current path
            let path = this.$route.path;
            // update the query with the given value and key
            query[key] = value;
            // get the query string from the object
            let queryString = this.serialize(query);
            // generate path from query string and path
            let url = `${path}?${queryString}`;
            // update the current url with query string
            history.pushState({}, null, url);
        },
        /**
         * Serialize the given object to query string format
         * @param obj
         * @returns {string}
         */
        serialize: function (obj) {
            let str = [];
            for (let p in obj)
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            return str.join("&");
        },
        /**
         * Sort array using dynamic key
         * @param property
         * @returns {function(*, *): number}
         */
        dynamicSort: function (property) {
            let sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return (a, b) => {
                /* next line works with strings and numbers,
                 * and you may want to customize it to your needs
                 */
                a[property] = a[property] === null ? '' : a[property];
                b[property] = b[property] === null ? '' : b[property];
                let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        },
        /**
         * Multi field sort
         * @param list
         * @returns {function(*=, *=): number}
         */
        dynamicSortMultiple: function (list) {
            let props = list;
            return (obj1, obj2) => {
                let i = 0, result = 0, numberOfProperties = props.length;
                /* try getting a different result from 0 (equal)
                 * as long as we have extra properties to compare
                 */
                while (result === 0 && i < numberOfProperties) {
                    result = this.dynamicSort(props[i])(obj1, obj2);
                    i++;
                }
                return result;
            }
        }
    }
}
