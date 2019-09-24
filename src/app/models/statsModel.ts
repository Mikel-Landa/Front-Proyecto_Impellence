export const showStatsMonth = (rows) => {
	let barChartData = [];
	let barChartLabels = [];
	let data1: any = [];
	let data2: any = [];
	let numPauses: any = [];
	let totalPauseT: any = [];
	for (let i = 0; i < rows.length; i++) {
		if (i >= rows.length) break;
		let horaStart = rows[i].startHour.split(':');
		let horaStartNum = parseInt(horaStart[0]) + parseInt(horaStart[1]) / 60 + parseInt(horaStart[2]) / 3600;
		let horaEnd = rows[i].endHour.split(':');
		let horaEndNum = parseInt(horaEnd[0]) + parseInt(horaEnd[1]) / 60 + parseInt(horaEnd[2]) / 3600;
		var contador = 1;
		rows[i].startHour = horaStartNum;
		rows[i].endHour = horaEndNum;
		for (let k = i + 1; k < rows.length; k++) {
			if (rows[i].day == rows[k].day) {
				rows[i].numPauses = rows[i].numPauses + rows[k].numPauses;
				rows[i].totalPauseT += rows[k].totalPauseT;
				let horaStart1 = rows[k].startHour.split(':');
				let horaStartNum1 =
					parseInt(horaStart1[0]) + parseInt(horaStart1[1]) / 60 + parseInt(horaStart1[2]) / 3600;
				let horaEnd1 = rows[k].endHour.split(':');
				let horaEndNum1 = parseInt(horaEnd1[0]) + parseInt(horaEnd1[1]) / 60 + parseInt(horaEnd1[2]) / 3600;

				rows[i].startHour += horaStartNum1;
				rows[i].endHour += horaEndNum1;
				rows.splice(k, 1);
				contador++;
			}
		}
	}
	for (let i = 0; i < rows.length; i++) {
		if (contador > 1) {
			rows[i].startHour = rows[i].startHour / contador;
			rows[i].numPauses = rows[i].numPauses / contador;
			rows[i].endHour = rows[i].endHour / contador;
			rows[i].totalPauseT = rows[i].totalPauseT / contador;
		}

		barChartLabels.push('Día ' + Number(rows[i].day));
		data1.push(Math.floor(rows[i].startHour * 100) / 100);
		data2.push(Math.floor(rows[i].endHour * 100) / 100);
		numPauses.push(Math.floor(rows[i].numPauses * 100) / 100);
		totalPauseT.push(Math.floor(rows[i].totalPauseT * 100 / 60) / 100);
	}
	// console.log(rows);

	// console.log(rows.length);
	data1.push(1);
	// console.log(data1Avr, data2Avr, numPausesAvr, totalPauseTAvr);
	barChartData = [
		{ data: data1, label: 'Hora de entrada' },
		{ data: data2, label: 'Hora de salida' },
		{ data: numPauses, label: 'Número de pausas' },
		{ data: totalPauseT, label: 'Tiempo total(horas)' }
	];
	// numPauses.push(1);
	// barChartData1 = [
	// 	{ data: numPauses, label: 'Número de pausas' },
	// 	{ data: totalPauseT, label: 'Tiempo total(horas)' }
	// ];
	// console.log(barChartData);
	// console.log(barChartData1);
	return new Array(barChartData, barChartLabels);
	// console.log(this.barChartData3);
};

export const getStastYear = (response) => {
	let arrBarData = [];
	let arrBarLabels = [];
	let arrData1: any = [];
	let arrData2: any = [];
	let arrNumPauses: any = [];
	let arrTotalPauseT: any = [];
	for (let month = 1; month <= 12; month++) {
		let rows = response.filter((elm) => elm.month == month);
		if (rows.length == 0) continue;

		let data1: any = [];
		let data2: any = [];
		let numPauses: any = [];
		let totalPauseT: any = [];
		for (let i = 0; i < rows.length; i++) {
			if (i >= rows.length) break;
			let horaStart = rows[i].startHour.split(':');
			let horaStartNum = parseInt(horaStart[0]) + parseInt(horaStart[1]) / 60 + parseInt(horaStart[2]) / 3600;
			let horaEnd = rows[i].endHour.split(':');
			let horaEndNum = parseInt(horaEnd[0]) + parseInt(horaEnd[1]) / 60 + parseInt(horaEnd[2]) / 3600;
			var contador = 1;
			rows[i].startHour = horaStartNum;
			rows[i].endHour = horaEndNum;
			for (let k = i + 1; k < rows.length; k++) {
				if (rows[i].day == rows[k].day) {
					rows[i].numPauses = rows[i].numPauses + rows[k].numPauses;
					rows[i].totalPauseT += rows[k].totalPauseT;
					let horaStart1 = rows[k].startHour.split(':');
					let horaStartNum1 =
						parseInt(horaStart1[0]) + parseInt(horaStart1[1]) / 60 + parseInt(horaStart1[2]) / 3600;
					let horaEnd1 = rows[k].endHour.split(':');
					let horaEndNum1 = parseInt(horaEnd1[0]) + parseInt(horaEnd1[1]) / 60 + parseInt(horaEnd1[2]) / 3600;

					rows[i].startHour += horaStartNum1;
					rows[i].endHour += horaEndNum1;
					rows.splice(k, 1);
					contador++;
				}
			}
		}
		let dataAvr = 0;
		let data1Avr = 0;
		let numPausesAvr = 0;
		let totalPauseTAvr = 0;
		for (let i = 0; i < rows.length; i++) {
			if (contador > 1) {
				rows[i].startHour = rows[i].startHour / contador;
				rows[i].numPauses = rows[i].numPauses / contador;
				rows[i].endHour = rows[i].endHour / contador;
				rows[i].totalPauseT = rows[i].totalPauseT / contador;
			}

			dataAvr += Math.floor(rows[i].startHour * 100) / 100;
			data1Avr += Math.floor(rows[i].endHour * 100) / 100;

			data1.push(Math.floor(rows[i].startHour * 100) / 100);
			data2.push(Math.floor(rows[i].endHour * 100) / 100);

			numPausesAvr += Math.floor(rows[i].numPauses * 100) / 100;
			totalPauseTAvr += Math.floor(rows[i].totalPauseT * 100 / 60) / 100;

			numPauses.push(Math.floor(rows[i].numPauses * 100) / 100);
			totalPauseT.push(Math.floor(rows[i].totalPauseT * 100 / 60) / 100);
		}
		arrBarLabels.push('Mes ' + Number(rows[0].month));
		dataAvr /= data1.length;
		data1Avr /= data2.length;
		numPausesAvr /= numPauses.length;
		totalPauseTAvr /= totalPauseT.length;
		arrData1.push(Math.floor(dataAvr * 100) / 100);
		arrData2.push(Math.floor(data1Avr * 100) / 100);
		arrNumPauses.push(Math.floor(numPausesAvr * 100) / 100);
		arrTotalPauseT.push(Math.floor(totalPauseTAvr * 100) / 100);

		// console.log(rows);

		// console.log(rows.length);

		// console.log(data1Avr, data2Avr, numPausesAvr, totalPauseTAvr);
	}
	arrData1.push(1);
	arrBarData = [
		{ data: arrData1, label: 'Hora de entrada' },
		{ data: arrData2, label: 'Hora de salida' },
		{ data: arrNumPauses, label: 'Número de pausas' },
		{ data: arrTotalPauseT, label: 'Tiempo total(horas)' }
	];
	return new Array(arrBarData, arrBarLabels);
};
