const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;
let parkNS = "http://www.example.org/PFRMapData";

async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:8888/facilities-data.xml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadParks() {
  xmldocument = await loadXml(); //retrieve the XML DOM document
  return xmldocument.querySelectorAll("Location");

}
async function getParkById(id) {
  xmldocument = await loadXml(); //XML DOM document
  let xpath = `//Location[LocationID/text()='${id}']`;
  //evaluate(xpathExpression, contextNode, namespaceResolver, resultType, result)
  let results = xmldocument.evaluate(
    xpath,
    xmldocument,
    parkNS,
    4, //UNORDERED_NODE_ITERATOR_TYPE
    null
  );
  return results.iterateNext();
}

module.exports = {
  loadParks,
  getParkById
};