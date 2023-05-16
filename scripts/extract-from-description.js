/**
This function gets the form data entered by the user (as a parameter) and returns issueData.
@param formValue The web form data formatted to html tables
*/
function getIssueData() {

    const extractFromDescription = extractText();

    const issueDataGCcode = {
    title: `Request to MODIFY the Access of a Service Account to call the SDS enterprise web services Environment: PRODUCTION; Services: wsaddress,wsed`,
    confidential: "true",
    labels: `New, modifyProd, wsaddress, wsed `,
    applicationdescription: `${extractFromDescription}`,
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
    console.log("issue data: ", issueDataGCcode);
    return issueDataGCcode;
}
      
/**
This function creates a new issue in GCcode using the GitLab API, and return await response.json()
@param formValue The web form data and format it into HTML tables
*/
async function createIssue(formValue) {

const issueData = this.getIssueData(formValue);

const response = await fetch('https://gccode.ssc-spc.gc.ca/api/v4/projects/11015/issues', {
    method: 'POST',
    cache: 'default',
    headers: {
        'Content-Type': 'application/json',
        //Uses Project Access token which grants access as role of "Maintainer" 
        //with scope=api (Grants complete read/write access to the API, including all groups and projects, the container registry, and the package registry.) a new issue thru the GitLab API
        //Private token below points to sdsCreate1 personal access token in GCcode (expires 2023june30):
        'PRIVATE-TOKEN': 'glpat-Dpk5gv43PqyTFFe1SVaR'
        },
        //stringify only the issue body info
        body: JSON.stringify(issueData),
    });

const responseData = await response.json();

return this.convertResponseValues(responseData);
}



/**
This function gets the form data entered by the user (as a parameter) and returns issueData.
@param formValue The web form data formatted to html tables
*/
function extractText(issueData) {
    //const sectionStartTag = description.substring(0);
    const sectionEndTag = `<p>`;
  
    //Where the application description section string begins
    //const startIndex = description.indexOf();
    //console.log("startIndex: ", startIndex);
    //Returns the starting point of the end of the string. sectionEndTag.length will return the end of the string
    const textIndex = issueData.description.indexOf(sectionEndTag, 0);
    console.log("textIndex: ", textIndex);
    
    if (issueData.description.includes(sectionEndTag)){
        const extractDescription = issueData.description.substring(0, textIndex);
        console.log("extractDescription: ", extractDescription); 
    };
    
    
    //return extractDescription;
}


/*This section is still a work in progress*/
// const description = `TSSCR11 application description I entered<p>
// <table class="info-table app-info">
//     <thead>
//         <tr id="gcdCltAppInfo" scope="column">
//             <th>Application Info</th>
//             <th>&nbsp;</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <th scope="row">Application Environment</th>
//             <td id="gcdCltRequestType">modifyProd</td>
//         </tr>
//         <tr>
//             <th scope="row">CSD Application Name</th>
//             <td id="gcdCltCsdName">test SSC read-only 12</td>
//         </tr>
//         <tr>
//             <th scope="row">CSD Acronym</th>
//             <td id="gcdCltCsdAcronym">TSSCR12</td>
//         </tr>            
//         <tr>
//             <th scope="row">Application Description</th>
//             <td id="gcdCltAppDesc">TSSCR12 application description I entered</td>
//         </tr>            
//         <tr>
//             <th scope="row">Project Url in the CSD</th>
//             <td id="gcdCltCsdUrl" target="_blank">https://gccode.ssc-spc.gc.ca/iitb-dgiit/sds/ews/ews-support/-/issues</td>
//         </tr>  
//         <tr>
//             <th scope="row">Project Team Name</th>
//             <td id="gcdCltTeamName">TSSCR12 team</td>
//         </tr> 
//         <tr>
//             <th scope="row">Application Distribution List</th>
//             <td id="gcdCltTeamDistList">TSSCR12-GD</td>
//         </tr>                                 
//         <tr>
//             <th scope="row">Application Version</th>
//             <td id="gcdCltAppVersion">2.3</td>
//         </tr>
//         <tr>
//             <th scope="row">Application RFC (ANPR)</th>
//             <td id="gcdCltAppAnpr"></td>
//         </tr>            
//         <tr>
//             <th scope="row">Expected Implementation Date</th>
//             <td id="gcdCltImplementDate"></td>
//         </tr>                                                   
//         <tr>
//             <th scope="row">Application Type</th>
//             <td id="gcdCltAppType">webApplication</td>
//         </tr>
//         <tr>
//             <th scope="row">Application Zone</th>
//             <td id="gcdCltAppZone">internet</td>
//         </tr>
//         <tr>
//             <th scope="row">Application in Production</th>
//             <td id="gcdCltExistInProd">yes</td>
//         </tr>
//         <tr>
//             <th scope="row">Week-Day Support Hours</th>
//             <td id="gcdCltAppSupportWeekday"></td>
//         </tr>
//         <tr>
//             <th scope="row">Week-End Support Hours</th>
//             <td id="gcdCltAppSupportWeekend"></td>
//         </tr>
//         <tr>
//             <th scope="row">Criticality Classification</th>
//             <td id="gcdCltCriticality"></td>
//         </tr>
//         <tr>
//             <th scope="row">Incident Support Coverage</th>
//             <td id="gcdCltSupportCoverage"></td>
//         </tr>
//         <tr>
//             <th scope="row">Application Hosting Site</th>
//             <td id="gcdCltAppHostSite"></td>
//         </tr>
//         <tr>
//             <th scope="row">Database Hosting Site</th>
//             <td id="gcdCltDbHostSite"></td>
//         </tr> 
//         <tr>
//             <th scope="row">Application Usage Details</th>
//             <td id="gcdCltAppUsageDetails">Application details entered here. This is what it does.</td>
//         </tr>                                                                                                                       
//     </tbody>
// </table>
// </p>`







