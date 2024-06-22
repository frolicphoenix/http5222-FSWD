/* SOME DOM METHODS
 * - getElementsByTagName()
 * - querySelector
 * - querySelectorAll
 * - getAttribute
 *
 * SOME DOM PROPERTIES
 * - documentElement (this is the root element)
 * - parentElement (parent element of the current node)
 * - attributes (list of attributes on an element)
 * - childNodes
 * - firstChild, lastChild
 * - nodeName
 * - textContent (the text content for an element)
 */
//assuming using async defer for loading this script file
loadData();

async function loadData() {
  const response = await fetch(
    "/xml/facilities-data.xml",
    {
      method: "get",
      headers: {
        "Content-Type": "application/xml"
      }
    }
  );
  let parser = new DOMParser(); //use DOMParser
  data = parser.parseFromString(await response.text(), "application/xml"); //parse from XML string to actual XML DOM tree
  console.log(data); //see the XML DOM object in console

  let firstLocation = data.querySelector("Location:first-child");
  console.log(firstLocation); //print the first <Location> element to console

  //test XPath
  //document.evaluate([xpath_expression], [document_or_node], [namespace_resolver], [result_type], [result])
  //the "a:" is just an arbitrary namespace prefix (needed if using a namespace, see function nsResolver())
  let result = data.evaluate('//a:Location', data, nsResolver, XPathResult.ANY_TYPE, null);
  //console.log(result);
  let div = document.getElementById("results"); //get div#results from the HTML DOM (document)
  //the result of .evaluate() is an object not an actual list
  //the way to loop through results is using the object's iterateNext() method
  let contents = "";
  while (loc = result.iterateNext()) {
    //console.log(loc.querySelector("LocationName").textContent);
    //console.log(loc.querySelector("Address").getAttribute("specific"));
    let locName = loc.querySelector("LocationName").textContent;
    contents += `<li>${locName}</li>`;
  }
  div.innerHTML = `<ul>${contents}</ul>`;
  
  //query by element value
  let specResult = data.evaluate(
    '//a:LocationID[text()="593"]/..', data, nsResolver, XPathResult.ANY_TYPE, null);
  let locResult = specResult.iterateNext();
  console.log(locResult.querySelector("LocationName").textContent);
}

//instead of a function, if there's only one
//namespace, you can just store the namespace
//value in a variable
function nsResolver() {
  return "http://www.example.org/PFRMapData";
}











