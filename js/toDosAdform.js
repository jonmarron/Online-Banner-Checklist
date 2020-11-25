let toDosAdform = [
    {
        index: 0,
        title: 'adformAPI',
        text: 'Add the Adform API in a script tag',
        code: `<xmp><script>
    document.write('<script src="' + (window.API_URL || 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js?bv=' + Math.random()) + '"></script>');
</script></xmp>`,
        imageURL: '',
        checked: false
    },
    {
        index: 1,
        title: 'clickTAG',
        text: 'Check clickTAG notation, and add code to make it work',
        code: `
let clickTAG = 'https://url.at';<br>
clickTAGvalue = dhtml.getVar('clickTAG', clickTAG); <br>
landingpagetarget = dhtml.getVar('landingPageTarget', '_blank');<br>
clickArea.addEventListener('click', function () {<br>
    window.open(clickTAGvalue, landingpagetarget);<br>
});
        `,
        imageURL: '',
        checked: false
    },
    {
        index: 2,
        title: 'previewLink',
        text: 'Live Preview on Adform to check if clickTAG works',
        code: '',
        imageURL: 'assets/img/clickValidate.png',
        checked: false
    },
    {
        index: 3,
        title: 'previewFix',
        text: 'If the clickmethod isn\'t validated, try the following on the html:',
        code: `var loader = new createjs.LoadQueue(true);`,
        imageURL: 'assets/img/loadQueue.png',
        checked: false
    },
    {
        index: 4,
        title: 'adformStudio1',
        text: 'Add clickTAG so it is added to the manifest',
        code: '',
        imageURL: 'assets/img/addclickTAG.png',
        checked: false
    },
    {
        index: 5,
        title: 'adformStudio2',
        text: 'Add fallback and URL',
        code: '',
        imageURL: 'assets/img/fallback.png',
        checked: false
    },
    {
        index: 6,
        title: 'adformStudio3',
        text: 'Check Responsive boxes if needed',
        code: '',
        imageURL: 'assets/img/responsive.png',
        checked: false
    },
    {
        index: 7,
        title: 'adformStudio3',
        text: 'Check that the clickTAG is in the manifest',
        code: '',
        imageURL: 'assets/img/manifestcheck.png',
        checked: false
    },
    {
        index: 8,
        title: 'adformStudio3',
        text: 'On the metadata file, a non responsive banner should have the value 0 and a responsive one the value 1',
        code: '',
        imageURL: 'assets/img/responsiveCheck.png',
        checked: false
    },
    {
        index: 9,
        title: 'adformStudio3',
        text: 'The clickTAG should be both on the banner and the backup in the metadata file',
        code: '',
        imageURL: 'assets/img/clickTAGmetadata.png',
        checked: false
    },
    {
        index: 10,
        title: 'adformStudio3',
        text: 'URLs in the head should all be certified and secure. A http:// will not allow the banner to be published',
        code: '',
        imageURL: '',
        checked: false
    }


]