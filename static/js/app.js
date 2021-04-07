function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}
////////////////////////////////////////////////////////////////////////
d3.json("samples.json").then(function (data) {
    var ids = unpack(data.metadata, "id");
    d3.select("#sub_data")
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
////////////////////////////////////////////////////////////////////////
d3.selectAll("#sub_data").on("change", updatePlotly);
function updatePlotly() {
    var dropdownMenu = d3.select("#sub_data");
    var dataset = dropdownMenu.property("value");
    console.log(dataset)
////////////////////////////////////////////////////////////////////////
    d3.json("samples.json").then((data) => {
        var person_id = data.samples.find(({ id }) => id === dataset);
        console.log(person_id);
        var otu_ids_sliced = person_id.otu_ids.slice(0, 10);
        console.log(otu_ids_sliced);
        var values_sliced = person_id.sample_values.slice(0, 10);
        console.log(values_sliced);
        var labels_sliced = person_id.otu_labels.slice(0, 10);



        var y = otu_ids_sliced.map(function (a) { return "OTU ID " + a; });
        var x = values_sliced.sort((a, b) => a - b);
        var labels = labels_sliced;

        var tracebar = {
            x: x,
            y: y,
            type: "bar",
            text: labels,
            orientation: "h"
        };

        var bardata = [tracebar];
        var layout = {
            title: "Top 10 OTUs",
            barmode: "group"
        };

        Plotly.newPlot("bar", bardata, layout);
////////////////////////////////////////////////////////////////////////
        var otu_ids = person_id.otu_ids;
        var values = person_id.sample_values;
        var labels = person_id.otu_labels;

        var x2 = otu_ids;
        var y2 = values;
        var labels2 = labels;

        var tracebubble = {
            x: x2,
            y: y2,
            mode: "markers",
            text: labels2,
            marker: {
                color: otu_ids,
                colorscale:'RdBu',
                size: values
            }
        };

        var bubbledata = [tracebubble];
        var layout2 = {
            title: "OTUs",
            xaxis: { title: "OTU ID" },
        };
        Plotly.newPlot("bubble", bubbledata, layout2);

    });
////////////////////////////////////////////////////////////////////////
    demographic_data = parseInt(dataset)
    d3.json("samples.json").then((data) => {
        var dem_data = data.metadata.find(({ id }) => id === demographic_data);

        var indv_dem_data = d3.select("#sample-metadata");
        indv_dem_data.text("");
        Object.entries(dem_data).forEach((key) => {   
            indv_dem_data.append("h4").text(key[0] + ": " + key[1]);    
        });
////////////////////////////////////////////////////////////////////////
        var wfreq = dem_data.wfreq;
        console.log(wfreq)

        var tacegauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Weekly Scrubs" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,9], 
                    tickmode: 'linear',
                    tickfont: {
                        size: 15
                    }
                },
                bar: { color: "#5174C5" },
                steps: [
                    { range: [0, 1], color: '#000000' },
                    { range: [1, 2], color: '#696969' },
                    { range: [2, 3], color: '#808080' },
                    { range: [3, 4], color: '#A9A9A9' },
                    { range: [4, 5], color: '#C0C0C0' },
                    { range: [5, 6], color: '#D3D3D3' },
                    { range: [6, 7], color: '#DCDCDC' },
                    { range: [7, 8], color: '#F5F5F5' },
                    { range: [8, 9], color: '#FFFFFF' }
                ]

            }
        };
////////////////////////////////////////////////////////////////////////        
        var datagauge = [tacegauge];
        Plotly.newPlot("gauge", datagauge);

    });
  
};
