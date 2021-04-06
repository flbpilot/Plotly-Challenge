function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}


d3.json("samples.json").then(function (data) {
    let ids = unpack(data.metadata, "id");
    d3.select("#data")
        .selectAll("select")
        .data(ids)
        .enter()
        .append("option")
        .html(function (d) {
            return `<option value ="${d}">${d}</option>`;
        });


    console.log(data);
    updatePlotly();
});


d3.selectAll("#data").on("change", updatePlotly);

function updatePlotly() {
    let dropdownMenu = d3.select("#data");
    let dataset = dropdownMenu.property("value");
    console.log(dataset)


    d3.json("samples.json").then((data) => {
        let person_id = data.samples.find(({ id }) => id === dataset);
        console.log(person_id);
        let otu_ids_sliced = person_id.otu_ids.slice(0, 10);
        console.log(otu_ids_sliced);
        let values_sliced = person_id.sample_values.slice(0, 10);
        console.log(values_sliced);
        let labels_sliced = person_id.otu_labels.slice(0, 10);


        let y = otu_ids_sliced.map(function (a) { return "OTU ID " + a; });
        let x = values_sliced.sort((a, b) => a - b);
        let labels = labels_sliced;

        let trace1 = {
            x: x,
            y: y,
            type: "bar",
            text: labels,
            orientation: "h"
};
let data1 = [trace1];

        let layout = {
            title: "Top 10 OTU",
            barmode: "group"
        };
        Plotly.newPlot("bar", data1, layout);

    }); 
};
