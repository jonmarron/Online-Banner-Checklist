let toDosIAB = [
  {
    index: 0,
    title: 'clickTag',
    text: 'Check there is only one clickTag in the html',
    code: '',
    imageURL: '',
    checked: false
  },
  {
    index: 1,
    title: 'clickTAG',
    text: 'Needed code for the clickTag to work on IAB',
    code: `var getUriParams = (function () {<br>
        &nbspvar query_string = {},<br>
        &nbsp&nbsp query = window.location.search.substring(1),<br>
        &nbsp&nbsp parmsArray = query.split("&");<br>
        &nbspif (parmsArray.length <= 0) return query_string;<br>
        &nbspvar i, pair, val;<br>
        &nbspfor (i = 0; i < parmsArray.length; i++) {<br>
        &nbsp&nbsp  pair = parmsArray[i].split("=");<br>
        &nbsp&nbsp  val = decodeURIComponent(pair[1]);<br>
        &nbsp&nbsp if (val != " && pair[0] != ") query_string[pair[0]] = val;<br>
        &nbsp}<br>
        &nbspreturn query_string;<br>
    })();
        `,
    imageURL: '',
    checked: false
  },
  {
    index: 2,
    title: 'test',
    text: 'Add clickTag to the clickable elements',
    code: `document.querySelector('#click-area').addEventListener('click', doClick);<br>
        <br>
      function doClick() {<br>
        if (getUriParams.clicktag != undefined) {<br>
          window.open(getUriParams.clicktag, "_blank");<br>
        } else if (getUriParams.clickTag != undefined) {<br>
          window.open(getUriParams.clickTag, "_blank");<br>
        } else if (getUriParams.clickTAG != undefined) {<br>
          window.open(getUriParams.clickTAG, "_blank");<br>
        } else if (clickTag != undefined) {<br>
          window.open(clickTag, "_blank");<br>
        }<br>
      }
      `,
    imageURL: '',
    checked: false
  },
  {
    index: 3,
    title: 'test',
    text: 'Add the following behind the URL to test the clickTag',
    code: `?clickTag=https://www.url.at`,
    imageURL: '',
    checked: false
  },
  {
    index: 4,
    title: 'test',
    text: 'For mouseover to work you might need the following line after \"stage = new lib.Stage(canvas);\"',
    code: `stage.enableMouseOver(); `,
    imageURL: '',
    checked: false
  },
  {
    index: 5,
    title: 'IAB',
    text: 'URLs in the head should all be certified and secure. A http:// will not allow the banner to be published',
    code: '',
    imageURL: '',
    checked: false
  }

]

