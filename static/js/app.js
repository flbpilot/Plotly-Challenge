function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}


d3.json("samples.json").then(function (data) {
    var ids = unpack(data.metadata, "id");
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
    var dropdownMenu = d3.select("#data");
    var dataset = dropdownMenu.property("value");
    console.log(dataset)


    d3.json("samples.json").then((data) => {
        var person_id = data.samples.find(({ id }) => id === dataset);
        console.log(person_id);
        var otu_ids_sliced = person_id.otu_ids.slice(0, 10);
        console.log(otu_ids_sliced);
        var values_sliced = person_id.sample_values.slice(0, 10);
        console.log(values_sliced);
        var labels_sliced = person_id.otu_labels.slice(0, 10);

    });
  
};

var y = otu_ids_sliced.map(function (a) { return "OTU ID " + a; });
var x = values_sliced.sort((a, b) => a - b);
var labels = labels_sliced;

var trace1 = {
    x: x,
    y: y,
    type: "bar",
    text: labels,
    orientation: "h"
};