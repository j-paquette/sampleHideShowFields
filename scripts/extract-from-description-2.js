const issueDataGCcode = {
    title: `Request to MODIFY the Access of a Service Account to call the SDS enterprise web services Environment: PRODUCTION; Services: wsaddress,wsed`,
    confidential: "true",
    labels: `New, modifyProd, wsaddress, wsed `,
    description: `TSSCR11 application description I entered<p>
    <table class="info-table app-info">
        <thead>
            <tr id="gcdCltAppInfo" scope="column">
                <th>Application Info</th>
                <th>&nbsp;</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Application Environment</th>
                <td id="gcdCltRequestType">modifyProd</td>
            </tr>
            <tr>
                <th scope="row">CSD Application Name</th>
                <td id="gcdCltCsdName">test SSC read-only 12</td>
            </tr>
            <tr>
                <th scope="row">CSD Acronym</th>
                <td id="gcdCltCsdAcronym">TSSCR12</td>
            </tr>            
            <tr>
                <th scope="row">Application Description</th>
                <td id="gcdCltAppDesc">TSSCR12 application description I entered</td>
            </tr>            
            <tr>
                <th scope="row">Project Url in the CSD</th>
                <td id="gcdCltCsdUrl" target="_blank">https://gccode.ssc-spc.gc.ca/iitb-dgiit/sds/ews/ews-support/-/issues</td>
            </tr>  
            <tr>
                <th scope="row">Project Team Name</th>
                <td id="gcdCltTeamName">TSSCR12 team</td>
            </tr> 
            <tr>
                <th scope="row">Application Distribution List</th>
                <td id="gcdCltTeamDistList">TSSCR12-GD</td>
            </tr>                                 
            <tr>
                <th scope="row">Application Version</th>
                <td id="gcdCltAppVersion">2.3</td>
            </tr>
            <tr>
                <th scope="row">Application RFC (ANPR)</th>
                <td id="gcdCltAppAnpr"></td>
            </tr>            
            <tr>
                <th scope="row">Expected Implementation Date</th>
                <td id="gcdCltImplementDate"></td>
            </tr>                                                   
            <tr>
                <th scope="row">Application Type</th>
                <td id="gcdCltAppType">webApplication</td>
            </tr>
            <tr>
                <th scope="row">Application Zone</th>
                <td id="gcdCltAppZone">internet</td>
            </tr>
            <tr>
                <th scope="row">Application in Production</th>
                <td id="gcdCltExistInProd">yes</td>
            </tr>
            <tr>
                <th scope="row">Week-Day Support Hours</th>
                <td id="gcdCltAppSupportWeekday"></td>
            </tr>
            <tr>
                <th scope="row">Week-End Support Hours</th>
                <td id="gcdCltAppSupportWeekend"></td>
            </tr>
            <tr>
                <th scope="row">Criticality Classification</th>
                <td id="gcdCltCriticality"></td>
            </tr>
            <tr>
                <th scope="row">Incident Support Coverage</th>
                <td id="gcdCltSupportCoverage"></td>
            </tr>
            <tr>
                <th scope="row">Application Hosting Site</th>
                <td id="gcdCltAppHostSite"></td>
            </tr>
            <tr>
                <th scope="row">Database Hosting Site</th>
                <td id="gcdCltDbHostSite"></td>
            </tr> 
            <tr>
                <th scope="row">Application Usage Details</th>
                <td id="gcdCltAppUsageDetails">Application details entered here. This is what it does.</td>
            </tr>                                                                                                                       
        </tbody>
    </table>
    </p>`};
    
    function extractText(htmlText) {
        //
        const descriptionText = `${htmlText.description}`;
      console.log("descriptionText: ", descriptionText);
      
        const indexStart = descriptionText.indexOf(`TSSCR11 application description I entered`, 0);
      console.log("indexStart: ", indexStart);
      const indexEnd = descriptionText.indexOf(`<p>`);
      console.log("indexEnd: ", indexEnd);
      //extract the clientText from description value
        const clientText = descriptionText.substring(indexStart, indexEnd);
      
      console.log("clientText: ", clientText);
      
      //create section tags, to mark the start and end of the html client tables
      const sectionStartTag = "<!--client-section-start-->";
      const sectionEndTag = "<!--client-section-end-->";
      
      if(descriptionText.includes(sectionStartTag)){
          const indexClientTableStart = descriptionText.indexOf(sectionStartTag);
          console.log("indexClientTableStart: ", indexClientTableStart);
          const indexClientTableEnd = descriptionText.indexOf(sectionEndTag) + sectionEndTag.length;
          console.log("indexClientTableEnd: ", indexClientTableEnd);
      }
      
      
      //replace clientText with an empty string
      const clientTables = descriptionText.replace(clientText, ``);
      console.log("clientTables: ", clientTables);
      //wrap the html client tables inside a sectionStartTag and sectionEndTag
      const newClientTables = sectionStartTag.concat(clientTables, sectionEndTag);
      console.log("newClientTables: ", newClientTables);
      
    }
    
    extractText(issueDataGCcode);