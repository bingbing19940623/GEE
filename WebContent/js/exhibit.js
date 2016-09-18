var myChart = echarts.init(document.getElementById('main'));
myChart.showLoading();

$.get('../json/exhibit.json', function (webkitDep) {
    myChart.hideLoading();

    option = {
        legend: {
            data: ['Controller', 'Switch', 'Host']
        },
        title: {
            text: 'Mininet网络展示',
            top: 'bottom',
            left: 'center'
        },
        series: [{
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                normal: {
                    position: 'right',
                    formatter: '{b}'
                }
            },
            draggable: true,
            data: webkitDep.nodes.map(function (node, idx) {
                node.id = idx;
                return node;
            }),
            categories: webkitDep.categories,
            force: {
                 initLayout: 'circular',
                 gravity: 0,
                edgeLength:100,
                repulsion:200,
                minRadius :10,
                maxRadius :100
            },
            edges: webkitDep.links
        }]
    };

    myChart.setOption(option);
});



$(".return").click(function(){
	location.href ="http://localhost:8080/GEE/jsp/jiemian.jsp"
});