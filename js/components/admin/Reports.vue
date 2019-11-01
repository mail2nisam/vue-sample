<template>
    <div class="container">
        <header class="content-header">
            <h2>Reports</h2>
        </header>
        <div class="chart-container">
            <div class="half-col">
                <div class="status-chart-container box-content">
                    <h3 class="chart-header">Abstracts</h3>
                    <canvas id="status-chart"></canvas>
                </div>
            </div>
            <div :class="countryCount>10?'full-col':'half-col'">
                <div class="country-chart-container box-content">
                    <h3 class="chart-header">Countries</h3>
                    <canvas id="country-chart"></canvas>
                </div>
            </div>
            <div :class="companyCount>10?'full-col':'half-col'">
                <div class="company-chart-container box-content">
                    <h3 class="chart-header">Companies</h3>
                    <canvas id="company-chart"></canvas>
                </div>
            </div>
            <div class="half-col">
                <div class="box-content">
                    <h3 class="chart-header">Stream</h3>
                    <canvas id="stream-chart"></canvas>
                </div>
            </div>
            <div class="full-col">
                <div class="box-content">
                    <h3 class="chart-header">Technical</h3>
                    <canvas id="technical-chart"></canvas>
                </div>
            </div>
            <div class="full-col">
                <div class="box-content">
                    <h3 class="chart-header">Strategic</h3>
                    <canvas id="strategic-chart"></canvas>
                </div>
            </div>
            <div class="full-col">
                <div class="box-content">
                    <h3 class="chart-header">Topics</h3>
                    <canvas id="topic-chart"></canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from 'chart.js';

    export default {
        name: "Reports",
        data: () => {
            return {
                barConfig: {
                    type: 'bar',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }],
                            xAxes: [{
                                barPercentage: 0.5,
                                barThickness: 20,
                                maxBarThickness: 50,
                                minBarLength: 2,
                                gridLines: {
                                    offsetGridLines: false
                                }
                            }]
                        }
                    }
                },
                countryCount: 0,
                companyCount: 0
            }
        },
        mounted() {
            this.showLoader();
            // init country chart
            this.initCountryChart();
            // init company chart
            this.initCompanyChart();
            // init chart for Complete/Incomplete data
            this.initAbstractStatusChart();
            // init chart for abstract per stream
            this.initStreamChart();
            // init chart for technical stream
            this.initTechnicalStreamChart();
            // init chart for strategic stream
            this.initStrategicStreamChart();
            this.initTopicChart();
        },
        methods: {
            initTopicChart: function () {
                this.$store.dispatch("fetchTopicData")
                    .then(
                        response => {
                            if (response.data.status) {
                                this.generateBarChart('topic-chart', response.data.topics_counts);
                            }
                        }
                    )
            },
            /**
             * Chart for abstracts under strategic stream
             */
            initStrategicStreamChart: function () {
                this.$store.dispatch("fetchStrategicStreamData")
                    .then(
                        response => {
                            if (response.data.status) {
                                this.generateBarChart('strategic-chart', response.data.strategic_count);
                            }
                        }
                    )
            },
            /**
             * Chart for abstracts under technical stream
             */
            initTechnicalStreamChart: function () {
                this.$store.dispatch("fetchTechnicalStreamData")
                    .then(
                        response => {
                            if (response.data.status) {
                                this.generateBarChart('technical-chart', response.data.technical_count);
                            }
                        }
                    )
            },
            /**
             * Get data for stream chart
             */
            initStreamChart: function () {
                this.$store.dispatch("fetchAbstractStreamCount")
                    .then(
                        response => {
                            if (response.data.status) {
                                this.generateBarChart('stream-chart', response.data.stream_counts);
                            }
                        }
                    )
            },
            /**
             * Get the count of drafted and submitted abstract count
             * Show chart with the response data
             */
            initAbstractStatusChart: function () {
                this.$store.dispatch("fetchAbstractStatusChartData")
                    .then(
                        response => {
                            if (response.data.status) {
                                this.formatStatusChartData(response.data.counts);
                            }
                        }
                    )
            },
            /**
             * Request data for country chart
             */
            initCountryChart: function () {
                this.$store.dispatch("fetchCountryChartData")
                    .then(
                        response => {
                            if (response.data.status && response.data.countries && response.data.countries.length > 0) {
                                this.countryCount = response.data.countries.length;
                                this.generateBarChart('country-chart', response.data.countries);
                            }
                        }
                    )
            },
            /**
             * Request from company chart data
             */
            initCompanyChart: function () {
                this.$store.dispatch("fetchCompanyChartData")
                    .then(
                        response => {
                            if (response.data.status && response.data.companies && response.data.companies.length > 0) {
                                this.companyCount = response.data.companies.length;
                                this.generateBarChart('company-chart', response.data.companies);
                            }
                        }
                    )
            },
            /**
             * Generate doughnut chart with the data
             * @param data
             */
            formatStatusChartData: function (data) {
                let chartData = {
                    type: 'doughnut',
                    data: {
                        datasets: [{data: [data.submitted, data.draft], "backgroundColor": ["#2b44a1", "#137dc1"]}],
                        labels: ['Completed', 'Incomplete']
                    }
                };
                new Chart(document.getElementById('status-chart'), chartData);
            },
            /***
             * Generate bar chart from the data
             * @param id - canvas id
             * @param data - chart data
             */
            generateBarChart: function (id, data) {
                let chartData = _.cloneDeep(this.barConfig);
                let submittedDataSet = {
                    label: 'Submitted',
                    data: [],
                    backgroundColor: '#2b44a1',
                    borderColor: '#2b44a1',
                    borderWidth: 1
                };
                let draftDataSet = {
                    label: 'Draft',
                    data: [],
                    backgroundColor: '#137dc1',
                    borderColor: '#137dc1',
                    borderWidth: 1,
                    barThickness: '1'
                };
                data.map((item) => {
                    chartData.data.labels.push(item.label);
                    submittedDataSet.data.push(item.submitted);
                    draftDataSet.data.push(item.draft);
                });
                chartData.data.datasets = [submittedDataSet, draftDataSet];
                new Chart(document.getElementById(id), chartData);
            },
            /**
             * Show initial loader for the report page
             */
            showLoader: function () {
                this.$store.commit("setLoader", true);
                setTimeout(() => {
                    this.$store.commit("setLoader", false);
                }, 1000)
            }
        }
    }
</script>

<style scoped>
</style>
