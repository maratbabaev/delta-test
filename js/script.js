const data = [
	{
		value: "Выручка, руб",
		curDay: 500521,
		yest: 480521,
		thisDay: 4805121,
	},
	{
		value: "Наличные",
		curDay: 300000,
		yest: 300000,
		thisDay: 600000,
	},
	{
		value: "Безналичный расчет",
		curDay: 100000,
		yest: 100000,
		thisDay: 400000,
	},
	{
		value: "Кредитные карты",
		curDay: 100521,
		yest: 100521,
		thisDay: 300521,
	},
	{
		value: "Средний чек, руб",
		curDay: 1300,
		yest: 900,
		thisDay: 1900,
	},
	{
		value: "Средний гость, руб",
		curDay: 1200,
		yest: 800,
		thisDay: 1200,
	},
	{
		value: "Удаления из чека (после оплаты), руб",
		curDay: 1000,
		yest: 1500,
		thisDay: 500,
	},
	{
		value: "Удаления из чека (до оплаты), руб",
		curDay: 1300,
		yest: 1300,
		thisDay: 4300,
	},
	{
		value: "Количество чеков",
		curDay: 34,
		yest: 40,
		thisDay: 12,
	},
	{
		value: "Количество гостей",
		curDay: 34,
		yest: 55,
		thisDay: 155,
	},
];

let table = document.querySelector(".table");

data.forEach((d, i) => {
	let tr = document.createElement("div");
	tr.classList.add("tr");
	Object.values(d).forEach((value, j) => {
		let td = document.createElement("div");
		td.classList.add("td");
		if (j === 2) {
			td.innerHTML = `<span>${formatNumberWithSpaces(
				value
			)}</span><span>${getPercentageDifference(d.yest, d.curDay)}%</span>`;
			if (getPercentageDifference(d.yest, d.curDay) > 0) {
				td.classList.add("green");
			}
			if (getPercentageDifference(d.yest, d.curDay) < 0) {
				td.classList.add("red");
			}
		} else {
			td.textContent = formatNumberWithSpaces(value);
		}
		tr.appendChild(td);
	});
	if (i === 1) {
		let chartWrap = document.createElement("div");
		chartWrap.classList.add("chart-wrap");
		table.appendChild(chartWrap);
		let chart = document.createElement("div");
		chart.id = "chart";
		chartWrap.appendChild(chart);
	}
	table.appendChild(tr);
	if (i === 0) {
		table.querySelectorAll(".tr")[1].classList.add("active");
	}
	tr.addEventListener("click", () => {
		table.querySelectorAll(".tr").forEach((el) => {
			el.classList.remove("active");
		});
		tr.classList.add("active");
		chartGeneration(d.curDay, d.yest, d.thisDay);
	});
});

// Функция рассчета процента
function getPercentageDifference(first, second) {
	const difference = ((second - first) / first) * 100;
	return Math.round(difference);
}

// Функция форматирования числа
function formatNumberWithSpaces(number) {
	return number.toLocaleString("ru-RU");
}

// Формирование графика
function chartGeneration(a, b, c) {
	Highcharts.chart("chart", {
		chart: {
			type: "line",
		},
		xAxis: {
			categories: ["Текущий день", "Вчера", "Этот день недели"],
		},
		yAxis: {
			title: {
				text: "Значения",
			},
		},
		series: [
			{
				name: "Данные",
				data: [a, b, c],
			},
		],
	});
}

document.addEventListener("DOMContentLoaded", function () {
	chartGeneration(data[0].curDay, data[0].yest, data[0].thisDay);
});
