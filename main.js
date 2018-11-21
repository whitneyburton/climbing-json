var section = document.querySelector('section');

loadJSON(function(response) {
  const jsonObj = JSON.parse(response);
  showSources(jsonObj);
});

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', 'sealevelrise.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function showSources(jsonObj) {
  const sourceNames = jsonObj.map(obj => {
    return obj.source;
  });

  jsonObj.forEach(obj => {
    let newHTML = `
    <div>
      <h2>${obj.source.toUpperCase()}, ${obj.yrPublished}</h2>
      <p><span>Geographic Area: </span>${obj.geoArea.toUpperCase()}</p>
      <p><span>2100 Sea Level Rise Range: </span>${obj.min2100}-${obj.max2100} meters</p>
      <p><span>Number of Scenarios: </span>${obj.scenarios.length}</p>
      <a href="${obj.refURL}">Link to Website</a>
    </div>`;

    section.insertAdjacentHTML('beforeend', newHTML);
  });
}