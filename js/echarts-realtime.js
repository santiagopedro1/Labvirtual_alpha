const myChart = echarts.init(document.getElementById('chart'), 'echarts-theme', { renderer: 'svg' })

const header = new Headers({
	'Bypass-Tunnel-Reminder': 1,
})

let option = {
	title: {
		text: `Gráfico do dia ${new Date().toLocaleDateString('pt-BR')}`,
	},
	tooltip: {
		trigger: 'axis',
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: [],
	},
	yAxis: {
		type: 'value',
	},
	legend: {
		show: true,
	},
	series: [
		{
			name: 'Umidade do sensor A',
			type: 'line',
			data: [],
		},
		{
			name: 'Umidade do sensor B',
			type: 'line',
			data: [],
		},
		{
			name: 'Conductividade do sensor A',
			type: 'line',
			data: [],
		},
		{
			name: 'Conductividade do sensor B',
			type: 'line',
			data: [],
		},
		{
			name: 'Temperatura do sensor A',
			type: 'line',
			data: [],
		},

		{
			name: 'Temperatura do sensor B',
			type: 'line',
			data: [],
		},
	],
}
myChart.setOption(option)

const getData = () => {
	let d = new Date()
	h = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - (d.getMinutes() % 10) + 10, 5, 0)
	e = h - d
	window.setTimeout(getData, e)

	fetch('https://apilabvirtual.loca.lt/hoje', { method: 'GET', headers: header }).then((res) => {
		return res.json().then((dados) => {
			myChart.setOption({
				xAxis: {
					data: dados.hora,
				},
				series: [
					{
						name: 'Umidade do sensor A',
						data: dados.sensor.A.Umidade,
					},
					{
						name: 'Umidade do sensor B',
						data: dados.sensor.B.Umidade,
					},
					{
						name: 'Conductividade do sensor A',
						data: dados.sensor.A.Conductividade,
					},
					{
						name: 'Conductividade do sensor B',
						data: dados.sensor.B.Conductividade,
					},
					{
						name: 'Temperatura do sensor A',
						data: dados.sensor.A.Temperatura,
					},
					{
						name: 'Temperatura do sensor B',
						data: dados.sensor.B.Temperatura,
					},
				],
			})
			let x = new Date()
			console.log(`cheguei ${x.getHours()}:${x.getMinutes()}:${x.getSeconds()}.${x.getMilliseconds()}`)
		})
	})
}

window.addEventListener('resize', () => {
	myChart.resize()
})
